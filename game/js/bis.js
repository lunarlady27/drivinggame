// 🚏 버스 위치 패널 (BIS) — 노선 지도 위 모든 버스 · 정류장 노선도 · 앞차/뒷차 · 도착 예정
const T = (t) => (globalThis.HP_I18N ? HP_I18N.tr(t) : t);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const V_AVG = 5.6;

export class BisPanel {
  constructor() {
    const el = document.createElement('div'); el.id = 'bis'; el.className = 'hidden';
    el.innerHTML = `<div class="bis-h"><span class="bis-no"></span><b class="bis-name"></b><button class="bis-x" title="닫기">✕</button></div>
      <canvas width="640" height="300"></canvas>
      <div class="bis-sum"></div>
      <div class="bis-list"></div>`;
    document.body.appendChild(el);
    this.el = el; this.cv = el.querySelector('canvas'); this.g = this.cv.getContext('2d');
    this.on = false; this.t = 0; this.R = null;
    el.querySelector('.bis-x').onclick = (e) => { e.stopPropagation(); this.toggle(false); };
  }
  toggle(v) { this.on = v === undefined ? !this.on : v; this.el.classList.toggle('hidden', !this.on); this.t = 0; return this.on; }
  prepRoute(R) {
    if (this.R === R) return;
    this.R = R;
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; const pts = [];
    for (const L of R.links) { pts.push([L.from.x, L.from.z]); x0 = Math.min(x0, L.from.x); x1 = Math.max(x1, L.from.x); z0 = Math.min(z0, L.from.z); z1 = Math.max(z1, L.from.z); }
    this.box = { x0, x1, z0, z1 }; this.pts = pts;
  }
  update(dt, gap, mission, sim) {
    if (!this.on || !gap || !gap.info) return;
    this.t -= dt; if (this.t > 0) return; this.t = 0.4;
    const R = gap.R; this.prepRoute(R);
    const I = gap.info, fl = gap.fleet(), ns = gap.nextStop();
    this.el.querySelector('.bis-no').textContent = R.id; this.el.querySelector('.bis-no').style.background = R.color;
    this.el.querySelector('.bis-name').textContent = `${T(R.name || '')} · ${T('배차')} ${I.interval}${T('분')} · ${T('운행')} ${fl.length + 1}${T('대')}`;
    // ---- 노선 지도 ----
    const g = this.g, W = this.cv.width, H = this.cv.height, B = this.box, pad = 22;
    const sc = Math.min((W - pad * 2) / Math.max(1, B.x1 - B.x0), (H - pad * 2) / Math.max(1, B.z1 - B.z0));
    // 게임 지도와 같은 방향 (x가 클수록 왼쪽 · z가 클수록 위)
    const ox = W / 2 + ((B.x0 + B.x1) / 2) * sc, oy = H / 2 + ((B.z0 + B.z1) / 2) * sc;
    const X = (x) => ox - x * sc, Y = (z) => oy - z * sc;
    g.clearRect(0, 0, W, H); g.fillStyle = '#0f1820'; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(0,0,0,.6)'; g.lineWidth = 9; g.lineJoin = 'round'; g.lineCap = 'round';
    g.beginPath(); this.pts.forEach(([x, z], i) => (i ? g.lineTo(X(x), Y(z)) : g.moveTo(X(x), Y(z)))); if (R.loop) g.closePath(); g.stroke();
    g.strokeStyle = R.color; g.lineWidth = 5; g.stroke();
    for (const o of R._stopsS) { g.fillStyle = o.st === (ns && ns.st) ? '#ffd43b' : '#fff'; g.beginPath(); g.arc(X(o.st.door.x), Y(o.st.door.z), o.st === (ns && ns.st) ? 5 : 3, 0, 7); g.fill(); }
    const busDot = (p, col, r, label) => {
      g.fillStyle = col; g.strokeStyle = '#fff'; g.lineWidth = 2.5;
      g.beginPath(); g.roundRect ? g.roundRect(X(p.x) - r, Y(p.z) - r, r * 2, r * 2, 4) : g.rect(X(p.x) - r, Y(p.z) - r, r * 2, r * 2); g.fill(); g.stroke();
      if (label) { g.font = '700 18px sans-serif'; g.textAlign = 'center'; g.lineWidth = 4; g.strokeStyle = '#0f1820'; g.strokeText(label, X(p.x), Y(p.z) - r - 6); g.fillStyle = '#fff'; g.fillText(label, X(p.x), Y(p.z) - r - 6); }
    };
    for (const b of fl) if (b.rel === 'other') busDot(gap.pointAt(b.d), R.color, 6);
    for (const b of fl) if (b.rel !== 'other') busDot(gap.pointAt(b.d), b.rel === 'front' ? '#ff8a3d' : '#b07cff', 8, `${b.rel === 'front' ? T('앞차') : T('뒷차')} ${Math.round(b.min)}${T('분')}`);
    busDot({ x: sim.x, z: sim.z }, '#36a3ff', 10, T('내 버스'));
    // ---- 요약 ----
    const col = { ok: '#2ee06a', close: '#ff6b5a', far: '#ffb21a' };
    const word = { ok: '정상', close: '간격 좁음', far: '간격 벌어짐' };
    this.el.querySelector('.bis-sum').innerHTML = `
      <div><small>${T('다음 정류장')}</small><b>${esc(T(ns ? ns.st.name : '-'))}</b><em>${ns ? Math.max(1, Math.round(ns.eta)) + T('분') : ''}</em></div>
      <div><small>▲ ${T('앞차')}</small><b style="color:${col[I.front.st]}">${Math.round(I.front.min)}${T('분')} · ${I.front.stops}${T('정류장')}</b><em>${T(word[I.front.st])}${I.front.real ? ' · 📡' : ''}</em></div>
      <div><small>▼ ${T('뒷차')}</small><b style="color:${col[I.rear.st]}">${Math.round(I.rear.min)}${T('분')} · ${I.rear.stops}${T('정류장')}</b><em>${T(word[I.rear.st])}${I.rear.real ? ' · 📡' : ''}</em></div>
      <div><small>${T('앞 차량')} / ${T('뒤 차량')}</small><b>${I.near === null ? '—' : Math.round(I.near) + 'm'} / ${I.back === null ? '—' : Math.round(I.back) + 'm'}</b><em>${mission ? `${T('탑승')} ${mission.onboard.length}${T('명')}` : ''}</em></div>`;
    // ---- 노선도 (정류장 목록 + 버스 위치) ----
    const tot = R._tot, my = gap.my, rows = [];
    const rel = (d) => { let r = d - my; while (r < -tot / 2) r += tot; while (r > tot / 2) r -= tot; return r; };
    const stops = R._stopsS.map((o) => ({ kind: 'stop', r: rel(o.pos), st: o.st })).filter((o) => o.r > -900 && o.r < 3200).sort((a, b) => a.r - b.r);
    const prevStops = stops.filter((o) => o.r <= 0).slice(-2), nextStops = stops.filter((o) => o.r > 0).slice(0, 6);
    const lo = prevStops.length ? prevStops[0].r - 1 : -400, hi = nextStops.length ? nextStops[nextStops.length - 1].r + 1 : 2000;
    for (const o of [...prevStops, ...nextStops]) rows.push(o);
    rows.push({ kind: 'me', r: 0 });
    for (const b of fl) { const r = rel(b.d); if (r > lo && r < hi) rows.push({ kind: 'bus', r, b }); else if (b.rel === 'front') rows.push({ kind: 'bus', r: hi + 1, b, far: Math.round(b.min) }); else if (b.rel === 'rear') rows.push({ kind: 'bus', r: lo - 1, b, far: -Math.round(b.min) }); }
    rows.sort((a, b) => b.r - a.r); // 위가 앞쪽 (가는 방향)
    this.el.querySelector('.bis-list').innerHTML = rows.map((o) => {
      if (o.kind === 'stop') {
        const next = ns && o.st === ns.st;
        return `<div class="bl stop ${o.r < 0 ? 'past' : ''} ${next ? 'next' : ''}"><i style="border-color:${R.color}"></i><span>${esc(T(o.st.name))}</span><em>${o.r > 0 ? Math.max(1, Math.round(o.r / V_AVG / 60)) + T('분') : T('지남')}${o.st.waiting ? ` · 🧍${o.st.waiting}` : ''}</em></div>`;
      }
      if (o.kind === 'me') return `<div class="bl me"><i>🚌</i><span>${T('내 버스')}</span><em>${Math.round(sim.kmh)} km/h</em></div>`;
      const b = o.b, lab = b.rel === 'front' ? T('앞차') : b.rel === 'rear' ? T('뒷차') : T('배차 버스');
      return `<div class="bl bus ${b.rel}"><i>🚌</i><span>${lab}</span><em>${o.far !== undefined ? (o.far > 0 ? '+' : '') + o.far : (o.r > 0 ? '+' : '') + Math.round(o.r / V_AVG / 60)}${T('분')}${b.real ? ' 📡' : ''}</em></div>`;
    }).join('');
  }
}
