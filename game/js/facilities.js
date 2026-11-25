// 도시 시설: 주유소 · 버스 차고지 (광주와 다른 도시 모두, 큰길 옆 빈 땅에 자동 배치)
import * as THREE from 'three';
import { W, addOBox } from './roadnet.js';

const GAS_BRANDS = [['한빛오일', '#d0322f'], ['누리에너지', '#1f8a4c'], ['빛고을주유소', '#e67e22'], ['푸른에너지', '#1f6fd1'], ['하늘주유소', '#7a4ff0']];
let MATS = null;
function mats() {
  if (MATS) return MATS;
  const S = (c, r = 0.7, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  MATS = {
    asphalt: S(0x3a3d42, 0.95), concrete: S(0xb9bcc0, 0.9), white: S(0xf3f4f6, 0.5), canopy: S(0xf7f7f7, 0.45),
    metal: S(0x9aa1a8, 0.4, 0.6), glass: S(0x8fb6d2, 0.15, 0.3), dark: S(0x2a2e33, 0.6), fence: S(0x6d757d, 0.6, 0.4),
    line: new THREE.MeshBasicMaterial({ color: 0xf2f2f2, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
    yline: new THREE.MeshBasicMaterial({ color: 0xffc928, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 }),
  };
  return MATS;
}
const BOX = new THREE.BoxGeometry(1, 1, 1);
const PLANE = new THREE.PlaneGeometry(1, 1);
function signTex(lines, bg, w = 512, h = 128) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const g = cv.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const T = (t) => (globalThis.HP_I18N && HP_I18N.lang === 'en' ? HP_I18N.tr(t) : t);
  lines.forEach(([t, s], i) => {
    let fs = Math.round(h * s);
    g.font = `900 ${fs}px "Noto Sans KR", sans-serif`;
    while (g.measureText(T(t)).width > w * 0.92 && fs > 10) { fs -= 2; g.font = `900 ${fs}px "Noto Sans KR", sans-serif`; }
    g.fillText(T(t), w / 2, h * (lines.length === 1 ? 0.52 : 0.33 + i * 0.4));
  });
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
}
// 로컬 좌표 (u: 도로 방향, v: 도로에서 멀어지는 쪽) → 월드
function frame(e, s, side) {
  const ox = e.a.x + e.dir.x * s, oz = e.a.z + e.dir.z * s;
  const rx = -e.dir.z * side, rz = e.dir.x * side; // 도로 오른쪽(side=1) 바깥 방향
  return { at: (u, v) => ({ x: ox + e.dir.x * u + rx * v, z: oz + e.dir.z * u + rz * v }), ang: e.heading, rx, rz };
}
function put(group, mat, p, y0, y1, w, l, ang, col) {
  const m = new THREE.Mesh(BOX, mat); m.position.set(p.x, (y0 + y1) / 2, p.z); m.scale.set(w, y1 - y0, l); m.rotation.y = ang;
  if (col !== undefined) { m.material = mat.clone(); m.material.color.set(col); }
  m.castShadow = y1 - y0 > 2; m.receiveShadow = true; group.add(m); return m;
}
function flat(group, mat, p, y, w, l, ang) { const m = new THREE.Mesh(PLANE, mat); m.rotation.set(-Math.PI / 2, ang, 0, 'YXZ'); m.position.set(p.x, y, p.z); m.scale.set(w, l, 1); m.receiveShadow = true; group.add(m); return m; }

// 빈 땅인지: 사각형 안 점들이 건물 · 도로 · 물에 걸리지 않아야
function rectFree(F, c, ang, hw, hl) {
  const s = Math.sin(ang), co = Math.cos(ang);
  for (let a = -1; a <= 1; a += 0.5) for (let b = -1; b <= 1; b += 0.5) {
    const u = a * hl, v = b * hw;
    const x = c.x + s * u + co * v, z = c.z + co * u - s * v;
    if (!F(x, z)) return false;
  }
  return true;
}

// ---------- 주유소 ----------
function buildGas(scene, e, s, side, name, color) {
  const M = mats(), g = new THREE.Group();
  const F = frame(e, s, side), ang = e.heading;
  const off = e.hw + 3 + 13; // 차도 끝 + 보도 + 마당 반폭
  const C = F.at(0, off);
  flat(g, M.asphalt, C, 0.03, 26, 40, ang);
  // 진입로 2개
  for (const u of [-14, 14]) flat(g, M.concrete, F.at(u, e.hw + 1.6), 0.025, 3.6, 8, ang);
  // 캐노피 + 기둥
  put(g, M.canopy, F.at(0, off - 2), 5.6, 6.4, 14, 24, ang);
  put(g, M.canopy, F.at(0, off - 2), 6.4, 6.7, 14.2, 24.2, ang, color);
  for (const [u, v] of [[-8, -4], [8, -4], [-8, 3], [8, 3]]) { const p = F.at(u, off - 2 + v); put(g, M.metal, p, 0, 5.6, 0.5, 0.5, ang); addOBox(p.x, p.z, 0.4, 0.4, ang, 'pole'); }
  // 주유기
  for (const u of [-4.5, 4.5]) { const p = F.at(u, off - 2); put(g, M.white, p, 0, 1.9, 1.1, 2.0, ang); put(g, M.white, p, 1.9, 2.15, 1.2, 2.1, ang, color); addOBox(p.x, p.z, 0.65, 1.1, ang, 'pump'); }
  // 매장
  const shop = F.at(0, off + 9); put(g, M.white, shop, 0, 4.6, 8, 16, ang); put(g, M.glass, F.at(0, off + 4.95), 0.3, 3.6, 0.1, 12, ang); put(g, M.white, shop, 4.6, 5, 8.4, 16.4, ang, color);
  addOBox(shop.x, shop.z, 4, 8, ang, 'bld');
  // 가격 간판 (기둥)
  const sp = F.at(15, e.hw + 4.5); put(g, M.dark, sp, 0, 7.2, 0.35, 0.35, ang); addOBox(sp.x, sp.z, 0.3, 0.3, ang, 'pole');
  const sm = new THREE.Mesh(PLANE, signTex([[name, 0.34], ['휘발유 1,659  경유 1,529', 0.22]], color, 512, 160));
  sm.position.set(sp.x, 6.1, sp.z); sm.scale.set(4.2, 1.3, 1); sm.rotation.y = ang + Math.PI / 2; g.add(sm);
  scene.add(g);
  const pts = [F.at(-20, off - 13), F.at(20, off + 13)];
  return { C, zone: { type: 'fuel', name, x0: Math.min(pts[0].x, pts[1].x), x1: Math.max(pts[0].x, pts[1].x), z0: Math.min(pts[0].z, pts[1].z), z1: Math.max(pts[0].z, pts[1].z) } };
}

// ---------- 버스 차고지 ----------
// 주차된 버스: 부품마다 인스턴스 하나로 (차고지 하나에 그리기 7번) — 흰 아랫면 · 색 윗면 · 창 띠 · 앞유리 · 지붕 · 바퀴 · 행선지판
const PB_PARTS = (() => {
  const B = () => new THREE.BoxGeometry(1, 1, 1);
  const W = new THREE.CylinderGeometry(0.5, 0.5, 0.32, 12).rotateZ(Math.PI / 2);
  return [
    { geo: B(), mat: () => new THREE.MeshStandardMaterial({ color: 0xf2f3f1, roughness: 0.45 }), parts: [[0, 0.82, 0, 2.5, 0.95, 11]] },
    { geo: B(), mat: () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }), color: true, parts: [[0, 2.15, 0, 2.5, 1.7, 11]] },
    { geo: B(), mat: () => new THREE.MeshStandardMaterial({ color: 0x1b2631, roughness: 0.15, metalness: 0.4 }), parts: [[0, 2.05, -0.4, 2.53, 1.05, 9.6], [0, 1.85, 5.49, 2.3, 1.9, 0.06], [0, 2.25, -5.49, 2.0, 0.9, 0.06]] },
    { geo: B(), mat: () => new THREE.MeshStandardMaterial({ color: 0xd9dcdf, roughness: 0.6 }), parts: [[0, 3.07, 0, 2.3, 0.16, 10.2], [0, 3.2, -2, 1.6, 0.25, 3.2]] },
    { geo: W, mat: () => new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: 0.8 }), parts: [[-1.13, 0.5, 3.4, 1, 1, 1], [1.13, 0.5, 3.4, 1, 1, 1], [-1.13, 0.5, -3.1, 1, 1, 1], [1.13, 0.5, -3.1, 1, 1, 1]] },
    { geo: B(), mat: () => new THREE.MeshBasicMaterial({ color: 0xffa324 }), parts: [[0, 2.92, 5.52, 1.6, 0.22, 0.04]] },
    { geo: B(), mat: () => new THREE.MeshStandardMaterial({ color: 0x9aa0a6, roughness: 0.5, metalness: 0.4 }), parts: [[0, 0.42, 5.52, 2.45, 0.28, 0.08], [0, 0.42, -5.52, 2.45, 0.28, 0.08]] },
  ];
})();
function parkedBus(list, p, ang) { list.push({ x: p.x, z: p.z, ang }); addOBox(p.x, p.z, 1.3, 5.6, ang, 'bus'); }
function buildParkedBuses(g, list, color) {
  if (!list.length) return;
  const m4 = new THREE.Matrix4(), part = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), col = new THREE.Color(color);
  for (const P of PB_PARTS) {
    const n = list.length * P.parts.length, im = new THREE.InstancedMesh(P.geo, P.mat(), n);
    let i = 0;
    for (const b of list) {
      q.setFromAxisAngle(up, b.ang); m4.compose(new THREE.Vector3(b.x, 0, b.z), q, new THREE.Vector3(1, 1, 1));
      for (const [x, y, z, sx, sy, sz] of P.parts) { part.compose(new THREE.Vector3(x, y, z), new THREE.Quaternion(), new THREE.Vector3(sx, sy, sz)); im.setMatrixAt(i, m4.clone().multiply(part)); if (P.color) im.setColorAt(i, col); i++; }
    }
    im.castShadow = P.color || false; im.computeBoundingSphere(); g.add(im);
  }
}
function buildDepot(scene, e, s, side, name, color) {
  const M = mats(), g = new THREE.Group();
  const F = frame(e, s, side), ang = e.heading;
  const off = e.hw + 3 + 30;
  const C = F.at(0, off);
  flat(g, M.asphalt, C, 0.03, 56, 84, ang);
  flat(g, M.concrete, F.at(-30, e.hw + 2), 0.025, 8, 7, ang); // 출입구
  // 주차 칸 (버스 2줄 × 6대)
  const rows = [off - 10, off + 14];
  let k = 0; const pbl = [];
  for (const v of rows) for (let i = 0; i < 6; i++) {
    const u = -16 + i * 6.5;
    flat(g, M.line, F.at(u - 3.25, v), 0.05, 13, 0.15, ang);
    if ((k++ * 7) % 10 < 7) parkedBus(pbl, F.at(u, v), ang + Math.PI / 2);
  }
  buildParkedBuses(g, pbl, color);
  // 사무실 · 정비동
  const of = F.at(-33, off + 14); put(g, M.white, of, 0, 7.5, 14, 12, ang); put(g, M.glass, F.at(-33, off + 7.9), 1.2, 6.5, 0.1, 10, ang);
  addOBox(of.x, of.z, 7, 6, ang, 'bld');
  const gr = F.at(32, off + 8); put(g, M.concrete, gr, 0, 8.5, 22, 18, ang); put(g, M.dark, F.at(32, off - 1.05), 0, 6, 0.2, 14, ang);
  addOBox(gr.x, gr.z, 11, 9, ang, 'bld');
  // 울타리 (도로 쪽은 출입구만 비움)
  put(g, M.fence, F.at(0, off + 28), 0, 2, 0.12, 84, ang);
  put(g, M.fence, F.at(6, off - 28), 0, 2, 0.12, 72, ang);
  for (const u of [-42, 42]) put(g, M.fence, F.at(u, off), 0, 2, 56, 0.12, ang);
  // 간판
  const sp = F.at(-24, e.hw + 4); put(g, M.dark, sp, 0, 6.2, 0.4, 0.4, ang); addOBox(sp.x, sp.z, 0.3, 0.3, ang, 'pole');
  const sm = new THREE.Mesh(PLANE, signTex([[name, 0.36], ['시내버스 차고지 · 관계자 외 출입금지', 0.18]], color, 512, 150));
  sm.position.set(sp.x, 5.4, sp.z); sm.scale.set(5.2, 1.5, 1); sm.rotation.y = ang + Math.PI / 2; g.add(sm);
  scene.add(g);
  const pts = [F.at(-42, off - 28), F.at(42, off + 28)];
  // 출발 자리: 두 줄 주차 칸 사이 통로, 출입구(도로 쪽) 방향을 보고
  const sp0 = F.at(14, off + 2), sp1 = F.at(-24, off + 2);
  const spawn = { x: sp0.x, z: sp0.z, h: Math.atan2(sp1.x - sp0.x, sp1.z - sp0.z) };
  return { C, zone: { type: 'depot', name, spawn, x0: Math.min(pts[0].x, pts[1].x), x1: Math.max(pts[0].x, pts[1].x), z0: Math.min(pts[0].z, pts[1].z), z1: Math.max(pts[0].z, pts[1].z) } };
}

