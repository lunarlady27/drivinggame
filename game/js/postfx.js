// 화면 효과 (높음 품질): 밝은 빛 번짐(블룸) · 색감 보정 · 비네트
// 장면을 HDR 렌더 타깃에 그린 뒤, 밝은 부분만 뽑아 흐리게 해서 다시 더하고, 마지막에 톤매핑해요.
import * as THREE from 'three';

const VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';

export class PostFX {
  constructor(renderer) {
    this.r = renderer; this.enabled = true;
    const gl2 = renderer.capabilities.isWebGL2;
    const type = renderer.extensions.has('EXT_color_buffer_half_float') || gl2 ? THREE.HalfFloatType : THREE.UnsignedByteType;
    this.main = new THREE.WebGLRenderTarget(4, 4, { type, samples: gl2 ? 4 : 0, depthBuffer: true, stencilBuffer: true });
    this.main.texture.colorSpace = THREE.LinearSRGBColorSpace;
    const mk = () => new THREE.WebGLRenderTarget(4, 4, { type, depthBuffer: false });
    this.a = mk(); this.b = mk(); this.c = mk(); this.d = mk();
    this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quad.frustumCulled = false;
    this.scene = new THREE.Scene(); this.scene.add(this.quad);
    this.bright = new THREE.ShaderMaterial({
      uniforms: { tex: { value: null }, thr: { value: 1.0 } }, vertexShader: VS, depthTest: false, depthWrite: false, toneMapped: false,
      fragmentShader: `uniform sampler2D tex; uniform float thr; varying vec2 vUv;
        void main(){ vec3 c = texture2D(tex, vUv).rgb; float l = max(c.r, max(c.g, c.b)); gl_FragColor = vec4(c * smoothstep(thr, thr * 1.8, l), 1.0); }`,
    });
    this.blur = new THREE.ShaderMaterial({
      uniforms: { tex: { value: null }, dir: { value: new THREE.Vector2() } }, vertexShader: VS, depthTest: false, depthWrite: false, toneMapped: false,
      fragmentShader: `uniform sampler2D tex; uniform vec2 dir; varying vec2 vUv;
        void main(){ vec3 c = texture2D(tex, vUv).rgb * 0.227;
          c += (texture2D(tex, vUv + dir * 1.385).rgb + texture2D(tex, vUv - dir * 1.385).rgb) * 0.316;
          c += (texture2D(tex, vUv + dir * 3.231).rgb + texture2D(tex, vUv - dir * 3.231).rgb) * 0.070;
          gl_FragColor = vec4(c, 1.0); }`,
    });
    this.comp = new THREE.ShaderMaterial({
      uniforms: { tex: { value: null }, bl1: { value: null }, bl2: { value: null }, amt: { value: 0.6 }, sat: { value: 1.12 }, con: { value: 1.06 }, vig: { value: 0.32 }, warm: { value: 0.02 } },
      vertexShader: VS, depthTest: false, depthWrite: false,
      fragmentShader: `uniform sampler2D tex; uniform sampler2D bl1; uniform sampler2D bl2; uniform float amt; uniform float sat; uniform float con; uniform float vig; uniform float warm; varying vec2 vUv;
        void main(){
          vec3 c = texture2D(tex, vUv).rgb;
          c += (texture2D(bl1, vUv).rgb * 0.6 + texture2D(bl2, vUv).rgb * 0.8) * amt;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(vec3(l), c, sat);
          c = (c - 0.18) * con + 0.18; c = max(c, 0.0);
          c *= vec3(1.0 + warm, 1.0, 1.0 - warm);
          vec2 q = vUv - 0.5; c *= 1.0 - vig * dot(q, q) * 1.6;
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    this.w = 0; this.h = 0;
  }
  resize() {
    const s = this.r.getDrawingBufferSize(new THREE.Vector2());
    if (s.x === this.w && s.y === this.h) return;
    this.w = s.x; this.h = s.y;
    this.main.setSize(s.x, s.y);
    const hw = Math.max(2, s.x >> 2), hh = Math.max(2, s.y >> 2), qw = Math.max(2, s.x >> 3), qh = Math.max(2, s.y >> 3);
    this.a.setSize(hw, hh); this.b.setSize(hw, hh); this.c.setSize(qw, qh); this.d.setSize(qw, qh);
  }
  pass(mat, target) { this.quad.material = mat; this.r.setRenderTarget(target); this.r.render(this.scene, this.cam); }
  render(scene, camera, night = 0) {
    const r = this.r;
    this.resize();
    r.setRenderTarget(this.main); r.clear(); r.render(scene, camera);
    // 밝은 부분 → 1/4 · 1/8 크기에서 흐리게
    this.bright.uniforms.tex.value = this.main.texture; this.bright.uniforms.thr.value = 1.05 - night * 0.45; this.pass(this.bright, this.a);
    this.blur.uniforms.tex.value = this.a.texture; this.blur.uniforms.dir.value.set(1 / this.a.width, 0); this.pass(this.blur, this.b);
    this.blur.uniforms.tex.value = this.b.texture; this.blur.uniforms.dir.value.set(0, 1 / this.a.height); this.pass(this.blur, this.a);
    this.blur.uniforms.tex.value = this.a.texture; this.blur.uniforms.dir.value.set(2 / this.c.width, 0); this.pass(this.blur, this.c);
    this.blur.uniforms.tex.value = this.c.texture; this.blur.uniforms.dir.value.set(0, 2 / this.c.height); this.pass(this.blur, this.d);
    const u = this.comp.uniforms;
    u.tex.value = this.main.texture; u.bl1.value = this.a.texture; u.bl2.value = this.d.texture;
    u.amt.value = 0.35 + night * 0.55; u.vig.value = 0.3; u.warm.value = 0.025 * (1 - night);
    this.pass(this.comp, null);
  }
}
