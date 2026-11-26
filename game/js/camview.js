// 📹 후방 카메라 + 서라운드뷰 (후진 기어 R에서 자동으로, 또는 버튼으로)
// 같은 화면(캔버스)의 작은 영역(시저)에 카메라 두 대로 한 번 더 그려요 → 따로 텍스처를 안 만들어서 가볍게
import * as THREE from 'three';

export class CamView {
  constructor(renderer) {
    this.r = renderer;
    this.rear = new THREE.PerspectiveCamera(108, 16 / 10, 0.1, 400);
    this.top = new THREE.PerspectiveCamera(62, 1, 0.5, 200);
    this.on = false; this.forced = false; this.box = null;
    const el = document.createElement('div'); el.id = 'camview'; el.className = 'hidden';
    el.innerHTML = `<div class="cv-pane cv-top"><span>서라운드뷰</span><i class="cv-car"></i></div>
      <div class="cv-pane cv-rear"><span>후방 카메라</span>
        <svg viewBox="0 0 100 62" preserveAspectRatio="none">
          <path class="g-far" d="M 30 30 L 70 30" /><path class="g-mid" d="M 24 40 L 76 40" /><path class="g-near" d="M 16 52 L 84 52" />
          <path class="g-side" d="M 30 30 L 16 62 M 70 30 L 84 62" />
          <path class="g-path" d="M 50 62 L 50 32" />
        </svg>
        <em class="cv-dist"></em></div>`;
    document.body.appendChild(el);
    this.el = el; this.pathEl = el.querySelector('.g-path'); this.distEl = el.querySelector('.cv-dist');
  }
  // 자리: (1) 운전석에서 가운데 내비 화면이 보이면 그 화면 안에 (진짜 차처럼)
  //       (2) 아니면 왼쪽 위 구석에 작게 — 앞 유리(가운데)는 가리지 않아요
  layout(screenRect) {
    const W = innerWidth, H = innerHeight;
    let top, rear;
    if (screenRect && screenRect.width > 120 && screenRect.height > 50) {
      // 내비 화면 자리에서 오른쪽 · 위로 키워요 (조수석 쪽 대시보드 위 — 운전자 앞 도로는 안 가려요)
      const k = Math.min(2, (H * 0.3) / screenRect.height);
      let w0 = screenRect.width * k, h0 = screenRect.height * k, l0 = screenRect.left, b0 = screenRect.bottom;
      if (l0 + w0 > W - 8) l0 = Math.max(8, W - 8 - w0);
      const r = { left: l0, right: l0 + w0, top: b0 - h0, bottom: b0, width: w0, height: h0 };
      const pad = 3, wT = Math.round(r.height * 0.9);
      top = { x: Math.round(r.left + pad), y: Math.round(r.top + pad), w: Math.min(wT, Math.round(r.width * 0.38)), h: Math.round(r.height - pad * 2) };
      rear = { x: top.x + top.w + 4, y: top.y, w: Math.round(r.right - pad - (top.x + top.w + 4)), h: top.h };
      this.el.classList.add('inscreen');
    } else {
      // 내비 화면이 없는 차(버스 등): 후진할 땐 앞이 덜 중요하니 화면 가운데 위에 크게
      const h = Math.round(Math.min(H * 0.3, 220)), wR = Math.round(h * 1.5), wT = Math.round(h * 0.75);
      const y0 = Math.round(Math.max(70, H * 0.16)), x0 = Math.round((W - (wT + 6 + wR)) / 2);
      top = { x: x0, y: y0, w: wT, h }; rear = { x: x0 + wT + 6, y: y0, w: wR, h };
      this.el.classList.remove('inscreen');
    }
    this.box = { top, rear };
    const st = (e, b) => Object.assign(e.style, { left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' });
    st(this.el.querySelector('.cv-top'), top); st(this.el.querySelector('.cv-rear'), rear);
  }
  setVisible(v) {
    if (v === this.on) return;
    this.on = v; this.el.classList.toggle('hidden', !v);
  }
  // 매 프레임: 카메라 자리 잡기 + 가이드선 휘기 + 뒤 장애물 거리
  update(P, steer, nearBack) {
    if (!this.on || !P) return;
    const sim = P.sim, o = P.obj, sp = P.spec;
    const fx = Math.sin(sim.heading), fz = Math.cos(sim.heading);
    const L = sp.len || 4.6, Hh = sp.hei || 1.5, y = (P.y || 0);
    // 후방: 트렁크 위 번호판 근처에서 뒤쪽 아래를 봐요
    this.rear.position.set(sim.x - fx * (L / 2 + 0.05), y + Math.min(1.15, Hh * 0.62), sim.z - fz * (L / 2 + 0.05));
    this.rear.lookAt(sim.x - fx * (L / 2 + 6), y, sim.z - fz * (L / 2 + 6));
    this.rear.aspect = this.box.rear.w / this.box.rear.h; this.rear.updateProjectionMatrix();
    // 서라운드: 차 바로 위에서 내려다봐요 (차 앞이 화면 위)
    const ht = Math.max(7, L * 1.9);
    this.top.position.set(sim.x, y + ht, sim.z);
    this.top.up.set(fx, 0, fz);
    this.top.lookAt(sim.x, y, sim.z);
    this.top.aspect = this.box.top.w / this.box.top.h; this.top.updateProjectionMatrix();
    // 핸들 방향대로 예상 경로 휘기 (뒤로 갈 땐 반대로 보여요)
    const k = Math.max(-1, Math.min(1, steer || 0)) * 26;
    this.pathEl.setAttribute('d', `M 38 62 Q ${38 - k * 0.4} 46 ${38 - k} 30 M 62 62 Q ${62 - k * 0.4} 46 ${62 - k} 30`);
    if (nearBack == null) { this.distEl.textContent = ''; this.el.classList.remove('warn', 'stop'); }
    else {
      this.distEl.textContent = nearBack < 0.4 ? '정지!' : `${nearBack.toFixed(1)} m`;
      this.el.classList.toggle('stop', nearBack < 0.6); this.el.classList.toggle('warn', nearBack >= 0.6 && nearBack < 1.6);
    }
    void o;
  }
  // 메인 화면을 그린 뒤 호출: 두 칸을 같은 캔버스에 덧그려요
  render(scene, lite = false) {
    if (!this.on || !this.box) return;
    this.n = (this.n || 0) + 1;
    const r = this.r, H = innerHeight;
    const prevAuto = r.autoClear;
    r.autoClear = false;
    r.setScissorTest(true);
    // 가벼운 모드: 위에서 본 화면은 빼고 후방 카메라만
    const list = lite ? [[this.rear, this.box.rear]] : [[this.top, this.box.top], [this.rear, this.box.rear]];
    if (lite && this.el) this.el.classList.add('lite');
    for (const [cam, b] of list) {
      const yGL = H - b.y - b.h;
      r.setViewport(b.x, yGL, b.w, b.h); r.setScissor(b.x, yGL, b.w, b.h);
      r.clear(true, true, false);
      r.render(scene, cam);
    }
    r.setScissorTest(false);
    r.setViewport(0, 0, innerWidth, innerHeight);
    r.autoClear = prevAuto;
  }
}