/**
 * opts: { edges, scene, free(x,z), mark(cx,cz,hx,hz,ang), gasEvery, maxGas, depots: [{name,color}], avoid: [{x,z}], landmark(name,x,z,r,extra) }
 */
export function placeFacilities(o) {
  const out = { gas: 0, depot: 0 };
  const cand = o.edges.filter((e) => !e.elevated && !e.ramp && !e.tunnel && !e.bridge && e.kind === 'city' && e.len > 70 && (e.ca || 0) + (e.cb || 0) < e.len - 60 && (e.n >= 2 || e.osm <= 3));
  // 결정적인 순서 (매번 같은 곳)
  cand.sort((a, b) => (a.a.x * 7.13 + a.a.z * 3.71) % 97 - (b.a.x * 7.13 + b.a.z * 3.71) % 97);
  const used = (o.avoid || []).slice();
  const far = (p, d) => used.every((q) => Math.hypot(q.x - p.x, q.z - p.z) > d);
  const tryPlace = (e, hw, hl, offC, fn) => {
    for (const side of [1, -1]) {
      if (e.oneway && side === -1) continue;
      for (const s of [e.len / 2, e.len * 0.35, e.len * 0.65]) {
        if (s < (e.ca || 0) + hl + 4 || s > e.len - (e.cb || 0) - hl - 4) continue;
        const F = frame(e, s, side), c = F.at(0, e.hw + 3 + offC);
        if (!rectFree(o.free, c, e.heading, hw, hl)) continue;
        // 도로에서 가는 길(보도 쪽)도 건물이 없어야
        if (!o.free(...Object.values(F.at(0, e.hw + 2.5)))) continue;
        return fn(e, s, side, c);
      }
    }
    return null;
  };
  // 차고지 먼저 (큰 땅이 필요)
  for (const D of o.depots || []) {
    for (const e of cand) {
      const mid = { x: (e.a.x + e.b.x) / 2, z: (e.a.z + e.b.z) / 2 };
      if (!far(mid, 900) || (D.near && Math.hypot(mid.x - D.near.x, mid.z - D.near.z) > (D.within || 2500))) continue;
      const r = tryPlace(e, 30, 44, 30, (e2, s, side, c) => {
        const b = buildDepot(o.scene, e2, s, side, D.name, D.color);
        o.mark(c.x, c.z, 30, 44, e2.heading);
        W.zones.push(b.zone); o.landmark(D.name, c.x, c.z, 45, { place: 'depot' });
        return c;
      });
      if (r) { used.push(r); out.depot++; break; }
    }
  }
  // 주유소: 큰길을 따라 gasEvery m 마다
  for (const e of cand) {
    if (out.gas >= (o.maxGas || 12)) break;
    const mid = { x: (e.a.x + e.b.x) / 2, z: (e.a.z + e.b.z) / 2 };
    if (!far(mid, o.gasEvery || 1100)) continue;
    const [brand, color] = GAS_BRANDS[(out.gas + Math.round(Math.abs(mid.x))) % GAS_BRANDS.length];
    const nm = `${brand} ${(e.name || '').replace(/\s*\(.*\)/, '').slice(0, 8)}점`.replace(' 점', '점');
    const r = tryPlace(e, 15, 22, 13, (e2, s, side, c) => {
      const b = buildGas(o.scene, e2, s, side, nm, color);
      o.mark(c.x, c.z, 15, 22, e2.heading);
      W.zones.push(b.zone, { ...b.zone, type: 'ev', name: nm + ' 전기차 충전기' });
      return c;
    });
    if (r) { used.push(r); out.gas++; }
  }
  return out;
}

