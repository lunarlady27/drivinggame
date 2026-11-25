// 🎤 무대 시연 모드 — 버튼 하나로 자율주행 · 카메라 · 시간/날씨가 바뀌며 큰 자막과 함께 자동으로 보여줘요 (장기자랑 · 발표용)
import * as THREE from 'three';

const SCENES = [
  { t: 10, veh: 'car', hour: 17.4, weather: 'clear', cam: 'orbit', cap: ['한판 드라이브', '실제 지도로 만든 3D 운전 게임'] },
  { t: 13, cam: 'chase', cap: ['🤖 자율주행', '신호를 보고 멈추고, 길을 따라 스스로 달려요'] },
  { t: 14, cam: 'driver', cap: ['🚗 운전석', '진짜 차처럼 계기판과 내비 지도가 움직여요'] },
  { t: 12, cam: 'driver', bca: true, hour: 14.5, cap: ['🛡️ 후측방 경고', '옆 뒤에 차가 오면 사이드미러에 주황 경고등이 켜져요'] },
  { t: 11, cam: 'drone', cap: ['🏙️ 하늘에서 본 도시', '도로와 흰 아파트가 실제 지도 그대로예요'] },
  { t: 13, hour: 21.3, weather: 'rain', lights: true, cam: 'low', cap: ['🌧️ 밤 · 비', '전조등을 켜고 와이퍼가 움직여요'] },
  { t: 13, veh: 'ems', hour: 16.2, weather: 'clear', cam: 'chase', cap: ['🚑 구급차 출동', '사이렌을 켜면 앞차들이 옆으로 비켜 줘요'] },
  { t: 10, veh: 'bus', depot: true, hour: 8.6, weather: 'clear', cam: 'high', cap: ['🏢 버스 차고지', '버스 기사는 아침마다 차고지에서 출발해요'] },
  { t: 14, veh: 'bus', hour: 9.2, weather: 'clear', cam: 'driver', cap: ['🚌 버스 기사 체험', '정류장마다 손님을 태우고, 앞차·뒷차 간격도 봐요'] },
  { t: 12, cam: 'chase', bis: true, cap: ['📍 버스 위치 알림(BIS)', '같은 노선 버스가 지금 어디 있는지 지도에 보여요'] },
  { t: 10, cam: 'orbit', cap: ['👏 감사합니다!', '직접 운전해 보고 싶은 친구는 손을 들어 주세요'] },
];
const DEMO_CAR = { uid: -2, id: 'hb_grandia', color: '#f2f2f0', wheel: 'std', plate: '12가 3456', tune: { engine: 0, brake: 0, handling: 0 }, fuel: 100, trim: 0, opts: ['wide', 'ambient', 'hud', 'hda2'], temp: true };
const _p = new THREE.Vector3(), _l = new THREE.Vector3();

