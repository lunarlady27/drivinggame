// 차 상태(손상 · 먼지) · 정비소(주유 · 세차 · 수리) · 사진 모드
import * as THREE from 'three';
import { paintMat } from './models.js';
import { won, clamp } from './util.js';

// ===================== 손상 · 먼지 =====================
const MUD = new THREE.Color('#6b5a45');
// 내 차의 차체 재질만 따로 복제 (같은 색 다른 차는 그대로)
export function setupWear(P) {
  P.wear = [];
  if (!P.obj || !P.own) return;
  const shared = paintMat(P.own.color || '#cccccc');
  const mine = shared.clone();
  P.obj.group.traverse((o) => {
    if (!o.isMesh) return;
    if (o.material === shared) o.material = mine;
    else if (Array.isArray(o.material)) o.material = o.material.map((m) => (m === shared ? mine : m));
  });
  P.wear.push({ m: mine, c: shared.color.clone(), r: shared.roughness, cc: shared.clearcoat, met: shared.metalness });
  if (P.own.dirt === undefined) P.own.dirt = 0;
  if (P.own.dmg === undefined) P.own.dmg = 0;
  applyWear(P);
}
export function applyWear(P) {
  if (!P.wear) return;
  const dirt = clamp(P.own.dirt || 0, 0, 100) / 100, dmg = clamp(P.own.dmg || 0, 0, 100) / 100;
  for (const w of P.wear) {
    w.m.color.copy(w.c).lerp(MUD, dirt * 0.55).multiplyScalar(1 - dmg * 0.35);
    w.m.roughness = Math.min(1, w.r + dirt * 0.55 + dmg * 0.3);
    w.m.clearcoat = w.cc * (1 - dirt * 0.85) * (1 - dmg * 0.6);
    w.m.metalness = w.met * (1 - dirt * 0.5);
  }
}
// 손상이 크면 힘이 빠지고 연기가 나요
export function powerMul(own) { const d = own.dmg || 0; return d < 40 ? 1 : Math.max(0.45, 1 - (d - 40) / 110); }
export function addDamage(P, impact, toast) {
  const before = P.own.dmg || 0;
  P.own.dmg = Math.min(100, before + impact * (P.spec.type === 'bus' ? 1.6 : 2.6));
  applyWear(P);
  for (const th of [40, 70, 90]) if (before < th && P.own.dmg >= th) {
    toast(th === 40 ? '🔧 차가 많이 상했어요 — 힘이 조금 빠져요. 주유소 정비소에서 고칠 수 있어요' : th === 70 ? '🔧 손상이 심해요! 엔진에서 연기가 나요' : '🚨 차가 거의 망가졌어요! 바로 수리하세요', 'bad', 3500);
  }
}
export function addDirt(P, meters, rainK) {
  const k = (P.spec.type === 'bus' ? 0.5 : 1) * (1 + rainK * 2.5);
  const before = P.own.dirt || 0;
  P.own.dirt = Math.min(100, before + (meters / 1000) * 1.6 * k);
  if (Math.floor(before / 4) !== Math.floor(P.own.dirt / 4)) applyWear(P);
}
// 엔진 연기 (손상 70% 넘으면)
export class Smoke {
  constructor(scene) {
    this.scene = scene; this.parts = [];
    const cv = document.createElement('canvas'); cv.width = cv.height = 64;
    const c = cv.getContext('2d'); const g = c.createRadialGradient(32, 32, 2, 32, 32, 30);
    g.addColorStop(0, 'rgba(90,90,90,.75)'); g.addColorStop(1, 'rgba(90,90,90,0)'); c.fillStyle = g; c.fillRect(0, 0, 64, 64);
    this.mat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false });
    this.acc = 0;
  }
  update(dt, P) {
    const on = P && !P.onFoot && (P.own.dmg || 0) >= 70 && P.engine;
    if (on) {
      this.acc += dt * (4 + (P.own.dmg - 70) * 0.3);
      while (this.acc > 1 && this.parts.length < 40) {
        this.acc -= 1;
        const s = new THREE.Sprite(this.mat.clone());
        const sim = P.sim, f = (P.spec.len || 4.6) * 0.38;
        s.position.set(sim.x + Math.sin(sim.heading) * f, P.y + (P.spec.hei || 1.4) * 0.8, sim.z + Math.cos(sim.heading) * f);
        s.userData = { t: 0, vx: (Math.random() - 0.5) * 0.6, vz: (Math.random() - 0.5) * 0.6 };
        s.scale.setScalar(0.6);
        this.scene.add(s); this.parts.push(s);
      }
    }
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const s = this.parts[i], u = s.userData; u.t += dt;
      s.position.x += u.vx * dt; s.position.z += u.vz * dt; s.position.y += 1.4 * dt;
      s.scale.setScalar(0.6 + u.t * 1.6); s.material.opacity = Math.max(0, 0.8 - u.t * 0.45);
      if (u.t > 1.8) { this.scene.remove(s); s.material.dispose(); this.parts.splice(i, 1); }
    }
  }
}

