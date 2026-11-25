import * as THREE from 'three';
import { buildVehicle, buildAvatar, ENV } from './models.js';
import { BY_ID } from './data.js';
import { canvasTex } from './util.js';

// 시작 화면용 차량 전시장
const LINEUP = [
  { id: 'zn_90', color: '#121315', a: -1.05, r: 15 },
  { id: 'sr_se6', color: '#79b2de', a: -0.7, r: 15.5 },
  { id: 'st_g', color: '#555b63', a: -0.36, r: 16 },
  { id: 'bm_m3', color: '#1c3a72', a: 0.36, r: 16 },
  { id: 'hb_grandia', color: '#eeeeec', a: 0.7, r: 15.5 },
  { id: 'sr_caravan', color: '#5a1922', a: 1.05, r: 15 },
  { id: 'hb_ionix5', color: '#b5bac0', a: 1.4, r: 14 },
  { id: 'sr_momo', color: '#e3bd2f', a: -1.4, r: 14 },
];

export class Showroom {
  constructor() {
    // 어두운 고급 스튜디오: 광택 검정 바닥 · 은은한 LED 줄 · 빛나는 회전 무대 · 스포트라이트
    const s = this.scene = new THREE.Scene();
    s.background = new THREE.Color(0x0b0f14);
    s.fog = new THREE.Fog(0x0b0f14, 30, 85);
    s.add(new THREE.HemisphereLight(0xcfe3ff, 0x0a0d12, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(10, 24, 16); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 80 });
    key.shadow.bias = -0.0004;
    key.shadow.camera.updateProjectionMatrix();
    s.add(key);
    const rim = new THREE.DirectionalLight(0x6fd8ff, 1.1); rim.position.set(-14, 8, -14); s.add(rim);
    const warm = new THREE.DirectionalLight(0xffd2a0, 0.5); warm.position.set(14, 6, 4); s.add(warm);
    // 광택 바닥 (주변 반사)
    const floorM = new THREE.MeshStandardMaterial({ color: 0x12161b, roughness: 0.22, metalness: 0.65, envMap: ENV.map, envMapIntensity: 0.6 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), floorM);
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; s.add(floor);
    // 바닥 격자 선 (은은하게)
    const grid = new THREE.GridHelper(120, 40, 0x1d2b36, 0x161e26); grid.position.y = 0.01; s.add(grid);
    // 회전 무대: 어두운 원판 + 빛나는 하늘색 테두리 두 줄
    this.turn = new THREE.Group(); s.add(this.turn);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(9, 9.3, 0.25, 96), new THREE.MeshStandardMaterial({ color: 0x1a2028, roughness: 0.35, metalness: 0.5 }));
    disc.position.y = 0.125; disc.receiveShadow = true; this.turn.add(disc);
    const glow = (r, w, c, y) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, w, 8, 128), new THREE.MeshBasicMaterial({ color: c, toneMapped: false })); m.rotation.x = Math.PI / 2; m.position.y = y; s.add(m); return m; };
    this.ring = glow(9.2, 0.06, 0x38d6ff, 0.26); glow(9.55, 0.025, 0x1f6f8a, 0.03);
    // 뒤 벽: 짙은 남색 + 세로 LED 줄
    const wall = new THREE.MeshStandardMaterial({ color: 0x10151c, roughness: 0.8 });
    const box = (w, h, d, x, y, z, ry, m) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.rotation.y = ry; o.receiveShadow = true; s.add(o); return o; };
    box(90, 22, 1, 0, 11, -28, 0, wall);
    box(1, 22, 80, -36, 11, 0, 0, wall);
    box(1, 22, 80, 36, 11, 0, 0, wall);
    const led = new THREE.MeshBasicMaterial({ color: 0x3f8fae, toneMapped: false }), ledDim = new THREE.MeshBasicMaterial({ color: 0x1b3a48, toneMapped: false });
    for (let x = -30; x <= 30; x += 5) { if (Math.abs(x) < 13) continue; box(0.12, 14, 0.05, x, 9, -27.45, 0, Math.abs(x) % 10 === 0 ? led : ledDim); }
    box(30, 0.08, 0.05, 0, 3.4, -27.45, 0, ledDim);
    // 간판 (뒤 벽 가운데)
    const signTex = canvasTex(2048, 420, (g, w, h) => {
      g.clearRect(0, 0, w, h);
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = '900 150px "Noto Sans KR", sans-serif'; g.fillStyle = 'rgba(255,255,255,.96)'; g.fillText('HANPAN DRIVE', w / 2, h / 2 - 50);
      g.font = '700 62px "Noto Sans KR", sans-serif'; g.fillStyle = 'rgba(140,220,255,.9)'; g.fillText('한판 드라이브  ·  실제 지도 3D', w / 2, h - 70);
    });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(22, 4.5), new THREE.MeshBasicMaterial({ map: signTex, transparent: true, toneMapped: false }));
    sign.position.set(0, 6.2, -27.4); sign.visible = false; s.add(sign); // 이름은 화면 위 가운데 글자로
    // 스포트라이트 (무대 위)
    for (const [x, z, c] of [[-9, 7, 0xffffff], [9, 7, 0xfff2e0], [0, -12, 0xbfe9ff]]) {
      const sp = new THREE.SpotLight(c, 520, 50, 0.5, 0.55, 1.6);
      sp.position.set(x, 16, z); sp.target.position.set(0, 0, 0); s.add(sp); s.add(sp.target);
    }
    this.cars = [];
    this.featSpec = BY_ID.hb_super_low;
    for (const c of LINEUP) {
      const spec = BY_ID[c.id]; if (!spec) continue;
      const v = buildVehicle(spec, { color: c.color, wheel: 'sport' });
      const x = Math.sin(c.a) * (c.r + 5), z = -Math.cos(c.a) * (c.r + 5) + 4;
      v.group.position.set(x, 0, z);
      v.group.rotation.y = Math.atan2(-x, -(z - 4)) + 0.6 * Math.sign(c.a);
      s.add(v.group);
      this.cars.push(v);
    }
    s.traverse((o) => { if (o.isMesh && o.material !== undefined) { o.castShadow = true; o.receiveShadow = true; } });
    this.t = 0;
  }
  // 가운데 회전 무대: 지금 고른 내 차
  setFeatured(own) {
    const spec = BY_ID[own.id]; if (!spec) return;
    if (this.feat) this.turn.remove(this.feat.group);
    this.feat = buildVehicle(spec, { color: own.color, wheel: own.wheel, plate: own.plate, livery: own.livery, company: own.company, route: spec.type === 'bus' ? '금남55' : undefined, dest: '문화전당 ↔ 영산강', routeColor: '#2a63d4' });
    if (this.feat.setInner) this.feat.setInner('어서 오세요 · 한판 드라이브');
    if (this.feat.setRoute) this.feat.setRoute('01', '광천터미널 ↔ 금남로');
    this.feat.group.position.y = 0.25;
    this.feat.group.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    this.turn.add(this.feat.group);
    this.featSpec = spec;
    this.placeAvatar();
  }
  setAvatar(opts) {
    if (this.avatar) this.scene.remove(this.avatar);
    this.avatar = buildAvatar(opts);
    this.scene.add(this.avatar);
    this.placeAvatar();
  }
  placeAvatar() {
    if (!this.avatar) return;
    const s = this.featSpec;
    this.avatar.position.set(-(Math.max(s.len / 2, 2.6) + 1.2) * 0.75, 0.25, Math.max(s.len / 2, 2.6) * 0.75 + 1);
    this.avatar.rotation.y = 0.6;
  }
  update(dt, camera) {
    this.t += dt;
    this.turn.rotation.y += dt * 0.18;
    if (this.ring) this.ring.material.color.setHSL(0.53, 0.9, 0.55 + Math.sin(this.t * 1.6) * 0.08);
    const s = this.featSpec;
    const big = s.len > 7;
    const d = big ? s.len * 1.0 + 4.5 : Math.max(9.5, s.len * 1.55 + 2);
    const a = Math.sin(this.t * 0.07) * (big ? 0.3 : 0.45) - (big ? 0.35 : 0.55);
    camera.position.set(Math.sin(a) * d, big ? s.hei * 0.62 + 0.8 : s.hei * 0.75 + 1.6 + Math.sin(this.t * 0.1) * 0.3, Math.cos(a) * d);
    camera.lookAt(0, s.hei * 0.45, 0);
    if (this.avatar) { this.avatar.rotation.y = 0.6 + Math.sin(this.t * 0.8) * 0.15; }
  }
}
