// 🚑 긴급 출동 (구급차): 사이렌을 켜고 신고 장소로 → 환자를 태워 → 가까운 병원까지. 앞차들이 길을 비켜줘요
import * as THREE from 'three';
import { groundY } from './world.js';
import { buildPed, holdPed } from './models.js';
import { won } from './util.js';
import { marker, bob, pickPlace, Comfort } from './jobs.js';

const CALLS = ['🤕 넘어져서 다친 할머니', '😮‍💨 숨쉬기 힘든 아저씨', '🤒 열이 많이 나는 어린이', '🩹 자전거 타다 다친 학생', '💔 가슴이 아프신 할아버지'];
const fmtT = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

export class EmergencyMission {
  constructor() { this.title = '긴급 출동 🚑'; this.t = 0; this.done = false; this.goal = 3; this.calls = []; this.total = 0; this.state = 'idle'; }
  start(ctx) {
    this.ctx = ctx;
    this.mk = marker(0xff3b3b, 3); ctx.scene.add(this.mk);
    this.addLights();
    this.siren = true;
    this.next();
    ctx.toast('🚑 긴급 출동! 사이렌이 켜지면 앞차들이 길을 비켜줘요. 신고 장소(빨간 기둥)로 가세요', 'info', 5000);
  }
  // 지붕 경광등 (빨강 · 파랑 번갈아) + 옆면 빨간 띠
  addLights() {
    const P = this.ctx.P, sp = P.spec, o = P.obj;
    const g = new THREE.Group();
    this.lr = new THREE.MeshBasicMaterial({ color: 0xff2020 }); this.lb = new THREE.MeshBasicMaterial({ color: 0x2050ff });
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.12, 0.34), new THREE.MeshStandardMaterial({ color: 0x222222 }));
    g.add(base);
    const a = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.3), this.lr); a.position.set(0.33, 0.12, 0); g.add(a);
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 0.3), this.lb); b.position.set(-0.33, 0.12, 0); g.add(b);
    g.position.set(0, (sp.hei || 1.9) + 0.08, (sp.len || 5) * 0.3);
    const stripeM = new THREE.MeshBasicMaterial({ color: 0xd81b1b });
    for (const s of [1, -1]) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, (sp.len || 5) * 0.86), stripeM); st.position.set(s * ((sp.wid || 1.95) / 2 + 0.012), (sp.hei || 1.9) * 0.45, 0); o.group.add(st); (this.extra = this.extra || []).push(st); }
    const cross = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), new THREE.MeshBasicMaterial({ map: crossTex(), transparent: true }));
    cross.rotation.x = -Math.PI / 2; cross.position.set(0, (sp.hei || 1.9) + 0.02, -(sp.len || 5) * 0.15); o.group.add(cross); this.extra.push(cross);
    o.group.add(g); this.bar = g;
  }
  next() {
    const ctx = this.ctx, sim = ctx.P.sim;
    const from = pickPlace(ctx, sim.x, sim.z, 450, 1400);
    if (!from) { this.retry = 4; return; }
    const hos = ctx.nav.places().filter((p) => p.cat === 'hospital').map((p) => ({ p, d: Math.hypot(p.x - from.x, p.z - from.z) })).filter((o) => o.d > 400).sort((a, b) => a.d - b.d);
    let to = null;
    for (const { p } of hos.slice(0, 6)) { const c = ctx.laneNear(p.x, p.z, 140); if (c) { to = { name: p.name, x: p.x, z: p.z, curb: c, icon: '🏥' }; break; } }
    if (!to) { const q = pickPlace(ctx, from.curb.x, from.curb.z, 600, 2000, [from.name]); if (q) to = { ...q, name: '응급의료센터 (' + q.name + ' 근처)', icon: '🏥' }; }
    if (!to) { this.retry = 4; return; }
    const dist = Math.hypot(from.curb.x - sim.x, from.curb.z - sim.z);
    this.job = { from, to, who: CALLS[Math.floor(Math.random() * CALLS.length)], limit: Math.round(dist / 8 + 45), t: 0 };
    const c = from.curb, rx = Math.cos(c.heading), rz = -Math.sin(c.heading);
    this.ped = buildPed(Math.random()); holdPed(this.ped, false);
    this.ped.position.set(c.x + rx * 3.4, groundY(c.x, c.z) + 0.25, c.z + rz * 3.4); this.ped.rotation.set(-Math.PI / 2, 0, c.heading);
    ctx.scene.add(this.ped);
    this.state = 'go'; this.stopT = 0;
    ctx.toast(`📞 119 신고: ${this.job.who} — <b>${from.name}</b>`, 'warn', 4500);
    ctx.say && ctx.say(`신고 접수. ${from.name}로 출동하세요`);
  }
  navTarget() {
    const J = this.job; if (!J || this.done) return null;
    if (this.state === 'go' || this.state === 'load') return { key: 'ems-g' + this.calls.length, dest: { name: '신고 장소 · ' + J.from.name, x: J.from.curb.x, z: J.from.curb.z, icon: '🚨' } };
    if (this.state === 'carry') return { key: 'ems-h' + this.calls.length, dest: { name: J.to.name, x: J.to.curb.x, z: J.to.curb.z, icon: '🏥' } };
    return null;
  }
  onImpact(v) { if (this.state === 'carry' && v > 1.5) this.comfort.hit(v > 4 ? 25 : 12, '충돌', this.ctx); }
  update(dt, ctx) {
    this.t += dt;
    const sim = ctx.P.sim;
    // 사이렌 · 경광등
    const on = this.siren && !this.done && (this.state === 'go' || this.state === 'carry');
    globalThis.__RK_SIREN = on ? { x: sim.x, z: sim.z, fx: Math.sin(sim.heading), fz: Math.cos(sim.heading) } : null;
    ctx.sirenOn = on;
    if (this.bar) { const f = Math.floor(this.t * 5) % 2; this.lr.color.setHex(on ? (f ? 0xff2020 : 0x330000) : 0x550000); this.lb.color.setHex(on ? (f ? 0x000833 : 0x2050ff) : 0x000a44); }
    this.sT = (this.sT || 0) - dt;
    if (on && this.sT <= 0 && ctx.audio.tone) { this.sT = 1.0; ctx.audio.tone(650, 0.48, 'triangle', 0.05); ctx.audio.tone(900, 0.48, 'triangle', 0.05, 0.5); }
    if (this.done) return;
    if (this.retry !== undefined) { this.retry -= dt; if (this.retry <= 0) { this.retry = undefined; this.next(); } this.hud(0); return; }
    const J = this.job; if (!J) return;
    J.t += dt;
    const tgt = this.state === 'carry' ? J.to.curb : J.from.curb;
    this.mk.position.set(tgt.x, groundY(tgt.x, tgt.z), tgt.z); bob(this.mk, this.t);
    const d = Math.hypot(sim.x - tgt.x, sim.z - tgt.z);
    const stopped = Math.abs(sim.kmh) < 2 && !ctx.P.onFoot;
    if (this.state === 'go') {
      if (d < 13 && stopped) { this.stopT += dt; if (this.stopT > 0.6) { this.state = 'load'; this.loadT = 0; this.arriveT = J.t; ctx.toast('🧑‍⚕️ 구급대원이 환자를 들것에 옮기고 있어요... 멈춰 있어요', 'info', 3000); } } else this.stopT = 0;
    } else if (this.state === 'load') {
      this.loadT += dt;
      if (Math.abs(sim.kmh) > 3) { this.state = 'go'; ctx.toast('아직 환자가 안 탔어요! 멈춰 주세요', 'warn', 1500); }
      else if (this.loadT > 3.5) { ctx.scene.remove(this.ped); this.ped = null; this.state = 'carry'; this.comfort = new Comfort(); this.carryT = 0; ctx.toast(`🏥 환자를 태웠어요! <b>${J.to.name}</b>까지 조심히, 빠르게!`, 'good', 3500); ctx.say && ctx.say(`${J.to.name}로 이송합니다`); }
    } else if (this.state === 'carry') {
      this.comfort.step(dt, sim, ctx);
      this.carryT += dt;
      if (d < 15 && stopped) { this.stopT += dt; if (this.stopT > 0.8) this.arrive(); } else this.stopT = 0;
    }
    this.hud(d);
  }
  arrive() {
    const ctx = this.ctx, J = this.job;
    const fast = this.arriveT <= J.limit;
    const care = this.comfort.v;
    const pay = 600000 + (fast ? 400000 : 0) + Math.round(care * 4000);
    ctx.addMoney(pay, `🏥 이송 완료 · ${fast ? '⚡ 빠른 출동' : '출동'} · 환자 안정도 ${Math.round(care)}`);
    ctx.audio.coin();
    ctx.toast(care > 75 ? '👨‍⚕️ "덕분에 무사해요. 고맙습니다!"' : '👨‍⚕️ "도착했어요... 운전이 좀 거칠었어요"', care > 75 ? 'good' : 'warn', 3500);
    this.calls.push({ to: J.to.name, t: this.arriveT, fast, care, pay });
    this.total += pay; this.job = null; this.state = 'idle';
    if (this.calls.length >= this.goal) return this.finish();
    this.retry = 2;
  }
  hud(d) {
    const J = this.job, ctx = this.ctx;
    let main = '<b>다음 신고를 기다리는 중...</b>', sub = '';
    if (J) {
      if (this.state === 'go') { const left = J.limit - J.t; main = `🚨 출동: <b>${J.from.name}</b> <span class="m-dist">${Math.round(d)}m</span>`; sub = `${J.who} · 골든타임 <b style="color:${left > 20 ? '#2ee06a' : '#ff6b5a'}">${fmtT(Math.max(0, left))}</b>`; }
      else if (this.state === 'load') main = '<b>🧑‍⚕️ 환자를 태우는 중...</b>';
      else if (this.state === 'carry') { main = `🏥 이송: <b>${J.to.name}</b> <span class="m-dist">${Math.round(d)}m</span>`; sub = `환자 안정도 <b>${Math.round(this.comfort.v)}</b> · 급정거 · 급회전 조심`; }
    }
    ctx.setMission(`<div class="m-route" style="background:#d81b1b">🚑</div><div class="m-body"><div class="m-title">${this.title} · ${this.calls.length}/${this.goal}건</div>
      <div class="m-main">${main}</div><div class="m-sub">${sub}</div><div class="m-stats">📣 사이렌 ${this.siren ? '켜짐 (앞차가 비켜요)' : '꺼짐'} · 오늘 ${won(this.total)}</div></div>`);
  }
  finish() {
    this.done = true;
    const fast = this.calls.filter((c) => c.fast).length, care = this.calls.reduce((a, c) => a + c.care, 0) / this.calls.length;
    this.ctx.summary({
      title: '긴급 출동 완료!', grade: fast === this.calls.length && care > 80 ? 'S' : fast >= 2 ? 'A' : 'B', mode: 'ems',
      rows: [['이송', this.calls.length + '명'], ['골든타임 안에 도착', `${fast}번`], ['평균 환자 안정도', Math.round(care) + ''], ['번 돈', won(this.total)]],
    });
  }
  minimap() { const t = this.navTarget(); return t ? { target: t.dest } : {}; }
  dispose(scene) {
    globalThis.__RK_SIREN = null;
    scene.remove(this.mk); if (this.ped) scene.remove(this.ped);
    if (this.bar && this.bar.parent) this.bar.parent.remove(this.bar);
    for (const e of this.extra || []) if (e.parent) e.parent.remove(e);
  }
}
function crossTex() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#d81b1b'; g.fillRect(24, 6, 16, 52); g.fillRect(6, 24, 52, 16);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