// 다른 도시용: 지도 자료의 건물 · 물 · 도로로 빈 땅 판정
export function freeTesterForRegion(map, roadAt, waterAt) {
  const BG = new Map(), BC = 40;
  for (const bb of map.blds || []) {
    const n = (bb.length - 1) >> 1; if (n < 3) continue;
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (let q = 0; q < n; q++) { const x = bb[1 + q * 2], z = bb[2 + q * 2]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (z < z0) z0 = z; if (z > z1) z1 = z; }
    const r = [x0 - 1, z0 - 1, x1 + 1, z1 + 1];
    for (let i = Math.floor(r[0] / BC); i <= Math.floor(r[2] / BC); i++) for (let j = Math.floor(r[1] / BC); j <= Math.floor(r[3] / BC); j++) { const k = i + ',' + j; let a = BG.get(k); if (!a) BG.set(k, a = []); a.push(r); }
  }
  const marks = [];
  const free = (x, z) => {
    for (const r of BG.get(Math.floor(x / BC) + ',' + Math.floor(z / BC)) || []) if (x > r[0] && x < r[2] && z > r[1] && z < r[3]) return false;
    for (const m of marks) if (Math.abs(x - m.x) < m.r && Math.abs(z - m.z) < m.r) return false;
    if (roadAt(x, z)) return false;
    if (waterAt(x, z)) return false;
    return true;
  };
  const mark = (cx, cz, hx, hz) => marks.push({ x: cx, z: cz, r: Math.max(hx, hz) + 4 });
  // 건물 겹침 제거용으로 칸 정보도 돌려줌 (지역 건물은 칸을 만들 때 그 자리를 건너뜀)
  return { free, mark, marks };
}

