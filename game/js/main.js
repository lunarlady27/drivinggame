import * as THREE from 'three';
import { streamCorridor, buildCorridorNear } from './corridor.js';
import { streamRegion, buildRegionNear, updateRegionSignals } from './region.js';
import { buildWorld, streamBuildings, buildBuildingsNear, W, roadInfoAt, zoneAt, onBump, groundY, levelAt, updateSignals, signalState, queryColliders, blocked, UG, obNearest, linkY, railDist, edgesNear, lanePos , updateLabels } from './world.js';
import { Train } from './train.js';
import { buildVehicle, buildPed, animPed, randomPlate, applyEnv, setEnvIntensity, MAT, buildAvatar } from './models.js';
const MAT_CABIN = MAT.cabinLight;
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Showroom } from './showroom.js';
import { Multiplayer } from './mp.js';
import { ensureQuests, questAdd } from './quests.js';
import { VehicleSim } from './physics.js';
import { Traffic } from './traffic.js';
import { Env } from './env.js';
import { GameAudio } from './audio.js';
import { HUBS, hubNear, tripsFrom, playTrip, decorateAirport, hubSign } from './travel.js';
import { S, load, save, ownedBy, hasOpt, initCloud, flushCloud } from './state.js';
import { BY_ID, ROUTES, ROUTE_COLORS, DISTRICTS, BUS_TYPES, trimKind } from './data.js';
import { Nav, arrowSVG, fmtDist, TURN_WORD } from './nav.js';
import { initNavUI } from './navui.js';
import { initAdmin, ensureAdmin, syncAdminWithWorld, adminTick, customRoutesForWorld, routeWeightOf, companyNameOf, routeModelOf, routeLiveryOf } from './admin.js';
import { drawCityMap, mapView, basemap, cityAt, cityBox } from './mapdraw.js';
import { SUBWAY } from './subway.js';
import { Transit } from './transit.js';
import { Hazards } from './hazards.js';
import { AutoDrive } from './autodrive.js';
import { initUI, show, hideAll, currentScreen, summaryModal, drawWorldMap, modal } from './ui.js';
import { BusRouteMission, CheckpointMission, ParkingMission, FreeMission, MODES } from './missions.js';
import { TaxiMission, DeliveryMission, LicenseMission } from './jobs.js';
import { EmergencyMission } from './emergency.js';
import { makeHeadUnit, huTheme } from './headunit.js';
import { Stage } from './stage.js';
import { BisPanel } from './bis.js';
import { StopBis } from './stopbis.js';
import { PostFX } from './postfx.js';
import { Achievements } from './achieve.js';
import { CamView } from './camview.js';
import { Police } from './police.js';
import { setupWear, applyWear, addDamage, addDirt, powerMul, Smoke, serviceMenu, PhotoMode } from './extras.js';
import { clamp, lerp, won, isTouch, angDiff } from './util.js';

// 오래된 사파리(아이패드)에서 .at()이 없어 멈추지 않게
for (const C of [Array, String]) if (!C.prototype.at) Object.defineProperty(C.prototype, 'at', { configurable: true, writable: true, value: function (i) { i = Math.trunc(i) || 0; if (i < 0) i += this.length; return i < 0 || i >= this.length ? undefined : this[i]; } });
const $ = (s) => document.querySelector(s);
load();
// 처음 실행(또는 이 버전 처음): 기기에 맞게 그래픽 품질 자동 선택 — 휴대폰·태블릿은 '낮음'
if (S.settings.qv !== 3) {
  S.settings.qv = 3;
  const mobile = isTouch || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  S.settings.quality = mobile || (navigator.hardwareConcurrency || 8) <= 4 ? 'low' : 'medium';
  if (mobile) { S.settings.traffic = 'low'; S.settings.fx = false; S.settings.sharp = false; } // 태블릿: 가볍게 시작
  try { save(); } catch (e) { /* 저장 실패해도 계속 */ }
}
// 지난번에 시작하다가 튕겼으면(태블릿 메모리 부족 등) 이번엔 가볍게: 그래픽 '낮음' · 거울 · 효과 끔 · 차 적게
let SAFE_NOTE = '';
try {
  const b = JSON.parse(localStorage.getItem('rk_boot') || 'null');
  if (b && b.n >= 1 && Date.now() - b.t < 30 * 60 * 1000) {
    const before = S.settings.quality;
    S.settings.quality = 'low'; S.settings.fx = false; S.settings.mirrors = false;
    if (b.n >= 2) { S.settings.traffic = 'low'; S.settings.peds = false; }
    SAFE_NOTE = before !== 'low' || b.n >= 2 ? '⚠️ 지난번에 시작하다가 꺼져서 그래픽을 가볍게 바꿨어요 (설정에서 다시 바꿀 수 있어요)' : '';
    try { save(); } catch (e) { /* 무시 */ }
  }
  localStorage.setItem('rk_boot', JSON.stringify({ n: b && Date.now() - b.t < 30 * 60 * 1000 ? b.n + 1 : 1, t: Date.now() }));
} catch (e) { /* 저장소를 못 쓰면 그냥 진행 */ }
const bootOk = () => { try { localStorage.removeItem('rk_boot'); } catch (e) { /* 무시 */ } };
addEventListener('pagehide', bootOk);
const Q = S.settings.quality;
// 태블릿 · 폰 + 낮음: 더 가볍게 (화면 해상도 1배 · 보이는 거리 짧게 · 거울 · 카메라 덜 자주)
const LITE = Q === 'low' && (isTouch || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent));
let ULTRA = false; try { ULTRA = LITE && sessionStorage.getItem('rk_ultra') === '1'; } catch (e) { /* 무시 */ } // 화면이 한 번 사라졌으면 더 가볍게
const QF = Q === 'high' ? 1 : Q === 'medium' ? 0.8 : ULTRA ? 0.32 : LITE ? 0.42 : 0.55; // 보이는 거리 비율

// ===================== 렌더러 =====================
const renderer = new THREE.WebGLRenderer({ antialias: Q !== 'low', powerPreference: 'high-performance', stencil: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, S.settings.sharp ? 2 : Q === 'high' ? 1.6 : Q === 'medium' ? 1.35 : ULTRA ? 0.75 : LITE ? 1 : 1.15)); // 앞 화면이 흐리지 않게 (예전보다 선명하게)
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = Q !== 'low';
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
$('#game').appendChild(renderer.domElement);
// 그래픽 메모리가 모자라 화면이 하얗게 사라지면(태블릿): 먼저 저절로 돌아오길 4초 기다리고,
// 안 돌아오면 '초경량'으로 바꿔 새로고침 — 같은 일이 반복되면 무한 새로고침 대신 안내만
let glLostT = 0;
const glNote = document.createElement('div');
glNote.style.cssText = 'position:fixed;inset:0;z-index:9999;display:none;place-items:center;background:rgba(11,15,20,.92);color:#fff;font:700 19px sans-serif;text-align:center;line-height:1.6';
document.body.appendChild(glNote);
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  glNote.innerHTML = '🔧 화면을 다시 준비하는 중이에요… 잠시만요';
  glNote.style.display = 'grid';
  clearTimeout(glLostT);
  glLostT = setTimeout(() => {
    let n = 0; try { n = +(sessionStorage.getItem('rk_gl') || 0) + 1; sessionStorage.setItem('rk_gl', n); sessionStorage.setItem('rk_ultra', '1'); } catch (er) { /* 무시 */ }
    try { S.settings.quality = 'low'; S.settings.traffic = 'low'; S.settings.peds = false; S.settings.mirrors = false; S.settings.fx = false; save(); } catch (er) { /* 무시 */ }
    if (n <= 2) { glNote.innerHTML = '🔧 그래픽 메모리가 부족해서<br>더 가볍게 바꿔 다시 시작해요…'; setTimeout(() => location.reload(), 1200); }
    else glNote.innerHTML = '😥 이 기기의 그래픽 메모리가 부족해요<br><small>다른 앱과 브라우저 탭을 모두 닫은 뒤</small><br><button onclick="location.reload()" style="margin-top:14px;padding:12px 26px;border-radius:12px;border:0;background:#2fb8ff;color:#fff;font:800 18px sans-serif">다시 시작</button>';
  }, 4000);
}, false);
renderer.domElement.addEventListener('webglcontextrestored', () => { clearTimeout(glLostT); glNote.style.display = 'none'; renderer.shadowMap.needsUpdate = true; }, false);
// 차량 반사용 환경맵
{
  const pmrem = new THREE.PMREMGenerator(renderer);
  applyEnv(pmrem.fromScene(new RoomEnvironment(), 0.04).texture);
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 3600);
camera.position.set(0, 30, -60);

// 사이드미러 (렌더 타깃 → 화면 위 오버레이)
const MRW = LITE ? 200 : Q === 'low' ? 240 : 360, MRH = LITE ? 122 : Q === 'low' ? 146 : 220;
const mirrorRT = [new THREE.WebGLRenderTarget(MRW, MRH), new THREE.WebGLRenderTarget(MRW, MRH)];
mirrorRT.forEach((r) => (r.texture.colorSpace = THREE.SRGBColorSpace));
const mirrorCam = [new THREE.PerspectiveCamera(34, 360 / 220, 0.5, Q === 'low' ? 160 : 400), new THREE.PerspectiveCamera(34, 360 / 220, 0.5, Q === 'low' ? 160 : 400)];
const overlay = new THREE.Scene();
const overlayCam = new THREE.OrthographicCamera(0, innerWidth, innerHeight, 0, -1, 1);
const mirrorQuads = mirrorRT.map((rt) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: rt.texture, toneMapped: false }));
  overlay.add(m); return m;
});
const mirrorFrames = [0, 1].map(() => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x111111 }));
  m.position.z = -0.5; overlay.add(m); return m;
});
// 후측방 충돌 경고(BCA): 사이드미러 바깥 위쪽 모서리의 주황 경고등 (사각지대에 차가 있으면 켜짐, 그쪽 깜빡이 켜면 깜빡)
const bcaTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.strokeStyle = '#ffb02e'; x.lineWidth = 5; x.lineJoin = 'round'; x.beginPath(); x.moveTo(32, 6); x.lineTo(60, 56); x.lineTo(4, 56); x.closePath(); x.stroke();
  x.fillStyle = '#ffb02e'; x.fillRect(22, 34, 20, 12); x.fillRect(26, 28, 12, 8); x.fillStyle = '#222'; x.fillRect(24, 46, 5, 4); x.fillRect(35, 46, 5, 4);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const bcaIcons = [0, 1].map(() => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: bcaTex, transparent: true, toneMapped: false, depthTest: false })); m.position.z = 0.2; m.visible = false; overlay.add(m); return m; });
function updateBCA(P, blinkOn) {
  const sim = P.sim, s = Math.sin(sim.heading), c = Math.cos(sim.heading), on = [false, false];
  if ((sim.kmh > 8 || G.bcaDemo) && !P.onFoot) for (const a of traffic.cars) {
    if (!a.active) continue;
    const dx = a.x - sim.x, dz = a.z - sim.z, lon = dx * s + dz * c, lat = dx * c - dz * s;
    if (lon < -15 || lon > 1 || Math.abs(lat) < 1.6 || Math.abs(lat) > 5.5) continue;
    on[lat > 0 ? 0 : 1] = true;
  }
  const t = performance.now();
  bcaIcons.forEach((m, i) => {
    const blinkHere = i === 0 ? blinkOn.l : blinkOn.r;
    m.visible = on[i] && (!blinkHere || (t % 500) < 300);
    if (on[i] && blinkHere && !G['bcaW' + i]) { G['bcaW' + i] = true; try { audio.tone(1400, 0.12, 'square', 0.05); setTimeout(() => audio.tone(1400, 0.12, 'square', 0.05), 180); } catch (e) { /* 무시 */ } }
    if (!(on[i] && blinkHere)) G['bcaW' + i] = false;
  });
  G.bca = on;
}
// 🚌 자율주행 버스: 정류장에서 오른쪽 차로로 붙어 서고 → 문 열고 승객 태우고 내리고 → 문 닫고 출발
function busAutoStop(ad, P, sim) {
  const m = G.mission, A = m && m.ai;
  autod.keepRight = false;
  autod.busRoute = m && m.route && m.route.links && P.spec.type === 'bus' ? m.route : null;
  if (!A || P.spec.type !== 'bus' || !P.obj.doors.length) return;
  const doors = P.obj.doors, front = doors[0], rear = doors[1] || doors[0];
  const v = Math.max(0, sim.vl);
  // 긴 버스는 교차로에서 크게 돌아야 해서: 노선이 꺾이는 곳 앞에선 시속 15km 이하로
  const L = autod.link, R = m.route, k = L && R.links ? R.links.indexOf(L) : -1;
  if (k >= 0 && m.state === 'drive') {
    const nx = R.links[(k + 1) % R.links.length], turn = Math.abs(angDiff(L.heading, nx.heading));
    const toEnd = (L.s1 ?? L.len) - ((sim.x - L.from.x) * L.dir.x + (sim.z - L.from.z) * L.dir.z);
    if (turn > 0.5 && toEnd < 70) { const vt = turn > 1.2 ? 3.6 : 5; if (v > vt) { ad.throttle = 0; ad.brake = Math.max(ad.brake || 0, clamp((v - vt) * 0.4, 0.1, 0.8)); } else ad.throttle = Math.min(ad.throttle, 0.35); }
  }
  // 서 있을 때 브레이크를 계속 밟으면 자동 기어가 후진으로 바뀌어서 → 멈춘 뒤엔 주차 브레이크(hold)로 잡기
  const stopHard = () => { ad.throttle = 0; if (v < 0.4) { ad.brake = 0; ad.hold = true; } else ad.brake = 1; };
  if (sim.gear === 'R') sim.gear = 'D';
  if (m.state === 'drive') {
    // 정류장을 떠날 때 문이 열려 있으면 먼저 닫고 출발
    if ((front.target || rear.target) && v < 1) { if (front.target) { front.target = 0; audio.door(); } if (rear.target) rear.target = 0; }
    if (front.t > 0.05 || rear.t > 0.05) { stopHard(); return; }
    if (!A.need || A.along > 4) return;
    // 정류장 바로 앞(같은 길 · 15m 안)은 정확한 직선 거리, 그 전엔 노선 따라 남은 거리
    const near = -A.along < 15 && Math.abs(A.lat) < 6;
    // 노선을 벗어나 다른 길로 가는 중이면: 정류장과 같은 길(옆 거리 8m 안)로 다가갈 때만
    const dist = near ? -A.along : A.routeDist !== null && A.routeDist !== undefined ? A.routeDist : Math.abs(A.lat) < 8 ? -A.along : 999;
    if (dist < -2) return;
    if (dist < 220) autod.keepRight = true;
    if (dist > 160) return;
    const vt = Math.sqrt(2 * 0.9 * Math.max(0, dist - 0.4)); // 부드럽게 0.9 m/s² 로 감속
    if (dist < 0.5) stopHard();
    else if (v > vt + 0.3) { ad.throttle = 0; ad.brake = clamp((v - vt) * 0.6 + 0.15, 0.1, 1); }
    else ad.throttle = Math.min(ad.throttle, dist < 25 ? 0.25 : ad.throttle);
    if (dist < 60 && G.autoBusStop !== m.stop) { G.autoBusStop = m.stop; toast(`🤖🚏 ${m.stop.name} 정류장에 섭니다`, 'info', 1800); }
    // 차로가 안 맞아 정차 판정이 안 되면 4초 뒤 그냥 지나감 (멈춰 버리지 않게)
    if (dist < 1.5 && v < 0.3) { G.busHoldT = (G.busHoldT || 0) + 1 / 60; if (G.busHoldT > 4) { ad.brake = 0; ad.hold = false; ad.throttle = 0.3; } } else G.busHoldT = 0;
  } else if (m.state === 'stopped') {
    autod.keepRight = true;
    stopHard();
    const pend = A.board + A.alight;
    if (pend > 0) {
      if (A.board > 0 && front.target === 0) { front.target = 1; audio.door(); }
      if (A.alight > 0 && rear !== front && rear.target === 0) { rear.target = 1; audio.door(); }
    } else if (m.stopT > 1.2 && (front.target || rear.target)) {
      // 다 타고 내리면 문 닫기 (닫히면 미션이 출발 처리)
      if (front.target) { front.target = 0; audio.door(); } if (rear.target) { rear.target = 0; }
    }
  }
}
// 🚸 어린이 통학버스 특별 보호: 경광등 켜고 서 있는 통학차량 옆을 빠르게 지나가면 경고 · 벌금
function schoolBusRule(P) {
  const sim = P.sim; if (P.onFoot || sim.kmh < 12) return;
  const t = performance.now(); if (t - (G.schoolT || 0) < 8000) return;
  const s = Math.sin(sim.heading), c = Math.cos(sim.heading);
  for (const a of traffic.cars) {
    if (!a.active || !a.obj.school || a.v > 0.6) continue;
    const dx = a.x - sim.x, dz = a.z - sim.z, lon = dx * s + dz * c, lat = dx * c - dz * s;
    if (lon > -2 && lon < 5 && Math.abs(lat) < 4.5) {
      G.schoolT = t;
      audio.tone && audio.tone(880, 0.15, 'square', 0.05);
      fine(70000, '🚸 서 있는 어린이 통학버스 옆은 일시정지 후 천천히 지나가야 해요');
      return;
    }
  }
}
// 시연용: 왼쪽 뒤 사각지대에 차 한 대를 따라오게 해서 경고등을 보여 줌
function forceBlindCar(P) {
  const sim = P.sim, a = G.bcaCar && G.bcaCar.active ? G.bcaCar : (G.bcaCar = traffic.cars.find((c) => c.active && !c.isBus));
  if (!a) return;
  const h = sim.heading, s = Math.sin(h), c = Math.cos(h);
  a.x = sim.x - s * 6.5 + c * 3.4; a.z = sim.z - c * 6.5 - s * 3.4;
  a.obj.group.position.set(a.x, P.y || 0, a.z); a.obj.group.rotation.y = h; a.obj.group.updateMatrixWorld(true);
}
function layoutMirrors() {
  overlayCam.right = innerWidth; overlayCam.top = innerHeight; overlayCam.updateProjectionMatrix();
  const w = innerWidth * 0.18, h = w * 0.6;
  [[innerWidth * 0.18, innerHeight * 0.44, 0], [innerWidth * 0.84, innerHeight * 0.56, 1]].forEach(([x, y, i]) => {
    mirrorQuads[i].scale.set(-w, h, 1); mirrorQuads[i].position.set(x, y, 0);
    mirrorFrames[i].scale.set(w + 8, h + 8, 1); mirrorFrames[i].position.set(x, y, -0.5);
    const iz = Math.max(18, h * 0.2); bcaIcons[i].scale.set(iz, iz, 1);
    bcaIcons[i].position.set(x + (i === 0 ? -1 : 1) * (w / 2 - iz * 0.7), y + h / 2 - iz * 0.7, 0.2);
  });
}
layoutMirrors();

// ===================== 상태 =====================
const G = {
  state: 'loading', mission: null, P: null, camMode: 0, simT: 0, keys: {}, touch: {},
  steerIn: 0, thrIn: 0, brkIn: 0, lookYaw: 0, lookPitch: 0, zoom: 1, lastLook: 0, camHeading: 0,
  shake: 0, sigT: 0, roadT: 0, road: null, prevRoad: null, speedT: 0, speedWarn: -99, busLaneT: 0, frame: 0,
  free: { pos: new THREE.Vector3(), yaw: 0, pitch: -0.2 }, refuel: null, bigMap: false, missionHTML: '', hintT: 0, menuT: 0, impactCool: 0,
  dirtyVehicle: false, mirrorsOn: S.settings.mirrors, prevToll: null,
};
const CAMS = [['chase', '추적 카메라'], ['driver', '운전석 시점'], ['interior', '실내 시점'], ['orbit', '3인칭 외부 시점'], ['svm', '서라운드 뷰 (옵션)'], ['free', '자유 카메라']];
let env, traffic, train, showroom, mp, nav, transit;
const hazards = new Hazards();
const autod = new AutoDrive();
const audio = new GameAudio();
audio.setVolume(S.settings.volume); audio.voice = S.settings.voice;

