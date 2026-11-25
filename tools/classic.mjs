// ES 모듈 게임 코드를 일반 <script> 하나로 묶어요 (내려받아 더블클릭해도 열리게)
import * as esbuild from '/opt/npm-tools/node_modules/esbuild/lib/main.js';
const [entry, out, vendorDir] = process.argv.slice(2);
await esbuild.build({
  entryPoints: [entry], bundle: true, format: 'iife', outfile: out, minify: true, target: ['es2020', 'safari14.1', 'chrome80'],
  banner: { js: "/* 오래된 사파리(아이패드) 대비 */ for (const C of [Array, String]) if (!C.prototype.at) Object.defineProperty(C.prototype, 'at', { configurable: true, writable: true, value: function (i) { i = Math.trunc(i) || 0; if (i < 0) i += this.length; return i < 0 || i >= this.length ? undefined : this[i]; } });" }, charset: 'utf8', legalComments: 'none', logLevel: 'error',
  plugins: [{ name: 'data-external', setup(b) {
    // 지도 자료는 묶지 않아요 (따로 js/data/ 에서 필요할 때 불러옴)
    b.onResolve({ filter: /(^|\/)(gjmap|gjhwy|gjseoul|hw_[a-z]+|rp_[a-z]+|rg_[a-z]+)\.js$/ }, (a) => ({ path: a.path, external: true }));
  } }, { name: 'three', setup(b) {
    b.onResolve({ filter: /^three(\/.*)?$/ }, (a) => (a.path === 'three' ? { path: vendorDir + '/three/three.module.js' } : { path: vendorDir + '/three/addons/' + a.path.replace(/^three\/addons\//, '') }));
  } }],
});