// 막다른 길 끝 회차 공간 (둥근 포장) — 차가 돌아 나올 수 있게
export function addTurnarounds(scene, nodes, mat, groundY) {
  const list = nodes.filter((n) => n.edges.length === 1 && !n.edges[0].corr && !n.edges[0].elevated && !n.edges[0].oneway && (n.edges[0].kind === 'city' || n.edges[0].kind === 'alley'));
  if (!list.length) return 0;
  const geo = new THREE.CircleGeometry(1, 20); geo.rotateX(-Math.PI / 2);
  const m = new THREE.InstancedMesh(geo, mat, list.length);
  const M = new THREE.Matrix4(), Q = new THREE.Quaternion(), S = new THREE.Vector3(), P = new THREE.Vector3();
  list.forEach((n, i) => {
    const e = n.edges[0], r = Math.max(5.5, e.hw + 2.8);
    // 길 끝에서 조금 더 나간 자리 (원 가운데)
    const out = e.a === n ? -1 : 1, dx = e.dir.x * out, dz = e.dir.z * out;
    P.set(n.x + dx * (r - e.hw), groundY(n.x, n.z) + 0.035, n.z + dz * (r - e.hw)); S.set(r, 1, r);
    M.compose(P, Q, S); m.setMatrixAt(i, M);
    n.turnaround = r;
  });
  m.receiveShadow = true; m.frustumCulled = false;
  scene.add(m);
  return list.length;
}