// ===================== 로딩 =====================
async function boot() {
  const bar = $('#loadFill'), txt = $('#loadText');
  // 내 계정 저장(클라우드) 읽기 — 늦게 오면 그때 반영
  const onSaveLoaded = (local, msg) => {
    ensureAdmin();
    if (app.ready) syncAdminWithWorld();
    if (showroom) { showroom.setFeatured(ownedBy(S.current)); showroom.setAvatar(S.avatar); }
    if (app.ready && G.state === 'menu') { setPlayer(ownedBy(S.current)); }
    if (env) { env.hour = S.world.hour; env.setWeather(S.world.weather); }
    app.refreshMenu && app.refreshMenu();
    toast(msg || (local ? '💾 이 기기에 저장된 기록을 불러왔어요' : '☁️ 내 계정에 저장된 기록을 불러왔어요'), 'good', 2600);
  };
  app.onSaveLoaded = onSaveLoaded;
  // 다른 도시 지도를 받으면: 노선 · 회사 설정에 반영
  W.onRegion = (def, st) => {
    if (st !== 'loaded') return;
    try { syncAdminWithWorld(); } catch (e) { console.warn(e); }
    if (nav) nav._places = null;
    try { for (const h of HUBS) if (h.reg === def.id) { hubSign(scene, h); hubCurb(h); if (h.kind === 'air') decorateAirport(scene, h); } } catch (e) { console.warn('airport', e); }
    try { if (transit) transit.addLines(SUBWAY.lines.filter((L) => L.city === def.id)); } catch (e) { console.warn('metro', e); }
    if (app.refreshMenu) app.refreshMenu();
  };
  initCloud(onSaveLoaded);
  // 자동 저장: 15초마다 · 앱을 닫거나 다른 앱으로 갈 때
  setInterval(() => { if (G.state === 'play' || G.state === 'pause') save(); }, 15000);
  const saveNow = () => { save(); flushCloud(); };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });
  window.addEventListener('pagehide', saveNow);
  try {
    // 1) 타이틀부터 바로 띄움 (쇼룸은 지도와 따로 그려짐)
    ensureAdmin();
    showroom = new Showroom();
    showroom.setFeatured(ownedBy(S.current));
    showroom.setAvatar(S.avatar);
    ensureQuests(S);
    initUI(app);
    initNavUI(app);
    initAdmin(app);
    // 로딩 화면: 다 되면 '화면을 눌러 시작' → 누르면 타이틀로 (지도는 그동안 뒤에서 만들어요)
    {
      bar.style.width = '100%'; txt.textContent = '준비 완료!';
      const st = $('#ldStart'); const shownAt = performance.now();
      const go = () => {
        if (performance.now() - shownAt < 400) return;
        removeEventListener('pointerdown', go); removeEventListener('keydown', go);
        $('#loading').classList.add('hidden');
        try { audio.unlock && audio.unlock(); } catch (e) { /* 무시 */ }
      };
      if (globalThis.HP_STORE) {
        // 게임 사이트판: 누를 필요 없이 바로 타이틀로 (소리는 처음 누를 때 켜요)
        $('#loading').classList.add('hidden');
        const un = () => { removeEventListener('pointerdown', un); removeEventListener('keydown', un); try { audio.unlock && audio.unlock(); } catch (e) { /* 무시 */ } };
        addEventListener('pointerdown', un); addEventListener('keydown', un);
        try { globalThis.HP_PORTAL && HP_PORTAL.loadingStop(); } catch (e) { /* 무시 */ }
      } else setTimeout(() => { if (st) st.classList.remove('hidden'); addEventListener('pointerdown', go); addEventListener('keydown', go); }, 900);
    }
    G.state = 'menu';
    show('title');
    requestAnimationFrame(frame);
    // 2) 지도는 뒤에서 만들기 (메뉴를 보는 동안)
    const pill = $('#worldPill');
    const T0 = performance.now(); G.loadProf = [];
    const prog = (p, t) => { G.loadProf.push([Math.round(performance.now() - T0), t, performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1e6) : 0]); G.worldP = p; if (pill && app.waiters.length) { pill.classList.remove('hidden'); pill.querySelector('i').style.width = Math.round(p * 100) + '%'; pill.querySelector('span').textContent = '지도 준비 중 ' + Math.round(p * 100) + '%'; } };
    await buildWorld(scene, prog, { extraRoutes: customRoutesForWorld(), quality: Q, lite: LITE });
    prog(0.95, '차들을 도로에 놓는 중...');
    await new Promise((r) => setTimeout(r, 0));
    syncAdminWithWorld();
    env = new Env(scene, renderer, Q);
    env.hour = S.world.hour; env.setWeather(S.world.weather);
    env.onThunder = () => audio.thunder();
    traffic = new Traffic(scene);
    traffic.weightFn = routeWeightOf; traffic.companyFn = companyNameOf; traffic.modelFn = routeModelOf; traffic.liveryFn = routeLiveryOf;
    app.traffic = traffic;
    traffic.init(Q === 'low' ? 70 : 110, Q === 'low' ? 24 : 46);
    train = new Train(scene, audio);
    transit = new Transit({
      scene, camera, audio, toast, traffic, G, quest: (id, n) => quest(id, n),
      hidePerson: (b) => { if (G.P && G.P.person) G.P.person.visible = !b; },
      placeFoot: (x, z, h) => { const P = G.P; P.px = x; P.pz = z; P.ph = h; P.plevel = 'surface'; G.camHeading = h; G.lookYaw = 0; snapCamera(); },
    });
    transit.build(scene, S.admin && S.admin.metro && S.admin.metro.lines);
    hazards.build(scene);
    traffic.hazards = hazards;
    app.transit = transit;
    mp = new Multiplayer(scene);
    app.mp = mp;
    mp.onChat = (n, m) => chatLine(n, m);
    setPlayer(ownedBy(S.current));
    placeAt(W.spawns[S.world.spawn] || W.spawns.city);
    traffic.initialPlace(G.P.sim.x, G.P.sim.z, desiredTraffic());
    nav = new Nav(scene, audio);
    nav.voice = S.settings.navVoice !== false; nav.show3D = S.settings.nav3D !== false;
    nav.toast = (m, k, ms) => toast(m, k, ms);
    nav.onCamera = (c, kmh) => onSpeedCamera(c, kmh);
    nav.onArrive = (d) => { if (!d.auto) { toast(`🏁 <b>${d.name}</b>에 도착했어요!`, 'good', 3000); audio.chime && audio.chime(); quest('nav', 1); } };
    nav.recent = (S.nav && S.nav.recent) || [];
    app.nav = nav;
    app.ready = true;
    try { for (const h of HUBS) if (!h.reg) { hubSign(scene, h); hubCurb(h); if (h.kind === 'air') decorateAirport(scene, h); } } catch (e) { console.warn('airport', e); }
    if (pill) pill.classList.add('hidden');
    for (const f of app.waiters.splice(0)) f();
  } catch (e) {
    console.error(e);
    $('#loading').classList.remove('hidden');
    txt.textContent = '불러오기 중 오류가 났어요: ' + e.message;
    void bar;
  }
}
setTimeout(boot, 0);

// ===================== 플레이어 차량 =====================
function disposeObj(obj) {
  scene.remove(obj.group);
  obj.group.traverse((o) => { if (o.isMesh && o.geometry && o.geometry.attributes.position.count > 200) o.geometry.dispose(); });
}
function setPlayer(own) {
  const spec = BY_ID[own.id];
  const old = G.P;
  if (old) { disposeObj(old.obj); if (old.person) scene.remove(old.person); }
  const route = G.routeForSign;
  const obj = buildVehicle(spec, {
    color: own.color, wheel: own.wheel, plate: own.plate, livery: own.livery, company: own.company,
    route: route ? route.id : '회송', dest: route ? route.dest : '차고지', routeColor: route ? ROUTE_COLORS[route.type] : '#555',
  });
  scene.add(obj.group);
  // 가운데 내비 화면 (차종별 인포테인먼트) + 와이드 화면 · 앰비언트 옵션
  if (obj.huMesh) {
    const wide = hasOpt(own, 'wide');
    const hu = makeHeadUnit(huTheme(spec), wide);
    obj.huMesh.material = hu.mat; obj.hu = hu;
    if (wide) { obj.huMesh.scale.set(0.44, 0.154, 1); obj.huMesh.position.x -= 0.05; obj.huMesh.position.y -= 0.01; }
    if (hasOpt(own, 'ambient') && obj.cockpit) {
      const k = obj.cockpit, am = new THREE.MeshBasicMaterial({ color: hu.accent });
      const strip = new THREE.Mesh(new THREE.BoxGeometry(k.W * 0.8, 0.008, 0.008), am);
      strip.position.set(0, k.cY + 0.1, k.dashZ - 0.2); obj.body.add(strip);
      for (const sx of [1, -1]) { const ds = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.008, 0.9), am); ds.position.set(sx * (k.W * 0.42), k.cY + 0.08, k.dashZ - 0.85); obj.body.add(ds); }
    }
  }
  // 전조등
  const spots = [];
  for (const hp of obj.headPos) {
    const sp = new THREE.SpotLight(0xfff1d6, 0, 120, 0.42, 0.55, 1.5);
    sp.position.copy(hp);
    sp.target.position.set(hp.x * 1.3, 0, hp.z + 30);
    obj.body.add(sp); obj.body.add(sp.target);
    spots.push(sp);
  }
  // 버스 실물 미러에 미러 화면 표시
  if (obj.mirrorFaces) obj.mirrorFaces.forEach((f, i) => { f.material = new THREE.MeshBasicMaterial({ map: mirrorRT[i].texture }); f.scale.x *= -1; });
  G.dashLift = 0;
  const sim = new VehicleSim(spec, own);
  G.P = { own, spec, obj, sim, spots, lights: false, blink: 0, hazard: false, wiper: 0, wiperPh: 0, onFoot: false, engine: true, park: false, cabin: true, gearMode: 'auto', person: null, y: 0, blinkAcc: 0, bell: false, bumpT: 0, lastBlinkOn: false };
  G.P.len = spec.len; G.P.wid = spec.wid;
  setupWear(G.P);
  if (old) { sim.reset(old.sim.x, old.sim.z, old.sim.heading); }
  syncPlayerModel(0);
}
function placeAt(sp) { placePlayer(sp.x, sp.z, sp.heading, sp.level); }
function placePlayer(x, z, h, level = 'surface') {
  const P = G.P;
  buildBuildingsNear(x, z, 700);
  buildCorridorNear(x, z); buildRegionNear(x, z);
  P.sim.reset(x, z, h);
  P.sim.level = level;
  W.refY = undefined;
  P.y = levelAt(x, z, level).y;
  if (P.onFoot) exitFoot(true);
  G.camHeading = h; G.lookYaw = 0; G.lookPitch = 0;
  syncPlayerModel(0);
  snapCamera();
}

// ===================== 입력 =====================
const key = (...c) => c.some((k) => G.keys[k] || G.touch[k]);
addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Tab', 'F1'].includes(e.code)) e.preventDefault();
  if (e.code === 'Enter' && G.state === 'play' && mp && mp.active) { e.preventDefault(); openChat(); return; }
  if (G.keys[e.code]) return;
  G.keys[e.code] = true;
  if (stage && stage.on) { if (e.code === 'Escape') { stage.stop(); return; } if (e.code === 'ArrowRight' || e.code === 'Enter' || e.code === 'PageDown') { stage.next(); return; } if (e.code === 'ArrowLeft' || e.code === 'PageUp') { stage.prev(); return; } if (e.code === 'Space' || e.code === 'KeyB') { stage.pause(); return; } if (G.state === 'play') return; }
  if (photo.on && (e.code === 'Escape' || e.code === 'F2')) { photo.close(); return; }
  if (e.code === 'F2' && G.state === 'play') { e.preventDefault(); photo.open(); return; }
  if (e.code === 'Escape' || e.code === 'KeyP') {
    if (G.state === 'play') pause();
    else if (G.state === 'pause' && (currentScreen() === 'pause' || e.code === 'Escape')) resume();
    return;
  }
  if (G.state !== 'play') return;
  action(e.code);
});
addEventListener('keyup', (e) => { G.keys[e.code] = false; if (e.code === 'KeyH') audio.horn(false); if (e.code === 'Tab') toggleBigMap(false); });
addEventListener('blur', () => { G.keys = {}; audio.horn(false); });

function action(code) {
  const P = G.P;
  if (P && P.onFoot && transit && transit.key(code)) return;
  switch (code) {
    case 'KeyO': toggleAssist(1); break;
    case 'KeyU': toggleAssist(2); break;
    case 'Equal': case 'NumpadAdd': case 'BracketRight': if (autod.on) { autod.adjust(code === 'BracketRight' ? 1 : 5); assistToast(); } break;
    case 'Minus': case 'NumpadSubtract': case 'BracketLeft': if (autod.on) { autod.adjust(code === 'BracketLeft' ? -1 : -5); assistToast(); } break;
    case 'KeyT': if (autod.on) { autod.cycleGap(); assistToast(); } break;
    case 'KeyC': G.camMode = (G.camMode + 1) % CAMS.length; if (CAMS[G.camMode][0] === 'svm' && !hasOpt(P.own, 'svm')) G.camMode = (G.camMode + 1) % CAMS.length; G.lookYaw = 0; G.lookPitch = 0; if (CAMS[G.camMode][0] === 'free') { G.free.pos.copy(camera.position); G.free.yaw = P.sim.heading; G.free.pitch = -0.15; } toast('📷 ' + CAMS[G.camMode][1], 'info', 1200); break;
    case 'KeyL': P.lights = !P.lights; toast(P.lights ? '💡 전조등 켜짐' : '전조등 꺼짐', 'info', 1000); break;
    case 'KeyZ': case 'Comma': P.hazard = false; P.blink = P.blink === -1 ? 0 : -1; P.blinkAcc = 0; if (autod.mode === 2 && P.blink === -1) { autod.requestLane(-1); toast('↖ 왼쪽 차로로 바꿀게요', 'info', 1200); } break;
    case 'KeyX': case 'Period': P.hazard = false; P.blink = P.blink === 1 ? 0 : 1; P.blinkAcc = 0; if (autod.mode === 2 && P.blink === 1) { autod.requestLane(1); toast('↗ 오른쪽 차로로 바꿀게요', 'info', 1200); } break;
    case 'KeyY': if (autod.on) { const on = autod.toggleAuto(G.road && G.road.limit); toast(on ? '🚦 제한속도 자동 맞춤 켜짐 (구간마다 속도를 바꿔요)' : '제한속도 자동 맞춤 꺼짐 — +/-로 속도를 정해요', 'info', 1800); } break;
    case 'KeyV': P.hazard = !P.hazard; break;
    case 'KeyK': P.wiper = (P.wiper + 1) % 3; toast(['와이퍼 끔', '와이퍼 느리게', '와이퍼 빠르게'][P.wiper], 'info', 1000); break;
    case 'KeyH': audio.horn(true, P.spec.type === 'bus'); break;
    case 'Digit1': case 'Numpad1': door(0); break;
    case 'Digit2': case 'Numpad2': door(1); break;
    case 'KeyE': interact(); break;
    case 'KeyI': P.engine = !P.engine; if (P.engine) { audio.init(); audio.burst(0.6, 300, 'lowpass', 0.5); audio.tone(90, 0.5, 'sawtooth', 0.08); } toast(P.engine ? '🔑 시동 켜짐' : '🔑 시동 꺼짐', 'info', 1200); break;
    case 'KeyB': P.park = !P.park; toast(P.park ? '🅿️ 사이드브레이크 채움' : '사이드브레이크 풂', 'info', 1000); break;
    case 'KeyJ': P.cabin = !P.cabin; toast(P.cabin ? '🔆 실내등 켜짐' : '실내등 꺼짐', 'info', 1000); break;
    case 'KeyG': { const order = ['auto', 'P', 'R', 'N', 'D']; setGear(order[(order.indexOf(P.gearMode) + 1) % order.length]); break; }
    case 'Digit0': toggleMute(); break;
    case 'Digit3': toggleBis(); break;
    case 'Digit4': toggleSky(); break;
    case 'Digit5': toggleCamv(); break;
    case 'KeyM': G.mirrorsOn = !G.mirrorsOn; toast(G.mirrorsOn ? '사이드미러 화면 켜짐' : '사이드미러 화면 꺼짐', 'info', 1000); break;
    case 'Tab': toggleBigMap(true); break;
    case 'KeyN': openNav(); break;
    case 'F1': case 'Slash': pause(); show('help'); break;
  }
}
function door(i) {
  const P = G.P;
  if (!P.obj.doors.length || P.onFoot) return;
  const d = P.obj.doors[i] || P.obj.doors[0];
  if (d.target === 0 && P.sim.kmh > 3) return toast('🚫 달리는 중에는 문을 열 수 없어요', 'warn', 1500);
  d.target = d.target ? 0 : 1;
  audio.door();
}
function openNav() { if (G.state !== 'play') return; G.state = 'pause'; audio.engine({ on: false }); audio.horn(false); toggleBigMap(false); show('nav'); }
function onSpeedCamera(c, kmh) {
  const over = Math.round(kmh - c.limit);
  const amt = over > 40 ? 90000 : over > 20 ? 60000 : 30000;
  const f = $('#flash'); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go');
  audio.beep && audio.beep();
  fine(amt, `📸 과속 단속 카메라! 제한 ${c.limit}km/h · ${Math.round(kmh)}km/h (+${over})`);
}
function toggleBigMap(on) { G.bigMap = on; $('#bigmap').classList.toggle('hidden', !on); }

$('#btn-pause').onclick = () => pause();
$('#btn-nav').onclick = () => openNav();
$('#p-nav').onclick = () => show('nav');
$('#btn-scc').onclick = () => { if (G.state === 'play') action('KeyO'); };
$('#btn-auto').onclick = () => { if (G.state === 'play') action('KeyU'); };
$('#adas').onclick = (e) => { if (e.target.closest('[data-ad]')) return; if (G.state === 'play' && autod.on) { autod.cycleGap(); assistToast(); } };
$('#prompt').onclick = () => { if (G.state === 'play' && G.P) interact(); };
$('#nav-stop').onclick = () => { if (nav) { nav.stop(); G.navKey = 'user-stopped'; } };
$('#camname').onclick = () => { if (G.state === 'play') action('KeyC'); };
$('#btn-help').onclick = () => { pause(); show('help'); };
// 🔊 소리 끄기 / 켜기 (게임 중 버튼 · 메뉴 버튼 · 0키)
function applyMute() {
  const m = !!S.settings.mute;
  audio.setMuted(m);
  for (const id of ['#btn-mute', '#t-mute']) { const b = $(id); if (b) { b.textContent = m ? '🔇' : '🔊'; b.classList.toggle('off', m); } }
}
function toggleMute() { S.settings.mute = !S.settings.mute; applyMute(); saveSoon(); toast(S.settings.mute ? '🔇 소리를 껐어요' : '🔊 소리를 켰어요', 'info', 1200); }
$('#btn-mute').onclick = (e) => { e.stopPropagation(); toggleMute(); };
$('#t-mute').onclick = () => toggleMute();
applyMute();
// 🚏 버스 위치 패널 (BIS)
const bis = new BisPanel();
let stopBis = null;
function toggleBis() {
  if (!(G.mission && G.mission.gap)) { toast('🚏 버스 위치(BIS)는 버스 노선 운행 중에 볼 수 있어요', 'info', 2200); bis.toggle(false); return; }
  const on = bis.toggle(); $('#btn-bis').classList.toggle('on', on);
}
$('#btn-bis').onclick = (e) => { e.stopPropagation(); toggleBis(); };
// 📹 후방 카메라 · 서라운드뷰
const camv = new CamView(renderer);
function toggleCamv() { camv.forced = !camv.forced; $('#btn-cam360').classList.toggle('on', camv.forced); toast(camv.forced ? '📹 후방 카메라 · 서라운드뷰 켜짐' : '📹 카메라 꺼짐 (후진 R에서는 자동으로 켜져요)', 'info', 1600); }
$('#btn-cam360').onclick = (e) => { e.stopPropagation(); toggleCamv(); };
// 🌦️ 시간 · 날씨 바로 바꾸기 (발표할 때 좋아요)
const skyPop = document.createElement('div'); skyPop.id = 'skypop'; skyPop.className = 'hidden';
skyPop.innerHTML = `<div class="sp-row">${[['🌅', '아침', 7], ['☀️', '낮', 13], ['🌇', '노을', 18.2], ['🌙', '밤', 22]].map(([i, n, h]) => `<button data-h="${h}">${i}<small>${n}</small></button>`).join('')}</div>
  <div class="sp-row">${[['☀️', '맑음', 'clear'], ['☁️', '흐림', 'cloudy'], ['🌧️', '비', 'rain'], ['⛈️', '폭우', 'storm'], ['❄️', '눈', 'snow'], ['🌫️', '안개', 'fog']].map(([i, n, w]) => `<button data-w="${w}">${i}<small>${n}</small></button>`).join('')}</div>`;
document.body.appendChild(skyPop);
function toggleSky(v) { const on = v === undefined ? skyPop.classList.contains('hidden') : v; if (on) skyMark(); skyPop.classList.toggle('hidden', !on); $('#btn-sky').classList.toggle('on', on); }
// 태블릿 브라우저에서 click이 안 오는 경우가 있어 손을 뗄 때(pointerup) 바로 처리 + click은 중복 막기
let skyT = 0;
const skyBtn = (e) => { e.stopPropagation(); e.preventDefault(); if (performance.now() - skyT < 350) return; skyT = performance.now(); toggleSky(); };
$('#btn-sky').addEventListener('pointerup', skyBtn); $('#btn-sky').addEventListener('click', skyBtn);
let skyPT = 0;
const skyPick = (e) => {
  e.stopPropagation();
  const b = e.target.closest('button'); if (!b || !env) return;
  e.preventDefault(); if (performance.now() - skyPT < 350) return; skyPT = performance.now();
  toast(b.dataset.h ? `${b.textContent.trim()} 시간으로 바꿨어요` : `날씨: ${b.textContent.trim()}`, 'info', 1200);
  if (b.dataset.h) { env.hour = +b.dataset.h; S.world.hour = env.hour; }
  if (b.dataset.w && WEATHER_OK(b.dataset.w)) { env.setWeather(b.dataset.w); S.world.weather = b.dataset.w; }
  if (G.P) G.P.lights = env.hour > 19 || env.hour < 6.3 || ['rain', 'storm', 'fog'].includes(env.weather);
  renderer.shadowMap.needsUpdate = true; saveSoon(); skyMark();
};
function skyMark() { if (!env) return; skyPop.querySelectorAll('[data-h]').forEach((x) => x.classList.toggle('on', Math.abs(+x.dataset.h - env.hour) < 0.6)); skyPop.querySelectorAll('[data-w]').forEach((x) => x.classList.toggle('on', x.dataset.w === env.weather)); }
skyPop.addEventListener('pointerup', skyPick); skyPop.addEventListener('click', skyPick);
skyPop.addEventListener('pointerdown', (e) => e.stopPropagation());
function WEATHER_OK(w) { try { env.setWeather(w); return env.weather === w; } catch (e) { return false; } }
// 🏅 업적
const ach = new Achievements(S, (...a) => toast(...a), audio);
$('#t-ach').onclick = () => modal(ach.html());
// 🎤 무대 시연 · 🧒 쉬운 운전
$('#t-stage').onclick = () => { if (!app.ready) return app.whenReady(() => makeStage().start()); makeStage().start(); };
function applyEasy() { const b = $('#t-easy'); if (b) b.classList.toggle('on', !!S.settings.easy); document.body.classList.toggle('easy', !!S.settings.easy); }
$('#t-easy').onclick = () => { S.settings.easy = !S.settings.easy; applyEasy(); save(); toast(S.settings.easy ? '🧒 쉬운 운전 모드 켜짐 — 최고 60km/h · 자동 긴급 제동 · 벌금·경찰 없음' : '쉬운 운전 모드 꺼짐', S.settings.easy ? 'good' : 'info', 3500); };
applyEasy();

