// 버스 앞차 · 뒷차 간격 (BIS 단말기처럼)
// 1) 같은 노선 버스 간격: 노선 위 위치로 정류장 수 · 분을 계산 (주변에 같은 노선 AI 버스가 있으면 그 버스, 없으면 배차 간격대로 달리는 가상 버스)
// 2) 바로 앞 · 뒤 차량과의 실제 거리 (m)
import { BUS_TYPES } from './data.js';

const V_AVG = 5.6; // 시내버스 평균 운행 속도 (정차 포함, m/s ≈ 20km/h)

function prep(R) {
  if (R._cum) return;
  const cum = new Map(); let acc = 0;
  for (const L of R.links) { if (!cum.has(L.id)) cum.set(L.id, acc); acc += L.len || Math.hypot(L.to.x - L.from.x, L.to.z - L.from.z); }
  R._cum = cum; R._tot = acc;
  R._stopsS = (R.stops || []).map((s) => ({ pos: (cum.get(s.link.id) ?? 0) + (s.s ?? (s.link.len || 0) / 2), st: s })).sort((a, b) => a.pos - b.pos);
  R._stopPos = R._stopsS.map((o) => o.pos);
  R._starts = R.links.map((L) => cum.get(L.id));
}
function projLink(L, x, z) {
  const dx = L.to.x - L.from.x, dz = L.to.z - L.from.z, len = Math.hypot(dx, dz) || 1;
  const t = Math.max(0, Math.min(len, ((x - L.from.x) * dx + (z - L.from.z) * dz) / len));
  const px = L.from.x + (dx / len) * t, pz = L.from.z + (dz / len) * t;
  return { d: Math.hypot(x - px, z - pz), t };
}

