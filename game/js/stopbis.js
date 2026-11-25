// 🚏 정류장 도착 안내 전광판 — 가까운 정류장 몇 곳에만 진짜 LED 화면을 달아서 "몇 분 후 도착"을 보여줘요
import * as THREE from 'three';
import { W } from './world.js';
import { BUS_TYPES } from './data.js';

const POOL = 8, CW = 512, CH = 256;
const T = (t) => (globalThis.HP_I18N ? HP_I18N.tr(t) : t);
const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967296; };

export class StopBis {
  constructor(scene) {
    this.scene = scene; this.pool = []; this.t = 0; this.drawT = 0;
    const geo = new THREE.PlaneGeometry(1.3, 0.65);
    const frameGeo = new THREE.BoxGeometry(1.42, 0.76, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1b222b, roughness: 0.6 });
    for (let i = 0; i < POOL; i++) {
      const cv = document.createElement('canvas'); cv.width = CW; cv.height = CH;
      const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
      const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide, toneMapped: false });
      const g = new THREE.Group();
      const fr = new THREE.Mesh(frameGeo, frameMat); g.add(fr);
      for (const sz of [1, -1]) { const m = new THREE.Mesh(geo, mat); m.position.z = sz * 0.045; if (sz < 0) m.rotation.y = Math.PI; g.add(m); }
      g.visible = false; scene.add(g);
      this.pool.push({ g, cv, ctx: cv.getContext('2d'), tex, st: null });
    }
  }
  // 이 정류장에 서는 노선들의 도착 예정 (분)
  etas(st, simT, gap) {
    const out = [];
    for (const id of (st.routes || []).slice(0, 4)) {
      const R = (W.routes || []).find((r) => r.id === id);
      const iv = ((R && BUS_TYPES[R.type]) || {}).interval || 12;
      let min;
      if (gap && R && gap.R === R && gap.info) {
        // 내가 운행하는 노선: 실제 버스 위치로 계산
        const tot = R._tot, so = R._stopsS.find((o) => o.st === st);
        if (so) {
          let best = 1e9;
          for (const b of [{ d: gap.my, me: true }, ...gap.fleet()]) { const d = ((so.pos - b.d) % tot + tot) % tot; if (d < best) { best = d; } }
          min = best / 5.6 / 60;
        }
      }
      if (min === undefined) { const ph = hash(st.name + id) * iv; min = iv - ((simT / 60 + ph) % iv); }
      out.push({ id, color: (R && R.color) || '#3b7dd8', min, iv });
    }
    return out.sort((a, b) => a.min - b.min);
  }
  draw(p, st, simT, gap, hour) {
    const g = p.ctx;
    g.fillStyle = '#05080a'; g.fillRect(0, 0, CW, CH);
    g.fillStyle = '#0d1a24'; g.fillRect(0, 0, CW, 54);
    g.font = '700 30px sans-serif'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.fillStyle = '#ffe16b';
    g.fillText(T(st.name || '정류장').slice(0, 13), 14, 28);
    const hh = Math.floor(hour) % 24, mm = Math.floor((hour % 1) * 60);
    g.textAlign = 'right'; g.fillStyle = '#9fd3ff'; g.fillText(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`, CW - 14, 28);
    const rows = this.etas(st, simT, gap);
    if (!rows.length) { g.textAlign = 'center'; g.fillStyle = '#7f8c98'; g.font = '600 30px sans-serif'; g.fillText(T('운행 정보 없음'), CW / 2, 150); }
    rows.slice(0, 3).forEach((r, i) => {
      const y = 62 + i * 64;
      g.fillStyle = r.color; g.fillRect(14, y + 8, 110, 46);
      g.fillStyle = '#fff'; g.font = '800 30px sans-serif'; g.textAlign = 'center'; g.fillText(r.id, 69, y + 32);
      g.textAlign = 'right';
      const soon = r.min < 1.2;
      g.fillStyle = soon ? '#ff6b5a' : '#2ee06a'; g.font = '800 34px sans-serif';
      const blink = soon && Math.floor(simT * 2) % 2 === 0;
      g.fillText(soon ? (blink ? T('곧 도착') : '') : `${Math.round(r.min)}${T('분 후')}`, CW - 14, y + 32);
      g.fillStyle = '#7f8c98'; g.font = '600 22px sans-serif'; g.textAlign = 'left';
      g.fillText(soon ? T('전 정류장 출발') : `${T('배차')} ${r.iv}${T('분')}`, 136, y + 32);
    });
    p.tex.needsUpdate = true;
  }
  update(dt, px, pz, simT, gap, hour) {
    this.t -= dt; this.drawT -= dt;
    if (this.t <= 0) {
      this.t = 0.6;
      // 가까운 정류장 고르기
      const near = [];
      for (const st of W.stops || []) { if (!st.bisAt) continue; const d = (st.bisAt.x - px) ** 2 + (st.bisAt.z - pz) ** 2; if (d < 220 * 220) near.push([d, st]); }
      near.sort((a, b) => a[0] - b[0]);
      const want = near.slice(0, POOL).map((n) => n[1]);
      const free = this.pool.filter((p) => !want.includes(p.st));
      for (const p of this.pool) if (p.st && !want.includes(p.st)) { p.st = null; p.g.visible = false; }
      for (const st of want) {
        if (this.pool.some((p) => p.st === st)) continue;
        const p = free.shift(); if (!p) break;
        p.st = st; const a = st.bisAt;
        p.g.position.set(a.x, a.y, a.z); p.g.rotation.y = a.ry; p.g.visible = true;
        this.draw(p, st, simT, gap, hour);
      }
    }
    if (this.drawT <= 0) { this.drawT = 0.5; for (const p of this.pool) if (p.st) this.draw(p, p.st, simT, gap, hour); }
  }
}
