// 가운데 내비 화면 (헤드유닛) — 차종마다 다른 인포테인먼트 화면 + 실제 도로망으로 그리는 실시간 지도
import * as THREE from 'three';
import { W } from './world.js';
import { basemap } from './mapdraw.js';
import { TURN_WORD } from './nav.js';

const STORE = true; // 가상 이름 고정
// 화면 테마 (이름은 스토어판에서 가상 이름으로 바뀌어요)
export const HU = {
  pleos: { name: 'Pleos Connect', store: '한빛 링크 2', accent: '#3b82f6', accent2: '#22c3a6', dark: { bg: '#0f141a', land: '#1a222b', road: '#56616d', alley: '#3c4650', casing: '#0b0f13', hwy: '#d9a640', text: '#e8edf2', sub: '#8a97a5', card: 'rgba(24,31,40,.92)' }, light: { bg: '#e9edf1', land: '#f4f6f8', road: '#ffffff', alley: '#fbfbfc', casing: '#c9d0d8', hwy: '#f2c25b', text: '#18202a', sub: '#5d6976', card: 'rgba(255,255,255,.94)' }, layout: 'full' },
  ccnc_h: { name: 'ccNC', store: '한빛 링크', accent: '#36d1c4', accent2: '#4aa3ff', dark: { bg: '#0b1520', land: '#122130', road: '#5d7186', alley: '#3a4c5e', casing: '#08111a', hwy: '#d6a245', text: '#e4eef6', sub: '#86a0b5', card: 'rgba(12,24,36,.92)' }, light: { bg: '#e8ebe6', land: '#f3f3ef', road: '#ffffff', alley: '#fafaf7', casing: '#c3c8cc', hwy: '#f3cf72', text: '#1b2430', sub: '#5f6b78', card: 'rgba(255,255,255,.95)' }, layout: 'split' },
  ccnc_k: { name: 'ccNC', store: '소라 커넥트', accent: '#5fb7ff', accent2: '#e8e8e8', dark: { bg: '#101113', land: '#1a1c1f', road: '#676c73', alley: '#41454b', casing: '#0a0b0c', hwy: '#c9a050', text: '#f1f2f3', sub: '#9a9ea4', card: 'rgba(22,23,26,.93)' }, light: { bg: '#e6e8ea', land: '#f2f3f4', road: '#ffffff', alley: '#f8f9fa', casing: '#c2c6cb', hwy: '#eec46a', text: '#16191d', sub: '#5c636b', card: 'rgba(255,255,255,.95)' }, layout: 'split' },
  bmw: { name: 'iDrive', store: '벨덴 드라이브', accent: '#1c69d4', accent2: '#7fb2ff', dark: { bg: '#05080d', land: '#0f151d', road: '#59636e', alley: '#363f49', casing: '#020304', hwy: '#c79a42', text: '#eef3f8', sub: '#8392a3', card: 'rgba(10,16,24,.9)' }, layout: 'tiles' },
};
const PLEOS_CARS = new Set(['hb_grandia', 'hb_adel']); // 2026년 신형 그랜저 · 아반떼: 차세대 화면
export function huTheme(spec) {
  if (!spec) return 'ccnc_h';
  if (spec.brand === 'bayern') return 'bmw';
  if (spec.brand === 'sora') return 'ccnc_k';
  if (PLEOS_CARS.has(spec.id)) return 'pleos';
  return 'ccnc_h';
}
export const huName = (id) => (STORE ? HU[id].store : HU[id].name);
export const huAccent = (id) => HU[id].accent;