export class BusGap {
  constructor(R) {
    this.R = R; prep(R);
    this.hint = 0; this.my = null; this.t = 0;
    const iv = ((BUS_TYPES[R.type] || {}).interval || 12) * 60;
    // 내 노선 앞차 · 뒷차: 배차 간격 그대로 출발 (정시 운행이면 앞 · 뒤 모두 배차 간격)
    this.vf = iv * V_AVG;
    this.vr = iv * V_AVG;
    this.iv = iv;
    this.info = null;
  }
  myPos(x, z) {
    const R = this.R, n = R.links.length;
    let best = null, bd = 1e9, bi = this.hint;
    const span = this.my === null ? n : 14;
    for (let k = -2; k < span; k++) {
      const i = ((this.my === null ? k : this.hint + k) % n + n) % n, L = R.links[i];
      const p = projLink(L, x, z);
      if (p.d < bd) { bd = p.d; best = (R._cum.get(L.id) ?? 0) + p.t; bi = i; }
    }
    this.off = bd > 60;
    if (bd > 60 && this.my !== null) return this.my; // 노선을 잠깐 벗어나면 마지막 위치 유지
    this.hint = bi; return best;
  }
  stopsBetween(a, b) { // a < b (순환이면 b가 tot보다 클 수 있어요)
    const tot = this.R._tot; let c = 0;
    for (const sp of this.R._stopPos) { if (sp > a && sp <= b) c++; if (sp + tot > a && sp + tot <= b) c++; }
    return c;
  }
  update(dt, x, z, traffic, heading) {
    this.t += dt;
    const R = this.R, tot = R._tot;
    const prev = this.my;
    this.my = this.myPos(x, z);
    let dv = prev === null ? 0 : this.my - prev; if (dv < -tot / 2) dv += tot; if (dv > tot / 2) dv -= tot;
    // 가상 버스는 평균 속도로 계속 달려요 → 내가 늦으면 앞차와 멀어지고 뒷차는 따라붙어요
    this.vf += V_AVG * dt - dv; this.vr += dv - V_AVG * dt;
    this.vf = Math.max(30, Math.min(tot * 0.6, this.vf)); this.vr = Math.max(0, Math.min(tot * 0.6, this.vr));
    // 같은 노선 AI 버스가 근처에 있으면 그 버스로 바꿔서 보여줘요
    // 간격은 '내 노선 배차 버스'만으로 계산 (주변 AI 버스는 배차 시간표와 안 맞아서 쓰지 않음)
    let rf = null, rr = null;
    if (traffic && false) for (const a of traffic.cars) {
      if (!a.active || !a.isBus || !a.R || a.R.id !== R.id || !a.link || a.state !== 'road') continue;
      const off = R._cum.get(a.link.id); if (off === undefined) continue;
      const p = off + (a.s || 0);
      let d = p - this.my; if (d < -tot / 2) d += tot; if (d > tot / 2) d -= tot;
      if (d > 5 && (rf === null || d < rf)) rf = d;
      if (d < -5 && (rr === null || -d < rr)) rr = -d;
    }
    const gf = rf ?? this.vf, gr = rr ?? this.vr;
    const status = (g) => (g < this.iv * V_AVG * 0.4 ? 'close' : g > this.iv * V_AVG * 1.6 ? 'far' : 'ok');
    // 바로 앞 · 뒤 차량 (같은 방향, 차로 폭 안)
    let near = null, back = null;
    if (traffic) {
      const fx = Math.sin(heading), fz = Math.cos(heading);
      for (const a of traffic.cars) {
        if (!a.active) continue;
        const dx = a.x - x, dz = a.z - z, lon = dx * fx + dz * fz, lat = Math.abs(dx * fz - dz * fx);
        if (lat > 2.2 || Math.abs(lon) > 150) continue;
        if (a.fx * fx + a.fz * fz < 0.6) continue;
        const gap = Math.abs(lon) - (a.len || 4.5) / 2 - 6;
        if (lon > 0 && (near === null || gap < near)) near = Math.max(0, gap);
        if (lon < 0 && (back === null || gap < back)) back = Math.max(0, gap);
      }
    }
    this.info = {
      front: { m: gf, min: gf / V_AVG / 60, stops: this.stopsBetween(this.my, this.my + gf), real: rf !== null, st: status(gf) },
      rear: { m: gr, min: gr / V_AVG / 60, stops: this.stopsBetween(this.my - gr + tot, this.my + tot), real: rr !== null, st: status(gr) },
      near, back, interval: Math.round(this.iv / 60),
    };
    // 운행 지시 (BIS 단말기 문구): 앞차와 가까우면 천천히, 뒷차가 붙으면 서두르기
    const fm = this.info.front.min, rm = this.info.rear.min, H = this.iv / 60;
    this.info.adv = fm < H * 0.6 ? { k: 'slow', t: `🐢 앞차와 ${fm.toFixed(0)}분 — 천천히 가세요 (배차 ${H.toFixed(0)}분)` }
      : rm < H * 0.6 ? { k: 'hurry', t: `⏩ 뒷차가 ${rm.toFixed(0)}분 뒤까지 왔어요 — 조금 서둘러요` }
      : { k: 'ok', t: `👍 배차 간격 ${H.toFixed(0)}분 · 정상 운행` };
    return this.info;
  }
  // 노선 위 거리 d → 지도 위 점
  pointAt(d) {
    const R = this.R, tot = R._tot; d = ((d % tot) + tot) % tot;
    let lo = 0, hi = R.links.length - 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (R._starts[m] <= d) lo = m; else hi = m - 1; }
    const L = R.links[lo], t = d - R._starts[lo], len = L.len || Math.hypot(L.to.x - L.from.x, L.to.z - L.from.z) || 1;
    const k = Math.max(0, Math.min(1, t / len));
    return { x: L.from.x + (L.to.x - L.from.x) * k, z: L.from.z + (L.to.z - L.from.z) * k, h: Math.atan2(L.to.x - L.from.x, L.to.z - L.from.z) };
  }
  // 이 노선을 달리는 모든 버스 (앞차 · 뒷차 · 그 밖의 배차 버스)
  fleet() {
    const I = this.info; if (!I || this.my === null) return [];
    const R = this.R, tot = R._tot, sp = this.iv * V_AVG, out = [];
    const f0 = this.my + I.front.m, r0 = this.my - I.rear.m;
    out.push({ d: f0, rel: 'front', real: I.front.real, min: I.front.min });
    out.push({ d: r0, rel: 'rear', real: I.rear.real, min: I.rear.min });
    for (let x = f0 + sp, n = 0; x < r0 + tot - sp * 0.5 && n < 30; x += sp, n++) out.push({ d: x, rel: 'other', min: (x - this.my) / V_AVG / 60 });
    return out;
  }
  nextStop() {
    const R = this.R, tot = R._tot;
    for (const o of R._stopsS) if (o.pos > this.my + 3) return { ...o, eta: (o.pos - this.my) / V_AVG / 60 };
    const o = R._stopsS[0]; return o ? { ...o, pos: o.pos + tot, eta: (o.pos + tot - this.my) / V_AVG / 60 } : null;
  }
  html() {
    const I = this.info; if (!I) return '';
    const col = { ok: '#2ee06a', close: '#ff6b5a', far: '#ffb21a' };
    const f = I.front, r = I.rear;
    const tot = Math.max(1, f.m + r.m), me = Math.round((r.m / tot) * 100);
    const d = (v) => (v === null ? '—' : Math.round(v) + 'm');
    return `<div class="m-gap"><span>▲ 앞차 <b style="color:${col[f.st]}">${f.min.toFixed(0)}분</b> ${f.stops}정류장</span><span class="gbar"><i style="left:${me}%"></i></span><span>▼ 뒷차 <b style="color:${col[r.st]}">${r.min.toFixed(0)}분</b> ${r.stops}정류장</span><span class="gsm">앞 차량 ${d(I.near)}</span></div>${I.adv ? `<div class="m-adv ${I.adv.k}">${I.adv.t}</div>` : ''}`;
  }
}
