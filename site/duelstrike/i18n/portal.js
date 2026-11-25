// 게임 포털 연결 (CrazyGames SDK v3) — 다른 곳(itch.io · 내 사이트 · 앱)에서는 아무것도 하지 않아요
(function () {
  const W = window;
  if (W.HP_PORTAL) return;
  // 모든 AudioContext 기억 (포털에서 '소리 끄기' 하면 한 번에 멈추려고)
  const ACs = [];
  for (const k of ['AudioContext', 'webkitAudioContext']) {
    const Orig = W[k]; if (!Orig) continue;
    const Wrapped = function (...a) { const c = new Orig(...a); ACs.push(c); if (P.muted) c.suspend().catch(() => {}); return c; };
    Wrapped.prototype = Orig.prototype; W[k] = Wrapped;
  }
  // iOS: 사용자 터치 때 멈춘 소리 다시 켜기
  const resumeAll = () => { if (!P.muted) for (const c of ACs) if (c.state === 'suspended') c.resume().catch(() => {}); };
  for (const ev of ['touchend', 'click', 'keydown']) addEventListener(ev, resumeAll, { passive: true });

  let sdk = null, playing = false;
  const P = W.HP_PORTAL = {
    env: 'none', device: null, muted: false,
    get on() { return !!sdk; },
    gameplayStart() { if (playing) return; playing = true; try { sdk && sdk.game.gameplayStart(); } catch (e) { /* 무시 */ } },
    gameplayStop() { if (!playing) return; playing = false; try { sdk && sdk.game.gameplayStop(); } catch (e) { /* 무시 */ } },
    loadingStart() { try { sdk && sdk.game.loadingStart(); } catch (e) { /* 무시 */ } },
    loadingStop() { try { sdk && sdk.game.loadingStop(); } catch (e) { /* 무시 */ } },
    happytime() { try { sdk && sdk.game.happytime(); } catch (e) { /* 무시 */ } },
    setMuted(m) { P.muted = !!m; for (const c of ACs) { try { m ? c.suspend() : c.resume(); } catch (e) { /* 무시 */ } } try { if (m && W.speechSynthesis) speechSynthesis.cancel(); } catch (e) { /* 무시 */ } },
    // 휴대폰/태블릿 화면 버튼을 보여 줄지: 포털 정보가 있으면 그걸, 없으면 터치 지원 여부
    isMobile() { if (P.device) return P.device !== 'desktop'; return ('ontouchstart' in W) || navigator.maxTouchPoints > 0; },
    ready: null,
  };
  P.ready = (async () => {
    const S = W.CrazyGames && W.CrazyGames.SDK;
    if (!S) return;
    try {
      await Promise.race([S.init(), new Promise((r, j) => setTimeout(() => j(new Error('sdk init timeout')), 4000))]);
      P.env = S.environment;
      if (P.env !== 'crazygames' && P.env !== 'local') return;
      sdk = S;
      const info = S.user && S.user.systemInfo;
      if (info) { P.device = info.device && info.device.type; if (W.HP_I18N && info.locale) W.HP_I18N.useSdkLocale(info.locale); }
      const st = S.game.settings; if (st && st.muteAudio) P.setMuted(true);
      try { S.game.addSettingsChangeListener((s) => P.setMuted(!!s.muteAudio)); } catch (e) { /* 무시 */ }
      P.loadingStart();
    } catch (e) { console.warn('portal sdk', e); }
  })();
  // 글자 드래그 선택 끄기 (포털 요구사항)
  try { const st = document.createElement('style'); st.textContent = 'html,body,canvas,button{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}input,textarea{-webkit-user-select:text;user-select:text}'; (document.head || document.documentElement).appendChild(st); } catch (e) { /* 무시 */ }
  // 메뉴가 보이면 '쉬는 중', 안 보이면 '게임 중' (게임마다 따로 고치지 않아도 되게)
  function menuWatch() {
    const sel = document.documentElement.getAttribute('data-lang-menu'); if (!sel) return;
    const vis = (el) => { if (!el) return false; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden'; };
    const extra = document.documentElement.getAttribute('data-pause') || '';
    setInterval(() => {
      const els = [sel].concat(extra ? extra.split(',') : []).map((q) => document.querySelector(q.trim()));
      const idle = els.some(vis) || document.hidden;
      idle ? P.gameplayStop() : P.gameplayStart();
    }, 700);
  }
  addEventListener('load', () => { P.ready.then(() => { if (!document.documentElement.hasAttribute('data-manual-loading')) P.loadingStop(); menuWatch(); }); });
})();
