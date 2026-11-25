// 한판 공용 다국어 (한국어 ↔ English)
// - 언어: localStorage 'hp_lang' → CrazyGames SDK 로캘 → 브라우저 언어 (한국어가 아니면 영어)
// - 글자 바꾸기: HTML 글자 · placeholder · title + 캔버스 fillText/strokeText (3D 간판 · HUD 포함)
// - 사전: 통째 문장 → 패턴(숫자 등) → ' · ' 로 나눈 조각 → 낱말 바꾸기 순서
(function () {
  const W = window;
  if (W.HP_I18N) return;
  const KO = /[가-힣]/;
  let lang = 'ko';
  try {
    const saved = localStorage.getItem('hp_lang');
    if (saved === 'ko' || saved === 'en') lang = saved;
    else lang = /^ko/i.test(navigator.language || '') ? 'ko' : 'en';
  } catch (e) { lang = /^ko/i.test(navigator.language || '') ? 'ko' : 'en'; }
  const DICT = new Map(), WORDS = [], PATS = [];
  const cache = new Map(), MISS = new Set();
  function add(d) {
    if (!d) return;
    for (const k in d.exact || {}) DICT.set(k.trim(), d.exact[k]);
    for (const [re, to] of d.patterns || []) PATS.push([new RegExp(re), to]);
    for (const k in d.words || {}) WORDS.push([k, d.words[k]]);
    WORDS.sort((a, b) => b[0].length - a[0].length);
    cache.clear();
  }
  function one(s) {
    const k = s.trim(); if (!k || !KO.test(k)) return s;
    if (DICT.has(k)) return s.replace(k, DICT.get(k));
    for (const suf of [' · 한판 HANPAN', ' · 한판 HANPAN ·']) { const kk = (k.endsWith(' ·') ? k.slice(0, -2) : k) + suf; if (DICT.has(kk)) return s.replace(k, DICT.get(kk).replace(/\s*·\s*(HANPAN|Hanpan)\s*·?\s*$/, k.endsWith(' ·') ? ' ·' : '')); }
    // 앞뒤 이모지 · 기호 · 숫자 떼고 다시
    const mm = k.match(/^([^가-힣A-Za-z]*)([\s\S]*?)([^가-힣A-Za-z]*)$/);
    if (mm && mm[2] !== k && DICT.has(mm[2])) return s.replace(k, mm[1] + DICT.get(mm[2]) + mm[3]);
    for (const [re, to] of PATS) { if (re.test(k)) { const r = k.replace(re, (...m) => { let out = to; for (let i = 1; i < m.length - 2; i++) out = out.split('$' + i).join(tr(m[i] == null ? '' : String(m[i]))); return out; }); return s.replace(k, r); } }
    return null;
  }
  function tr(s) {
    if (lang === 'ko' || typeof s !== 'string' || !KO.test(s)) return s;
    if (cache.has(s)) return cache.get(s);
    let r = one(s);
    if (r == null) {
      // 조각마다 (· | / ( ) 줄바꿈 기준)
      const parts = s.split(/(\s*[·|•\/\n→↔—~:,]\s*|\(|\)|\[|\])/);
      if (parts.length > 1) r = parts.map((p) => (KO.test(p) ? (one(p) ?? words(p)) : p)).join('');
      else r = words(s);
    }
    if (cache.size > 4000) cache.clear();
    if (KO.test(r) && s.trim() !== '한국어') { MISS.add(s.trim()); if (ROMA) r = roman(r); }
    cache.set(s, r);
    return r;
  }
  function words(s) {
    let r = s;
    for (const [k, v] of WORDS) if (r.includes(k)) r = r.split(k).join(v);
    // 남은 조사 정리
    r = r.replace(/([A-Za-z])(을|를|이|가|은|는|에서|으로|로|에|의|와|과|도|만)(?=\s|$|[.,!?])/g, '$1');
    return r;
  }
  // 사전에 없는 한글(주로 지명 · 정류장 이름)은 로마자로 (국어의 로마자 표기법, 간단판)
  let ROMA = document.documentElement.hasAttribute('data-romanize');
  const I_ = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h'];
  const V_ = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i'];
  const F_ = ['', 'k', 'k', 'k', 'n', 'n', 'n', 't', 'l', 'k', 'm', 'l', 'l', 'l', 'p', 'l', 'm', 'p', 'p', 't', 't', 'ng', 't', 't', 'k', 't', 'p', 't'];
  const FL = ['', 'g', 'kk', 'k', 'n', 'n', 'n', 'd', 'r', 'lg', 'lm', 'lb', 'ls', 'lt', 'lp', 'lh', 'm', 'b', 'bs', 's', 'ss', 'ng', 'j', 'ch', 'k', 't', 'p', 'h'];
  function roman(str) {
    return str.replace(/[가-힣]+/g, (w, at) => {
      const sp = at > 0 && /[A-Za-z]/.test(str[at - 1]) ? ' ' : '', sp2 = /[A-Za-z]/.test(str[at + w.length] || '') ? ' ' : '';
      let out = '';
      for (let i = 0; i < w.length; i++) {
        const c = w.charCodeAt(i) - 0xac00, ini = Math.floor(c / 588), med = Math.floor((c % 588) / 28), fin = c % 28;
        const next = i + 1 < w.length ? Math.floor((w.charCodeAt(i + 1) - 0xac00) / 588) : -1;
        let a = I_[ini];
        if (i > 0 && ini === 5) { if (/[ln]$/.test(out)) { out = out.replace(/n$/, 'l'); a = 'l'; } else if (/(ng|m|k|p)$/.test(out)) { a = 'n'; out = out.replace(/k$/, 'ng').replace(/p$/, 'm'); } else a = 'r'; }
        else if (i > 0 && (ini === 2 || ini === 6)) { if (/k$/.test(out)) out = out.replace(/k$/, 'ng'); else if (/p$/.test(out)) out = out.replace(/p$/, 'm'); else if (/t$/.test(out)) out = out.replace(/t$/, 'n'); else if (ini === 2 && /l$/.test(out)) a = 'l'; }
        let f;
        if (fin && next === 11) f = FL[fin] === 'ng' ? 'ng' : FL[fin]; // 받침 + 모음 → 넘겨 읽기
        else if (fin === 8 && next === 5) f = 'l';
        else f = F_[fin];
        out += a + V_[med] + f;
      }
      return sp + out.charAt(0).toUpperCase() + out.slice(1) + sp2;
    });
  }
  // DOM 글자 바꾸기
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
  function walk(root) {
    if (lang === 'ko' || !root) return;
    if (root.nodeType === 3) { if (KO.test(root.nodeValue)) { const t = tr(root.nodeValue); if (t !== root.nodeValue) root.nodeValue = t; } return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) { const tag = root.tagName; if (tag === 'SCRIPT' || tag === 'STYLE' || root.hasAttribute('data-noi18n')) return; for (const a of ATTRS) { const v = root.getAttribute && root.getAttribute(a); if (v && KO.test(v)) root.setAttribute(a, tr(v)); } }
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (KO.test(n.nodeValue) && !(n.parentNode && /^(SCRIPT|STYLE)$/.test(n.parentNode.tagName)) ? 1 : 3) });
    const list = []; let n; while ((n = tw.nextNode())) list.push(n);
    for (const t of list) { const v = tr(t.nodeValue); if (v !== t.nodeValue) t.nodeValue = v; }
    if (root.querySelectorAll) for (const el of root.querySelectorAll('[placeholder],[title],[aria-label],[alt]')) for (const a of ATTRS) { const v = el.getAttribute(a); if (v && KO.test(v)) el.setAttribute(a, tr(v)); }
  }
  function start() {
    if (lang === 'ko') return;
    document.documentElement.lang = 'en';
    if (KO.test(document.title)) document.title = tr(document.title);
    walk(document.body);
    new MutationObserver((ms) => { for (const m of ms) { if (m.type === 'characterData') walk(m.target); else if (m.type === 'attributes') walk(m.target); else for (const n of m.addedNodes) walk(n); } })
      .observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  // 캔버스 글자 (2D HUD · 3D 간판 텍스처)
  const P = CanvasRenderingContext2D.prototype;
  for (const fn of ['fillText', 'strokeText', 'measureText']) {
    const orig = P[fn];
    P[fn] = function (t, ...a) { return orig.call(this, lang === 'ko' ? t : tr(String(t)), ...a); };
  }
  // alert/confirm 도 (혹시 쓰는 곳이 있으면)
  W.HP_I18N = {
    get lang() { return lang; },
    setLang(l) { try { localStorage.setItem('hp_lang', l); } catch (e) { /* 무시 */ } location.reload(); },
    add, tr, walk, roman, missing: MISS,
    set romanize(v) { ROMA = !!v; cache.clear(); },
    useSdkLocale(loc) { // CrazyGames 등 SDK 로캘 (저장된 선택이 없을 때만)
      try { if (localStorage.getItem('hp_lang')) return; } catch (e) { /* 무시 */ }
      const want = /^ko/i.test(loc || '') ? 'ko' : 'en'; if (want !== lang) { lang = want; cache.clear(); start(); }
    },
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  // 언어 바꾸기 작은 버튼 (오른쪽 아래)
  function btn() {
    const b = document.createElement('button'); b.id = 'hpLang'; b.textContent = lang === 'ko' ? 'EN' : '한국어'; b.setAttribute('data-noi18n', '');
    b.style.cssText = 'position:fixed;right:8px;bottom:8px;z-index:99999;font:700 12px sans-serif;color:#fff;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.3);border-radius:99px;padding:4px 10px;cursor:pointer;opacity:.75';
    b.onclick = () => W.HP_I18N.setLang(lang === 'ko' ? 'en' : 'ko');
    document.body.appendChild(b); W.HP_I18N.btn = b;
    // 메뉴 화면에서만 보이기: <html data-lang-menu="#menu,#title"> 로 지정한 요소가 보일 때만
    const sel = document.documentElement.getAttribute('data-lang-menu');
    if (sel) setInterval(() => { const vis = [...document.querySelectorAll(sel)].some((e) => e.offsetParent !== null && !e.classList.contains('hidden')); b.style.display = vis ? '' : 'none'; }, 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', btn); else btn();
})();
