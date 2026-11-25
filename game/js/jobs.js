// 직업 모드: 택시 · 택배 배달 · 운전면허 시험
import * as THREE from 'three';
import { W, groundY } from './world.js';
import { buildPed, animPed, holdPed } from './models.js';
import { clamp, angDiff, won } from './util.js';
import { hasOpt } from './state.js';

// ---------- 공통 ----------
function marker(color, r = 3) {
  const g = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 24, 24, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false }));
  cyl.position.y = 12; g.add(cyl);
  const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.35, r, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.25; g.add(ring);
  const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 12), new THREE.MeshBasicMaterial({ color }));
  cone.rotation.x = Math.PI; cone.position.y = 7; g.add(cone);
  g.userData.cone = cone;
  return g;
}
function bob(m, t) { const c = m.userData.cone; if (c) { c.position.y = 6.5 + Math.sin(t * 3) * 0.7; c.rotation.y = t * 1.5; } }
const R = (a) => a[Math.floor(Math.random() * a.length)];
const fmtT = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

// 목적지로 쓸 만한 장소 (지금 있는 곳에서 dMin~dMax m)
function pickPlace(ctx, x, z, dMin, dMax, avoid = []) {
  const all = ctx.nav.places().filter((p) => !['cross', 'stop', 'fuel', 'park'].includes(p.cat) && !p.hwy && !/주차|톨게이트|IC|나들목|JC/.test(p.name));
  const cand = all.filter((p) => { const d = Math.hypot(p.x - x, p.z - z); return d > dMin && d < dMax && !avoid.includes(p.name); });
  for (let k = 0; k < 12 && cand.length; k++) {
    const p = cand.splice(Math.floor(Math.random() * cand.length), 1)[0];
    const c = ctx.laneNear(p.x, p.z, 140);
    if (c) return { name: p.name, icon: p.icon, x: p.x, z: p.z, curb: c };
  }
  return null;
}
// 승차감: 급가속 · 급제동 · 급회전 · 충돌을 0~100 점으로
class Comfort {
  constructor() { this.v = 100; this.prevV = null; this.cool = 0; this.events = []; }
  step(dt, sim, ctx) {
    if (this.prevV === null) { this.prevV = sim.vl; return; }
    const a = (sim.vl - this.prevV) / Math.max(dt, 1e-3); this.prevV = sim.vl;
    const lat = Math.abs(sim.yawRate || 0) * Math.abs(sim.vl);
    this.cool -= dt;
    if (this.cool > 0) return;
    if (a < -7.5) this.hit(8, '급정거', ctx);
    else if (a > 4.2 && Math.abs(sim.vl) < 12) this.hit(5, '급출발', ctx);
    else if (lat > 6.5) this.hit(6, '급회전', ctx);
  }
  hit(n, why, ctx) { if (this.soft) n = Math.max(1, Math.round(n * this.soft)); this.v = Math.max(0, this.v - n); this.cool = 1.6; this.events.push(why); ctx && ctx.toast(`😣 ${why}! 손님이 불편해해요 (-${n})`, 'warn', 1400); }
  stars() { return Math.max(1, Math.min(5, Math.round(this.v / 20 * 2) / 2)); }
}
const starStr = (s) => '★'.repeat(Math.floor(s)) + (s % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(s));

// ===================== 🚕 택시 =====================
const TAXI_LINES = {
  hail: ['{d}까지 가 주세요!', '{d}요. 빨리 부탁드려요.', '기사님, {d}로 가 주세요.', '{d} 앞에 내려 주세요.'],
  rush: ['늦었어요! {d}까지 {t}분 안에 가 주세요!', '비행기 시간이 빠듯해요. {d}까지 서둘러 주세요!'],
  good: ['감사합니다, 편하게 왔어요!', '운전 잘하시네요 👍', '덕분에 시간 맞췄어요!'],
  bad: ['다음엔 좀 살살 가 주세요...', '멀미 날 뻔했어요 😵', '좀 무서웠어요.'],
};
// 서울 기준 실제 요금 체계 (2023~): 기본 4,800원(1.6km) + 131m마다 100원 + 느릴 때 30초마다 100원, 심야 할증
export function taxiFare(dist, slowT, hour) {
  let f = 4800;
  if (dist > 1600) f += Math.ceil((dist - 1600) / 131) * 100;
  f += Math.floor(slowT / 30) * 100;
  const h = ((hour % 24) + 24) % 24;
  const night = h >= 23 || h < 2 ? 1.4 : h >= 22 || h < 4 ? 1.2 : 1;
  return { fare: Math.round((f * night) / 100) * 100, night };
}
const TAXI_PAY = 60; // 게임 수입 = 미터 요금 × 60 (차값 · 보상 단위에 맞춤)