// ===================== 정비소 (주유소에서 E) =====================
export function repairCost(P) { return Math.round((P.own.dmg || 0) * (P.spec.type === 'bus' ? 60000 : 30000) / 1000) * 1000; }
export function washCost(P) { return P.spec.type === 'bus' ? 30000 : 8000; }
export function serviceMenu({ P, S, fuelCost, refuel, toast, audio, save, quest, won: w = won }) {
  return new Promise((res) => {
    const m = document.getElementById('modal');
    const dirt = Math.round(P.own.dirt || 0), dmg = Math.round(P.own.dmg || 0), fuel = Math.round(P.own.fuel || 0);
    const rc = repairCost(P), wc = washCost(P);
    const bar = (v, col) => `<i class="svc-bar"><b style="width:${v}%;background:${col}"></b></i>`;
    m.innerHTML = `<div class="modal-card svc"><h3>🔧 정비소 · 세차장 <small class="muted">가진 돈 ${w(S.money)}</small></h3>
      <div class="svc-row"><span>${P.spec.ev ? '🔋 배터리' : '⛽ 연료'}</span>${bar(fuel, '#2ee06a')}<em>${fuel}%</em><button data-s="fuel" ${fuel >= 99 ? 'disabled' : ''}>${P.spec.ev ? '충전' : '주유'} ${fuel >= 99 ? '' : w(fuelCost)}</button></div>
      <div class="svc-row"><span>🧽 먼지</span>${bar(dirt, '#b98a55')}<em>${dirt}%</em><button data-s="wash" ${dirt < 3 ? 'disabled' : ''}>자동 세차 ${w(wc)}</button></div>
      <div class="svc-row"><span>🔧 손상</span>${bar(dmg, '#ff5a4a')}<em>${dmg}%</em><button data-s="repair" ${dmg < 1 ? 'disabled' : ''}>수리 ${dmg < 1 ? '' : w(rc)}</button></div>
      <div class="svc-row all"><button data-s="all" class="primary">한 번에 다 하기</button><button data-s="close">닫기</button></div></div>`;
    m.classList.remove('hidden');
    const close = () => { m.classList.add('hidden'); res(); };
    m.querySelectorAll('button[data-s]').forEach((b) => b.onclick = () => {
      const k = b.dataset.s;
      if (k === 'close') return close();
      const todo = k === 'all' ? ['fuel', 'wash', 'repair'] : [k];
      for (const t of todo) {
        if (t === 'fuel' && fuel < 99) { if (S.money < fuelCost) { toast('돈이 부족해요', 'bad'); continue; } S.money -= fuelCost; refuel(); }
        if (t === 'wash' && (P.own.dirt || 0) >= 3) { if (S.money < wc) { toast('돈이 부족해요', 'bad'); continue; } S.money -= wc; P.own.dirt = 0; washFx(); quest && quest('wash', 1); toast(`🧽 반짝반짝! 세차 완료 (-${w(wc)})`, 'money'); }
        if (t === 'repair' && (P.own.dmg || 0) >= 1) { if (S.money < rc) { toast('돈이 부족해요', 'bad'); continue; } S.money -= rc; P.own.dmg = 0; toast(`🔧 수리 완료! 새 차 같아요 (-${w(rc)})`, 'money'); }
      }
      applyWear(P); audio.coin(); save(); close();
    });
  });
}
function washFx() {
  const d = document.createElement('div'); d.className = 'wash-fx';
  d.innerHTML = '<i></i><i></i><i></i><b>🫧 세차 중...</b>';
  document.body.appendChild(d); setTimeout(() => d.remove(), 2600);
}

