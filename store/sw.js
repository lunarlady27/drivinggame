// 한판 오프라인 캐시: 처음엔 공용 파일, 도시 지도는 열 때마다 저장
const VER = 'hanpan-__VER__';
const CORE = __CORE__;
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VER).then(async (c) => { for (let i = 0; i < CORE.length; i += 40) await c.addAll(CORE.slice(i, i + 40)).catch(() => {}); }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VER).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(caches.open(VER).then(async (c) => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    if (hit) return hit;
    const r = await fetch(e.request);
    if (r.ok) c.put(e.request, r.clone());
    return r;
  }));
});