// 운전석 계기판을 화면 해상도 그대로 선명하게: 3D 계기판 자리에 같은 그림(캔버스)을 겹쳐 그려요
const dashHi = document.createElement('div'); dashHi.id = 'dashHi'; document.body.appendChild(dashHi);
const huHi = document.createElement('div'); huHi.id = 'huHi'; huHi.className = 'hiOverlay'; document.body.appendChild(huHi);
// 3D 판(mesh)의 세 꼭짓점을 화면에 투영해서 DOM 캔버스를 그 자리에 딱 맞춰 붙여요 (항상 선명)
function placeOverlay(el, mesh, cv) {
  if (el.firstChild !== cv) el.replaceChildren(cv);
  mesh.updateWorldMatrix(true, false);
  const pts = [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5]].map(([x, y], i) => _dc[i].set(x, y, 0).applyMatrix4(mesh.matrixWorld));
  if (pts.some((p) => _hp.copy(p).applyMatrix4(camera.matrixWorldInverse).z > -0.02)) { el.style.display = 'none'; return false; }
  for (const p of pts) p.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  const w = innerWidth, h = innerHeight;
  const sx = (p) => (p.x + 1) / 2 * w, sy = (p) => (1 - p.y) / 2 * h;
  const tl = [sx(pts[0]), sy(pts[0])], tr = [sx(pts[1]), sy(pts[1])], bl = [sx(pts[2]), sy(pts[2])];
  const LW = 1024, LH = cv.height / cv.width * 1024;
  cv.style.width = LW + 'px'; cv.style.height = LH + 'px';
  el.style.transform = `matrix(${(tr[0] - tl[0]) / LW},${(tr[1] - tl[1]) / LW},${(bl[0] - tl[0]) / LH},${(bl[1] - tl[1]) / LH},${tl[0]},${tl[1]})`;
  el.style.display = 'block';
  return true;
}
const _dc = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
function dashOverlay() {
  const P = G.P, o = P && P.obj;
  const on0 = () => !P.onFoot && !G.photo && G.state === 'play' && CAMS[G.camMode][0] === 'driver' && S.settings.dashHi !== false;
  const on = o && o.dashMesh && o.dash && on0();
  const huOk = o && o.hu && o.huMesh && on0();
  if (huOk) placeOverlay(huHi, o.huMesh, o.hu.canvas); else if (huHi.style.display !== 'none') huHi.style.display = 'none';
  if (!on) { window.__dashWhy = 'off'; if (G.dashShrunk && o && o.dashMesh) { o.dashMesh.visible = true; G.dashShrunk = false; } if (dashHi.style.display !== 'none') dashHi.style.display = 'none'; return; }
  const cv = o.dash.tex.userData.canvas;
  if (dashHi.firstChild !== cv) { dashHi.replaceChildren(cv); }
  const m = o.dashMesh; m.updateWorldMatrix(true, false);
  const pts = [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5]].map(([x, y], i) => _dc[i].set(x, y, 0).applyMatrix4(m.matrixWorld));
  // 카메라 뒤에 있으면 숨김 (가까이 있어 near 평면 안쪽이어도 그림은 그려요)
  if (pts.some((p) => _hp.copy(p).applyMatrix4(camera.matrixWorldInverse).z > -0.02)) { window.__dashWhy = 'behind'; dashHi.style.display = 'none'; return; }
  for (const p of pts) p.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
  const w = innerWidth, h = innerHeight;
  const sx = (p) => (p.x + 1) / 2 * w, sy = (p) => (1 - p.y) / 2 * h;
  const tl = [sx(pts[0]), sy(pts[0])], tr = [sx(pts[1]), sy(pts[1])], bl = [sx(pts[2]), sy(pts[2])];
  const LW = 1024, LH = cv.height / cv.width * 1024;
  cv.style.width = LW + 'px'; cv.style.height = LH + 'px';
  let a = (tr[0] - tl[0]) / LW, b = (tr[1] - tl[1]) / LW, c = (bl[0] - tl[0]) / LH, d = (bl[1] - tl[1]) / LH;
  // 낮은 화면(태블릿 가로): 계기판을 화면 높이 34% 이하로 줄이고 아래 버튼 줄 바로 위에 붙여 앞 도로를 가리지 않게
  const shortScr = h < 620;
  if (shortScr) {
    const Hc = Math.abs(b * LW) + Math.abs(d * LH), maxH = h * 0.34, f = Math.min(1, maxH / Math.max(1, Hc));
    const cbar = document.getElementById('ctrlbar'), cr = cbar && cbar.offsetParent ? cbar.getBoundingClientRect() : null;
    const limit = cr && cr.height ? cr.top - 4 : h - 6;
    const cx = tl[0] + (a * LW + c * LH) / 2, bot = Math.min(tl[1] + b * LW + d * LH, limit);
    a *= f; b *= f; c *= f; d *= f;
    tl[0] = cx - (a * LW + c * LH) / 2; tl[1] = bot - (b * LW + d * LH);
    m.visible = false; G.dashShrunk = true;
  } else if (G.dashShrunk) { m.visible = true; G.dashShrunk = false; }
  dashHi.style.transform = `matrix(${a},${b},${c},${d},${tl[0]},${tl[1]})`;
  // 승용차: 운전대 테두리가 계기판 앞을 지나가는 자리는 비워서 3D 운전대가 보이게
  const sw = o.steeringWheel;
  if (sw && sw.visible && !o.isBus) {
    sw.updateWorldMatrix(true, false);
    const det = a * d - b * c; if (Math.abs(det) < 1e-6) return;
    const inv = (x, y) => { x -= tl[0]; y -= tl[1]; return [(d * x - c * y) / det, (-b * x + a * y) / det]; };
    const ring = (R) => {
      let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (let k = 0; k < 16; k++) {
        const t = k / 16 * Math.PI * 2;
        const q = _hp.set(Math.cos(t) * R, Math.sin(t) * R, 0).applyMatrix4(sw.matrixWorld).project(camera);
        const [lx, ly] = inv(sx(q), sy(q));
        x0 = Math.min(x0, lx); x1 = Math.max(x1, lx); y0 = Math.min(y0, ly); y1 = Math.max(y1, ly);
      }
      return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, rx: (x1 - x0) / 2, ry: (y1 - y0) / 2 };
    };
    const O = ring(0.222), I = ring(0.158);
    const m1 = `radial-gradient(${O.rx}px ${O.ry}px at ${O.cx}px ${O.cy}px, transparent 98%, #000 100%)`;
    const m2 = `radial-gradient(${I.rx}px ${I.ry}px at ${I.cx}px ${I.cy}px, #000 97%, transparent 100%)`;
    dashHi.style.webkitMaskImage = dashHi.style.maskImage = `${m1}, ${m2}`;
  } else if (dashHi.style.maskImage) dashHi.style.webkitMaskImage = dashHi.style.maskImage = '';
  dashHi.style.display = 'block'; window.__dashWhy = 'on';
  // 아래쪽 버튼 줄이 계기판을 가리면 시선을 조금씩 내려서 계기판이 다 보이게 (작은 화면 · 버스)
  if (shortScr) { G.dashLift = 0; } else if (G.frame % 6 === 0) {
    const cb = document.getElementById('ctrlbar');
    const r = cv.getBoundingClientRect(), c = cb && cb.offsetParent ? cb.getBoundingClientRect() : null;
    const limit = c && c.height ? c.top - 8 : innerHeight - 8;
    const over = r.bottom - limit;
    if (over > 0) G.dashLift = Math.min(0.3, (G.dashLift || 0) + Math.min(0.03, over / innerHeight * 0.6));
    else if (over < -50 && G.dashLift > 0) G.dashLift = Math.max(0, G.dashLift - 0.006);
  }
}

// 엔진 연기 · 사진 모드
const smoke = new Smoke(scene);
const photo = new PhotoMode({ G, get env() { return env; }, get S() { return S; }, canvas: renderer.domElement, audio, save: () => saveSoon(), canOpen: () => G.state === 'play' && G.P && !G.P.onFoot });
// 🎤 무대 시연 모드
let stage = null;
function makeStage() {
  if (stage) return stage;
  stage = new Stage({ G, S, audio, autod, roadInfoAt, startMode: (m, o) => startMode(m, o), setMirrors: (v) => { G.mirrorsOn = v; }, setBis: (v) => { if (v && !bis.on && G.mission && G.mission.gap) toggleBis(); else if (!v && bis.on) { bis.toggle(false); $('#btn-bis').classList.remove('on'); } }, setPlayer: (o) => setPlayer(o), toMenu: () => toMenu(), get env() { return env; }, tr: (t) => (globalThis.HP_I18N && HP_I18N.lang === 'en' ? HP_I18N.tr(t) : t), STORE: true });
  return stage;
}
const police = new Police({
  scene, audio, toast, hint, groundY, quest: (id, n) => quest(id, n),
  get P() { return G.P; },
  say: (t) => { if (S.settings.voice !== false) audio.speak(t, true); },
  pay: (n, why) => { S.money = Math.max(0, S.money - n); toast(`<b>-${won(n)}</b> ${why}`, 'bad'); saveSoon(); },
  allowed: () => !G.demo && !S.settings.easy && !ctx.sirenOn && G.state === 'play' && G.P && G.P.spec.type !== 'bus' && !(G.mission instanceof LicenseMission) && !(G.mission instanceof CheckpointMission) && !(G.mission instanceof ParkingMission),
});
$('#p-photo').onclick = () => { resume(); setTimeout(() => photo.open(), 50); };

// 마우스로 둘러보기 / 확대
const cv = renderer.domElement;
let drag = null;
cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY }; cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag = { x: e.clientX, y: e.clientY };
  if (CAMS[G.camMode][0] === 'free' && !G.P.onFoot) { G.free.yaw -= dx * 0.004; G.free.pitch = clamp(G.free.pitch - dy * 0.004, -1.4, 1.4); }
  else { G.lookYaw -= dx * 0.005; G.lookPitch = clamp(G.lookPitch - dy * 0.004, -0.9, 0.7); }
  G.lastLook = performance.now();
});
cv.addEventListener('pointerup', () => { drag = null; });
cv.addEventListener('wheel', (e) => { G.zoom = clamp(G.zoom * (e.deltaY > 0 ? 1.1 : 0.9), 0.45, 3); }, { passive: true });

// ===================== 운전석 버튼 · 기어 · 페달 · 핸들 =====================
const ACT = { more: 'more', garage: 'garage', key: 'KeyI', park: 'KeyB', lights: 'KeyL', wiper: 'KeyK', cabin: 'KeyJ', door0: 'Digit1', door1: 'Digit2', blinkL: 'KeyZ', hazard: 'KeyV', blinkR: 'KeyX', mirror: 'KeyM', cam: 'KeyC', scc: 'KeyO', auto: 'KeyU', sccup: 'Equal', sccdn: 'Minus'};
document.querySelectorAll('#ctrlbar [data-act]').forEach((b) => {
  const a = b.dataset.act;
  if (a === 'horn') {
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); if (G.state === 'play') audio.horn(true, G.P.spec.type === 'bus'); });
    for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, () => audio.horn(false));
  } else if (a === 'more') b.addEventListener('click', () => document.querySelector('#ctrlbar .more').classList.toggle('hidden'));
  else if (a === 'garage') b.addEventListener('click', () => { if (G.state === 'play') { pause(); show(G.P.spec.type === 'bus' ? 'busgarage' : 'garage'); } });
  else b.addEventListener('click', () => { if (G.state === 'play') action(ACT[a]); });
});
document.querySelectorAll('#gearsel [data-g]').forEach((b) => b.addEventListener('click', () => { if (G.state === 'play') setGear(b.dataset.g); }));
function setGear(g) {
  const P = G.P;
  if ((g === 'R' && P.sim.vl > 1) || (g === 'D' && P.sim.vl < -1) || (g === 'P' && P.sim.kmh > 3)) return toast('먼저 차를 멈추고 기어를 바꿔요', 'warn', 1500);
  P.gearMode = g;
  toast(g === 'auto' ? '⚙️ 자동 기어 (S를 계속 누르면 후진)' : `⚙️ 기어 ${g} ${{ P: '주차', R: '후진', N: '중립', D: '주행' }[g]}`, 'info', 1200);
}
const showPads = S.settings.pads !== false || isTouch;
document.body.classList.toggle('pads', showPads);
if (showPads) {
  $('#pedals').classList.remove('hidden'); $('#wheelpad').classList.remove('hidden');
  document.querySelectorAll('#pedals [data-k]').forEach((b) => {
    const k = b.dataset.k;
    // 슬라이드 페달: 누른 채 손가락을 위로 밀수록 세게 (아래쪽 25% ~ 맨 위 100%)
    G.pedalAmt = G.pedalAmt || {};
    const amt = (e) => { const r = b.getBoundingClientRect(); const a = clamp(0.25 + 0.75 * (1 - (e.clientY - r.top) / Math.max(1, r.height)), 0.25, 1); G.pedalAmt[k] = a; b.style.setProperty('--amt', Math.round(a * 100) + '%'); };
    const on = (e) => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (er) { /* 무시 */ } G.touch[k] = true; amt(e); b.classList.add('press'); };
    const off = () => { G.touch[k] = false; G.pedalAmt[k] = 1; b.classList.remove('press'); };
    b.addEventListener('pointerdown', on);
    b.addEventListener('pointermove', (e) => { if (G.touch[k]) amt(e); });
    for (const ev of ['pointerup', 'pointercancel', 'lostpointercapture']) b.addEventListener(ev, off);
  });
  const wp = $('#wheelpad');
  let wd = null;
  const ang = (e) => { const r = wp.getBoundingClientRect(); return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))); };
  wp.addEventListener('pointerdown', (e) => { e.preventDefault(); wp.setPointerCapture(e.pointerId); wd = { a0: ang(e), s0: G.wheelSteer || 0 }; G.wheelHeld = true; });
  wp.addEventListener('pointermove', (e) => { if (!wd) return; let d = ang(e) - wd.a0; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; G.wheelSteer = clamp(wd.s0 - d / 2.4, -1, 1); });
  const rel = () => { wd = null; G.wheelHeld = false; };
  wp.addEventListener('pointerup', rel); wp.addEventListener('pointercancel', rel);
}

// ===================== 작은 화면 (휴대폰 가로 · 미리보기 창) =====================
// 화면이 작으면 HUD 전체를 비율대로 줄이고, 위쪽 버튼은 아이콘만 보여 줘요
const HUD_SHORT = { 'btn-nav': '🧭', 'btn-scc': '⟳', 'btn-auto': '🤖' };
function fitHud() {
  const k = Math.min(innerWidth / 1180, innerHeight / 700);
  const z = Math.max(0.5, Math.min(1, k * 1.08));
  const compact = z < 0.96;
  document.body.classList.toggle('compact', compact);
  document.body.classList.toggle('tiny', z < 0.72);
  document.documentElement.style.setProperty('--hz', compact ? z.toFixed(3) : '1');
  // 터치 조작(핸들 · 페달 · 버튼)은 덜 줄여서 손가락으로 누르기 쉽게
  document.documentElement.style.setProperty('--tz', compact ? (Math.min(1, z * 1.4) / z).toFixed(3) : '1');
  document.documentElement.style.setProperty('--uz', compact ? (1 / z).toFixed(3) : '1');
  for (const id in HUD_SHORT) {
    const b = document.getElementById(id); if (!b) continue;
    if (compact) { if (!b.dataset.full) b.dataset.full = b.textContent; b.textContent = HUD_SHORT[id]; b.dataset.noi18n = ''; }
    else if (b.dataset.full) { b.textContent = b.dataset.full; delete b.dataset.full; }
  }
}
addEventListener('resize', fitHud); fitHud();