// ===================== 📸 사진 모드 =====================
const PKEY = 'rk_photos';
const loadPhotos = () => { try { return JSON.parse(localStorage.getItem(PKEY) || '[]'); } catch (e) { return []; } };
const savePhotos = (l) => { try { localStorage.setItem(PKEY, JSON.stringify(l)); } catch (e) { /* 저장 공간 부족 */ } };
const FILTERS = [['원본', 'none'], ['선명', 'contrast(1.15) saturate(1.25)'], ['흑백', 'grayscale(1) contrast(1.1)'], ['빈티지', 'sepia(.55) contrast(1.05) saturate(.85)'], ['시네마', 'contrast(1.2) saturate(.8) brightness(.95)'], ['네온', 'saturate(1.8) hue-rotate(-12deg) contrast(1.1)']];
export class PhotoMode {
  constructor(api) { this.api = api; this.on = false; this.f = 0; }
  open() {
    const A = this.api;
    if (this.on || !A.canOpen()) return;
    this.on = true; this.prevCam = A.G.camMode; A.G.camMode = 3; A.G.photo = true; A.G.zoom = Math.max(A.G.zoom, 1.1);
    document.getElementById('hud').classList.add('hidden');
    const ui = document.createElement('div'); ui.id = 'photoUI';
    ui.innerHTML = `<div class="ph-top"><b>📸 사진 모드</b><span>화면을 끌어서 돌려 보세요</span><button data-p="x">✕</button></div>
      <div class="ph-side"><button data-p="zin">＋</button><button data-p="zout">－</button><label>🕐<input type="range" min="0" max="24" step="0.25" value="${A.env.hour}" data-p="hour"></label></div>
      <div class="ph-bottom"><div class="ph-f">${FILTERS.map(([n], i) => `<button data-f="${i}" class="${i === this.f ? 'on' : ''}">${n}</button>`).join('')}</div>
      <button class="ph-shot" data-p="shot" aria-label="찍기"></button><button data-p="album">🖼️ 앨범</button></div>`;
    document.body.appendChild(ui); this.ui = ui;
    this.applyFilter();
    ui.querySelectorAll('[data-f]').forEach((b) => b.onclick = () => { this.f = Number(b.dataset.f); ui.querySelectorAll('[data-f]').forEach((x) => x.classList.toggle('on', x === b)); this.applyFilter(); });
    ui.querySelector('[data-p=x]').onclick = () => this.close();
    ui.querySelector('[data-p=zin]').onclick = () => { A.G.zoom = clamp(A.G.zoom * 0.85, 0.45, 3); };
    ui.querySelector('[data-p=zout]').onclick = () => { A.G.zoom = clamp(A.G.zoom * 1.18, 0.45, 3); };
    ui.querySelector('[data-p=hour]').oninput = (e) => { A.env.hour = Number(e.target.value); };
    ui.querySelector('[data-p=shot]').onclick = () => this.shot();
    ui.querySelector('[data-p=album]').onclick = () => this.album();
  }
  applyFilter() { this.api.canvas.style.filter = FILTERS[this.f][1]; }
  close() {
    if (!this.on) return;
    const A = this.api;
    this.on = false; A.G.photo = false; A.G.camMode = this.prevCam; A.canvas.style.filter = '';
    if (this.ui) this.ui.remove(); this.ui = null;
    document.getElementById('hud').classList.remove('hidden');
  }
  shot() {
    const A = this.api;
    A.G.shotCb = (url) => {
      const img = new Image();
      img.onload = () => {
        // 필터를 사진에 그대로 입혀서 저장
        const W = Math.min(1600, img.width), H = Math.round(img.height * W / img.width);
        const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
        const c = cv.getContext('2d'); c.filter = FILTERS[this.f][1]; c.drawImage(img, 0, 0, W, H); c.filter = 'none';
        c.font = `700 ${Math.round(H * 0.026)}px sans-serif`; c.fillStyle = 'rgba(255,255,255,.75)'; c.textAlign = 'right';
        c.fillText('HANPAN DRIVE', W - H * 0.03, H - H * 0.03);
        const big = cv.toDataURL('image/jpeg', 0.9);
        // 앨범에는 작은 사진으로 (기기 저장 공간 아끼기)
        const t = document.createElement('canvas'); t.width = 480; t.height = Math.round(480 * H / W);
        t.getContext('2d').drawImage(cv, 0, 0, t.width, t.height);
        const L = loadPhotos(); L.unshift(t.toDataURL('image/jpeg', 0.72)); if (L.length > 6) L.length = 6; savePhotos(L);
        const fl = document.createElement('div'); fl.className = 'ph-flash'; document.body.appendChild(fl); setTimeout(() => fl.remove(), 500);
        A.audio.beep && A.audio.beep();
        this.preview(big);
      };
      img.src = url;
    };
  }
  preview(url) {
    const m = document.getElementById('modal');
    m.innerHTML = `<div class="modal-card wide ph-prev"><img src="${url}" alt=""><p class="muted">사진을 길게 누르거나 오른쪽 클릭해서 저장할 수 있어요. 앨범에는 최근 6장이 남아요.</p>
      <div class="modal-btns"><a class="btn" href="${url}" download="roadkorea_${Date.now()}.jpg">💾 저장</a><button data-c="1" class="primary">계속 찍기</button></div></div>`;
    m.classList.remove('hidden');
    m.querySelector('[data-c]').onclick = () => m.classList.add('hidden');
  }
  album() {
    const m = document.getElementById('modal');
    const list = loadPhotos();
    m.innerHTML = `<div class="modal-card wide"><h3>🖼️ 앨범 <small class="muted">${list.length}장</small></h3>
      <div class="ph-album">${list.map((u, i) => `<img src="${u}" data-i="${i}" alt="">`).join('') || '<p class="muted">아직 찍은 사진이 없어요.</p>'}</div>
      <div class="modal-btns">${list.length ? '<button data-c="clear">모두 지우기</button>' : ''}<button data-c="close" class="primary">닫기</button></div></div>`;
    m.classList.remove('hidden');
    m.querySelectorAll('.ph-album img').forEach((im) => im.onclick = () => this.preview(list[Number(im.dataset.i)]));
    m.querySelector('[data-c=close]').onclick = () => m.classList.add('hidden');
    const cl = m.querySelector('[data-c=clear]'); if (cl) cl.onclick = () => { savePhotos([]); m.classList.add('hidden'); };
  }
}