export class TaxiMission {
  constructor() { this.title = '택시 운행'; this.t = 0; this.done = false; this.state = 'seek'; this.fares = []; this.total = 0; this.goal = 6; }
  start(ctx) {
    this.ctx = ctx;
    this.mk = marker(0xffd43b, 3); ctx.scene.add(this.mk);
    this.light = this.taxiSign(); // 지붕 '빈차' 표시등
    this.next();
    ctx.toast('🚕 택시 운행 시작! 길가에서 손 흔드는 손님(노란 기둥)을 태우세요', 'info', 4500);
  }
  taxiSign() {
    const cv = document.createElement('canvas'); cv.width = 128; cv.height = 48;
    const tex = new THREE.CanvasTexture(cv);
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.3, 0.32), [0, 0, 0, 0, 0, 0].map(() => new THREE.MeshBasicMaterial({ map: tex })));
    this.signCv = cv; this.signTex = tex;
    const sp = this.ctx.P.spec, o = this.ctx.P.obj;
    m.position.set(0, (sp.hei || 1.5) + 0.16, -(sp.len || 4.6) * 0.06);
    if (o && o.group) o.group.add(m);
    this.drawSign('빈차');
    return m;
  }
  drawSign(txt) {
    const c = this.signCv.getContext('2d');
    c.fillStyle = txt === '빈차' ? '#d81b1b' : '#1b8a3a'; c.fillRect(0, 0, 128, 48);
    c.fillStyle = '#fff'; c.font = '900 30px "Noto Sans KR",sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(globalThis.HP_I18N ? HP_I18N.tr(txt) : txt, 64, 25);
    this.signTex.needsUpdate = true;
  }
  next() {
    const ctx = this.ctx, sim = ctx.P.sim;
    this.removePed();
    const from = pickPlace(ctx, sim.x, sim.z, 180, 700) || { name: '길가', x: sim.x, z: sim.z, curb: ctx.laneNear(sim.x + 200, sim.z, 400) };
    if (!from.curb) { ctx.toast('주변에 손님이 없어요. 큰길로 나가 보세요', 'warn'); this.retry = 5; return; }
    const to = pickPlace(ctx, from.curb.x, from.curb.z, 700, 2600, [from.name]);
    if (!to) { this.retry = 5; return; }
    const rush = Math.random() < 0.25;
    this.job = { from, to, rush, limit: rush ? Math.round(to.curb ? Math.hypot(to.curb.x - from.curb.x, to.curb.z - from.curb.z) / 7 + 60 : 240) : 0 };
    // 길가(오른쪽 차로 바깥)에 손님
    const c = from.curb; const rx = Math.cos(c.heading), rz = -Math.sin(c.heading);
    this.pedPos = { x: c.x + rx * 3.2, z: c.z + rz * 3.2, h: c.heading - Math.PI / 2 };
    this.ped = buildPed(Math.random()); holdPed(this.ped, true);
    this.ped.position.set(this.pedPos.x, groundY(this.pedPos.x, this.pedPos.z), this.pedPos.z); this.ped.rotation.y = this.pedPos.h;
    ctx.scene.add(this.ped);
    this.state = 'pickup'; this.stopT = 0; this.drawSign('빈차');
  }
  removePed() { if (this.ped) { this.ctx.scene.remove(this.ped); this.ped = null; } }
  navTarget() {
    if (this.state === 'pickup' && this.job) return { key: 'taxi-p' + this.fares.length, dest: { name: '손님 · ' + this.job.from.name, x: this.job.from.curb.x, z: this.job.from.curb.z, icon: '🙋' } };
    if (this.state === 'ride' && this.job) return { key: 'taxi-r' + this.fares.length, dest: { name: this.job.to.name, x: this.job.to.curb.x, z: this.job.to.curb.z, icon: this.job.to.icon || '📍' } };
    return null;
  }
  onImpact(v) { if (this.state === 'ride' && v > 1.5) this.comfort.hit(v > 4 ? 25 : 12, '충돌', this.ctx); }
  update(dt, ctx) {
    this.t += dt;
    if (this.done) return;
    if (this.retry !== undefined) {
      this.retry -= dt; if (this.retry <= 0) { this.retry = undefined; this.next(); }
      ctx.setMission(`<div class="m-route" style="background:#e0a800;color:#111">🚕</div><div class="m-body"><div class="m-title">${this.title} · ${this.fares.length}/${this.goal}건</div><div class="m-main">다음 손님을 찾는 중...</div><div class="m-stats">오늘 수입 ${won(this.total)}</div></div>`);
      return;
    }
    const sim = ctx.P.sim, J = this.job;
    if (!J) return;
    const tgt = this.state === 'pickup' ? J.from.curb : J.to.curb;
    this.mk.position.set(tgt.x, groundY(tgt.x, tgt.z), tgt.z); bob(this.mk, this.t);
    const d = Math.hypot(sim.x - tgt.x, sim.z - tgt.z);
    const stopped = Math.abs(sim.kmh) < 2 && !ctx.P.onFoot;
    if (this.state === 'pickup') {
      if (this.ped && d < 60) this.ped.rotation.y = Math.atan2(sim.x - this.ped.position.x, sim.z - this.ped.position.z);
      if (d < 11 && stopped) { this.stopT += dt; if (this.stopT > 0.6) this.board(); } else this.stopT = 0;
    } else if (this.state === 'boarding') {
      // 손님이 차 문까지 걸어와요
      this.walkT += dt;
      const p = this.ped, tx = sim.x, tz = sim.z;
      const dx = tx - p.position.x, dz = tz - p.position.z, dd = Math.hypot(dx, dz);
      if (dd > 1.4 && this.walkT < 6) { p.position.x += (dx / dd) * 1.6 * dt; p.position.z += (dz / dd) * 1.6 * dt; p.rotation.y = Math.atan2(dx, dz); animPed(p, this.walkT * 7, true); }
      else this.startRide();
      if (Math.abs(sim.kmh) > 4) { ctx.toast('손님이 아직 안 탔어요! 멈춰 주세요', 'warn', 1500); this.state = 'pickup'; holdPed(p, true); p.position.set(this.pedPos.x, groundY(this.pedPos.x, this.pedPos.z), this.pedPos.z); }
    } else if (this.state === 'ride') {
      this.comfort.step(dt, sim, ctx);
      this.dist += Math.abs(sim.vl) * dt;
      if (Math.abs(sim.kmh) < 15.33) this.slowT += dt;
      this.rideT += dt;
      if (d < 14 && stopped) { this.stopT += dt; if (this.stopT > 0.8) this.dropOff(); } else this.stopT = 0;
      if (J.rush && this.rideT > J.limit && !this.late) { this.late = true; ctx.toast('⏰ 시간을 넘겼어요... 손님이 실망했어요', 'bad', 2500); }
    }
    this.hud(d);
  }
  board() {
    const ctx = this.ctx;
    this.state = 'boarding'; this.walkT = 0; holdPed(this.ped, false);
  }
  startRide() {
    const ctx = this.ctx, J = this.job;
    this.removePed();
    this.state = 'ride'; this.dist = 0; this.slowT = 0; this.rideT = 0; this.stopT = 0; this.late = false; this.comfort = new Comfort(); if (ctx.P && hasOpt(ctx.P.own, 'vent')) this.comfort.soft = 0.75;
    this.drawSign('운행');
    const line = J.rush ? R(TAXI_LINES.rush).replace('{t}', Math.ceil(J.limit / 60)) : R(TAXI_LINES.hail);
    ctx.toast(`🙋 "${line.replace('{d}', J.to.name)}"`, 'info', 4500);
    ctx.say && ctx.say(line.replace('{d}', J.to.name).replace(/[!.]/g, ''));
  }
  dropOff() {
    const ctx = this.ctx, J = this.job;
    const { fare, night } = taxiFare(this.dist, this.slowT, ctx.hour);
    const st = this.comfort.stars() - (this.late ? 1.5 : 0);
    const stars = Math.max(1, st);
    let pay = fare * TAXI_PAY;
    const tip = stars >= 4.5 ? Math.round(pay * (J.rush && !this.late ? 0.35 : 0.15)) : 0;
    if (J.rush && !this.late) pay = Math.round(pay * 1.3);
    ctx.addMoney(pay + tip, `🚕 ${J.to.name} 도착 · 미터 ${fare.toLocaleString()}원${night > 1 ? ' (심야 할증)' : ''}${tip ? ' · 팁 포함' : ''}`);
    ctx.audio.coin();
    ctx.toast(`${starStr(stars)} "${R(stars >= 4 ? TAXI_LINES.good : TAXI_LINES.bad)}"`, stars >= 4 ? 'good' : 'warn', 3500);
    if (ctx.quest) ctx.quest('taxi', 1);
    this.fares.push({ to: J.to.name, fare, pay: pay + tip, stars, dist: this.dist });
    this.total += pay + tip;
    this.job = null; this.state = 'seek'; this.drawSign('빈차');
    if (this.fares.length >= this.goal) return this.finish();
    this.retry = 1.5;
  }
  hud(d) {
    const J = this.job; const ctx = this.ctx;
    if (!J || this.done) return;
    let main, sub = '';
    if (this.state === 'pickup') { main = `손님 태우러 가기: <b>${J.from.name}</b> <span class="m-dist">${Math.round(d)}m</span>`; sub = '손님 옆(10m 안)에 멈추면 타요'; }
    else if (this.state === 'boarding') main = '<b>손님이 타는 중...</b>';
    else {
      const { fare, night } = taxiFare(this.dist, this.slowT, ctx.hour);
      main = `목적지: <b>${J.to.name}</b> <span class="m-dist">${Math.round(d)}m</span>`;
      sub = `🧾 미터 <b style="color:#ffd43b">${fare.toLocaleString()}원</b>${night > 1 ? ` 🌙×${night}` : ''} · 승차감 ${Math.round(this.comfort.v)}${J.rush ? ` · ⏰ ${fmtT(Math.max(0, J.limit - this.rideT))}` : ''}`;
    }
    ctx.setMission(`<div class="m-route" style="background:#e0a800;color:#111">🚕</div><div class="m-body"><div class="m-title">${this.title} · ${this.fares.length}/${this.goal}건</div>
      <div class="m-main">${main}</div><div class="m-sub">${sub}</div><div class="m-stats">오늘 수입 ${won(this.total)}</div></div>`);
  }
  finish() {
    this.done = true;
    const avg = this.fares.reduce((a, f) => a + f.stars, 0) / this.fares.length;
    this.ctx.summary({
      title: '택시 운행 완료!', grade: avg >= 4.6 ? 'S' : avg >= 4 ? 'A' : avg >= 3 ? 'B' : 'C',
      rows: [['운행', this.fares.length + '건'], ['총 거리', (this.fares.reduce((a, f) => a + f.dist, 0) / 1000).toFixed(1) + 'km'], ['평균 별점', avg.toFixed(1) + ' / 5'], ['번 돈', won(this.total)]],
    });
  }
  minimap() { const t = this.navTarget(); return t ? { target: t.dest } : {}; }
  dispose(scene) { scene.remove(this.mk); this.removePed(); if (this.light && this.light.parent) this.light.parent.remove(this.light); }
}

