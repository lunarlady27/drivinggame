// 🚓 경찰 단속: 과속 · 신호위반을 하면 순찰차가 따라와요. 길가에 세우면 범칙금, 도망치면 추격!
import * as THREE from 'three';
import { buildVehicle } from './models.js';
import { BY_ID } from './data.js';
import { won } from './util.js';

const FINES = { speed: 60000, bigspeed: 100000, red: 70000 }; // 실제 승용차 범칙금 수준 (원)
const GAME_K = 5; // 게임 돈 보정

export class Police {
  constructor(api) { this.api = api; this.car = null; this.trail = []; this.cool = 0; this.state = null; }
  // 위반 알림 (main.js checkViolations에서)
  report(kind, sim, limit) {
    const A = this.api;
    if (this.car || this.cool > 0 || !A.allowed()) return;
    const over = limit ? sim.kmh - limit : 0;
    const k = kind === 'red' ? 'red' : over >= 30 ? 'bigspeed' : 'speed';
    const chance = k === 'red' ? 0.45 : k === 'bigspeed' ? 0.6 : 0.25;
    if (Math.random() > chance) { this.cool = 20; return; }
    this.spawn(k);
  }
  spawn(kind) {
    const A = this.api, P = A.P, sim = P.sim;
    // 내 뒤 약 120m 지점 (지나온 길 위)
    const back = this.trail.length > 30 ? this.trail[Math.max(0, this.trail.length - 30)] : { x: sim.x - Math.sin(sim.heading) * 120, z: sim.z - Math.cos(sim.heading) * 120, h: sim.heading };
    const obj = buildVehicle(BY_ID.hb_soren || Object.values(BY_ID).find((s) => s.type === 'car'), { color: '#f2f4f7', plate: '경찰 112', wheel: 'std' });
    // 경광등 막대
    const bar = new THREE.Group();
    const red = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.26), new THREE.MeshBasicMaterial({ color: 0xff2020 }));
    const blue = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.16, 0.26), new THREE.MeshBasicMaterial({ color: 0x2050ff }));
    red.position.x = 0.3; blue.position.x = -0.3; bar.add(red, blue);
    const sp = BY_ID.hb_soren || { hei: 1.45 };
    bar.position.y = (sp.hei || 1.45) + 0.1; obj.group.add(bar);
    // 옆면 파란 띠
    const stripe = new THREE.Mesh(new THREE.BoxGeometry((sp.wid || 1.86) + 0.02, 0.18, (sp.len || 4.9) * 0.82), new THREE.MeshBasicMaterial({ color: 0x1d3f9e }));
    stripe.position.y = 0.72; obj.group.add(stripe);
    const lamp = new THREE.PointLight(0xff2020, 0, 30, 2); lamp.position.y = 2.2; obj.group.add(lamp);
    A.scene.add(obj.group);
    this.car = { obj, red, blue, lamp, x: back.x, z: back.z, h: back.h, v: 0, ti: Math.max(0, this.trail.length - 30), t: 0, kind };
    this.state = 'chase'; this.stopT = 0; this.farT = 0;
    A.toast(`🚓 <b>경찰이 따라와요!</b> ${kind === 'red' ? '신호위반' : '과속'} — 비상등 켜고 길가에 세우세요 (도망치면 더 큰 벌금)`, 'bad', 5000);
    A.say('앞 차량, 오른쪽에 정차하세요.');
  }
  update(dt) {
    const A = this.api;
    this.cool = Math.max(0, this.cool - dt);
    const P = A.P; if (!P) return;
    const sim = P.sim;
    // 내가 지나온 길 기록 (0.4초마다) → 경찰은 이 길을 그대로 따라와요
    this.tt = (this.tt || 0) + dt;
    if (!P.onFoot && this.tt > 0.4) { this.tt = 0; this.trail.push({ x: sim.x, z: sim.z, h: sim.heading }); if (this.trail.length > 600) { this.trail.shift(); if (this.car) this.car.ti = Math.max(0, this.car.ti - 1); } }
    const C = this.car; if (!C) return;
    C.t += dt;
    // 경광등 번쩍
    const ph = Math.floor(C.t * 6) % 2;
    C.red.visible = ph === 0; C.blue.visible = ph === 1; C.lamp.color.set(ph ? 0x2050ff : 0xff2020); C.lamp.intensity = 6;
    this.sirenT = (this.sirenT || 0) - dt;
    if (this.sirenT <= 0 && this.state === 'chase' && A.audio.tone) { this.sirenT = 0.9; A.audio.tone(720, 0.42, 'sawtooth', 0.04); A.audio.tone(980, 0.42, 'sawtooth', 0.04, 0.45); }
    const d = Math.hypot(sim.x - C.x, sim.z - C.z);
    if (this.state === 'chase') {
      // 기록된 길을 따라 이동
      const target = Math.min(C.ti + 1, this.trail.length - 1);
      const tp = this.trail[target] || { x: sim.x, z: sim.z };
      const want = d > 18 ? Math.min(36, Math.abs(sim.vl) + (Math.abs(sim.kmh) < 5 ? 22 : 12)) : Math.max(0, Math.abs(sim.vl) - 1);
      C.v += Math.max(-8 * dt, Math.min(5 * dt, want - C.v));
      let step = C.v * dt;
      while (step > 0) {
        const q = this.trail[Math.min(C.ti + 1, this.trail.length - 1)] || tp;
        const dx = q.x - C.x, dz = q.z - C.z, L = Math.hypot(dx, dz);
        if (L < 0.01 || C.ti >= this.trail.length - 1) break;
        if (step >= L) { C.x = q.x; C.z = q.z; C.h = q.h; C.ti++; step -= L; } else { C.x += (dx / L) * step; C.z += (dz / L) * step; C.h = Math.atan2(dx, dz); step = 0; }
      }
      if (d < 8) { C.x = sim.x - Math.sin(sim.heading) * 9; C.z = sim.z - Math.cos(sim.heading) * 9; C.h = sim.heading; C.v = Math.abs(sim.vl); }
      // 멈추면 단속
      if (d < 45 && Math.abs(sim.kmh) < 3) { this.stopT += dt; if (this.stopT > 2) this.ticket(false); } else this.stopT = Math.max(0, this.stopT - dt * 0.5);
      // 멀리 따돌리면
      if (d > 350) { this.farT += dt; if (this.farT > 8) this.escape(); } else this.farT = 0;
      if (C.t > 120) this.escape();
      A.hint(`🚓 경찰 ${Math.round(d)}m — 길가에 멈추면 단속이 끝나요`);
    } else if (this.state === 'leave') {
      C.v = Math.min(30, C.v + 6 * dt); C.x += Math.sin(C.h) * C.v * dt; C.z += Math.cos(C.h) * C.v * dt;
      this.leaveT -= dt; if (this.leaveT <= 0) this.remove();
    }
    C.obj.group.position.set(C.x, A.groundY(C.x, C.z), C.z); C.obj.group.rotation.y = C.h;
  }
  ticket(caught) {
    const A = this.api, C = this.car;
    const base = FINES[C.kind] * GAME_K * (caught ? 3 : 1) * (C.fled ? 2 : 1);
    A.pay(base, `🚓 범칙금 ${caught ? '(추격 끝에 잡힘)' : ''}`);
    A.toast(`👮 "${C.kind === 'red' ? '신호위반' : '과속'}이에요. 안전 운전하세요." 범칙금 <b>${won(base)}</b>`, 'bad', 4500);
    A.say('안전 운전하세요.');
    this.state = 'leave'; this.leaveT = 6; this.cool = 60;
    // 내 옆을 지나 떠나도록 방향 맞추기
    C.h = A.P.sim.heading; C.x = A.P.sim.x - Math.sin(C.h) * 10 + Math.cos(C.h) * 3; C.z = A.P.sim.z - Math.cos(C.h) * 10 - Math.sin(C.h) * 3;
    if (A.quest) A.quest('police', 1);
  }
  escape() {
    const A = this.api;
    A.toast('🏃 경찰을 따돌렸어요... 다음엔 꼭 안전 운전해요', 'warn', 3500);
    this.remove(); this.cool = 90;
  }
  remove() { if (this.car) { this.api.scene.remove(this.car.obj.group); this.car = null; } this.state = null; }
  get active() { return !!this.car && this.state === 'chase'; }
}
