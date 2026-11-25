// 지도 자료 불러오기
// - 보통(웹 링크): 모듈 import — 파일 이름을 그대로 적어 둬야(정적 경로) 아티팩트 서버에서도 잘 불러와져요
// - 내려받은 파일을 더블클릭해서 열 때(file://): 일반 <script>로 불러와요
const MODS = {
  gjhwy: () => import('./gjhwy.js'),
  gjmap: () => import('./gjmap.js'),
  gjseoul: () => import('./gjseoul.js'),
  hw_busan: () => import('./hw_busan.js'),
  hw_daegu: () => import('./hw_daegu.js'),
  hw_daejeon: () => import('./hw_daejeon.js'),
  hw_incheon: () => import('./hw_incheon.js'),
  rg_andong: () => import('./rg_andong.js'),
  rg_busan: () => import('./rg_busan.js'),
  rg_changwon: () => import('./rg_changwon.js'),
  rg_cheonan: () => import('./rg_cheonan.js'),
  rg_cheongju: () => import('./rg_cheongju.js'),
  rg_chuncheon: () => import('./rg_chuncheon.js'),
  rg_daegu: () => import('./rg_daegu.js'),
  rg_daejeon: () => import('./rg_daejeon.js'),
  rg_gangneung: () => import('./rg_gangneung.js'),
  rg_gimhae: () => import('./rg_gimhae.js'),
  rg_gimpo: () => import('./rg_gimpo.js'),
  rg_gumi: () => import('./rg_gumi.js'),
  rg_gunsan: () => import('./rg_gunsan.js'),
  rg_gyeongju: () => import('./rg_gyeongju.js'),
  rg_incheon: () => import('./rg_incheon.js'),
  rg_jeju: () => import('./rg_jeju.js'),
  rg_jeonju: () => import('./rg_jeonju.js'),
  rg_jinju: () => import('./rg_jinju.js'),
  rg_mokpo: () => import('./rg_mokpo.js'),
  rg_pohang: () => import('./rg_pohang.js'),
  rg_pyeongtaek: () => import('./rg_pyeongtaek.js'),
  rg_sejong: () => import('./rg_sejong.js'),
  rg_seogwipo: () => import('./rg_seogwipo.js'),
  rg_seoul: () => import('./rg_seoul.js'),
  rg_sokcho: () => import('./rg_sokcho.js'),
  rg_suncheon: () => import('./rg_suncheon.js'),
  rg_suwon: () => import('./rg_suwon.js'),
  rg_ulsan: () => import('./rg_ulsan.js'),
  rg_wonju: () => import('./rg_wonju.js'),
  rg_yeosu: () => import('./rg_yeosu.js'),
  rp_busan: () => import('./rp_busan.js'),
  rp_daegu: () => import('./rp_daegu.js'),
  rp_daejeon: () => import('./rp_daejeon.js'),
  rp_gwangju: () => import('./rp_gwangju.js'),
  rp_incheon: () => import('./rp_incheon.js'),
  rp_seoul: () => import('./rp_seoul.js'),
};
export function loadData(path) {
  const name = path.replace(/^.*\//, '').replace(/\.js$/, '');
  if (globalThis.__RK_CLASSIC) {
    return new Promise((res, rej) => {
      const D = globalThis.__RKD || (globalThis.__RKD = {});
      if (D[name]) return res(D[name]);
      const s = document.createElement('script');
      s.src = 'js/data/' + name + '.js';
      s.onload = () => (D[name] ? res(D[name]) : rej(new Error('지도 자료를 읽지 못했어요: ' + name)));
      s.onerror = () => rej(new Error('지도 자료 파일이 없어요: ' + name));
      document.head.appendChild(s);
    });
  }
  const f = MODS[name];
  if (!f) return Promise.reject(new Error('모르는 지도 자료: ' + name));
  return f().then((m) => m.default);
}