// ===================== 📦 택배 배달 =====================
export class DeliveryMission {
  constructor() { this.title = '택배 배달'; this.t = 0; this.done = false; this.cargo = 100; this.got = []; this.total = 0; }
  start(ctx) {
    this.ctx = ctx;
    const sim = ctx.P.sim;
    this.list = [];
    let px = sim.x, pz = sim.z;
    const n = 5;
    for (let i = 0; i < n; i++) {
      const p = pickPlace(ctx, px, pz, 300, 1300, this.list.map((q) => q.name));
      if (!p) break;
      const c = p.curb, rx = Math.cos(c.heading), rz = -Math.sin(c.heading);
      p.door = { x: c.x + rx * 6.5, z: c.z + rz * 6.5 };
      p.size = R(['소형', '중형', '대형']); p.fragile = Math.random() < 0.3;
      this.list.push(p); px = c.x; pz = c.z;
    }
    if (!this.list.length) { ctx.toast('배달할 곳을 못 찾았어요. 도시 안에서 다시 시작해 주세요', 'bad'); this.done = true; return; }
    this.idx = 0; this.limit = 150 + this.list.length * 150; // 전체 제한 시간
    this.mk = marker(0x8a5cff, 2.6); ctx.scene.add(this.mk);
    this.box = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.5), new THREE.MeshStandardMaterial({ color: 0xb98a55, roughness: 0.9 }));
    ctx.scene.add(this.box);
    ctx.toast(`📦 택배 ${this.list.length}개를 실었어요! 집 앞에 차를 세우고 <b>E로 내려서</b> 문 앞(보라색 기둥)까지 가져다 주세요`, 'info', 6000);
  }
  get cur() { return this.list[this.idx]; }
  navTarget() { const p = this.cur; return p && !this.done ? { key: 'dlv' + this.idx, dest: { name: p.name, x: p.curb.x, z: p.curb.z, icon: '📦' } } : null; }
  onImpact(v) {
    if (v < 1.5) return;
    const k = (v > 4 ? 18 : 8) * (this.cur && this.cur.fragile ? 1.5 : 1);
    this.cargo = Math.max(0, this.cargo - k);
    this.ctx.toast(`📦💥 짐이 흔들렸어요! 상태 ${Math.round(this.cargo)}%`, 'bad', 1600);
  }
  update(dt, ctx) {
    if (this.done) return;
    this.t += dt;
    const P = ctx.P, sim = P.sim, p = this.cur;
    if (!p) return;
    // 급정거 · 급회전도 짐에 안 좋아요
    if (!P.onFoot) {
      if (this.prevV !== undefined) { const a = (sim.vl - this.prevV) / Math.max(dt, 1e-3); const lat = Math.abs(sim.yawRate || 0) * Math.abs(sim.vl); this.rough = (this.rough || 0) - dt; if ((a < -8 || lat > 7) && this.rough <= 0) { this.rough = 1.5; this.cargo = Math.max(0, this.cargo - (p.fragile ? 4 : 2)); } }
      this.prevV = sim.vl;
    }
    const nearCar = Math.hypot(sim.x - p.curb.x, sim.z - p.curb.z);
    const onFootD = P.onFoot ? Math.hypot(P.px - p.door.x, P.pz - p.door.z) : 1e9;
    // 기둥: 차일 때는 길가, 걸을 때는 문 앞
    const m = P.onFoot ? p.door : p.curb;
    this.mk.position.set(m.x, groundY(m.x, m.z), m.z); bob(this.mk, this.t);
    this.mk.scale.setScalar(P.onFoot ? 0.5 : 1);
    // 들고 가는 상자
    this.box.visible = P.onFoot && nearCar < 60;
    if (this.box.visible) this.box.position.set(P.px + Math.sin(P.ph || 0) * 0.4, groundY(P.px, P.pz) + 1.05, P.pz + Math.cos(P.ph || 0) * 0.4);
    if (P.onFoot && onFootD < 2.6) this.deliver();
    const left = this.limit - this.t;
    ctx.setMission(`<div class="m-route" style="background:#7a4ff0">📦</div><div class="m-body"><div class="m-title">${this.title} · ${this.idx}/${this.list.length}개</div>
      <div class="m-main">${P.onFoot ? `문 앞까지 걸어가기 <span class="m-dist">${Math.round(onFootD)}m</span>` : `배달지: <b>${p.name}</b> <span class="m-dist">${Math.round(nearCar)}m</span>`}</div>
      <div class="m-sub">${p.size}${p.fragile ? ' · ⚠️ 깨지기 쉬움' : ''} · 짐 상태 ${Math.round(this.cargo)}% · ⏱️ ${fmtT(Math.max(0, left))}</div>
      <div class="m-stats">${!P.onFoot && nearCar < 25 ? '여기서 멈추고 E로 내려서 걸어가요' : '번 돈 ' + won(this.total)}</div></div>`);
  }
  deliver() {
    const ctx = this.ctx, p = this.cur;
    const base = { 소형: 250000, 중형: 350000, 대형: 500000 }[p.size];
    const late = this.t > this.limit;
    const pay = Math.round(base * (0.4 + 0.6 * this.cargo / 100) * (late ? 0.6 : 1));
    this.total += pay; this.got.push({ name: p.name, pay, cargo: this.cargo });
    ctx.addMoney(pay, `📦 ${p.name} 배달 완료${this.cargo < 70 ? ' (짐이 조금 상했어요)' : ''}`);
    ctx.audio.coin();
    if (ctx.quest) ctx.quest('deliver', 1);
    this.idx++;
    if (this.idx >= this.list.length) return this.finish();
    ctx.toast(`다음 배달지: <b>${this.cur.name}</b> — 차로 돌아가 E로 타세요`, 'info', 3500);
  }
  finish() {
    this.done = true;
    const bonus = this.t < this.limit ? 1000000 : 0;
    if (bonus) this.ctx.addMoney(bonus, '⏱️ 시간 안에 모두 배달!');
    this.ctx.summary({
      title: '택배 배달 완료!', grade: this.cargo > 90 && bonus ? 'S' : this.cargo > 70 ? 'A' : this.cargo > 40 ? 'B' : 'C',
      rows: [['배달', this.got.length + '개'], ['걸린 시간', fmtT(this.t)], ['짐 상태', Math.round(this.cargo) + '%'], ['번 돈', won(this.total + bonus)]],
    });
  }
  minimap() { const t = this.navTarget(); return t ? { target: t.dest } : {}; }
  dispose(scene) { if (this.mk) scene.remove(this.mk); if (this.box) scene.remove(this.box); }
}