// 도로 격자 (빨리 찾기)
let GRID = null, GRID_N = -1;
const CELL = 250;
function grid() {
  if (GRID && GRID_N === W.edges.length) return GRID;
  GRID = new Map(); GRID_N = W.edges.length;
  for (const e of W.edges) {
    const x0 = Math.floor(Math.min(e.a.x, e.b.x) / CELL), x1 = Math.floor(Math.max(e.a.x, e.b.x) / CELL);
    const z0 = Math.floor(Math.min(e.a.z, e.b.z) / CELL), z1 = Math.floor(Math.max(e.a.z, e.b.z) / CELL);
    if ((x1 - x0 + 1) * (z1 - z0 + 1) > 400) continue;
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) { const k = i * 100003 + j; let a = GRID.get(k); if (!a) GRID.set(k, (a = [])); a.push(e); }
  }
  return GRID;
}
function edgesIn(x, z, r) {
  const G = grid(), out = new Set();
  for (let i = Math.floor((x - r) / CELL); i <= Math.floor((x + r) / CELL); i++) for (let j = Math.floor((z - r) / CELL); j <= Math.floor((z + r) / CELL); j++) { const a = G.get(i * 100003 + j); if (a) for (const e of a) out.add(e); }
  return out;
}

function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function turnGlyph(g, t, x, y, s, col) {
  g.save(); g.translate(x, y); g.scale(s / 100, s / 100);
  g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 14; g.lineCap = 'round'; g.lineJoin = 'round';
  const head = (hx, hy, ang) => { g.save(); g.translate(hx, hy); g.rotate(ang); g.beginPath(); g.moveTo(0, -22); g.lineTo(20, 8); g.lineTo(-20, 8); g.closePath(); g.fill(); g.restore(); };
  g.beginPath();
  if (t === 'L' || t === 'KL') { g.moveTo(10, 45); g.lineTo(10, 0); g.quadraticCurveTo(10, -20, -10, -20); g.lineTo(-25, -20); g.stroke(); head(-30, -20, -Math.PI / 2); }
  else if (t === 'R' || t === 'KR') { g.moveTo(-10, 45); g.lineTo(-10, 0); g.quadraticCurveTo(-10, -20, 10, -20); g.lineTo(25, -20); g.stroke(); head(30, -20, Math.PI / 2); }
  else if (t === 'U') { g.moveTo(18, 45); g.lineTo(18, -10); g.arc(-4, -10, 22, 0, Math.PI, true); g.lineTo(-26, 15); g.stroke(); head(-26, 20, Math.PI); }
  else if (t === 'G') { g.arc(0, -5, 22, 0, Math.PI * 2); g.fill(); g.fillStyle = '#000'; g.beginPath(); g.arc(0, -5, 8, 0, Math.PI * 2); g.fill(); }
  else { g.moveTo(0, 45); g.lineTo(0, -25); g.stroke(); head(0, -32, 0); }
  g.restore();
}
const fmtD = (m) => (m >= 1000 ? (m / 1000).toFixed(1) + 'km' : Math.max(0, Math.round(m / 10) * 10) + 'm');
const T = (t) => (globalThis.HP_I18N ? HP_I18N.tr(t) : t);