// ===================== 상호작용 (E) =====================
function interact() {
  const P = G.P;
  if (P.onFoot) {
    if (transit && transit.interact(P.px, P.pz)) return;
    const hub = hubNear(P.px, P.pz);
    if (hub) return openTickets(hub);
    const d = Math.hypot(P.px - P.sim.x, P.pz - P.sim.z);
    if (d < P.len / 2 + 3) exitFoot(false);
    else if (d > 60) callCar();
    else toast('차 가까이 가서 E를 누르면 탈 수 있어요', 'info');
    return;
  }
  if (P.sim.kmh > 2) return toast('먼저 차를 멈춰 주세요', 'warn', 1200);
  const own = P.own;
  if (own.fuel <= 0.5 && !fuelZone()) {
    const zs = W.zones.filter((z) => z.type === (P.spec.ev ? 'ev' : 'fuel'));
    const z = zs.sort((a, b) => Math.hypot((a.x0 + a.x1) / 2 - P.sim.x, (a.z0 + a.z1) / 2 - P.sim.z) - Math.hypot((b.x0 + b.x1) / 2 - P.sim.x, (b.z0 + b.z1) / 2 - P.sim.z))[0];
    S.money = Math.max(0, S.money - 200000); own.fuel = 40;
    placePlayer((z.x0 + z.x1) / 2, (z.z0 + z.z1) / 2, P.sim.heading);
    return toast('🚨 긴급출동! 가까운 충전·주유소로 옮겼어요 (-20만원)', 'bad');
  }
  const fz = fuelZone();
  if (fz && (own.fuel < 99 || (own.dirt || 0) >= 3 || (own.dmg || 0) >= 1)) {
    const cost = Math.round((100 - own.fuel) * (P.spec.type === 'bus' ? 1500 : 800) * (P.spec.ev ? 0.45 : 1));
    G.state = 'pause'; audio.engine({ on: false });
    serviceMenu({ P, S, fuelCost: cost, refuel: () => { G.refuel = { t: 0 }; toast(`${P.spec.ev ? '⚡ 충전' : '⛽ 주유'} 시작 (-${won(cost)})`, 'money'); }, toast, audio, save: saveSoon, quest })
      .then(() => { if (G.state === 'pause' && $('#modal').classList.contains('hidden')) G.state = 'play'; });
    return;
  }
  const hub = hubNear(P.sim.x, P.sim.z, 90);
  enterFoot();
  if (hub) openTickets(hub);
}
// ===================== 기차역 · 공항: 표 사고 다른 도시로 =====================
function laneNear(x, z, R = 160) {
  let best = null;
  const n = Math.ceil(R / 60); const seen = new Set();
  for (let dx = -n; dx <= n; dx++) for (let dz = -n; dz <= n; dz++) for (const e of edgesNear(x + dx * 60, z + dz * 60)) {
    if (seen.has(e)) continue; seen.add(e);
    if (e.elevated || e.ramp || e.corr || e.kind === 'highway' || e.kind === 'ic') continue;
    const s = clamp((x - e.a.x) * e.dir.x + (z - e.a.z) * e.dir.z, 0, e.len);
    const d = Math.hypot(e.a.x + e.dir.x * s - x, e.a.z + e.dir.z * s - z);
    if (!best || d < best.d) best = { e, s, d };
  }
  if (!best || best.d > R) return null;
  const Ls = W.links.filter((L) => L.edge === best.e);
  const sOf = (L) => clamp(L.from === best.e.a ? best.s : L.len - best.s, L.s0 + 2, Math.max(L.s0 + 2, L.s1 - 2));
  const L = Ls.sort((a, b) => { const qa = lanePos(a, a.n - 1, sOf(a)), qb = lanePos(b, b.n - 1, sOf(b)); return Math.hypot(qa.x - x, qa.z - z) - Math.hypot(qb.x - x, qb.z - z); })[0];
  if (!L) return null;
  const q = lanePos(L, L.n - 1, sOf(L));
  return { x: q.x, z: q.z, heading: L.heading };
}
function hubCurb(h) { if (!h.curb) h.curb = laneNear(h.x, h.z, 160) || laneNear(h.x, h.z, 650); return h.curb; }
function openTickets(hub) {
  const P = G.P;
  if (G.mission && G.mission.riders) return toast('버스 운행 중에는 기차 · 비행기를 탈 수 없어요', 'warn');
  const trips = tripsFrom(hub);
  const icon = (k) => (k === 'air' ? '✈️' : k === 'metro' ? '🚇' : k === 'xbus' ? '🚌' : '🚄');
  const m = $('#modal');
  m.innerHTML = `<div class="modal-card wide tix"><h3>${icon(hub.kind)} ${hub.name} <small class="muted">${hub.kind === 'air' ? '항공권' : '승차권'} · 가진 돈 ${won(S.money)}</small></h3>
    <p class="muted">내 차는 도착지 ${hub.kind === 'air' ? '공항' : '역'} 앞으로 옮겨 드려요 (탁송). 도착하면 걸어서 내려요.</p>
    <div class="tix-list">${trips.map((t, i) => `<button class="tix-row ${t.svc === 'SRT' ? 'srt' : t.svc === 'KTX' ? 'ktx' : t.kind}" data-i="${i}"><span class="tx-svc">${icon(t.kind)} ${t.svc}</span><b>${t.to.name}</b><small>${t.to.city}</small><span class="tx-time">${Math.floor(t.min / 60) ? Math.floor(t.min / 60) + '시간 ' : ''}${t.min % 60}분</span><span class="tx-fare">${t.fare.toLocaleString()}원</span></button>`).join('') || '<p>여기서 갈 수 있는 곳이 없어요</p>'}</div>
    <div class="modal-btns"><button data-x="0">닫기</button></div></div>`;
  m.classList.remove('hidden');
  $('[data-x="0"]', m).onclick = () => m.classList.add('hidden');
  m.querySelectorAll('.tix-row').forEach((b) => b.onclick = () => { m.classList.add('hidden'); doTrip(hub, trips[+b.dataset.i]); });
}
async function doTrip(hub, trip) {
  const P = G.P;
  if (S.money < trip.fare) return toast('돈이 부족해요', 'bad');
  S.money -= trip.fare; refreshMoneyHud();
  const prev = G.state; G.state = 'trip';
  $('#hud').classList.add('hidden');
  audio.engine({ on: false });
  try { if (nav) nav.stop(true); } catch (e) { /* 무시 */ }
  const dest = trip.to;
  await playTrip(trip, hub, async () => { if (dest.reg) await W.ensureRegion(dest.reg); });
  if (env) env.hour = (env.hour + trip.min / 60) % 24;
  const q = hubCurb(dest) || { x: dest.x, z: dest.z, heading: 0 };
  if (P.onFoot) exitFoot(true);
  placePlayer(q.x, q.z, q.heading);
  if (dest.kind === 'air') decorateAirport(scene, dest);
  G.state = prev === 'trip' ? 'play' : 'play';
  $('#hud').classList.remove('hidden');
  enterFoot();
  toast(`${trip.kind === 'air' ? '✈️' : trip.kind === 'xbus' ? '🚌' : '🚄'} <b>${dest.name}</b> 도착! 내 차는 바로 옆에 세워 뒀어요 (E: 타기)`, 'good', 4000);
  save();
}
function refreshMoneyHud() { const el = $('#money'); if (el) el.textContent = won(S.money); }
// ---- 운전 보조 켜고 끄기 ----
function toggleAssist(mode) {
  const P = G.P;
  if (!P || P.onFoot) return;
  if (autod.mode === mode) { autod.off(); toast(mode === 2 ? '🛑 자율주행 꺼짐 — 직접 운전하세요' : 'SCC 꺼짐', 'info', 1500); return; }
  if (!P.engine) return toast('먼저 시동을 걸어 주세요 (I)', 'warn');
  if (P.park) P.park = false;
  if (P.gearMode !== 'auto' && P.gearMode !== 'D') P.gearMode = 'auto';
  const r0 = roadInfoAt(P.sim.x, P.sim.z, P.sim.level === 'hwy' ? 'hwy' : 'surface'), road = r0 && r0.link ? r0 : null;
  if (mode === 2 && !hasOpt(P.own, 'hda2')) return toast("🤖 자율주행은 '고속도로 주행 보조 2' 옵션이 있어야 해요 — 차고 → 옵션에서 달 수 있어요 (스마트 크루즈 O는 그냥 돼요)", 'warn', 4000);
  if (mode === 2 && !road) return toast('도로 위에서만 자율주행을 켤 수 있어요', 'warn');
  autod.engage(mode, P.sim, road);
  if (mode === 2) toast(`🤖 자율주행 시작! ${nav.active ? '내비 경로를 따라가요' : '길을 따라가요 (내비 목적지를 정하면 거기까지 가요)'} · 제한속도 자동 · 깜빡이(Z/X)로 차로 변경 · 느린 차는 알아서 추월 · 브레이크(S)나 U로 끄기`, 'good', 4500);
  else toast(`🚗 스마트 크루즈 켜짐 · ${autod.set}km/h${autod.autoSpd ? ' (제한속도 자동)' : ''} · +/-: 속도 · Y: 제한속도 자동 · T: 차간거리 · S: 끄기${autod.onHwy ? '' : ' · 고속도로에선 구간 속도를 자동 유지'}`, 'good', 3500);
  audio.beep();
}
// 자율주행 · SCC 패널의 속도 버튼
$('#adas').addEventListener('pointerdown', (e) => {
  const b = e.target.closest('[data-ad]'); if (!b || !autod.on) return;
  e.preventDefault(); e.stopPropagation();
  if (b.dataset.ad === 'up') autod.adjust(5);
  else if (b.dataset.ad === 'dn') autod.adjust(-5);
  else { const on = autod.toggleAuto(G.road && G.road.limit); toast(on ? '🚦 제한속도를 따라가요' : '내가 정한 속도로 달려요 — ＋/− 로 맞춰요', 'info', 1600); return; }
  assistToast();
});
function assistToast() { toast(`${autod.manual ? '🤖 자율주행 내 속도' : '설정 속도'} <b>${autod.set}km/h</b>${autod.manual ? ' (제한속도와 상관없이 · 커브·신호·앞차에선 알아서 줄여요)' : ''} · 차간거리 ${'▮'.repeat(autod.gapI + 1)}${'▯'.repeat(3 - autod.gapI)}`, 'info', 1200); }
function updateAssistHud() {
  const el = $('#adas');
  if (!autod.on || G.P.onFoot) { if (!el.classList.contains('hidden')) el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  const r = G.road && G.road.edge ? G.road : null, hw = !!(r && (r.kind === 'highway' || r.edge.elevated));
  const lim = autod.manual ? autod.set : hw && autod.hda ? Math.min(autod.set, r.limit) : autod.mode === 2 && r ? Math.min(autod.set, r.limit) : autod.set;
  const tags = `${hw && !autod.manual ? '<em class="hda">HDA</em>' : ''}${autod.autoSpd ? '<em>AUTO</em>' : autod.manual ? '<em class="me">내 속도</em>' : ''}`;
  const html = `<span class="ad-ico ${autod.mode === 2 ? 'auto' : ''}">${autod.mode === 2 ? '🤖' : '⟳'}</span><div><b>${lim}<small>km/h</small>${tags}</b><small>${autod.status}${lim < autod.set ? ' · 구간 제한' : ''}${autod.manual && r && autod.set > r.limit ? ` · 제한 ${r.limit} 초과` : ''}</small></div><div class="ad-spd"><button data-ad="dn" title="속도 -5 (-)">−</button><button data-ad="auto" class="${autod.autoSpd ? 'on' : ''}" title="제한속도 따라가기 (Y)">제한</button><button data-ad="up" title="속도 +5 (+)">＋</button></div><div class="ad-gap"><i class="car"></i>${[0, 1, 2, 3].map((k) => `<i class="${k <= autod.gapI ? 'on' : ''}"></i>`).join('')}${autod.lead && autod.lead.gap < 80 ? '<i class="car lead"></i>' : ''}</div>`;
  if (el.innerHTML !== html) el.innerHTML = html;
}
// 멀리 떨어진 내 차를 가까운 도로로 부르기
function callCar() {
  const P = G.P;
  let best = null;
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) for (const e of edgesNear(P.px + dx * 60, P.pz + dz * 60)) {
    if (e.elevated || e.ramp) continue;
    const s = clamp((P.px - e.a.x) * e.dir.x + (P.pz - e.a.z) * e.dir.z, 0, e.len);
    const d = Math.hypot(e.a.x + e.dir.x * s - P.px, e.a.z + e.dir.z * s - P.pz);
    if (!best || d < best.d) best = { e, s, d };
  }
  if (!best || best.d > 120) return toast('근처에 차를 세울 도로가 없어요', 'warn');
  const Ls = W.links.filter((L) => L.edge === best.e);
  const sOf = (L) => clamp(L.from === best.e.a ? best.s : L.len - best.s, L.s0 + 2, Math.max(L.s0 + 2, L.s1 - 2));
  const dOf = (L) => { const q = lanePos(L, L.n - 1, sOf(L)); return Math.hypot(q.x - P.px, q.z - P.pz); };
  const L = Ls.sort((a, b) => dOf(a) - dOf(b))[0];
  if (!L) return;
  const q = lanePos(L, L.n - 1, sOf(L));
  placePlayer(q.x, q.z, L.heading, 'surface');
  toast(`🚗 내 차를 불렀어요 — ${best.e.name || '도로'}에 세워 뒀어요`, 'good', 2500);
}
function fuelZone() { const P = G.P; return zoneAt(P.sim.x, P.sim.z, P.spec.ev ? 'ev' : 'fuel'); }
function enterFoot() {
  const P = G.P;
  P.onFoot = true;
  P.person = buildAvatar(S.avatar);
  scene.add(P.person);
  const s = Math.sin(P.sim.heading), c = Math.cos(P.sim.heading);
  const side = P.spec.type === 'bus' ? -1 : 1; // 버스는 앞문(오른쪽)으로 내림
  P.px = P.sim.x + c * side * (P.wid / 2 + 0.9) + s * (P.len / 2 - 1.2);
  P.pz = P.sim.z - s * side * (P.wid / 2 + 0.9) + c * (P.len / 2 - 1.2);
  P.ph = P.sim.heading; P.pphase = 0; P.plevel = P.sim.level;
  if (P.obj.doors.length) P.obj.doors[0].target = 1;
  toast('🚶 걸어서 둘러보세요. 차 옆에서 E를 누르면 다시 타요', 'info');
}
function exitFoot(silent) {
  const P = G.P;
  P.onFoot = false;
  if (P.person) scene.remove(P.person);
  P.person = null;
  if (P.obj.doors.length) P.obj.doors[0].target = 0;
  if (!silent) toast('🚗 탑승!', 'info', 900);
}

// ===================== 메시지 =====================
function toast(msg, kind = 'info', ms = 3200) {
  const box = $('#toasts');
  const d = document.createElement('div');
  d.className = 'toast ' + kind; d.innerHTML = msg;
  box.appendChild(d);
  while (box.children.length > 4) box.firstChild.remove();
  setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 400); }, ms);
}
function hint(t) { const h = $('#hint'); if (h.textContent !== t) h.textContent = t; h.classList.remove('hidden'); G.hintT = 0.4; }
// 돈 쉽게 벌기: 모든 보상 3배
const EARN_MULT = 3;
function addMoney(n, reason) { n = Math.round(n * EARN_MULT); S.money += n; if (reason) toast(`<b>+${won(n)}</b> ${reason}`, 'money'); saveSoon(); return n; }
function fine(n, reason) {
  if (G.demo) return;
  if (ctx.sirenOn && !/충돌|사고/.test(reason)) return; // 긴급 출동 중 (사이렌): 신호 · 속도 위반 면제
  if (S.settings.easy) { toast(`🙂 괜찮아요! ${reason.replace(/^[^가-힣A-Za-z]*/, '')} — 쉬운 운전 모드라 벌금은 없어요`, 'warn', 2600); return; }
  n = Math.round(n * 0.5); S.money = Math.max(0, S.money - n); toast(`<b>-${won(n)}</b> ${reason}`, 'bad'); saveSoon(); }
let saveTimer = null;
function saveSoon() { if (!saveTimer) saveTimer = setTimeout(() => { saveTimer = null; save(); }, 1500); }

// ===================== 모드 시작 =====================
function quest(id, n) { questAdd(S, id, n, (q) => { toast(`📋 일일 퀘스트 완료: <b>${q.t}</b> — 메뉴의 퀘스트에서 보상을 받으세요!`, 'good', 4500); audio.coin(); saveSoon(); }); }
const ctx = {
  scene, audio, toast, hint, addMoney, fine, save: S, quest,
  get P() { return G.P; },
  get road() { return G.road; },
  get traffic() { return traffic; },
  get input() { return { handbrake: key('Space') || (G.P && G.P.park) }; },
  setMission(html) { if (html !== G.missionHTML) { G.missionHTML = html; $('#mission').innerHTML = html; } },
  placePlayer: (x, z, h, lv) => placePlayer(x, z, h, lv),
  get nav() { return nav; },
  laneNear: (x, z, R) => laneNear(x, z, R),
  get hour() { return env.hour; },
  say: (t) => { if (S.settings.voice !== false) audio.speak && audio.speak(t, true); },
  summary(d) {
    { const D = S.stats.done || (S.stats.done = {}); const id = d.mode || G.modeId || 'free'; D[id] = (D[id] || 0) + 1; if (d.grade === 'S') D.S = 1; saveSoon(); }
    G.state = 'pause';
    audio.engine({ on: false });
    summaryModal(d).then((i) => {
      if (i === 0) toMenu();
      else { endMission(); G.mission = new FreeMission(); G.mission.start(ctx); G.state = 'play'; }
    });
  },
};
function endMission() { try { police.remove(); } catch (e) { /* 아직 준비 전 */ } if (G.mission) G.mission.dispose(scene); G.mission = null; G.missionHTML = ''; $('#mission').innerHTML = ''; if (nav && nav.auto) nav.stop(true); G.navKey = null; }