export class Stage {
  constructor(api) {
    this.api = api; this.on = false; this.i = 0; this.t = 0; this.camT = 0; this.engageT = 0;
    const el = document.createElement('div'); el.id = 'stage'; el.className = 'hidden';
    el.innerHTML = `<div class="sb top"></div><div class="sb bot"></div>
      <div class="cap"><b></b><span></span></div>
      <div class="dots"></div>
      <button class="sx" title="끝내기 (Esc)">✕ 끝내기</button>
      <button class="sprev" title="이전 장면 (←)">◀ 이전</button>
      <button class="spause" title="멈춤 · 계속 (스페이스)">⏸ 멈춤</button>
      <button class="snext" title="다음 장면 (→)">다음 ▶</button>
      <div class="phint">← → 장면 넘기기 · 스페이스 멈춤 · Esc 끝내기</div>`;
    document.body.appendChild(el);
    this.el = el;
    el.querySelector('.sx').onclick = () => this.stop();
    el.querySelector('.snext').onclick = () => this.next();
    el.querySelector('.sprev').onclick = () => this.prev();
    el.querySelector('.spause').onclick = () => this.pause();
    el.querySelector('.dots').innerHTML = SCENES.map(() => '<i></i>').join('');
    if (DEMO_CAR.id && api.STORE) DEMO_CAR.plate = '12가 3456';
  }
  get scene() { return SCENES[this.i]; }
  start() {
    const A = this.api;
    if (this.on) return;
    this.on = true; this.i = -1; this.cur = null; this.pause(false);
    this.saved = { timeSpeed: A.S.settings.timeSpeed };
    A.S.settings.timeSpeed = 0;
    document.body.classList.add('stage');
    this.el.classList.remove('hidden');
    A.audio.init && A.audio.init();
    this.next();
  }
  stop() {
    const A = this.api;
    if (!this.on) return;
    A.G.bcaDemo = false; if (A.setBis) A.setBis(false); if (A.setMirrors) A.setMirrors(!!A.S.settings.mirrors); this.pause(false);
    this.on = false;
    A.S.settings.timeSpeed = this.saved ? this.saved.timeSpeed : 30;
    document.body.classList.remove('stage');
    this.el.classList.add('hidden');
    A.autod.off();
    A.G.demo = null;
    A.toMenu();
  }
  next() { this.go(this.i + 1); }
  prev() { this.go(this.i - 1); }
  // 발표자가 설명하는 동안 장면 멈추기 (스페이스)
  pause(v) { this.paused = v === undefined ? !this.paused : v; this.el.classList.toggle('paused', this.paused); }
  go(i) {
    const A = this.api;
    this.i = (i + SCENES.length) % SCENES.length;
    this.t = 0; this.camT = 0; this.engageT = 0;
    const S2 = this.scene;
    // 이 장면에 필요한 차 (뒤로 갈 때도 맞춰 줌)
    let need = 'car'; for (let k = this.i; k >= 0; k--) if (SCENES[k].veh) { need = SCENES[k].veh; break; }
    const key = need + (S2.depot ? ':depot' : '');
    if (S2.veh || this.i === 0 || key !== this.cur) {
      this.cur = key;
      A.autod.off();
      if (need === 'bus') A.startMode('bus', { bus: 'company', noDepot: !S2.depot, forceDepot: !!S2.depot });
      else if (need === 'ems') A.startMode('ems');
      else { A.startMode('free'); A.setPlayer(DEMO_CAR); }
      A.G.demo = this;
    }
    if (A.setBis) A.setBis(!!S2.bis);
    const env = A.env;
    if (S2.hour !== undefined) env.hour = S2.hour;
    if (S2.weather) env.setWeather(S2.weather);
    const P = A.G.P;
    if (P) {
      P.lights = !!S2.lights || (env.hour > 19 || env.hour < 6);
      P.wiper = S2.weather === 'rain' ? 2 : 0;
      P.engine = true; P.park = false; P.gearMode = 'auto';
    }
    A.G.camMode = S2.cam === 'driver' ? 1 : 0;
    A.G.bcaDemo = !!S2.bca; if (S2.bca && A.setMirrors) A.setMirrors(true);
    if (P) P.blink = 0;
    A.G.snap = true;
    const [b, s] = S2.cap;
    const cap = this.el.querySelector('.cap');
    cap.classList.remove('in'); void cap.offsetWidth;
    cap.querySelector('b').textContent = A.tr(b); cap.querySelector('span').textContent = A.tr(s);
    cap.classList.toggle('hi', S2.cam === 'driver');
    cap.classList.add('in');
    [...this.el.querySelectorAll('.dots i')].forEach((d, k) => d.classList.toggle('on', k === this.i));
    try { A.audio.beep(); } catch (e) { /* 무시 */ }
  }
  // 매 프레임 (게임 중일 때)
  update(dt) {
    if (!this.on) return;
    const A = this.api, P = A.G.P;
    if (A.G.state !== 'play' || !P) return;
    this.t += dt; this.camT += dt;
    // 자율주행이 꺼져 있으면 다시 켜기 (도로 위에서)
    if (this.scene.depot) { if (this.t > this.scene.t && !this.paused) this.next(); return; }
    if (this.scene.bca) P.blink = this.t > 5 ? -1 : 0;
    if (!A.autod.on) {
      this.engageT -= dt;
      if (this.engageT <= 0) {
        this.engageT = 1;
        const r = A.roadInfoAt(P.sim.x, P.sim.z, 'surface');
        if (r && r.link) { P.engine = true; P.park = false; A.autod.engage(2, P.sim, r); A.autod.autoSpd = true; if (r.limit) A.autod.set = Math.min(r.limit, P.spec.type === 'bus' ? 50 : 60); }
      }
    }
    if (this.t > this.scene.t && !this.paused) this.next();
  }
  // 시연용 카메라 (true면 기본 카메라 대신 이걸 써요)
  camera(dt, camera) {
    if (!this.on) return false;
    const S2 = this.scene, P = this.api.G.P;
    if (!P || S2.cam === 'driver' || S2.cam === 'chase') return false;
    const sim = P.sim, isBus = P.spec.type === 'bus';
    const fx = Math.sin(sim.heading), fz = Math.cos(sim.heading), rx = fz, rz = -fx;
    const y = P.y || 0, t = this.camT;
    let k = Math.min(1, dt * 2.5);
    if (S2.cam === 'orbit') {
      const a = sim.heading + Math.PI * 0.8 + t * 0.22, R = isBus ? 17 : 8.5;
      _p.set(sim.x + Math.sin(a) * R, y + (isBus ? 5 : 2.4) + Math.sin(t * 0.3) * 0.4, sim.z + Math.cos(a) * R);
      _l.set(sim.x, y + (isBus ? 1.8 : 0.9), sim.z);
    } else if (S2.cam === 'drone') {
      const h = Math.max(38, 95 - t * 5.5), back = Math.max(25, 70 - t * 4);
      _p.set(sim.x - fx * back, y + h, sim.z - fz * back);
      _l.set(sim.x + fx * 30, y, sim.z + fz * 30);
      k = Math.min(1, dt * 1.5);
    } else if (S2.cam === 'high') {
      // 차고지 전체가 보이게 뒤쪽 위에서 천천히 내려오며
      const h = Math.max(14, 26 - t * 1.2), back = 20 + Math.sin(t * 0.2) * 2;
      _p.set(sim.x - fx * back + rx * 6, y + h, sim.z - fz * back + rz * 6);
      _l.set(sim.x + fx * 8, y + 1.5, sim.z + fz * 8);
      k = Math.min(1, dt * 2);
    } else if (S2.cam === 'low') {
      _p.set(sim.x + fx * 7.5 + rx * 3.2, y + 0.75, sim.z + fz * 7.5 + rz * 3.2);
      _l.set(sim.x - fx * 1.5, y + 0.8, sim.z - fz * 1.5);
      k = Math.min(1, dt * 5);
    }
    if (this.api.G.snap) k = 1;
    camera.position.lerp(_p, k);
    camera.lookAt(_l);
    camera.near = 0.1; camera.fov = S2.cam === 'drone' ? 55 : 50;
    camera.updateProjectionMatrix();
    this.api.G.snap = false;
    if (document.body.dataset.cam !== 'stage') document.body.dataset.cam = 'stage';
    return true;
  }
}