export function makeHeadUnit(theme = 'ccnc_h', wide = false) {
  const TH = HU[theme] || HU.ccnc_h;
  const CW = 1280, CH = wide ? 448 : 720;
  const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
  const g = cv.getContext('2d');
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  tex.userData.canvas = cv;
  const mat = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.95, roughness: 0.3 });
  const st = { k: 1.6, page: 0, t: 0 };

  function map(s, C, x0, y0, w, h, ax, ay) {
    const px = s.x, pz = s.z, th = s.heading;
    const kWant = s.kmh > 90 ? 0.75 : s.kmh > 50 ? 1.15 : s.kmh > 20 ? 1.6 : 2.1;
    st.k += (kWant - st.k) * 0.08;
    const k = st.k, c = Math.cos(th), sn = Math.sin(th);
    const a = -k * c, b = -k * sn, cc = k * sn, d = -k * c;
    g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
    g.fillStyle = C.land; g.fillRect(x0, y0, w, h);
    g.setTransform(a, b, cc, d, ax - (a * px + cc * pz), ay - (b * px + d * pz));
    let bm = null; try { bm = W.bounds ? basemap() : null; } catch (e) { bm = null; }
    if (bm && W.bounds) { g.globalAlpha = s.light ? 0.16 : 0.2; const B = W.bounds; g.drawImage(bm.canvas, B.x0, B.z0, bm.canvas.width * bm.res, bm.canvas.height * bm.res); g.globalAlpha = 1; }
    const R0 = Math.hypot(w, h) / k * 0.75;
    const list = [...edgesIn(px, pz, R0)].filter((e) => !(s.level !== 'hwy' && e.elevated && false));
    const minW = 2.2 / k;
    const order = (e) => (e.kind === 'alley' ? 0 : e.kind === 'highway' ? 3 : e.elevated || e.ramp ? 2 : 1);
    list.sort((p, q) => order(p) - order(q));
    g.lineCap = 'round'; g.lineJoin = 'round';
    // 테두리 → 도로 (골목은 얇지만 또렷하게, 큰길은 넓게)
    for (const pass of [0, 1]) for (const e of list) {
      const al = e.kind === 'alley';
      const wd = Math.max(minW * (al ? 1.4 : 2), e.hw * (al ? 1.7 : 2));
      if (pass === 0) { g.strokeStyle = C.casing; g.lineWidth = wd + 2.4 / k; }
      else { g.strokeStyle = e.kind === 'highway' ? C.hwy : e.elevated || e.ramp ? C.hwy : al ? C.alley : C.road; g.lineWidth = wd; }
      g.beginPath(); g.moveTo(e.a.x, e.a.z); g.lineTo(e.b.x, e.b.z); g.stroke();
    }
    // 경로
    if (s.nav && s.nav.active && s.nav.pts) s.nav.drawWorld(g, 9 / k, TH.accent);
    else if (s.path) { g.strokeStyle = TH.accent; g.lineWidth = 7 / k; g.globalAlpha = 0.9; g.beginPath(); s.path.forEach((p, i) => (i ? g.lineTo(p.x, p.z) : g.moveTo(p.x, p.z))); g.stroke(); g.globalAlpha = 1; }
    // 주유소 · 충전소 · 단속 카메라
    for (const z of W.zones || []) if ((z.type === 'fuel' || z.type === 'ev') && Math.abs((z.x0 + z.x1) / 2 - px) < R0 && Math.abs((z.z0 + z.z1) / 2 - pz) < R0) { g.fillStyle = z.type === 'ev' ? '#4aa3ff' : '#ff7a3d'; g.beginPath(); g.arc((z.x0 + z.x1) / 2, (z.z0 + z.z1) / 2, 8 / k, 0, 7); g.fill(); }
    for (const cm of W.cams || []) if (Math.abs(cm.x - px) < R0 && Math.abs(cm.z - pz) < R0) { g.fillStyle = '#ff4d3d'; g.fillRect(cm.x - 5 / k, cm.z - 5 / k, 10 / k, 10 / k); }
    g.setTransform(1, 0, 0, 1, 0, 0);
    // 도로 이름 (가까운 큰길 몇 개)
    const seen = new Set(); let nl = 0;
    g.font = '600 21px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const near = list.filter((e) => e.name && e.kind !== 'alley' && e.len > 60).map((e) => ({ e, dd: Math.hypot((e.a.x + e.b.x) / 2 - px, (e.a.z + e.b.z) / 2 - pz) })).sort((p, q) => p.dd - q.dd);
    for (const { e } of near) {
      if (nl >= 6 || seen.has(e.name)) continue;
      const mx = (e.a.x + e.b.x) / 2 - px, mz = (e.a.z + e.b.z) / 2 - pz;
      const sx = ax + a * mx + cc * mz, sy = ay + b * mx + d * mz;
      if (sx < x0 + 60 || sx > x0 + w - 60 || sy < y0 + 30 || sy > y0 + h - 30) continue;
      let ang = Math.atan2(b * e.dir.x + d * e.dir.z, a * e.dir.x + cc * e.dir.z);
      if (ang > Math.PI / 2) ang -= Math.PI; if (ang < -Math.PI / 2) ang += Math.PI;
      seen.add(e.name); nl++;
      g.save(); g.translate(sx, sy); g.rotate(ang);
      g.lineWidth = 5; g.strokeStyle = C.land; g.strokeText(T(e.name), 0, 0); g.fillStyle = C.sub; g.fillText(T(e.name), 0, 0);
      g.restore();
    }
    // 내 차
    g.save(); g.translate(ax, ay);
    g.fillStyle = TH.accent; g.globalAlpha = 0.22; g.beginPath(); g.arc(0, 0, 34, 0, 7); g.fill(); g.globalAlpha = 1;
    g.fillStyle = TH.accent; g.strokeStyle = '#fff'; g.lineWidth = 4;
    g.beginPath(); g.moveTo(0, -24); g.lineTo(17, 18); g.lineTo(0, 9); g.lineTo(-17, 18); g.closePath(); g.fill(); g.stroke();
    g.restore();
    g.restore();
  }

  function turnCard(s, C, x, y, w) {
    const I = s.nav && s.nav.active && s.nav.info;
    if (!I) return 0;
    rr(g, x, y, w, 150, 18); g.fillStyle = C.card; g.fill();
    g.fillStyle = TH.accent; rr(g, x + 14, y + 14, 122, 122, 14); g.fill();
    turnGlyph(g, I.m.t, x + 75, y + 78, 90, '#fff');
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillStyle = C.text; g.font = '800 48px sans-serif'; g.fillText(fmtD(I.dNext), x + 152, y + 64);
    g.fillStyle = C.sub; g.font = '600 24px sans-serif';
    const road = I.m.road || (I.dest && I.dest.name) || '';
    g.fillText(`${T(TURN_WORD[I.m.t] || '')}${road ? ' · ' + T(road) : ''}`.slice(0, 26), x + 152, y + 102);
    g.fillText(`${T('남은 거리')} ${fmtD(I.remain || 0)} · ${Math.max(1, Math.round((I.tRemain || 0) / 60))}${T('분')}`, x + 152, y + 134);
    return 160;
  }
  function limitSign(x, y, r, lim) {
    if (!lim) return;
    g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
    g.strokeStyle = '#e0262b'; g.lineWidth = r * 0.2; g.beginPath(); g.arc(x, y, r * 0.88, 0, 7); g.stroke();
    g.fillStyle = '#111'; g.font = `800 ${Math.round(r * 0.85)}px sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(lim, x, y + 2);
  }
  const clock = (h) => { const hh = Math.floor(h) % 24, mm = Math.floor((h % 1) * 60); return `${hh < 12 ? T('오전') : T('오후')} ${((hh + 11) % 12) + 1}:${String(mm).padStart(2, '0')}`; };
  function bottomBar(s, C, x, y, w, hgt) {
    g.fillStyle = C.card; g.fillRect(x, y, w, hgt);
    g.textBaseline = 'middle'; g.textAlign = 'left';
    g.fillStyle = C.text; g.font = '700 26px sans-serif'; g.fillText(T(s.road || '도로 밖'), x + 24, y + hgt / 2);
    limitSign(x + w - 44, y + hgt / 2, hgt * 0.38, s.limit);
    g.textAlign = 'right'; g.fillStyle = s.kmh > (s.limit || 999) + 5 ? '#ff5a4d' : C.sub; g.font = '700 26px sans-serif';
    g.fillText(`${Math.round(s.kmh)} km/h`, x + w - 90, y + hgt / 2);
  }
  function media(C, x, y, w) {
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillStyle = C.sub; g.font = '600 22px sans-serif'; g.fillText('FM 95.1', x, y + 26);
    g.fillStyle = C.text; g.font = '800 30px sans-serif'; g.fillText(T('빛고을 라디오'), x, y + 64);
    const p = (performance.now() / 60000) % 1;
    g.fillStyle = C.casing; g.fillRect(x, y + 82, w, 6); g.fillStyle = TH.accent; g.fillRect(x, y + 82, w * p, 6);
  }
  function climate(s, C, x, y) {
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillStyle = C.sub; g.font = '600 22px sans-serif'; g.fillText(`${T('바깥')} ${Math.round(s.outTemp ?? 18)}°C`, x, y + 26);
    g.fillStyle = C.text; g.font = '800 34px sans-serif'; g.fillText('AUTO 22.0°', x, y + 68);
    g.fillStyle = TH.accent; for (let i = 0; i < 5; i++) { g.globalAlpha = i < 3 ? 1 : 0.25; g.fillRect(x + i * 26, y + 84, 20, 10); } g.globalAlpha = 1;
  }
  function energy(s, C, x, y, w) {
    g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    g.fillStyle = C.sub; g.font = '600 22px sans-serif'; g.fillText(s.ev ? T('배터리') : T('연료'), x, y + 26);
    const f = Math.max(0, Math.min(100, s.fuel ?? 80));
    g.fillStyle = C.text; g.font = '800 34px sans-serif'; g.fillText(`${Math.round(f)}%`, x, y + 66);
    g.fillStyle = C.casing; rr(g, x + 120, y + 44, w - 120, 22, 8); g.fill();
    g.fillStyle = f < 15 ? '#ff5a4d' : s.ev ? '#4aa3ff' : TH.accent2; rr(g, x + 120, y + 44, (w - 120) * f / 100, 22, 8); g.fill();
    g.fillStyle = C.sub; g.font = '600 20px sans-serif'; g.fillText(`${T('주행 가능')} ${Math.round(f * (s.ev ? 4.6 : 6.2))}km`, x, y + 98);
  }

  function draw(s) {
    st.t++;
    const night = s.hour < 6.5 || s.hour > 19;
    const light = TH.light && !night;
    const C = light ? TH.light : TH.dark;
    s.light = light;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.fillStyle = C.bg; g.fillRect(0, 0, CW, CH);
    const bar = wide ? 52 : 64;
    if (TH.layout === 'full') {
      // 차세대: 지도 전체 화면 + 떠 있는 카드 + 아래 독
      const dockH = wide ? 64 : 84;
      map(s, C, 0, 0, CW, CH - dockH, CW * 0.58, (CH - dockH) * 0.72);
      const tc = turnCard(s, C, 24, 24, 460);
      if (!wide) { rr(g, 24, 24 + tc + (tc ? 0 : 0), 300, 116, 18); g.fillStyle = C.card; g.fill(); media(C, 44, 34 + tc, 260); }
      // 오른쪽 위: 시간 · 속도 제한
      rr(g, CW - 250, 24, 226, 74, 18); g.fillStyle = C.card; g.fill();
      g.fillStyle = C.text; g.font = '800 30px sans-serif'; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(clock(s.hour), CW - 232, 61);
      limitSign(CW - 60, 150, 38, s.limit);
      // 독
      g.fillStyle = C.card; g.fillRect(0, CH - dockH, CW, dockH);
      const icons = ['🏠', '🗺️', '🎵', '📞', '❄️', '⚙️'];
      g.font = `${Math.round(dockH * 0.42)}px sans-serif`; g.textAlign = 'center';
      icons.forEach((ic, i) => { const cx = 120 + i * 120; if (i === 1) { g.fillStyle = TH.accent; g.globalAlpha = 0.25; g.beginPath(); g.arc(cx, CH - dockH / 2, dockH * 0.4, 0, 7); g.fill(); g.globalAlpha = 1; } g.fillStyle = C.text; g.fillText(ic, cx, CH - dockH / 2 + 2); });
      g.textAlign = 'right'; g.fillStyle = C.text; g.font = '700 26px sans-serif'; g.fillText(T(s.road || ''), CW - 130, CH - dockH / 2);
      g.fillStyle = s.kmh > (s.limit || 999) + 5 ? '#ff5a4d' : C.sub; g.fillText(`${Math.round(s.kmh)}`, CW - 40, CH - dockH / 2);
    } else if (TH.layout === 'tiles') {
      // 타일형: 왼쪽 정보 타일 + 오른쪽 지도
      const lw = wide ? 360 : 400;
      map(s, C, lw, 0, CW - lw, CH, lw + (CW - lw) * 0.5, CH * 0.7);
      g.fillStyle = C.bg; g.fillRect(0, 0, lw, CH);
      g.fillStyle = TH.accent; g.fillRect(lw - 3, 0, 3, CH);
      g.fillStyle = C.text; g.font = '300 52px sans-serif'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(clock(s.hour).replace(/^\S+ /, ''), 28, 72);
      let y = 100;
      const tile = (hh, fn) => { rr(g, 18, y, lw - 40, hh, 10); g.fillStyle = C.card; g.fill(); g.strokeStyle = 'rgba(127,178,255,.18)'; g.lineWidth = 2; g.stroke(); fn(36, y + 8); y += hh + 14; };
      if (s.nav && s.nav.active && s.nav.info) { const I = s.nav.info; tile(130, (x, yy) => { turnGlyph(g, I.m.t, x + 50, yy + 62, 80, TH.accent2); g.fillStyle = C.text; g.font = '700 44px sans-serif'; g.textAlign = 'left'; g.fillText(fmtD(I.dNext), x + 110, yy + 62); g.fillStyle = C.sub; g.font = '500 22px sans-serif'; g.fillText(T(I.m.road || TURN_WORD[I.m.t] || '').slice(0, 14), x + 110, yy + 98); }); }
      if (y + 120 < CH) tile(112, (x, yy) => media(C, x, yy, lw - 80));
      if (y + 120 < CH) tile(112, (x, yy) => energy(s, C, x, yy, lw - 80));
      if (y + 120 < CH) tile(112, (x, yy) => climate(s, C, x, yy));
      // 지도 아래 길 이름
      const bx = lw + 20, bw = CW - lw - 40;
      rr(g, bx, CH - 70, bw, 52, 12); g.fillStyle = C.card; g.fill();
      g.fillStyle = C.text; g.font = '600 26px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(T(s.road || ''), bx + bw / 2, CH - 44);
      limitSign(CW - 60, 60, 36, s.limit);
    } else {
      // 나눠진 화면: 지도 64% + 오른쪽 위젯
      const mw = Math.round(CW * (wide ? 0.7 : 0.64));
      // 위 상태줄
      g.fillStyle = C.card; g.fillRect(0, 0, CW, bar);
      g.fillStyle = C.text; g.font = `700 ${wide ? 24 : 28}px sans-serif`; g.textAlign = 'left'; g.textBaseline = 'middle'; g.fillText(clock(s.hour), 24, bar / 2);
      g.textAlign = 'right'; g.fillStyle = C.sub; g.fillText(`📶 LTE  ${Math.round(s.outTemp ?? 18)}°C`, CW - 24, bar / 2);
      g.textAlign = 'center'; g.fillStyle = TH.accent; g.fillText(huName(theme), CW / 2, bar / 2);
      const bb = wide ? 52 : 64;
      map(s, C, 0, bar, mw, CH - bar - bb, mw * 0.5, bar + (CH - bar - bb) * 0.72);
      turnCard(s, C, 16, bar + 16, Math.min(470, mw - 32));
      bottomBar(s, C, 0, CH - bb, mw, bb);
      // 오른쪽
      g.fillStyle = C.bg; g.fillRect(mw, bar, CW - mw, CH - bar);
      g.fillStyle = C.casing; g.fillRect(mw, bar, 3, CH - bar);
      const rx = mw + 26, rw = CW - mw - 52;
      let y = bar + 14;
      const blk = (hh, fn) => { if (y + hh > CH - 6) return; rr(g, mw + 12, y, CW - mw - 24, hh, 14); g.fillStyle = C.card; g.fill(); fn(rx, y + 6); y += hh + 12; };
      blk(112, (x, yy) => media(C, x, yy, rw));
      blk(112, (x, yy) => climate(s, C, x, yy));
      blk(112, (x, yy) => energy(s, C, x, yy, rw));
      if (!wide) blk(110, (x, yy) => { g.fillStyle = C.sub; g.font = '600 22px sans-serif'; g.textAlign = 'left'; g.textBaseline = 'alphabetic'; g.fillText(T('오늘 주행'), x, yy + 26); g.fillStyle = C.text; g.font = '800 34px sans-serif'; g.fillText(`${(s.trip || 0).toFixed(1)} km`, x, yy + 70); });
    }
    if (!s.noTex) tex.needsUpdate = true;
  }
  return { canvas: cv, tex, mat, draw, theme, wide, accent: TH.accent };
}