// 다른 도시에 가까워지면 (8km) 그 도시 지도를 미리 받아 붙임
function autoRegions(px, pz) {
  for (const d of W.regionDefs || []) {
    if (d.promise || !d.B) continue;
    const dx = Math.max(d.B.x0 - px, 0, px - d.B.x1), dz = Math.max(d.B.z0 - pz, 0, pz - d.B.z1);
    if (Math.hypot(dx, dz) < 8000) W.ensureRegion(d.id).then((ok) => { if (ok) toast(`🗺️ <b>${d.name}</b> 지도를 불러왔어요. 고속도로가 ${d.name} 시내 도로로 이어져요.`, 'good', 3500); });
  }
}
// 아직 안 불러온 도시가 필요하면 (그 도시에서 출발 · 그 도시 버스 노선) 지도를 먼저 받음
function regionNeeded(modeId, opts) {
  const mode = MODES.find((m) => m.id === modeId);
  if (mode && mode.veh === 'bus') {
    const r = (W.routes || []).find((x) => x.id === opts.route) || (W.pendingRoutes || []).find((x) => x.id === opts.route);
    return r && r.region && !W.regionDefs.find((d) => d.id === r.region).loaded ? r.region : null;
  }
  const sp = W.spawns[S.world.spawn];
  return sp && sp.lazy ? sp.lazy : null;
}
function loadRegionThen(id, fn) {
  const def = W.regionDefs.find((d) => d.id === id);
  toast(`🗺️ <b>${def ? def.name : id}</b> 지도를 받는 중이에요... (처음 한 번만)`, '', 4000);
  W.ensureRegion(id).then((ok) => { if (ok) fn(); else toast('지도를 받지 못했어요. 잠시 뒤 다시 해 주세요.', 'bad', 3000); });
}
function startMode(modeId, opts = {}) {
  if (!app.ready) { app.whenReady(() => startMode(modeId, opts)); return; }
  { const need = regionNeeded(modeId, opts); if (need) { loadRegionThen(need, () => startMode(modeId, opts)); return; } }
  audio.init();
  endMission();
  const mode = MODES.find((m) => m.id === modeId);
  let own = ownedBy(S.current);
  G.routeForSign = null;
  if (mode.veh === 'bus') {
    const route = W.routes.find((r) => r.id === opts.route) || W.routes[0];
    G.routeForSign = route;
    const WR = withLinks(route) || route;
    const T = BUS_TYPES[route.type] || BUS_TYPES.trunk;
    if (opts.bus === 'company' || !ownedBy(opts.bus)) own = { uid: -1, id: routeModelOf(WR) || T.models[0], color: '#ffffff', wheel: 'std', plate: randomPlate('bus'), tune: { engine: 0, brake: 0, handling: 0 }, livery: route.type === 'trunk' && Math.random() < 0.35 ? 'teal' : T.livery, company: companyNameOf(WR), fuel: 100, temp: true };
    else own = ownedBy(opts.bus);
  } else if (mode.veh === 'car' && BY_ID[own.id].type === 'bus') {
    own = S.owned.find((o) => BY_ID[o.id].type === 'car') || own;
  }
  if (modeId === 'ems') own = { uid: -3, id: 'hb_staria', color: '#f4f4f2', wheel: 'std', plate: '119 응급', tune: { engine: 1, brake: 1, handling: 0 }, fuel: 100, trim: 0, opts: ['hud'], temp: true };
  G.modeId = modeId;
  setPlayer(own);
  const route = G.routeForSign;
  let m;
  switch (modeId) {
    case 'bus': m = new BusRouteMission(withLinks(route), { noDepot: !!opts.noDepot, forceDepot: !!opts.forceDepot }); break;
    case 'stopping': m = new BusRouteMission(withLinks(route), { precision: true }); break;
    case 'passenger': m = new BusRouteMission(withLinks(route), { schedule: true }); break;
    case 'highway': m = new CheckpointMission('highway'); break;
    case 'mountain': m = new CheckpointMission('mountain'); break;
    case 'parking': m = new ParkingMission(); break;
    case 'ugparking': m = new ParkingMission('ug'); break;
    case 'taxi': m = new TaxiMission(); break;
    case 'delivery': m = new DeliveryMission(); break;
    case 'license': m = new LicenseMission(); break;
    case 'ems': m = new EmergencyMission(); break;
    default: m = new FreeMission(mode.name);
  }
  if (m instanceof FreeMission || m instanceof TaxiMission || m instanceof DeliveryMission || m instanceof LicenseMission || m instanceof EmergencyMission) placeAt(W.spawns[S.world.spawn] || W.spawns.city);
  G.mission = m;
  m.start(ctx);
  env.hour = S.world.hour; env.setWeather(S.world.weather);
  for (const a of traffic.cars) { a.active = false; a.obj.group.visible = false; }
  traffic.initialPlace(G.P.sim.x, G.P.sim.z, desiredTraffic());
  G.state = 'play';
  hideAll();
  $('#hud').classList.remove('hidden');
  toast(`<b>${mode.name}</b> 시작! W/S 가속·브레이크, A/D 핸들, C 카메라, F1 도움말`, 'info', 5000);
  if (G.P.spec.type === 'bus') { G.camMode = 1; toast('🚌 운전석 시점이에요 (C로 카메라 바꾸기) · 1: 앞문 · 2: 뒷문', 'info', 5000); }
}
function withLinks(r) { return W.routes.find((x) => x.id === r.id); }
function pause() { if (G.state !== 'play') return; G.state = 'pause'; audio.engine({ on: false }); audio.horn(false); show('pause'); }
function resume() {
  if (G.state !== 'pause') return;
  hideAll();
  if (G.dirtyVehicle && G.P && !G.P.own.temp) {
    G.dirtyVehicle = false;
    const o = ownedBy(S.current);
    if (o && (!G.mission || G.mission instanceof FreeMission || (BY_ID[o.id].type === G.P.spec.type))) setPlayer(o);
  }
  G.state = 'play';
  $('#hud').classList.remove('hidden');
}
function toMenu() {
  endMission();
  G.state = 'menu'; document.body.dataset.state = 'menu';
  $('#hud').classList.add('hidden');
  toggleBigMap(false);
  audio.engine({ on: false }); audio.horn(false);
  try { speechSynthesis.cancel(); } catch (e) { /* 무시 */ }
  if (nav) nav.stop(true);
  $('#navui').classList.add('hidden'); $('#nav-bar').classList.add('hidden'); $('#camwarn').classList.add('hidden');
  G.routeForSign = null;
  setPlayer(ownedBy(S.current));
  placeAt(W.spawns.city);
  save();
  show('title');
}
function desiredTraffic() {
  const base = Math.round(({ low: 30, normal: 60, high: 95 }[S.settings.traffic] || 60) * (ULTRA ? 0.3 : LITE ? 0.45 : Q === 'low' ? 0.6 : Q === 'medium' ? 0.85 : 1));
  const h = env ? env.hour : 12;
  const m = (h >= 7 && h < 9.5) || (h >= 17.5 && h < 19.5) ? 1.3 : h < 5 ? 0.35 : h >= 22 ? 0.6 : 1;
  const hw = G.road && G.road.edge && G.road.edge.corr ? 0.55 : 1; // 서울 가는 고속도로는 길이 하나라 덜 촘촘하게
  return Math.min(traffic ? traffic.cars.length : 60, Math.round(base * m * hw));
}
// 아직 지도를 받지 않은 도시: 그림으로 그린 도시 풍경
function skylineThumb(id, w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  let seed = id.length * 97 + id.charCodeAt(0); const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#16233f'); sky.addColorStop(0.55, '#3d4f86'); sky.addColorStop(0.8, '#e98b62'); sky.addColorStop(1, '#f6c27a');
  g.fillStyle = sky; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(255,255,255,${0.3 + rnd() * 0.5})`; g.fillRect(rnd() * w, rnd() * h * 0.45, 1.5, 1.5); }
  const base = h * 0.82;
  if (id === 'seoul') { // 남산 + 타워 · 롯데월드타워
    g.fillStyle = '#1b2440'; g.beginPath(); g.moveTo(10, base); g.quadraticCurveTo(70, base - 90, 130, base); g.fill();
    g.fillRect(68, base - 150, 5, 70); g.fillRect(63, base - 110, 15, 8);
    g.beginPath(); g.moveTo(178, base); g.lineTo(186, base - 205); g.lineTo(194, base); g.fill();
  } else if (id === 'busan') { // 광안대교 + 해운대 고층
    g.fillStyle = '#1b2440'; for (const [x, hh] of [[150, 190], [166, 170], [182, 205]]) g.fillRect(x, base - hh, 12, hh);
    g.strokeStyle = '#8fb3ff'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, base - 18); g.lineTo(w, base - 18); g.stroke();
    for (const x of [60, 120]) { g.fillStyle = '#1b2440'; g.fillRect(x, base - 70, 4, 70); g.beginPath(); g.moveTo(x + 2, base - 70); g.quadraticCurveTo(x - 25, base - 30, x - 50, base - 18); g.moveTo(x + 2, base - 70); g.quadraticCurveTo(x + 30, base - 30, x + 60, base - 18); g.strokeStyle = '#8fb3ff'; g.stroke(); }
  } else { // 대전: 한빛탑
    g.fillStyle = '#1b2440'; g.fillRect(150, base - 160, 6, 160); g.beginPath(); g.arc(153, base - 150, 13, 0, Math.PI * 2); g.fill();
  }
  for (let x = 0; x < w;) {
    const bw = 14 + rnd() * 26, bh = 40 + rnd() * 120;
    g.fillStyle = '#121a30'; g.fillRect(x, base - bh, bw, bh);
    for (let yy = base - bh + 6; yy < base - 4; yy += 9) for (let xx = x + 3; xx < x + bw - 3; xx += 6) if (rnd() < 0.35) { g.fillStyle = 'rgba(255,214,140,.85)'; g.fillRect(xx, yy, 3, 4); }
    x += bw + 2;
  }
  g.fillStyle = '#0b2a3d'; g.fillRect(0, base, w, h - base);
  g.fillStyle = 'rgba(246,194,122,.35)'; for (let i = 0; i < 12; i++) g.fillRect(rnd() * w, base + 4 + rnd() * (h - base - 8), 20 + rnd() * 30, 2);
  return c.toDataURL('image/jpeg', 0.85);
}
// 구별 미리보기 사진 (실제 3D 지도를 찍어서)
function makeThumbs() {
  if (G.thumbs) return G.thumbs;
  const out = {};
  const w = 240, h = 300, pr = renderer.getPixelRatio();
  const cam = new THREE.PerspectiveCamera(58, w / h, 0.5, 2500);
  const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
  const g = tmp.getContext('2d');
  const size = new THREE.Vector2(); renderer.getSize(size);
  try {
    for (const d of DISTRICTS) {
      const sp = W.spawns[d.spawns[0]]; if (!sp) continue;
      if (sp.lazy) { out[d.id] = skylineThumb(d.id, w, h); continue; }
      buildBuildingsNear(sp.x, sp.z, 500); buildCorridorNear(sp.x, sp.z); buildRegionNear(sp.x, sp.z);
      const fx = Math.sin(sp.heading), fz = Math.cos(sp.heading);
      cam.position.set(sp.x - fx * 26 + fz * 6, 14, sp.z - fz * 26 - fx * 6);
      cam.lookAt(sp.x + fx * 70, 4, sp.z + fz * 70);
      env.update(0.016, sp, cam.position);
      renderer.shadowMap.needsUpdate = true;
      renderer.setViewport(0, 0, w, h); renderer.setScissor(0, 0, w, h); renderer.setScissorTest(true);
      renderer.render(scene, cam);
      g.drawImage(renderer.domElement, 0, renderer.domElement.height - h * pr, w * pr, h * pr, 0, 0, w, h);
      out[d.id] = tmp.toDataURL('image/jpeg', 0.82);
    }
  } catch (e) { console.warn('thumbs', e); }
  renderer.setScissorTest(false); renderer.setViewport(0, 0, size.x, size.y);
  G.thumbs = out;
  return out;
}
const app = {
  W, audio, thumbs: makeThumbs, ready: false, waiters: [],
  whenReady(f) { if (app.ready) f(); else { app.waiters.push(f); toast('🗺️ 광주 지도를 마저 준비하고 있어요. 곧 시작해요!', '', 2500); } },
  startMode, resume, toMenu,
  inGame: () => G.state === 'play' || G.state === 'pause',
  applySettings() { audio.setVolume(S.settings.volume); audio.voice = S.settings.voice; applyMute(); applyEasy(); { const cap = Math.min(devicePixelRatio, S.settings.sharp ? 2 : Q === 'high' ? 1.6 : Q === 'medium' ? 1.35 : ULTRA ? 0.75 : LITE ? 1 : 1.15); if (typeof PERF !== 'undefined' && Math.abs(cap - PERF.base) > 0.01) { PERF.base = PERF.pr = cap; renderer.setPixelRatio(cap); renderer.setSize(innerWidth, innerHeight); } } G.mirrorsOn = S.settings.mirrors; },
  setTimeWeather(h, w) { if (env) { env.hour = h; env.setWeather(w); } },
  toHub(id) { const h = HUBS.find((x) => x.id === id); if (!h) return; const q = hubCurb(h) || { x: h.x, z: h.z, heading: 0 }; placePlayer(q.x, q.z, q.heading); },
  teleport(k) {
    const sp = W.spawns[k]; if (!sp) return;
    if (sp.lazy) { loadRegionThen(sp.lazy, () => app.teleport(k)); return; }
    if (G.mission && !(G.mission instanceof FreeMission)) { endMission(); G.mission = new FreeMission(); G.mission.start(ctx); }
    placeAt(sp);
    for (const a of traffic.cars) { a.active = false; a.obj.group.visible = false; }
    traffic.initialPlace(G.P.sim.x, G.P.sim.z, desiredTraffic());
    hideAll(); G.state = 'play'; $('#hud').classList.remove('hidden');
  },
  onAvatarChanged() { showroom.setAvatar(S.avatar); },
  playerPose() { const P = G.P; if (!P) return { x: 0, z: 0, heading: 0 }; return P.onFoot ? { x: P.px, z: P.pz, heading: G.camHeading } : { x: P.sim.x, z: P.sim.z, heading: P.sim.heading, level: P.sim.level }; },
  playerPos() { return G.state === 'menu' ? null : app.playerPose(); },
  roadName() { return G.road && G.road.name; },
  toast: (m, k, ms) => toast(m, k, ms),
  companyName: (R) => companyNameOf(R),
  routeModel: (R) => routeModelOf(R),
  companyNames: () => (S.admin && S.admin.companies ? S.admin.companies.map((c) => c.name) : []),
  onVehicleChanged() { showroom.setFeatured(ownedBy(S.current)); if (!app.ready) return; if (G.state === 'menu') { setPlayer(ownedBy(S.current)); placeAt(W.spawns.city); } else G.dirtyVehicle = true; },
};

// 디버그용 (콘솔에서 window.__bitgoeul 로 상태 확인)
window.__bitgoeul = { app, G, show, hideAll, get showroom() { return showroom; }, get nav() { return nav; }, get traffic() { return traffic; }, interact: () => interact(), enterFoot: () => enterFoot(), action: (c) => action(c), autod, placePlayer: (x, z, h, lv) => placePlayer(x, z, h, lv), get S() { return S; }, get police() { return police; }, get W() { return W; }, get env() { return env; }, get renderer() { return renderer; }, get scene() { return scene; } };

// ===================== 메인 루프 =====================
let last = performance.now();
let fpsAcc = 0, fpsN = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const rawDt = (now - last) / 1000;
  const dt = Math.min(0.05, rawDt); last = now;
  fpsAcc += rawDt; fpsN++; perfTick(rawDt);
  if (fpsAcc > 0.5) { const f = $('#fps'); f.classList.toggle('hidden', !S.settings.fps); f.textContent = `${(fpsAcc / fpsN * 1000).toFixed(1)} ms (${Math.round(fpsN / fpsAcc)} fps)`; fpsAcc = 0; fpsN = 0; }
  G.frame++;
  if (app.ready && G.P) { const P = G.P, px = P.onFoot ? P.px : P.sim.x, pz = P.onFoot ? P.pz : P.sim.z; streamBuildings(px, pz, G.state === 'play' ? (Q === 'low' ? 2 : 3) : 9); if (G.state === 'play' && G.frame % 2 === 0) streamCorridor(px, pz); if (G.state === 'play' && G.frame % 2 === 1) streamRegion(px, pz); if (G.state === 'play' && G.frame % 30 === 0) autoRegions(px, pz); }
  if (S.infMoney && G.frame % 30 === 0) { if (S.money < 1e15) S.money = 1e15; if (S.admin && S.admin.cash < 1e15) S.admin.cash = 1e15; } // 관리자 돈 무제한
  if (G.state === 'play') updatePlay(dt);
  else if (G.state === 'menu') updateMenu(dt);
  render();
}

function updateMenu(dt) {
  G.menuT += dt;
  camera.near = 0.1; camera.fov = 45;
  showroom.update(dt, camera);
  camera.clearViewOffset();
  camera.updateProjectionMatrix();
}

function playerAgent() {
  const P = G.P, s = P.sim;
  const tp = transit && transit.pos();
  const c = tp || (P.onFoot ? { x: P.px, z: P.pz } : null);
  return { x: s.x, z: s.z, fx: Math.sin(s.heading), fz: Math.cos(s.heading), v: Math.abs(s.vl), len: P.len, wid: P.wid, cx: c ? c.x : undefined, cz: c ? c.z : undefined };
}
function camInfo() { const d = new THREE.Vector3(); camera.getWorldDirection(d); return { x: camera.position.x, z: camera.position.z, fx: d.x, fz: d.z }; }

// 통행료: 개방식(요금소마다), 폐쇄식(들어올 때 통행권, 나갈 때 거리만큼: 1종 900원 + km당 44.3원, 2종 45.2원, 경차 50%)
function tollFor(km) {
  const P = G.P, bus = P.spec.type === 'bus';
  let f = (bus ? 900 : 900) + km * (bus ? 45.2 : 44.3);
  if (!bus && /경/.test(P.spec.cls || '')) f *= 0.5;
  return Math.max(0, Math.round(f / 100) * 100);
}
function payToll(t) {
  const P = G.P, bus = P.spec.type === 'bus', light = !bus && /경/.test(P.spec.cls || '');
  audio.beep();
  if (t.kind === 'open') {
    const fee = Math.round((t.fee * (bus ? 1.3 : light ? 0.5 : 1)) / 100) * 100;
    S.money = Math.max(0, S.money - fee);
    toast(`🛣️ ${t.name} 하이패스 통과 <b>-${fee.toLocaleString()}원</b>`, 'money', 2200);
    return;
  }
  if (t.kind === 'closed') {
    const tk = G.hwTicket;
    if (!tk || tk.name === t.name) {
      G.hwTicket = { name: t.name, s: t.s ?? 0, x: t.x, z: t.z, km: t.km };
      toast(`🎫 ${t.name} 진입 · 하이패스 통행권 기록 <small>(나가는 요금소에서 거리만큼 정산)</small>`, 'good', 2600);
      return;
    }
    const km = Math.abs((t.km ?? 0) - (tk.km ?? 0)) || Math.hypot(t.x - tk.x, t.z - tk.z) / 1000;
    const fee = tollFor(km);
    S.money = Math.max(0, S.money - fee);
    G.hwTicket = null;
    toast(`🛣️ ${tk.name} → ${t.name} ${km.toFixed(0)}km · 하이패스 <b>-${fee.toLocaleString()}원</b>`, 'money', 3200);
    return;
  }
  toast(`🛣️ ${t.name} 하이패스 통과`, '', 1500);
}

function updatePlay(dt) {
  const P = G.P, sim = P.sim;
  G.simT += dt;
  if (stage && stage.on) stage.update(dt);
  if (G.frame % 20 === 5) updateLabels(camera.position.x, camera.position.z, Q === 'low' ? 170 : 260, Q === 'low' ? 90 : 160);
  if (document.body.dataset.state !== 'play') document.body.dataset.state = 'play';
  {
    const want = !P.onFoot && !G.photo && !(stage && stage.on) && (sim.gear === 'R' || camv.forced);
    camv.setVisible(want);
    if (!want) document.body.classList.remove('revcam', 'camfb');
    if (want) {
      // 뒤쪽 가장 가까운 차 · 사람까지 거리 (후방 경고음)
      const fx = Math.sin(sim.heading), fz = Math.cos(sim.heading); let nb = null;
      const chk = (a, w) => { const dx = a.x - sim.x, dz = a.z - sim.z, lon = -(dx * fx + dz * fz) - P.len / 2 - (a.len || 1) / 2; if (lon < -0.5 || lon > 6) return; if (Math.abs(dx * fz - dz * fx) > P.wid / 2 + w) return; nb = nb === null ? Math.max(0, lon) : Math.min(nb, Math.max(0, lon)); };
      for (const a of traffic.cars) if (a.active) chk(a, (a.wid || 1.8) / 2);
      for (const a of traffic.peds || []) if (a.active) chk(a, 0.4);
      { const hu = document.getElementById('huHi'); const r = hu && hu.style.display === 'block' && hu.firstChild ? hu.firstChild.getBoundingClientRect() : null; camv.layout(r); }
      document.body.classList.toggle('revcam', camv.el.classList.contains('inscreen'));
      document.body.classList.toggle('camfb', !camv.el.classList.contains('inscreen'));
      camv.update(P, G.steerIn, nb);
      if (nb !== null && sim.gear === 'R') { G.pdcT = (G.pdcT || 0) - dt; if (G.pdcT <= 0) { G.pdcT = nb < 0.6 ? 0.12 : nb < 1.6 ? 0.35 : 0.7; try { audio.tone(1900, 0.06, 'sine', 0.04); } catch (e) { /* 무시 */ } } }
    }
  }
  if (!G.bootCleared && G.simT > 25) { G.bootCleared = true; bootOk(); }
  if (SAFE_NOTE && G.simT > 2) { toast(SAFE_NOTE, 'warn', 6000); SAFE_NOTE = ''; }
  // 주행 기록 (업적용)
  if (!P.onFoot && !G.demo) {
    const dk = Math.abs(sim.vl) * dt / 1000;
    S.stats.km = (S.stats.km || 0) + dk;
    if (env.nightF > 0.5) S.stats.nightKm = (S.stats.nightKm || 0) + dk;
    if (env.w.rain) S.stats.rainKm = (S.stats.rainKm || 0) + dk;
  }
  if (G.frame % 120 === 0) G.otherCity = G.otherCity || (W.regionDefs || []).some((d) => d.loaded && d.B && sim.x > d.B.x0 && sim.x < d.B.x1 && sim.z > d.B.z0 && sim.z < d.B.z1);
  if (!G.demo) ach.update(dt, G);
  globalThis.__RK_ADS = (S.admin && S.admin.up && S.admin.up.ads) || 0;
  if (Q !== 'low' || G.frame % 2 === 0) { if (!stopBis) stopBis = new StopBis(scene); stopBis.update(dt, sim.x, sim.z, G.simT, G.mission && G.mission.gap, env.hour); }
  if (G.frame % 10 === 0 && P && P.sim && !G.demo) schoolBusRule(P);
  if (bis.on) { if (G.mission && G.mission.gap) bis.update(dt, G.mission.gap, G.mission, P.sim); else { bis.toggle(false); $('#btn-bis').classList.remove('on'); } }
  document.body.classList.toggle('busroute', !!(G.mission && G.mission.gap));
  W.refY = P.onFoot ? undefined : P.y; sim.py = P.y; // 여러 층 고가에서 지금 높이 기준
  env.hour = (env.hour + (dt * S.settings.timeSpeed) / 3600) % 24;
  S.world.hour = env.hour;
  G.sigT -= dt; if (G.sigT <= 0) { G.sigT = 0.2; updateSignals(G.simT); updateRegionSignals(G.simT); }

  // ---- 조작 ----
  const camName = CAMS[G.camMode][0];
  const control = !P.onFoot && camName !== 'free' && !G.photo;
  const tl = control && key('KeyA', 'ArrowLeft'), tr = control && key('KeyD', 'ArrowRight');
  let steerT = (tl ? 1 : 0) - (tr ? 1 : 0);
  if (control && G.wheelSteer && !tl && !tr) steerT = G.wheelSteer;
  // ---- 운전 보조 (SCC · 자율주행) ----
  const uThr = control && key('KeyW', 'ArrowUp'), uBrk = control && key('KeyS', 'ArrowDown');
  let ad = null;
  if (autod.on) {
    if (!control || P.onFoot || P.park || !P.engine || (P.gearMode !== 'auto' && P.gearMode !== 'D')) { autod.off(); toast('운전 보조가 꺼졌어요', 'info', 1400); }
    else if (uBrk) { autod.off(); toast('🦶 브레이크를 밟아 운전 보조가 꺼졌어요', 'info', 1600); }
    else {
      ad = autod.update(dt, { sim, P, cars: traffic.cars, agents: mp.agents().concat(hazards.obstacles), nav, simT: G.simT, isBus: P.spec.type === 'bus', hz: hazards });
      if (ad && ad.lost) { toast(ad.lost, ad.done ? 'good' : 'warn', 2500); ad = null; }
      else if (ad && ad.steer !== null && !tl && !tr && !G.wheelHeld) steerT = ad.steer;
      if (ad && autod.mode === 2) busAutoStop(ad, P, sim);
      if (ad && ad.blink !== undefined && autod.mode === 2 && !P.hazard) { if (ad.blink) { P.blink = ad.blink; G.autoBlink = true; } else if (G.autoBlink) { P.blink = 0; G.autoBlink = false; } }
    }
  }
  // 🧒 쉬운 운전: 차로 유지 보조 (방향키를 놓으면 지금 차로 가운데로 부드럽게)
  G.lka = false;
  if (S.settings.easy && control && !ad && !P.onFoot && !tl && !tr && !G.wheelHeld && Math.abs(G.wheelSteer || 0) < 0.05 && sim.vl > 3) {
    const r = roadInfoAt(sim.x, sim.z, sim.level === 'hwy' ? 'hwy' : 'surface');
    const L = r && r.link;
    if (L && Number.isFinite(r.s) && Math.abs(angDiff(L.heading, sim.heading)) < 0.6 && r.s < (L.s1 ?? L.len) - 6) {
      const ln = clamp(Number.isFinite(r.lane) ? r.lane : L.n - 1, 0, L.n - 1);
      const tp = lanePos(L, ln, Math.min((L.s1 ?? L.len) - 1, r.s + 6 + sim.vl * 0.7));
      const err = angDiff(sim.heading, Math.atan2(tp.x - sim.x, tp.z - sim.z));
      const ld = Math.max(5, Math.hypot(tp.x - sim.x, tp.z - sim.z));
      const lim = sim.maxSteer / (1 + (sim.vl / sim.v0) ** 2);
      steerT = clamp(Math.atan((2 * sim.wb * Math.sin(err)) / ld) / Math.max(0.02, lim), -0.5, 0.5);
      G.lka = true;
    }
  }
  if (!control) G.wheelSteer = 0;
  const sr = steerT === 0 ? 5 : Math.sign(steerT) !== Math.sign(G.steerIn) ? 6 : (P.spec.type === 'bus' ? 2.2 : 3.2);
  G.steerIn += clamp(steerT - G.steerIn, -sr * dt, sr * dt);
  if (G.wheelSteer && !G.wheelHeld) G.wheelSteer *= 1 - Math.min(1, dt * 2.5);
  $('#wheelpad svg') && ($('#wheelpad svg').style.transform = `rotate(${-G.steerIn * 135}deg)`);
  const pa = G.pedalAmt || {};
  let thrT = uThr ? (G.touch.KeyW && !G.keys.KeyW && !G.keys.ArrowUp ? pa.KeyW ?? 1 : 1) : 0, brkT = uBrk ? (G.touch.KeyS && !G.keys.KeyS && !G.keys.ArrowDown ? pa.KeyS ?? 1 : 1) : 0;
  if (ad && !uThr) { thrT = ad.throttle; brkT = ad.brake; }
  // ⚠️ 전방 충돌 경고 (FCW): 앞차와 부딪히기 1.6초 전이면 경고음 + 화면 경고 (쉬운 모드는 아래 자동 제동이 대신)
  if (!S.settings.easy && !P.onFoot && !ad && sim.vl > 5 && G.frame % 3 === 0) {
    const fx = Math.sin(sim.heading), fz = Math.cos(sim.heading); let ttc = 99;
    for (const a of traffic.cars) {
      if (!a.active) continue;
      const dx = a.x - sim.x, dz = a.z - sim.z, lon = dx * fx + dz * fz;
      if (lon <= 0 || lon > 60 || Math.abs(dx * fz - dz * fx) > (P.wid + (a.wid || 1.8)) / 2 + 0.2) continue;
      const av = (a.v || 0) * (a.fx * fx + a.fz * fz), close = sim.vl - av;
      if (close > 1) ttc = Math.min(ttc, (lon - P.len / 2 - (a.len || 4.5) / 2) / close);
    }
    const warn = ttc < 1.6;
    if (warn && !G.fcw) { toast('⚠️ 앞차 충돌 주의! 브레이크!', 'bad', 1400); }
    if (warn) { G.fcwT = (G.fcwT || 0) - dt * 3; if (G.fcwT <= 0) { G.fcwT = 0.25; try { audio.tone(2200, 0.08, 'square', 0.05); } catch (e) { /* 무시 */ } } }
    G.fcw = warn; document.body.classList.toggle('fcw', warn);
  } else if (G.fcw && G.frame % 3 === 0) { G.fcw = false; document.body.classList.remove('fcw'); }
  // 🧒 쉬운 운전 모드: 최고 60km/h(버스 50) · 앞차/사람 앞 자동 긴급 제동
  if (S.settings.easy && !P.onFoot) {
    const cap = P.spec.type === 'bus' ? 50 : 60;
    if (sim.kmh > cap) thrT = 0;
    const v = Math.abs(sim.vl);
    if (v > 2 && sim.vl > 0) {
      const fx = Math.sin(sim.heading), fz = Math.cos(sim.heading);
      const need = (v * v) / (2 * 6.5) + P.len / 2 + 4;
      let hit = false;
      const chk = (a, w) => { const dx = a.x - sim.x, dz = a.z - sim.z, lon = dx * fx + dz * fz; if (lon <= 0 || lon > need + (a.len || 1) / 2) return; if (Math.abs(dx * fz - dz * fx) < w) hit = true; };
      for (const a of traffic.cars) if (a.active) chk(a, (P.wid + (a.wid || 1.8)) / 2 + 0.3);
      for (const a of traffic.peds || []) if (a.active) chk(a, P.wid / 2 + 0.6);
      if (hit) { thrT = 0; brkT = 1; if (G.simT - (G.aebT || -9) > 4) { G.aebT = G.simT; toast('🛑 자동 긴급 제동! 앞을 잘 보세요', 'warn', 1600); try { audio.beep(); } catch (e) { /* 무시 */ } } }
    }
  }
  G.thrIn += clamp(thrT - G.thrIn, -4 * dt, (P.spec.type === 'bus' ? 1.6 : 3) * dt);
  G.brkIn += clamp(brkT - G.brkIn, -6 * dt, 4 * dt);
  const handbrake = (control && key('Space')) || !control || P.park || !!(ad && ad.hold && !uThr);
  const noFuel = P.own.fuel <= 0;

  // ---- 물리 ----
  let impact = 0;
  if (!P.onFoot) {
    const n = Math.ceil(dt / 0.0125);
    for (let i = 0; i < n; i++) impact = Math.max(impact, sim.step(dt / n, { throttle: G.thrIn * powerMul(P.own), brake: G.brkIn, steer: G.steerIn, handbrake, gearMode: P.gearMode, engineOff: !P.engine }, { grip: env.grip, noFuel }));
    // AI 차량과 충돌
    for (const a of traffic.cars) {
      if (!a.active) continue;
      const d = Math.hypot(a.x - sim.x, a.z - sim.z);
      if (d > (a.len + P.len) / 2 + 3) continue;
      const k = Math.max(2, Math.round(a.len / a.wid));
      for (let i = 0; i < k; i++) {
        const off = -a.len / 2 + a.wid / 2 + ((a.len - a.wid) * i) / (k - 1);
        const imp = sim.pushFrom(a.x + a.fx * off, a.z + a.fz * off, a.wid / 2);
        if (imp > 0) { impact = Math.max(impact, imp); a.v = 0; }
      }
    }
    if (mp.active) for (const a of mp.agents()) {
      if (Math.hypot(a.x - sim.x, a.z - sim.z) > (a.len + P.len) / 2 + 3) continue;
      const k = Math.max(2, Math.round(a.len / a.wid));
      for (let i = 0; i < k; i++) { const off = -a.len / 2 + a.wid / 2 + ((a.len - a.wid) * i) / (k - 1); impact = Math.max(impact, sim.pushFrom(a.x + a.fx * off, a.z + a.fz * off, a.wid / 2)); }
    }
    impact = Math.max(impact, train.collide(sim));
  } else {
    if (transit) transit.update(dt);
    const tp = transit && transit.pos();
    if (tp) { P.px = tp.x; P.pz = tp.z; } else if (!(transit && transit.riding)) updateFoot(dt);
  }
  // 층 / 경사로
  if (!P.onFoot) {
    const lv = levelAt(sim.x, sim.z, sim.level);
    sim.level = lv.level;
    if (P.spec.type === 'bus' && lv.ramp !== undefined && !G.rampWarn) { G.rampWarn = true; toast('🚫 높이제한 2.3m — 버스는 지하주차장에 들어갈 수 없어요', 'warn'); }
    if (lv.ramp === undefined) G.rampWarn = false;
  }
  // 열차 / 건널목
  train.update(dt, { x: sim.x, z: sim.z });
  audio.trainRumble(train.near * Math.min(1, train.v / 10 + 0.15));
  let nearCross = null;
  for (const c of W.crossings) if (W.crossDown[c.id] && Math.hypot(c.x - sim.x, c.z - sim.z) < 150) nearCross = c;
  if (nearCross && !G.crossWaited && sim.kmh < 1 && Math.hypot(nearCross.x - sim.x, nearCross.z - sim.z) < 40) { G.crossWaited = true; quest('cross', 1); toast('👍 잘했어요! 열차가 지나갈 때까지 기다려요', 'good', 2500); }
  if (!nearCross) G.crossWaited = false;
  if (nearCross && G.frame % 22 === 0) audio.crossingBell(Math.max(0.2, 1 - Math.hypot(nearCross.x - sim.x, nearCross.z - sim.z) / 150));
  // 철도 선을 넘었는지 (건널목 근처, 차단기 내려감)
  for (const c of W.crossings) {
    if (Math.hypot(c.x - sim.x, c.z - sim.z) > 20) continue;
    const side = (sim.x - c.x) * -c.dir.z + (sim.z - c.z) * c.dir.x;
    const key = 'cs' + c.id;
    if (!P.onFoot && G[key] !== undefined && G[key] * side < 0 && W.crossDown[c.id]) {
      G.mission?.onEvent?.('crossing');
      if (G.mission && !(G.mission instanceof FreeMission)) fine(500000, '🚂 차단기가 내려간 건널목을 건너면 아주 위험해요!');
      else toast('🚂 위험! 차단기가 내려가면 기차가 지나갈 때까지 기다려요', 'bad');
    }
    G[key] = side;
  }
  G.impactCool -= dt;
  if (impact > 1.2 && G.impactCool <= 0) {
    G.impactCool = 1.2;
    audio.crash(impact);
    G.shake = Math.min(1, impact / 8);
    addDamage(P, S.settings.easy || G.demo ? impact * 0.3 : impact, toast);
    if (G.mission && G.mission.onImpact) G.mission.onImpact(impact);
    else if (G.mission && !(G.mission instanceof FreeMission) && impact > 3) fine(100000, '충돌! 안전 운전하세요');
    else if (impact > 3) toast('💥 쿵! 조심하세요', 'warn', 1500);
  }

  // ---- 연료 ----
  if (!P.onFoot) {
    const eco = { hev: 0.55, phev: 0.4, diesel: 0.8 }[trimKind(P.spec, P.own.trim)] || 1; // 하이브리드·디젤은 연비가 좋아요
    const used = Math.abs(sim.vl) * dt * (0.25 + 0.75 * G.thrIn) * (100 / (P.spec.type === 'bus' ? 45000 : 60000)) * eco;
    P.own.fuel = Math.max(0, P.own.fuel - used);
    addDirt(P, Math.abs(sim.vl) * dt, (env.w.rain || 0) + (env.weather === 'snow' ? 1 : 0));
    if (G.refuel) { G.refuel.t += dt; P.own.fuel = Math.min(100, P.own.fuel + dt * 35); if (P.own.fuel >= 100 || sim.kmh > 3) { G.refuel = null; toast('가득 찼어요! 👍', 'good', 1500); } }
  }

  // ---- 일일 퀘스트 거리 ----
  if (!P.onFoot) {
    G.qDist = (G.qDist || 0) + Math.abs(sim.vl) * dt;
    if (G.qDist >= 100) {
      G.qDist -= 100; quest('km', 0.1);
      if (env.nightF > 0.5) quest('night', 0.1);
      if (G.road && G.road.kind === 'highway') quest('hwy', 0.1);
    }
  }
  // ---- 표시등/장치 ----
  const blinkOn = (G.simT % 0.75) < 0.4;
  if ((P.blink || P.hazard) && blinkOn !== P.lastBlinkOn) audio.tick(blinkOn);
  P.lastBlinkOn = blinkOn;
  if (P.blink && !P.hazard) { P.blinkAcc += sim.yawRate * dt; if (Math.abs(P.blinkAcc) > 1.1 && Math.abs(G.steerIn) < 0.1) { P.blink = 0; } }
  if (P.wiper) P.wiperPh += dt * (P.wiper === 1 ? 2.6 : 5);
  else P.wiperPh = 0;
  // ---- 과속방지턱 · 포트홀 · 싱크홀 ----
  const hz = sim.level === 'hwy' ? null : hazards.check(sim.x, sim.z, sim.kmh);
  if (hz && P.bumpT <= 0 && !G.sinkT) {
    const kmh = Math.abs(sim.kmh);
    if (hz.kind === 'bump' && kmh > 8) {
      P.bumpT = 0.4; P.bumpAmp = clamp(kmh / 30, 0.4, 3); audio.bump();
      if (kmh > 30) { G.shake = Math.min(1.2, kmh / 50); sim.vl *= 0.86; toast(kmh > 45 ? '💥 덜컹! 과속방지턱을 너무 빨리 넘었어요' : '과속방지턱! 천천히 지나가세요', 'warn', 1500); }
      if (hz.school && kmh > 33) fine(40000, '어린이 보호구역 과속방지턱 과속 (30km/h)');
    } else if (hz.kind === 'pot' && kmh > 10) {
      P.bumpT = 0.4; P.bumpAmp = clamp(kmh / 40, 0.5, 2); audio.bump(); G.shake = Math.min(0.8, kmh / 70);
      if (kmh > 40) toast('🕳️ 포트홀! 덜컹', 'warn', 1200);
    } else if (hz.kind === 'sink') {
      G.sinkT = 2.2; G.sinkHole = hz.h; sim.vl = 0; G.shake = 1.6; audio.bump();
      autod.off();
      toast('🕳️ 싱크홀에 빠졌어요! 견인차를 불러요…', 'bad', 3000);
    }
  }
  if (G.sinkT) {
    G.sinkT -= dt; sim.vl = 0;
    if (G.sinkT <= 0) {
      const h = G.sinkHole; G.sinkT = 0;
      const bx = h.x - Math.sin(sim.heading) * (h.r + 9), bz = h.z - Math.cos(sim.heading) * (h.r + 9);
      placePlayer(bx, bz, sim.heading, 'surface');
      fine(300000, '싱크홀 견인 · 수리비');
    }
  }
  P.bumpT -= dt;
  syncPlayerModel(dt, blinkOn);

  // ---- 도로 정보 / 위반 ----
  G.roadT -= dt;
  if (G.roadT <= 0) {
    G.roadT = 0.12;
    const prev = G.road;
    G.road = roadInfoAt(sim.x, sim.z, sim.level === 'hwy' ? 'hwy' : 'surface');
    checkViolations(prev, G.road);
    updateRoadHud();
  }
  // 톨게이트
  let tz = P.onFoot ? null : zoneAt(sim.x, sim.z, 'toll');
  if (tz && tz.y !== undefined && Math.abs(tz.y - P.y) > 3) tz = null;
  if (tz && !G.prevToll) payToll(tz.toll || { name: '톨게이트', kind: 'open', fee: 1100 });
  G.prevToll = tz;
  // 휴게소
  const rz = P.onFoot ? null : zoneAt(sim.x, sim.z, 'rest');
  if (rz && rz !== G.prevRest) toast(`🍜 <b>${rz.name}</b> · 주유소에서 기름을 넣을 수 있어요`, 'good', 2600);
  G.prevRest = rz;
  // 주행 수당 (어떤 모드든 1km마다)
  if (!P.onFoot) {
    G.payDist = (G.payDist || 0) + Math.abs(sim.vl || 0) * dt;
    if (G.payDist >= 1000) { G.payDist -= 1000; G.payKm = (G.payKm || 0) + 1; const got = addMoney(P.spec.type === 'bus' ? 30000 : 20000, null); if (G.payKm % 3 === 0) toast(`🚗 주행 수당 ${G.payKm}km · <b>+${won(got * 3)}</b>`, 'money', 1800); }
  }
  // 명소 발견
  if (G.frame % 20 === 0) for (const l of W.landmarks) if (!l.place && !S.visited.includes(l.name) && Math.hypot(l.x - sim.x, l.z - sim.z) < l.r) { S.visited.push(l.name); addMoney(2000000, `새로운 장소 발견: <b>${l.name}</b>`); audio.coin(); }
  // 상호작용 안내
  let prompt = '';
  if (P.onFoot) {
    const tp = transit ? transit.prompt(P.px, P.pz) : null;
    const dc = Math.hypot(P.px - sim.x, P.pz - sim.z);
    const hb = tp == null && G.frame % 1 === 0 ? hubNear(P.px, P.pz) : null;
    prompt = tp != null ? tp : hb ? `E: ${hb.kind === 'air' ? '✈️ 항공권 사기' : hb.kind === 'xbus' ? '🚌 고속버스 표 사기' : '🚄 승차권 사기'} (${hb.name})` : dc < P.len / 2 + 3 ? 'E: 차에 타기' : dc > 60 ? 'E: 내 차 부르기' : '';
  }
  else if (sim.kmh < 2) {
    const fz = fuelZone();
    const hb = hubNear(sim.x, sim.z, 90);
    if (hb && !(G.mission && G.mission.riders)) prompt = `E: 내려서 ${hb.kind === 'air' ? '✈️ 항공권 사기' : hb.kind === 'xbus' ? '🚌 고속버스 표 사기' : '🚄 승차권 사기'} (${hb.name})`;
    else
    if (P.own.fuel <= 0.5 && !fz) prompt = '연료가 다 떨어졌어요! E: 긴급출동 (20만원)';
    else if (fz && P.own.fuel < 99 && !G.refuel) prompt = `E: ${P.spec.ev ? '충전하기' : '주유하기'} (${fz.name})`;
    else if (G.refuel) prompt = `${P.spec.ev ? '충전' : '주유'} 중... ${Math.round(P.own.fuel)}%`;
  } else if (P.own.fuel < 12) prompt = `⚠️ ${P.spec.ev ? '배터리' : '연료'}가 얼마 남지 않았어요 — 주유소/충전소를 찾아가세요`;
  const pe = $('#prompt'); if (pe.textContent !== prompt) { pe.textContent = prompt; pe.classList.toggle('hidden', !prompt); }
  const riding = !!(transit && transit.riding);
  if (riding !== G.wasRiding) { G.wasRiding = riding; document.body.classList.toggle('riding', riding); }

  // ---- 미션 ----
  if (G.mission) G.mission.update(dt, ctx);
  // ---- 내비 · 버스 운영 정산 ----
  missionNav();
  const pose = app.playerPose();
  const ni = nav.update(dt, { ...pose, kmh: P.onFoot ? 0 : sim.kmh }, { camPos: camera.position });
  if (G.frame % 6 === 0) { updateNavHud(ni); updateAssistHud(); }
  if (G.frame % 3 === 0) updateHudProj(ni);
  adminTick(env.hour);
  G.hintT -= dt; if (G.hintT <= 0) $('#hint').classList.add('hidden');

  // ---- 교통 ----
  hazards.update(dt, dt, P.onFoot ? P.px : sim.x, P.onFoot ? P.pz : sim.z, toast, nav);
  traffic.update(dt, G.simT, playerAgent(), camInfo(), desiredTraffic(), env.nightF, mp.agents().concat(hazards.obstacles));
  if (mp.active) {
    mp.update(dt, (G.simT % 0.75) < 0.4);
    const o = P.obj;
    mp.publish(dt, { name: S.mp.name, v: P.spec.id, c: P.own.color, l: P.own.livery, rt: G.routeForSign ? G.routeForSign.id : null, x: P.onFoot ? P.px : sim.x, z: P.onFoot ? P.pz : sim.z, h: sim.heading, y: P.y, s: sim.kmh, d: (o.doors[0]?.target ? 1 : 0) | (o.doors[1]?.target ? 2 : 0), lt: P.lights, b: (P.blink === -1 || P.hazard ? 1 : 0) | (P.blink === 1 || P.hazard ? 2 : 0) });
    if (G.frame % 30 === 0) { const n = mp.list().length; $('#mpbox').textContent = `👥 채널 ${mp.channel} · ${n}명 · Enter 채팅`; }
  }
  if (!S.settings.peds) for (const p of traffic.peds) { p.active = false; p.mesh.visible = false; }

  // ---- 카메라 / 환경 / 소리 ----
  if (stage && stage.on && G.P && G.P.obj.frontMesh && stage.scene && stage.scene.cam !== 'driver') G.P.obj.frontMesh.visible = true;
  if (!(stage && stage.on && stage.camera(dt, camera))) updateCamera(dt);
  env.update(dt, sim, camera.position);
  skyEnv(dt);
  setEnvIntensity(0.4 + 0.6 * env.dayF);
  if (!P.cabin) MAT_CABIN.emissiveIntensity = 0.03;
  audio.engine({ premium: P.spec.type !== 'bus' && hasOpt(P.own, 'sound'), on: !P.onFoot && !noFuel && P.engine, rpm: sim.rpm, throttle: G.thrIn, speed: Math.abs(sim.vl), isBus: P.spec.type === 'bus', ev: P.spec.ev || (/hev/.test(trimKind(P.spec, P.own.trim)) && Math.abs(sim.vl) < 8 && G.thrIn < 0.6), slip: sim.slip, rain: env.w.rain || 0 });
  smoke.update(dt, P); police.update(dt);
  updateHud(dt);
  if (G.frame % 600 === 0) save();
}

function checkViolations(prev, cur) {
  const P = G.P, sim = P.sim;
  if (P.onFoot) return;
  const strict = G.mission && !(G.mission instanceof FreeMission);
  // 신호위반
  if (prev && cur && prev.link && cur.link === prev.link && cur.link.to.signal && prev.s < cur.link.stopS && cur.s >= cur.link.stopS && sim.kmh > 3) {
    const st = signalState(cur.link.to, cur.link.axis, G.simT);
    const turningRight = P.blink === 1 && cur.lane === cur.link.n - 1;
    if (st.s === 'G' || st.l === 'G') quest('green', 1);
    if (st.s === 'R' && st.l !== 'G' && !turningRight) {
      G.mission?.onEvent?.('red'); police.report('red', sim, cur.limit);
      if (strict) fine(300000, '🚦 신호위반! 빨간불에서는 멈춰야 해요');
      else toast('🚦 신호위반! 빨간불이었어요', 'bad');
    }
  }
  // 과속
  if (cur && cur.limit && sim.kmh > cur.limit + 10) G.speedT += 0.12; else G.speedT = 0;
  if (G.speedT > 3 && G.simT - G.speedWarn > 12) {
    G.speedWarn = G.simT;
    G.mission?.onEvent?.('speed'); police.report('speed', sim, cur.limit);
    if (strict) fine(200000, `과속! 제한속도는 ${cur.limit}km/h`);
    else toast(`⚠️ 과속 중! 제한속도 ${cur.limit}km/h`, 'warn');
  }
  // 버스전용차로 (승용차)
  if (P.spec.type !== 'bus' && cur && cur.link && cur.link.bus && cur.lane === cur.link.n - 1 && env.hour >= 7 && env.hour < 21 && sim.kmh > 5 && cur.s < cur.link.stopS - 40) G.busLaneT += 0.12; else G.busLaneT = 0;
  if (G.busLaneT > 3) { G.mission?.onEvent?.('buslane'); G.busLaneT = -20; toast('🚌 버스전용차로예요! 승용차는 다른 차로로 가 주세요', 'warn'); }
}

// ---- 걷기 ----
const _cands = [];
function updateFoot(dt) {
  const P = G.P;
  const run = key('ShiftLeft', 'ShiftRight') ? 4.5 : 1.7;
  let mx = 0, mz = 0;
  if (key('KeyW', 'ArrowUp')) mz += 1; if (key('KeyS', 'ArrowDown')) mz -= 1;
  if (key('KeyA', 'ArrowLeft')) mx += 1; if (key('KeyD', 'ArrowRight')) mx -= 1;
  const yaw = G.camHeading + G.lookYaw;
  const moving = mx || mz;
  if (moving) {
    const fx = Math.sin(yaw), fz = Math.cos(yaw), rx = Math.cos(yaw), rz = -Math.sin(yaw);
    let dx = fx * mz + rx * mx, dz = fz * mz + rz * mx; const l = Math.hypot(dx, dz); dx /= l; dz /= l;
    const nx = P.px + dx * run * dt, nz = P.pz + dz * run * dt;
    if (!blocked(nx, nz)) { P.px = nx; P.pz = nz; }
    P.ph = Math.atan2(dx, dz);
    queryColliders(P.px, P.pz, 1, _cands);
    for (const k of _cands) {
      if (k.lvl && k.lvl !== 'both' && k.lvl !== (P.plevel || 'surface')) continue;
      if (k.t === 2) { const q = obNearest(k, P.px, P.pz); const d = Math.hypot(P.px - q.x, P.pz - q.z); if (q.inside) { P.px = q.x + (q.x - k.cx) * 0.02; P.pz = q.z + (q.z - k.cz) * 0.02; } else if (d < 0.3 && d > 0) { P.px = q.x + ((P.px - q.x) / d) * 0.3; P.pz = q.z + ((P.pz - q.z) / d) * 0.3; } }
      else if (k.t === 0) { const cx = clamp(P.px, k.x0, k.x1), cz = clamp(P.pz, k.z0, k.z1); const d = Math.hypot(P.px - cx, P.pz - cz); if (d < 0.3 && d > 0) { P.px = cx + ((P.px - cx) / d) * 0.3; P.pz = cz + ((P.pz - cz) / d) * 0.3; } }
      else { const d = Math.hypot(P.px - k.x, P.pz - k.z); if (d < k.r + 0.3 && d > 0) { P.px = k.x + ((P.px - k.x) / d) * (k.r + 0.3); P.pz = k.z + ((P.pz - k.z) / d) * (k.r + 0.3); } }
    }
    P.pphase += dt * (run > 2 ? 12 : 7);
  }
  const pl = levelAt(P.px, P.pz, P.plevel || 'surface'); P.plevel = pl.level;
  P.person.position.set(P.px, pl.y, P.pz);
  P.person.rotation.y = P.ph;
  animPed(P.person, P.pphase, !!moving);
}

// ---- 플레이어 모델 반영 ----
function syncPlayerModel(dt, blinkOn = false) {
  const P = G.P, sim = P.sim, o = P.obj;
  const lv = levelAt(sim.x, sim.z, sim.level);
  P.y = lerp(P.y, lv.y, dt ? Math.min(1, dt * (lv.ramp !== undefined || Math.abs(lv.y) > 0.5 ? 20 : 8)) : 1);
  const fx = Math.sin(sim.heading) * P.len / 2, fz = Math.cos(sim.heading) * P.len / 2;
  const yf = levelAt(sim.x + fx, sim.z + fz, sim.level).y, yr = levelAt(sim.x - fx, sim.z - fz, sim.level).y;
  const slope = Math.abs(yf - yr) > 0.25 ? -Math.atan((yf - yr) / P.len) : 0;
  o.group.position.set(sim.x, P.y, sim.z);
  o.group.rotation.order = 'YXZ';
  o.group.rotation.y = sim.heading;
  P.slope = lerp(P.slope || 0, slope, dt ? Math.min(1, dt * 10) : 1);
  o.group.rotation.x = P.slope;
  const bump = (P.bumpT > 0 ? Math.sin((0.4 - P.bumpT) * 16) * 0.025 * (P.bumpAmp || 1) : 0) + (G.sinkT ? 0.25 : 0);
  o.body.rotation.x = sim.pitch + bump;
  o.body.rotation.z = sim.rollA;
  for (const w of o.wheels) {
    w.spin.rotation.x += (sim.vl / w.r) * dt;
    if (w.front) w.pivot.rotation.y = sim.steer;
  }
  if (o.steeringWheel) {
    o.steeringWheel.rotation.z = -sim.steer * (P.spec.type === 'bus' ? 9 : 7);
    // 화면 핸들과 겹치지 않게: 화면 패드가 보일 때 운전석 시점에서는 실내 핸들을 숨김
    o.steeringWheel.visible = P.spec.type === 'bus' || !(showPads && CAMS[G.camMode][0] === 'driver');
  }
  if (o.updateDoors) o.updateDoors(dt);
  const L = o.lights;
  const night = env ? env.nightF : 0;
  L.head.emissiveIntensity = P.lights ? 3 : 0.15;
  L.tail.emissiveIntensity = (P.lights || night > 0.3 ? 0.7 : 0.12) + (sim.brakeIn > 0.1 || (Math.abs(sim.vl) < 0.1 && G.brkIn > 0.1) ? 2.5 : 0);
  L.rev.emissiveIntensity = sim.gear === 'R' ? 2 : 0;
  const bl = (P.hazard || P.blink === -1) && blinkOn, br = (P.hazard || P.blink === 1) && blinkOn;
  L.indL.emissiveIntensity = bl ? 3 : 0; L.indR.emissiveIntensity = br ? 3 : 0;
  for (const sp of P.spots) sp.intensity = P.lights ? 260 : 0;
  for (const w of o.wipers) w.rotation.z = P.wiper ? -1.45 + (0.5 - 0.5 * Math.cos(P.wiperPh)) * 1.35 : lerp(w.rotation.z, -1.45, 0.2);
  const dashHiOn = dashHi.style.display === 'block';
  if (o.dash && G.frame % (dashHiOn ? 2 : Q === 'low' ? 10 : 5) === 0) {
    o.dash.draw({ kmh: sim.kmh, rpm: sim.rpm, gear: P.gearMode !== 'auto' ? P.gearMode : sim.ev ? (sim.gear === 'R' ? 'R' : sim.kmh < 0.5 && G.thrIn < 0.05 ? 'N' : 'D') : sim.gear === 'R' ? 'R' : 'D' + sim.gearN, fuel: P.own.fuel, ev: P.spec.ev, power: G.thrIn, blinkL: bl, blinkR: br, lights: P.lights, park: key('Space') || P.park, doorF: o.doors[0]?.t > 0.05, doorR: o.doors[1]?.t > 0.05, bell: P.bell, brake: G.brkIn || 0, belt: true, limit: G.road && G.road.limit, hour: env.hour, stop: G.mission && G.mission.stop ? G.mission.stop.name : '', cruise: autod.on ? autod.set : 0, retarder: (G.brkIn || 0) > 0.15 && sim.kmh > 8, outTemp: { snow: -3, rain: 14, storm: 15, fog: 12 }[env.weather] ?? (8 + 10 * env.dayF), gap: G.mission && G.mission.gap ? G.mission.gap.info : null, noTex: dashHiOn });
  }
  // 작은 화면: 왼쪽 내비 카드가 미션 카드를 가리면 미션 카드를 내비 카드 오른쪽으로
  if (G.frame % 15 === 7) {
    const mc = document.getElementById('mission'), nv = document.getElementById('navui');
    // 낮은 가로 화면(태블릿·폰): 미션 카드가 있으면 큰 회전 안내 카드는 숨기고 가운데 안내 막대만 (겹침 방지)
    const short = innerHeight < 620, hasM = !!(mc && mc.innerHTML && mc.offsetParent);
    document.body.classList.toggle('shortmis', short && hasM);
    // 운전석 시점 + 미션: 앞유리를 가리지 않게 미션 카드는 왼쪽 정보판 아래로, 큰 내비 카드 · 안내 막대는 숨김 (미션 카드에 같은 정보)
    const drvM = document.body.dataset.cam === 'driver' && hasM;
    document.body.classList.toggle('drvmis', drvM);
    if (mc && drvM) {
      const tl = document.getElementById('money'), box = tl && (tl.closest('.panel') || tl.parentElement), r = box && box.getBoundingClientRect();
      const t = r && r.height ? Math.round(r.bottom + 8) + 'px' : '150px';
      if (mc.style.left !== '10px') mc.style.left = '10px';
      if (mc.style.top !== t) mc.style.top = t;
    } else if (mc) {
      let l = '', t = '';
      if (document.body.classList.contains('compact') && nv && !nv.classList.contains('hidden') && nv.offsetParent && mc.innerHTML) {
        const r = nv.getBoundingClientRect();
        if (r.width) { l = Math.round(r.right + 10) + 'px'; t = Math.round(r.top) + 'px'; }
      }
      // 오른쪽 위 버튼 줄과 겹치면 버튼 줄 아래로 내림 (태블릿 가로 화면)
      if (!t && mc.innerHTML) {
        const tr = document.getElementById('topRight'), a = tr && tr.getBoundingClientRect();
        const prevTop = mc.style.top; mc.style.top = ''; const b = mc.getBoundingClientRect(); mc.style.top = prevTop;
        if (a && a.width && b.width && b.right > a.left && b.left < a.right && b.top < a.bottom) t = Math.round(a.bottom + 8) + 'px';
      }
      if (mc.style.left !== l) mc.style.left = l;
      if (mc.style.top !== t) mc.style.top = t;
    }
  }
  // 운전석 시점: 내비 안내 막대가 미션 카드를 가리지 않게 카드 바로 아래로
  if (G.frame % 15 === 0) {
    const nb = document.getElementById('nav-bar'), mc = document.getElementById('mission');
    if (nb) {
      const drv = document.body.dataset.cam === 'driver', r = mc && mc.offsetParent && mc.innerHTML ? mc.getBoundingClientRect() : null;
      // 운전석 시점(미션 없음): 안내 막대를 앞유리 대신 오른쪽 지도 아래로
      const mm = document.getElementById('minimap-wrap'), mr = mm && mm.offsetParent ? mm.getBoundingClientRect() : null;
      const side = drv && !r && mr && mr.height;
      const top = side ? Math.round(mr.bottom + 10) + 'px' : drv && r && r.height ? Math.round(r.bottom + 8) + 'px' : '';
      if (nb.style.top !== top) nb.style.top = top;
      nb.classList.toggle('side', !!side);
    }
  }
  if (o.hu) {
    const huOn = huHi.style.display === 'block';
    if (G.frame % (huOn ? (Q === 'low' ? 6 : Q === 'medium' ? 4 : 3) : Q === 'low' ? 20 : 10) === 0) {
      const mm = G.mission?.minimap?.();
      o.hu.draw({ x: sim.x, z: sim.z, heading: sim.heading, kmh: sim.kmh, level: sim.level, limit: G.road && G.road.limit, road: G.road && G.road.name, nav: nav && nav.active ? nav : null, path: mm && mm.navPts, hour: env.hour, fuel: P.own.fuel, ev: P.spec.ev, trip: (S.stats.km || 0) % 1000, outTemp: { snow: -3, rain: 14, storm: 15, fog: 12 }[env.weather] ?? (8 + 10 * env.dayF), noTex: huOn });
    }
  }
}

// ===================== 카메라 =====================
const _v = new THREE.Vector3(), _t = new THREE.Vector3();
function snapCamera() { G.snap = true; }
function updateCamera(dt) {
  const P = G.P, sim = P.sim, o = P.obj;
  const name = CAMS[G.camMode][0];
  if (document.body.dataset.cam !== name) document.body.dataset.cam = name;
  const isBus = P.spec.type === 'bus';
  if (o.frontMesh && name !== 'driver' && name !== 'interior') o.frontMesh.visible = true;
  let hd = sim.heading;
  if (sim.vl < -1 && name === 'chase') hd = sim.heading; // 후진 시에도 뒤에서
  let d = hd - G.camHeading; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  G.camHeading += d * Math.min(1, dt * (isBus ? 2.5 : 3.5));
  if (G.snap) { G.camHeading = hd; }
  if (performance.now() - G.lastLook > 1800 && (name === 'chase')) { G.lookYaw *= 1 - Math.min(1, dt * 2); G.lookPitch *= 1 - Math.min(1, dt * 2); }
  camera.near = 0.1; camera.fov = 62;
  if (P.onFoot && transit && transit.camera(camera, dt)) {
    // 버스 승객 시점
  } else if (P.onFoot) {
    const yaw = G.camHeading + G.lookYaw;
    G.camHeading = P.ph * 0 + G.camHeading;
    const dist = 4.5 * G.zoom;
    const py = P.person.position.y;
    _v.set(P.px - Math.sin(yaw) * dist, py + 2.0 + G.lookPitch * -3, P.pz - Math.cos(yaw) * dist);
    if (P.plevel === 'ug') _v.y = Math.min(_v.y, -0.9);
    camera.position.lerp(_v, G.snap ? 1 : Math.min(1, dt * 8));
    camera.lookAt(P.px, py + 1.4, P.pz);
  } else if (name === 'chase' || name === 'orbit') {
    const yaw = (name === 'orbit' ? hd : G.camHeading) + G.lookYaw + (name === 'orbit' ? Math.PI * 0.75 : 0);
    const dist = (isBus ? 15 : 7.2) * G.zoom * (name === 'orbit' ? 1.15 : 1);
    const hgt = (isBus ? 4.8 : 2.4) * (0.6 + G.zoom * 0.4) + G.lookPitch * -6;
    _v.set(sim.x - Math.sin(yaw) * dist, P.y + Math.max(0.6, hgt), sim.z - Math.cos(yaw) * dist);
    if (blocked(_v.x, _v.z) && sim.x < -600) _v.y += 8;
    if (sim.level === 'ug' || (UG && levelAt(sim.x, sim.z, sim.level).ramp > 0.3)) _v.y = Math.min(_v.y, -0.9);
    camera.position.lerp(_v, G.snap ? 1 : Math.min(1, dt * 7));
    _t.set(sim.x + Math.sin(hd) * 3, P.y + (isBus ? 2.2 : 1.1), sim.z + Math.cos(hd) * 3);
    camera.lookAt(_t);
  } else if (name === 'driver' || name === 'interior') {
    if (o.frontMesh) o.frontMesh.visible = false;
    const eye = (name === 'driver' ? o.driverEye : o.interiorEye).clone();
    o.body.localToWorld(eye);
    camera.position.copy(eye);
    const wide = camera.aspect > 1.75 && name === 'driver' ? (isBus ? 0.11 : -0.03) : 0; // 넓은 화면: 조금 위를 봐서 도로가 가운데로
    const yaw = sim.heading + G.lookYaw, pit = G.lookPitch + wide + (name === 'driver' ? (o.defaultPitch ?? -0.08) - (G.dashLift || 0) : -0.05);
    _t.set(eye.x + Math.sin(yaw) * Math.cos(pit) * 10, eye.y + Math.sin(pit) * 10, eye.z + Math.cos(yaw) * Math.cos(pit) * 10);
    camera.lookAt(_t);
    // 아주 넓은 가로 화면(태블릿 · 폰)에선 세로 시야를 줄여 천장 · 계기판 대신 앞 도로가 크게 보이게 (가로 시야는 유지)
    let vf = name === 'driver' ? (isBus ? 82 : 76) : 75;
    if (camera.aspect > 1.75) { const hf = (isBus ? 108 : 100) * Math.PI / 180; vf = Math.max(isBus ? 56 : 52, Math.min(vf, 2 * Math.atan(Math.tan(hf / 2) / camera.aspect) * 180 / Math.PI)); }
    camera.near = 0.05; camera.fov = vf / Math.sqrt(name === 'driver' ? G.zoom : 1);
  } else if (name === 'svm') {
    // 서라운드 뷰: 차 위에서 내려다보기
    const h = (isBus ? 26 : 13) * G.zoom;
    _v.set(sim.x - Math.sin(sim.heading) * h * 0.18, P.y + h, sim.z - Math.cos(sim.heading) * h * 0.18);
    camera.position.lerp(_v, G.snap ? 1 : Math.min(1, dt * 8));
    camera.up.set(Math.sin(sim.heading), 0, Math.cos(sim.heading));
    camera.lookAt(sim.x, P.y, sim.z);
    camera.up.set(0, 1, 0);
    camera.fov = 62; camera.near = 0.3;
  } else if (name === 'free') {
    const f = G.free;
    const sp = (key('ShiftLeft', 'ShiftRight') ? 60 : 18) * dt;
    const fx = Math.sin(f.yaw) * Math.cos(f.pitch), fy = Math.sin(f.pitch), fz = Math.cos(f.yaw) * Math.cos(f.pitch);
    const rx = -Math.cos(f.yaw), rz = Math.sin(f.yaw);
    if (key('KeyW', 'ArrowUp')) f.pos.add(_v.set(fx, fy, fz).multiplyScalar(sp));
    if (key('KeyS', 'ArrowDown')) f.pos.add(_v.set(fx, fy, fz).multiplyScalar(-sp));
    if (key('KeyA', 'ArrowLeft')) f.pos.add(_v.set(-rx, 0, -rz).multiplyScalar(sp));
    if (key('KeyD', 'ArrowRight')) f.pos.add(_v.set(rx, 0, rz).multiplyScalar(sp));
    if (key('KeyR', 'PageUp')) f.pos.y += sp; if (key('KeyF', 'PageDown')) f.pos.y = Math.max(0.5, f.pos.y - sp);
    camera.position.copy(f.pos);
    camera.lookAt(f.pos.x + fx, f.pos.y + fy, f.pos.z + fz);
  }
  if (G.shake > 0) { camera.position.x += (Math.random() - 0.5) * G.shake * 0.5; camera.position.y += (Math.random() - 0.5) * G.shake * 0.4; G.shake = Math.max(0, G.shake - dt * 2.5); }
  camera.updateProjectionMatrix();
  G.snap = false;
  $('#camname').textContent = P.onFoot ? '🚶 걷기' : '📷 ' + CAMS[G.camMode][1];
}

// ===================== 렌더 =====================
// ---- 성능 자동 조절: 해상도 · 먼 곳 작은 물체 숨기기 · 그림자/거울 갱신 주기 ----
const PERF = { base: renderer.getPixelRatio(), pr: renderer.getPixelRatio(), acc: 0, n: 0, slow: 0 };
function perfTick(rawDt) {
  PERF.acc += rawDt; PERF.n++;
  if (PERF.acc < 2) return;
  const fps = PERF.n / PERF.acc; PERF.acc = 0; PERF.n = 0;
  PERF.fps = fps;
  if (S.settings.autoRes === false) return;
  let pr = PERF.pr;
  if (fps < 45) pr = Math.max(S.settings.sharp ? 1 : 0.8, pr - (fps < 30 ? 0.12 : 0.06)); // 너무 흐려지지 않게 아래 한계를 올렸어요
  else if (fps > 57) pr = Math.min(PERF.base, pr + 0.05);
  PERF.slow = fps < 40 ? Math.min(3, PERF.slow + 1) : Math.max(0, PERF.slow - 1);
  if (Math.abs(pr - PERF.pr) > 0.01) { PERF.pr = pr; renderer.setPixelRatio(pr); renderer.setSize(innerWidth, innerHeight); }
}
function lodTick() {
  const cx = camera.position.x, cz = camera.position.z, k = (PERF.slow >= 2 ? 0.7 : 1) * (0.4 + QF * 0.6);
  for (const l of W.lod) { const d = Math.hypot(l.x - cx, l.z - cz) - 430; l.m.visible = d < l.far * k; }
  const fogFar = scene.fog ? scene.fog.far : 3000;
  const far = clamp(fogFar + 150, 500, 3600);
  if (Math.abs(camera.far - far) > 20) { camera.far = far; camera.updateProjectionMatrix(); }
}
function render() {
  // 그림자: 고화질은 매 프레임, 그 밖에는 2프레임마다 (느리면 3프레임마다)
  const every = Q === 'high' && PERF.slow < 2 ? 1 : PERF.slow >= 2 || Q !== 'high' ? 3 : 2;
  if (G.frame % every === 0) renderer.shadowMap.needsUpdate = true;
  if (G.frame % 10 === 0 && G.state !== 'menu') lodTick();
  const P = G.P;
  const cam = CAMS[G.camMode][0];
  const showMirrors = G.state === 'play' && G.mirrorsOn && P && !P.onFoot && (cam === 'driver' || (P.spec.type === 'bus' && cam === 'interior'));
  const busMirrors = P && P.obj.mirrorFaces && G.state !== 'loading' && G.state !== 'menu' && camera.position.distanceTo(P.obj.group.position) < 30;
  const ME = LITE ? 6 : PERF.slow >= 2 || Q === 'low' ? 4 : 2;
  if ((showMirrors || busMirrors) && G.frame % ME === 0) {
    const i = (G.frame / ME) % 2 | 0;
    const o = P.obj, sim = P.sim;
    const mp = o.body.localToWorld(o.mirrorPos[i].clone());
    const s = Math.sin(sim.heading), c = Math.cos(sim.heading);
    const side = i === 0 ? 1 : -1; // 0: 왼쪽(+X), 1: 오른쪽
    const lx = c * side, lz = -s * side;
    mirrorCam[i].position.copy(mp);
    mirrorCam[i].lookAt(mp.x - s * 10 + lx * 1.4, mp.y - 0.6, mp.z - c * 10 + lz * 1.4);
    if (o.mirrorFaces) o.mirrorFaces.forEach((f) => (f.visible = false));
    renderer.setRenderTarget(mirrorRT[i]);
    renderer.render(scene, mirrorCam[i]);
    renderer.setRenderTarget(null);
    if (o.mirrorFaces) o.mirrorFaces.forEach((f) => (f.visible = true));
  }
  if (G.state === 'menu') { renderer.render(showroom.scene, camera); return; }
  if (camera.view && camera.view.enabled) { camera.clearViewOffset(); camera.updateProjectionMatrix(); }
  if (fxOn()) { if (!post) post = new PostFX(renderer); post.render(scene, camera, env.nightF); } else renderer.render(scene, camera);
  dashOverlay();
  if (G.state === 'play') camv.render(scene, LITE);
  if (G.shotCb) { const cb = G.shotCb; G.shotCb = null; try { cb(renderer.domElement.toDataURL('image/jpeg', 0.92)); } catch (e) { toast('사진을 찍지 못했어요', 'bad'); } }
  if (showMirrors && !G.photo) {
    if (G.bcaDemo) forceBlindCar(P);
    if (G.frame % 3 === 0 || G.bcaDemo) updateBCA(P, { l: P.blink === -1 && !P.hazard, r: P.blink === 1 && !P.hazard });
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(overlay, overlayCam);
    renderer.autoClear = true;
  }
}
// 하늘을 비추는 반사 (차 도장 · 유리에 진짜 하늘과 노을이 비치게) — 시간 · 날씨가 바뀌면 다시 만들어요
const skyEnvS = { t: 99, hour: -9, w: '', rt: null, scene: null, pm: null };
function skyEnv(dt) {
  if (Q === 'low' || !env || !env.sky) return;
  skyEnvS.t += dt;
  if (skyEnvS.t < 6 || (Math.abs(env.hour - skyEnvS.hour) < 0.2 && env.weather === skyEnvS.w)) return;
  skyEnvS.t = 0; skyEnvS.hour = env.hour; skyEnvS.w = env.weather;
  if (!skyEnvS.scene) {
    const sc = new THREE.Scene();
    sc.add(new THREE.Mesh(env.sky.geometry, env.sky.material));
    const gnd = new THREE.Mesh(new THREE.CircleGeometry(440, 24), new THREE.MeshBasicMaterial({ color: 0x55584f }));
    gnd.rotation.x = -Math.PI / 2; gnd.position.y = -12; sc.add(gnd); skyEnvS.gnd = gnd;
    skyEnvS.scene = sc; skyEnvS.pm = new THREE.PMREMGenerator(renderer);
  }
  skyEnvS.gnd.material.color.setRGB(0.3, 0.31, 0.28).multiplyScalar(0.25 + 0.75 * env.dayF);
  const old = skyEnvS.rt;
  skyEnvS.rt = skyEnvS.pm.fromScene(skyEnvS.scene, 0.02, 1, 1000);
  applyEnv(skyEnvS.rt.texture);
  if (old) old.dispose();
}
// 화면 효과 (블룸 · 색감 · 비네트): 높음 품질에서, 설정으로 끄고 켤 수 있어요 (폰은 기본 끔)
let post = null;
function fxOn() { const f = S.settings.fx; return Q === 'high' && (f === undefined ? !isTouch : !!f); }
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  layoutMirrors();
});

// ===================== HUD =====================
const speedo = $('#speedo'), sg = speedo.getContext('2d');
const mini = $('#minimap'), mg = mini.getContext('2d');
function updateRoadHud() {
  const r = G.road;
  const lim = $('#limit'), rn = $('#roadName');
  if (r && r.name) {
    lim.textContent = r.limit; lim.classList.remove('hidden');
    rn.innerHTML = `<b>${r.name}</b><small>${r.type}${r.link && r.lane >= 0 && r.link.n > 1 ? ` · ${r.lane + 1}차로${r.link.bus && r.lane === r.link.n - 1 ? ' (버스전용)' : ''}` : ''}</small>`;
  } else { lim.classList.add('hidden'); rn.innerHTML = ''; }
}
function updateHud(dt) {
  const P = G.P, sim = P.sim;
  if (G.frame % 10 === 0) {
    $('#money').textContent = won(S.money);
    const h = env.hour;
    $('#clock').textContent = `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')} ${env.timeLabel()} · ${{ clear: '☀️', cloudy: '☁️', rain: '🌧️', storm: '⛈️', snow: '❄️', fog: '🌫️' }[env.weather]} ${env.weatherName}`;
    const st = [];
    const blinkOn = (G.simT % 0.75) < 0.4;
    st.push(`<i class="${(P.blink === -1 || P.hazard) && blinkOn ? 'on g' : ''}">◀</i>`);
    st.push(`<i class="${P.lights ? 'on b' : ''}">💡</i>`);
    st.push(`<i class="${P.wiper ? 'on' : ''}">🌧️${P.wiper === 2 ? '²' : ''}</i>`);
    if (P.obj.doors.length) { st.push(`<i class="${P.obj.doors[0].t > 0.05 ? 'on o' : ''}">앞문</i>`); if (P.obj.doors[1]) st.push(`<i class="${P.obj.doors[1].t > 0.05 ? 'on o' : ''}">뒷문</i>`); }
    st.push(`<i class="${key('Space') ? 'on r' : ''}">P</i>`);
    st.push(`<i class="${P.hazard ? 'on r' : ''}">▲</i>`);
    st.push(`<i class="${(P.blink === 1 || P.hazard) && blinkOn ? 'on g' : ''}">▶</i>`);
    const html = st.join('');
    if ($('#status').innerHTML !== html) $('#status').innerHTML = html;
  }
  // 속도계
  const w = speedo.width, h = speedo.height;
  sg.clearRect(0, 0, w, h);
  const kmh = sim.kmh, max = P.spec.type === 'bus' ? 120 : 260;
  const cx = w / 2, cy = h * 0.62, r = h * 0.48;
  sg.lineWidth = 16; sg.lineCap = 'round';
  sg.strokeStyle = 'rgba(255,255,255,0.12)'; sg.beginPath(); sg.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 2.2); sg.stroke();
  const lim = G.road?.limit || 999;
  sg.strokeStyle = kmh > lim + 10 ? '#ff4d3d' : '#36d1c4';
  sg.beginPath(); sg.arc(cx, cy, r, Math.PI * 0.8, Math.PI * 0.8 + Math.PI * 1.4 * clamp(kmh / max, 0, 1)); sg.stroke();
  if (lim < 999) { const a = Math.PI * 0.8 + Math.PI * 1.4 * clamp(lim / max, 0, 1); sg.strokeStyle = '#ff4d3d'; sg.lineWidth = 4; sg.beginPath(); sg.arc(cx, cy, r + 14, a - 0.02, a + 0.02); sg.stroke(); }
  sg.fillStyle = '#fff'; sg.textAlign = 'center'; sg.font = '800 76px "Noto Sans KR", sans-serif';
  sg.fillText(Math.round(kmh), cx, cy + 8);
  sg.font = '600 22px "Noto Sans KR", sans-serif'; sg.fillStyle = '#9fb3c0'; sg.fillText('km/h', cx, cy + 40);
  const gear = !P.engine ? 'OFF' : P.gearMode !== 'auto' ? P.gearMode : sim.gear === 'R' ? 'R' : sim.kmh < 0.3 && G.thrIn < 0.05 ? (key('Space') || P.park ? 'P' : 'N') : P.spec.ev ? 'D' : 'D' + sim.gearN;
  const camN = CAMS[G.camMode][0];
  const hs = $('#hudspeed'), showHs = !P.onFoot && (showPads || camN === 'driver' || camN === 'interior');
  hs.classList.toggle('hidden', !showHs);
  if (showHs) { hs.firstChild.textContent = Math.round(kmh); $('#hudgear').textContent = gear; }
  if (G.frame % 10 === 0) {
    const bo = (G.simT % 0.75) < 0.4;
    const on = { scc: autod.mode === 1, auto: autod.mode === 2, key: P.engine, park: P.park, lights: P.lights, wiper: P.wiper > 0, cabin: P.cabin, door0: P.obj.doors[0]?.target > 0, door1: P.obj.doors[1]?.target > 0, blinkL: (P.blink === -1 || P.hazard) && bo, hazard: P.hazard, blinkR: (P.blink === 1 || P.hazard) && bo, mirror: G.mirrorsOn };
    $('#btn-scc').classList.toggle('on', autod.mode === 1); $('#btn-auto').classList.toggle('on', autod.mode === 2);
    document.querySelectorAll('#ctrlbar [data-act]').forEach((b) => { b.classList.toggle('on', !!on[b.dataset.act]); if (b.classList.contains('busonly')) b.style.display = P.obj.doors.length ? '' : 'none'; });
    const eff = P.gearMode !== 'auto' ? P.gearMode : (P.park || key('Space')) && sim.kmh < 0.5 ? 'P' : sim.gear === 'R' ? 'R' : sim.kmh < 0.3 && G.thrIn < 0.05 ? 'N' : 'D';
    document.querySelectorAll('#gearsel [data-g]').forEach((b) => b.classList.toggle('sel', b.dataset.g === eff || (b.dataset.g === 'auto' && P.gearMode === 'auto')));
  }
  sg.font = '900 40px "Noto Sans KR", sans-serif'; sg.fillStyle = gear === 'R' ? '#ffb21a' : '#fff'; sg.fillText(gear, cx, cy - 66);
  // rpm / 연료
  const rp = P.spec.ev ? Math.max(0, G.thrIn) : sim.rpm / sim.redline;
  sg.fillStyle = 'rgba(255,255,255,0.12)'; sg.fillRect(cx - 120, h - 34, 240, 10);
  sg.fillStyle = P.spec.ev ? '#4aa3ff' : rp > 0.9 ? '#ff4d3d' : '#ffb21a'; sg.fillRect(cx - 120, h - 34, 240 * clamp(rp, 0, 1), 10);
  sg.fillStyle = 'rgba(255,255,255,0.12)'; sg.fillRect(cx - 120, h - 18, 240, 10);
  sg.fillStyle = P.own.fuel < 15 ? '#ff4d3d' : '#2ee06a'; sg.fillRect(cx - 120, h - 18, 2.4 * P.own.fuel, 10);
  sg.font = '600 16px "Noto Sans KR", sans-serif'; sg.fillStyle = '#9fb3c0'; sg.textAlign = 'left';
  sg.fillText(P.spec.ev ? '출력' : 'RPM', 8, h - 24); sg.fillText(P.spec.ev ? '배터리' : '연료', 8, h - 8);
  // 미니맵
  if (G.frame % 2 === 0) drawMinimap();
  if (G.bigMap && G.frame % 10 === 0) {
    const bm = $('#bigmap-canvas');
    const pp = app.playerPose();
    const city = cityAt(pp.x, pp.z);
    const v = city ? mapView(bm, undefined, undefined, 0, cityBox(city)) : mapView(bm, pp.x, pp.z, 0.03);
    const mm = G.mission?.minimap?.();
    const busesOnMap = traffic.cars.filter((a) => a.active && a.isBus).map((a) => ({ x: a.x, z: a.z, color: a.R ? a.R.color : '#4bb048', r: 3.5 }));
    drawCityMap(bm, v, { player: pp, names: true, subway: city || true, buses: busesOnMap, routes: mm && mm.path ? [{ route: { links: mm.path, stops: mm.stops || [] }, color: mm.color, width: 4 }] : null, routeStops: true });
    if (nav.active) nav.drawMap(bm.getContext('2d'), v.X, v.Y);
  }
}
// ---- 미션 자동 내비 (버스: 다음 정류장까지 노선 그대로 · 체크포인트 · 주차칸) ----
function busRoutePlan(m, from) {
  const R = m.route, st = m.stop;
  const sl = nav.startLinkAt(from.x, from.z, from.heading);
  const gi = R.links.indexOf(st.link);
  const dest = { name: st.name + ' 정류장', x: st.door.x, z: st.door.z };
  if (sl && gi >= 0) {
    const n = R.links.length;
    let bestK = -1, bestD = 1e9;
    R.links.forEach((L, k) => { if (L === sl.L) { let d = (gi - k + n) % n; if (d === 0 && sl.s > st.s - 2) d = n; if (d < bestD) { bestD = d; bestK = k; } } });
    if (bestK >= 0 && bestD < n) {
      const links = [];
      for (let k = 0; k <= bestD; k++) links.push(R.links[(bestK + k) % n]);
      return nav.planAlong(links, sl.s, st.s, dest);
    }
  }
  return nav.plan(from, dest, 'fast');
}
function missionNav() {
  const m = G.mission;
  if (!m || S.settings.navAuto === false) return;
  if (nav.active && !nav.auto) return;
  let key = null, dest = null, routeFn = null;
  if (m instanceof BusRouteMission && !m.done) {
    const st = m.stop; key = 'bus:' + m.idx;
    dest = { name: st.name + ' 정류장', x: st.door.x, z: st.door.z, icon: '🚏', auto: true };
    routeFn = (from) => busRoutePlan(m, from);
  } else if (m instanceof CheckpointMission && !m.done && m.cps && m.cps[m.idx]) {
    const cp = m.cps[m.idx]; key = 'cp:' + m.kind + m.idx;
    dest = { name: cp.name || '체크포인트', x: cp.x, z: cp.z, hwy: true, auto: true };
  } else if (m instanceof ParkingMission && !m.done && m.spot && m.kind !== 'ug') {
    key = 'park'; dest = { name: '주차할 곳', x: m.spot.x, z: m.spot.z, auto: true };
  }
  else if (m.navTarget && !m.done) { const t = m.navTarget(); if (t) { key = t.key; dest = { ...t.dest, auto: true }; } }
  if (!key) { if (nav.auto) nav.stop(true); G.navKey = null; return; }
  if (key === G.navKey) return;
  G.navKey = key;
  dest.routeFn = routeFn;
  const pose = app.playerPose();
  const r = routeFn ? routeFn(pose) : null;
  nav.start(dest, pose, 'fast', { auto: true, silent: true, route: r || undefined });
}
// ---- 내비 HUD ----
let lastNavHtml = '';
// 헤드업 디스플레이 (옵션) — 운전석 시점에서 앞유리에 표시
let lastHudProj = '';
const _hp = new THREE.Vector3();
function updateHudProj(info) {
  const P = G.P, el = $('#hudproj');
  const camName = CAMS[G.camMode][0];
  const on = !P.onFoot && hasOpt(P.own, 'hud') && camName === 'driver' && !(transit && transit.riding);
  const rec = !P.onFoot && P.spec.type !== 'bus' && hasOpt(P.own, 'bcam');
  const re = $('#recdot'); if (re.classList.contains('hidden') === rec) re.classList.toggle('hidden', !rec);
  if (document.body.classList.contains('hudproj-on') !== on) document.body.classList.toggle('hudproj-on', on);
  if (!on) { if (!el.classList.contains('hidden')) el.classList.add('hidden'); lastHudProj = ''; return; }
  el.classList.remove('hidden');
  // 앞유리에 붙은 것처럼: 운전석 눈 앞 (차 방향 기준) 지점을 화면에 투영
  {
    const sim = P.sim, s = Math.sin(sim.heading), c = Math.cos(sim.heading);
    const ahead = P.spec.type === 'bus' ? 2.0 : 2.6, drop = P.spec.type === 'bus' ? 0.16 : 0.26;
    _hp.set(camera.position.x + s * ahead, camera.position.y - drop, camera.position.z + c * ahead).project(camera);
    const inView = _hp.z < 1 && Math.abs(_hp.x) < 1.1 && Math.abs(_hp.y) < 1.1;
    el.style.left = ((_hp.x + 1) / 2 * 100).toFixed(2) + '%';
    el.style.top = ((1 - _hp.y) / 2 * 100).toFixed(2) + '%';
    el.style.opacity = inView ? '' : '0';
  }
  const kmh = Math.round(Math.abs(P.sim.kmh)), lim = G.road && G.road.limit;
  const over = lim && kmh > lim + 3;
  let navh = '';
  if (info) { const m = info.m, t = m.toHwy || m.offHwy ? (m.t === 'S' ? 'R' : m.t) : m.t; navh = `<div class="hp-nav">${arrowSVG(t)}<b>${fmtDist(info.dNext)}</b><small>${m.t === 'G' ? '목적지' : TURN_WORD[m.t]}</small></div>`; }
  const ad = autod.on ? `<div class="hp-ad">${autod.mode === 2 ? '🤖' : '⟳'} ${autod.mode === 2 && G.road && !autod.manual ? Math.min(autod.set, G.road.limit) : autod.set}</div>` : '';
  const html = `${navh}<div class="hp-spd ${over ? 'over' : ''}"><b>${kmh}</b><small>km/h</small></div>${lim ? `<div class="hp-lim">${lim}</div>` : ''}${ad}`;
  if (html !== lastHudProj) { el.innerHTML = html; lastHudProj = html; }
}
function updateNavHud(info) {
  const ui = $('#navui');
  const cw = $('#camwarn');
  const ca = nav.camAhead;
  if (ca && !G.P.onFoot) {
    cw.classList.remove('hidden');
    $('#cw-lim').textContent = ca.c.limit; $('#cw-dist').textContent = fmtDist(ca.d);
    cw.classList.toggle('over', G.P.sim.kmh > ca.c.limit);
  } else cw.classList.add('hidden');
  const bar = $('#nav-bar');
  if (!info) { ui.classList.add('hidden'); bar.classList.add('hidden'); lastNavHtml = ''; return; }
  ui.classList.remove('hidden'); bar.classList.remove('hidden');
  const m = info.m, t = m.toHwy || m.offHwy ? (m.t === 'S' ? 'R' : m.t) : m.t;
  $('#nav-prog').style.width = Math.round(clamp(1 - info.dNext / 300, 0, 1) * 100) + '%';
  const key = t + '|' + Math.round(info.dNext / 10) + '|' + (info.m2 ? info.m2.t : '') + '|' + (info.lanes ? info.lanes.map((l) => (l.rec ? 1 : 0)).join('') : '') + '|' + Math.round(info.remain / 50) + '|' + Math.round(info.tRemain / 30);
  if (key === lastNavHtml) return;
  lastNavHtml = key;
  $('#nav-arrow').innerHTML = arrowSVG(t);
  $('#nav-arrow').className = 'nc-arrow ' + (info.dNext < 120 ? 'soon' : '');
  const dTxt = fmtDist(info.dNext), num = dTxt.replace(/[^0-9.]/g, ''), unit = dTxt.replace(/[0-9.]/g, '').trim();
  $('#nav-dist').innerHTML = `${num}<small>${unit}</small>`;
  $('#nav-turn').textContent = m.t === 'G' ? '목적지 도착' : m.toHwy ? '고속도로 진입' : m.offHwy ? '고속도로 출구' : TURN_WORD[m.t];
  $('#nav-road').textContent = m.t === 'G' ? info.dest.name : (m.road ? m.road + ' 방면' : '도로를 따라가세요');
  const m2 = info.m2;
  $('#nav-then').innerHTML = m2 && m2.at - m.at < 400 ? `그 다음 <span class="mini">${arrowSVG(m2.t)}</span> ${m2.t === 'G' ? '목적지' : TURN_WORD[m2.t]} · ${fmtDist(m2.at - m.at)}` : '';
  $('#nav-then').classList.toggle('hidden', !$('#nav-then').innerHTML);
  const ln = $('#nav-lanes');
  if (info.lanes) {
    const icon = { L: 'L', LS: 'LS', S: 'S', SR: 'SR', R: 'R' };
    ln.innerHTML = info.lanes.map((l) => `<i class="${l.rec ? 'rec' : ''} ${l.bus ? 'bus' : ''}">${laneIcon(icon[l.arr])}${l.bus ? '<em>버스</em>' : ''}</i>`).join('');
    ln.classList.remove('hidden');
  } else ln.classList.add('hidden');
  $('#nav-rem').textContent = fmtDist(info.remain);
  const h = (env.hour + (info.tRemain * S.settings.timeSpeed) / 3600) % 24;
  $('#nav-eta').textContent = `${String(Math.floor(h)).padStart(2, '0')}:${String(Math.floor((h % 1) * 60)).padStart(2, '0')}`;
  $('#nav-min').textContent = `${Math.max(1, Math.round(info.tRemain / 60))}분 · 도착`;
  $('#nav-dest').textContent = (nav.auto ? '🚏 ' : '') + info.dest.name;
}
function laneIcon(k) {
  const L = '<path d="M20 34 V20 Q20 14 14 14 H8 M4 14 L10 8 V20 Z" />', S2 = '<path d="M20 34 V8 M14 12 L20 4 L26 12 Z" />', R = '<path d="M20 34 V20 Q20 14 26 14 H32 M36 14 L30 8 V20 Z" />';
  const parts = { L: [L], LS: [L, S2], S: [S2], SR: [S2, R], R: [R] }[k] || [S2];
  return `<svg viewBox="0 0 40 40">${parts.join('')}</svg>`;
}
function drawMinimap() {
  const P = G.P, sim = P.sim;
  const w = mini.width, h = mini.height, cx = w / 2, cy = h / 2;
  const px = P.onFoot ? P.px : sim.x, pz = P.onFoot ? P.pz : sim.z;
  const th = CAMS[G.camMode][0] === 'free' ? G.free.yaw : P.onFoot ? G.camHeading + G.lookYaw : sim.heading;
  const s = w / 520 * (sim.kmh > 70 ? 0.7 : 1);
  const c = Math.cos(th), sn = Math.sin(th);
  const a = -s * c, b = -s * sn, cc = s * sn, d = -s * c;
  mg.setTransform(1, 0, 0, 1, 0, 0);
  mg.clearRect(0, 0, w, h);
  mg.save();
  mg.beginPath(); mg.arc(cx, cy, w / 2 - 2, 0, Math.PI * 2); mg.clip();
  mg.fillStyle = '#1d2b22'; mg.fillRect(0, 0, w, h);
  mg.setTransform(a, b, cc, d, cx - (a * px + cc * pz), cy - (b * px + d * pz));
  {
    const bm = basemap(), B = W.bounds;
    mg.drawImage(bm.canvas, B.x0, B.z0, bm.canvas.width * bm.res, bm.canvas.height * bm.res);
    mg.lineCap = 'round';
    const R0 = 320 / s * (w / 520);
    for (const pass of [0, 1]) for (const e of W.edges) {
      const up = e.elevated || e.ramp; if ((pass === 1) !== up) continue;
      if (Math.min(e.a.x, e.b.x) > px + R0 || Math.max(e.a.x, e.b.x) < px - R0 || Math.min(e.a.z, e.b.z) > pz + R0 || Math.max(e.a.z, e.b.z) < pz - R0) continue;
      mg.strokeStyle = e.kind === 'highway' ? '#c9a24a' : up ? '#b8a46a' : e.kind === 'alley' ? '#757a80' : '#8b9096';
      mg.lineWidth = e.hw * 2; mg.beginPath(); mg.moveTo(e.a.x, e.a.z); mg.lineTo(e.b.x, e.b.z); mg.stroke();
    }
  }
  const mm = G.mission?.minimap?.() || {};
  if (mm.path) {
    mg.strokeStyle = mm.color; mg.lineWidth = 5; mg.globalAlpha = 0.85; mg.beginPath();
    mm.path.forEach((l, i) => { const o = l.median / 2 + (l.n - 0.5) * 3.3; const ax = l.from.x + l.right.x * o, az = l.from.z + l.right.z * o, bx = l.to.x + l.right.x * o, bz = l.to.z + l.right.z * o; if (!i) mg.moveTo(ax, az); else mg.lineTo(ax, az); mg.lineTo(bx, bz); });
    mg.closePath(); mg.stroke(); mg.globalAlpha = 1;
    for (const st of mm.stops) { mg.fillStyle = st === mm.current ? '#ffb21a' : '#fff'; mg.beginPath(); mg.arc(st.door.x, st.door.z, st === mm.current ? 9 : 5, 0, Math.PI * 2); mg.fill(); }
  }
  if (nav && nav.active) nav.drawWorld(mg, 6);
  for (const c of W.cams || []) if (Math.abs(c.x - px) < 400 && Math.abs(c.z - pz) < 400) { mg.fillStyle = '#ff4d3d'; mg.fillRect(c.x - 4, c.z - 4, 8, 8); }
  if (train.obj.group.visible) { mg.strokeStyle = '#1f6fc2'; mg.lineWidth = 6; mg.beginPath(); const tp = train.points(); tp.forEach((q, i) => (i ? mg.lineTo(q.x, q.z) : mg.moveTo(q.x, q.z))); mg.stroke(); }
  for (const c of W.crossings) { mg.fillStyle = W.crossDown[c.id] ? '#ff4d3d' : '#f2c418'; mg.fillRect(c.x - 5, c.z - 5, 10, 10); }
  if (mp.active) for (const a3 of mp.agents()) { mg.fillStyle = '#ff7ad9'; mg.beginPath(); mg.arc(a3.x, a3.z, 7, 0, Math.PI * 2); mg.fill(); }
  for (const a2 of traffic.cars) if (a2.active) { mg.fillStyle = a2.isBus ? '#4bb048' : '#d9dde2'; mg.fillRect(a2.x - 2.5, a2.z - 2.5, 5, 5); }
  // 같은 노선 버스 위치 (앞차 주황 · 뒷차 보라 · 나머지 노선 색)
  if (G.mission && G.mission.gap && G.mission.gap.info) {
    const gp = G.mission.gap;
    for (const b of gp.fleet()) {
      const q = gp.pointAt(b.d); if (Math.abs(q.x - px) > 900 || Math.abs(q.z - pz) > 900) continue;
      mg.fillStyle = b.rel === 'front' ? '#ff8a3d' : b.rel === 'rear' ? '#b07cff' : gp.R.color; mg.strokeStyle = '#fff'; mg.lineWidth = 2 / s;
      mg.beginPath(); mg.arc(q.x, q.z, 7 / s, 0, Math.PI * 2); mg.fill(); mg.stroke();
    }
  }
  for (const z of W.zones) if (z.type === 'fuel' || z.type === 'ev') { mg.fillStyle = z.type === 'ev' ? '#4aa3ff' : '#ff6b3d'; mg.fillRect((z.x0 + z.x1) / 2 - 6, (z.z0 + z.z1) / 2 - 6, 12, 12); }
  mg.setTransform(1, 0, 0, 1, 0, 0);
  // 목표
  const tg = mm.target || (nav && nav.active && nav.route ? nav.route.goalPt : null);
  if (tg) {
    const dx = tg.x - px, dz = tg.z - pz;
    let sx = a * dx + cc * dz, sy = b * dx + d * dz;
    const rr = w / 2 - 14, dd = Math.hypot(sx, sy);
    const out = dd > rr;
    if (out) { sx = (sx / dd) * rr; sy = (sy / dd) * rr; }
    mg.fillStyle = '#ffb21a'; mg.strokeStyle = '#000'; mg.lineWidth = 2;
    mg.beginPath();
    if (out) { const ang = Math.atan2(sy, sx); mg.moveTo(cx + sx + Math.cos(ang) * 10, cy + sy + Math.sin(ang) * 10); mg.lineTo(cx + sx + Math.cos(ang + 2.4) * 10, cy + sy + Math.sin(ang + 2.4) * 10); mg.lineTo(cx + sx + Math.cos(ang - 2.4) * 10, cy + sy + Math.sin(ang - 2.4) * 10); }
    else mg.arc(cx + sx, cy + sy, 8, 0, Math.PI * 2);
    mg.closePath(); mg.fill(); mg.stroke();
  }
  // 내 차
  mg.fillStyle = '#36d1c4'; mg.strokeStyle = '#fff'; mg.lineWidth = 2.5;
  mg.beginPath(); mg.moveTo(cx, cy - 14); mg.lineTo(cx + 9, cy + 10); mg.lineTo(cx, cy + 5); mg.lineTo(cx - 9, cy + 10); mg.closePath(); mg.fill(); mg.stroke();
  mg.restore();
  mg.strokeStyle = 'rgba(255,255,255,0.5)'; mg.lineWidth = 3; mg.beginPath(); mg.arc(cx, cy, w / 2 - 2, 0, Math.PI * 2); mg.stroke();
}

// ===================== 채팅 =====================
function chatLine(name, msg) {
  const box = $('#chatlog');
  const d = document.createElement('div');
  d.innerHTML = '<b></b> <span></span>';
  d.querySelector('b').textContent = name; d.querySelector('span').textContent = msg;
  box.appendChild(d);
  while (box.children.length > 6) box.firstChild.remove();
  setTimeout(() => d.classList.add('old'), 12000);
}
function openChat() {
  const inp = $('#chatin');
  inp.classList.remove('hidden'); inp.value = ''; inp.focus();
  G.keys = {};
  inp.onkeydown = (ev) => {
    ev.stopPropagation();
    if (ev.key === 'Enter') { const t = inp.value.trim(); if (t) { mp.say(t); chatLine(S.mp.name + ' (나)', t); } inp.blur(); }
    if (ev.key === 'Escape') inp.blur();
  };
  inp.onblur = () => inp.classList.add('hidden');
}