// ===================== 🪪 운전면허 도로주행 시험 =====================
// 100점에서 감점, 70점 이상 합격. 신호위반 · 중앙선 침범 · 큰 충돌은 바로 실격
export class LicenseMission {
  constructor() { this.title = '운전면허 도로주행 시험'; this.t = 0; this.done = false; this.score = 100; this.log = []; this.fail = null; this.stage = 'ready'; this.cool = {}; }
  start(ctx) {
    this.ctx = ctx;
    const sim = ctx.P.sim;
    ctx.P.engine = false; // 시동부터
    this.dest = pickPlace(ctx, sim.x, sim.z, 1100, 2200);
    if (!this.dest) { ctx.toast('시험 코스를 못 만들었어요. 도시 안에서 다시 시작해 주세요', 'bad'); this.done = true; return; }
    this.mk = marker(0x2ee06a, 3); ctx.scene.add(this.mk);
    this.yawWin = []; this.lastBlink = { dir: 0, t: -99 }; this.wrongT = 0;
    this.say('지금부터 도로주행 시험을 시작합니다. 시동을 걸고 출발하세요.');
    ctx.toast('🪪 감독관: "시동(I)을 걸고, 왼쪽 깜빡이(Z)를 켠 뒤 출발하세요." — 회전·차로 변경 때 깜빡이 필수!', 'info', 7000);
  }
  say(t) { this.ctx.say && this.ctx.say(t); }
  navTarget() { return this.dest && !this.done && this.stage === 'drive' ? { key: 'lic', dest: { name: '시험 종료 지점 · ' + this.dest.name, x: this.dest.curb.x, z: this.dest.curb.z, icon: '🏁' } } : null; }
  deduct(n, why, key) {
    if (this.done || this.fail) return;
    if (key) { if ((this.cool[key] || -99) > this.t - 8) return; this.cool[key] = this.t; }
    this.score -= n; this.log.push([why, -n]);
    this.ctx.toast(`📝 감점 <b>-${n}</b> ${why} (현재 ${this.score}점)`, 'bad', 2200);
    this.ctx.audio.beep && this.ctx.audio.beep();
    if (this.score < 70) this.disq(`점수가 70점 아래로 떨어졌어요 (${this.score}점)`);
  }
  disq(why) {
    if (this.fail || this.done) return;
    this.fail = why; this.log.push([why, '실격']);
    this.say('실격입니다. 시험을 종료합니다.');
    this.finish();
  }
  onEvent(type) {
    if (this.stage !== 'drive') return;
    if (type === 'red') this.disq('🚦 신호위반');
    if (type === 'speed') this.deduct(10, '과속', 'speed');
    if (type === 'buslane') this.deduct(5, '버스전용차로 주행', 'bus');
    if (type === 'crossing') this.disq('🚂 건널목 차단기 무시');
  }
  onImpact(v) { if (this.stage !== 'drive') return; if (v > 3) this.disq('💥 충돌 사고'); else if (v > 1.2) this.deduct(10, '접촉 사고', 'hit'); }
  update(dt, ctx) {
    if (this.done) return;
    this.t += dt;
    const P = ctx.P, sim = P.sim;
    if (P.onFoot) { this.disq('시험 중에 차에서 내렸어요'); return; }
    if (P.blink) this.lastBlink = { dir: P.blink, t: this.t };
    if (this.stage === 'ready') {
      if (P.engine && Math.abs(sim.kmh) > 2) {
        if (this.t - this.lastBlink.t > 8 || this.lastBlink.dir !== -1) this.deduct(5, '출발할 때 왼쪽 깜빡이 안 켬');
        this.stage = 'drive'; this.say(`${this.dest.name}까지 안내에 따라 가세요.`);
      } else if (!P.engine && Math.abs(sim.kmh) > 2) this.deduct(5, '시동 확인 안 함', 'eng');
    } else {
      // 급제동 · 급출발
      if (this.prevV !== undefined) {
        const a = (sim.vl - this.prevV) / Math.max(dt, 1e-3);
        if (a < -8) this.deduct(7, '급제동', 'brk');
        else if (a > 5.2 && Math.abs(sim.vl) < 10) this.deduct(7, '급출발', 'acc');
      }
      this.prevV = sim.vl;
      // 회전 감지 → 깜빡이 확인
      this.yawWin.push([this.t, (sim.yawRate || 0) * dt]);
      while (this.yawWin.length && this.yawWin[0][0] < this.t - 5) this.yawWin.shift();
      const yaw = this.yawWin.reduce((a, w) => a + w[1], 0);
      if (Math.abs(yaw) > 1.15 && Math.abs(sim.kmh) > 4) {
        const dir = yaw > 0 ? -1 : 1; // 왼쪽으로 돌면 +yaw (헤딩 증가)
        if (this.t - this.lastBlink.t > 7 || this.lastBlink.dir !== dir) this.deduct(5, dir < 0 ? '좌회전 때 깜빡이 안 켬' : '우회전 때 깜빡이 안 켬', 'turn');
        this.yawWin.length = 0;
      }
      // 중앙선 침범 · 역주행 (양방향 도로에서 반대로)
      const r = ctx.road;
      if (r && r.link && !r.edge.oneway && Math.abs(sim.kmh) > 5 && Math.abs(angDiff(sim.heading, r.link.heading)) > 2.2) this.wrongT += dt; else this.wrongT = Math.max(0, this.wrongT - dt);
      if (this.wrongT > 1.2) this.disq('🟨 중앙선 침범');
      // 도착
      const d = Math.hypot(sim.x - this.dest.curb.x, sim.z - this.dest.curb.z);
      this.mk.position.set(this.dest.curb.x, groundY(this.dest.curb.x, this.dest.curb.z), this.dest.curb.z); bob(this.mk, this.t);
      if (d < 14 && Math.abs(sim.kmh) < 1 && (P.park || ctx.input.handbrake)) this.finish();
      if (this.t > 900) this.disq('시간 초과 (15분)');
    }
    const dd = this.dest ? Math.hypot(sim.x - this.dest.curb.x, sim.z - this.dest.curb.z) : 0;
    ctx.setMission(`<div class="m-route" style="background:#1e6e3a">🪪</div><div class="m-body"><div class="m-title">${this.title}</div>
      <div class="m-main">${this.stage === 'ready' ? '<b>시동(I) → 왼쪽 깜빡이(Z) → 출발</b>' : `종료 지점: <b>${this.dest.name}</b> <span class="m-dist">${Math.round(dd)}m</span>`}</div>
      <div class="m-sub">점수 <b style="color:${this.score >= 80 ? '#2ee06a' : '#ffb020'}">${this.score}</b> / 100 · 70점 이상 합격</div>
      <div class="m-stats">${this.stage === 'drive' && dd < 30 ? '종료 지점에 멈추고 사이드 브레이크(Space)' : '⏱️ ' + fmtT(this.t)}</div></div>`);
  }
  finish() {
    this.done = true;
    const ctx = this.ctx;
    const pass = !this.fail && this.score >= 70;
    if (pass) {
      ctx.save.license = ctx.save.license || { at: Date.now(), score: this.score };
      ctx.addMoney(3000000, '🪪 운전면허 합격!');
      this.say('합격입니다. 축하합니다.');
    }
    const rows = [['결과', pass ? '합격 🎉' : '불합격'], ['점수', this.fail ? '실격' : this.score + '점'], ['시간', fmtT(this.t)]];
    for (const [w, n] of this.log.slice(0, 6)) rows.push([w, String(n)]);
    ctx.summary({ title: pass ? '운전면허 합격!' : '운전면허 불합격', grade: pass ? (this.score >= 95 ? 'S' : this.score >= 85 ? 'A' : 'B') : 'F', rows });
  }
  minimap() { return this.dest ? { target: { x: this.dest.curb.x, z: this.dest.curb.z } } : {}; }
  dispose(scene) { if (this.mk) scene.remove(this.mk); }
}
export { marker, bob, pickPlace, Comfort };
