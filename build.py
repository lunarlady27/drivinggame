#!/usr/bin/env python3
"""한판 HANPAN 스토어용 묶음 만들기
  dist/itch/            itch.io (포털 + 7개 게임, 한 zip)
  dist/crazygames/<id>/ CrazyGames 게임별 (SDK 연결 · 다른 게임 링크 없음)
  dist/web/             Google Play(앱)용 웹 묶음 (PWA: manifest · 오프라인 캐시 · 아이콘 · 개인정보처리방침)
"""
import os, re, shutil, json, hashlib, subprocess, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, 'dist')
VENDOR = os.environ.get('HANPAN_VENDOR', '/tmp/hanpan_html5/vendor')
GAMES = [  # (소스, 폴더, 영어 이름, 메뉴, 멈춤 화면들, 숨길 함께하기 요소)
    ('game', 'hanpandrive', 'Hanpan Drive', '.screen.show', '#loading:not(.hidden),#modal:not(.hidden)', ['[data-go="mp"]', '#s-mp']),
    ('shooter', 'corebreaker', 'Core Breaker', '#menu', '#pause,#over,#lobby,#agents,#setscr,#help', ['#m-make', '#m-join', '#code', '#mp-note']),
    ('arena', 'poparena', 'Pop Arena', '#menu', '#pause,#end,#lobby', ['#mk', '#jn', '#code', '#mpn']),
    ('cube', 'cubeland', 'Cubeland', '#menu', '#pause', []),
    ('royale', 'lastisland', 'Last Island', '#menu', '#pause,#end,#lobby', ['#mk', '#jn', '#code', '#mpn']),
    ('fight', 'duelstrike', 'Duel Strike', '#menu', '#pause,#end,#lobby', ['button[data-mode="online"]', '#onl']),
    ('mini', 'hanpanmini', 'Hanpan Mini', '#hub', '#over', []),
    ('racing', 'turbocircuit', 'Turbo Circuit', '#menu', '#overlay:not(.hidden)', []),
]
SDK = '<script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>'
HOME = ('<a href="../index.html" id="hanpanHome" style="position:fixed;left:50%;bottom:6px;transform:translateX(-50%);'
        'z-index:9999;font:700 12px sans-serif;color:#fff;background:rgba(0,0,0,.45);padding:4px 10px;border-radius:99px;'
        'text-decoration:none;opacity:.7" data-noi18n>← HANPAN</a>')
IGN = shutil.ignore_patterns('*.bak', '*~', '.DS_Store', '__pycache__')


def copy_game(src, dst):
    shutil.copytree(os.path.join(ROOT, src), dst, ignore=IGN)
    for base, _, fs in os.walk(dst):  # 앱 밖 서비스 이름이 나오는 안내 문구 정리
        for f in fs:
            if f.endswith('.js'):
                p = os.path.join(base, f); t = open(p, encoding='utf-8').read()
                t2 = t.replace('멀티플레이는 Claude에 로그인한 상태로 이 게임 페이지를 열었을 때만 쓸 수 있어요. ', '멀티플레이는 이 버전에서 쓸 수 없어요. ').replace(' Claude에 로그인한 상태로 이 게임 페이지를 직접 열어 주세요.', '').replace('실제 광주 운수사 10곳', '광주 운수사 10곳').replace('광주 시내버스 운수사', '광주 시내버스 회사')
                if t2 != t: open(p, 'w', encoding='utf-8').write(t2)
    sh = os.path.join(ROOT, 'shared')
    os.makedirs(os.path.join(dst, 'i18n'), exist_ok=True)
    for f in os.listdir(sh):
        if f.endswith('.js') and f != 'portal.js':
            shutil.copy(os.path.join(sh, f), os.path.join(dst, 'i18n', f))
    shutil.copy(os.path.join(sh, 'portal.js'), os.path.join(dst, 'i18n', 'portal.js'))


def patch_html(path, *, vendor, sdk, home, hide, pause, strip_brand, extra_head=''):
    s = open(path, encoding='utf-8').read()
    s = s.replace('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js', vendor + 'three/three.module.js')
    s = s.replace('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/', vendor + 'three/addons/')
    s = re.sub(r'<a href="\.\./index\.html" id="hanpanHome".*?</a>\s*', '', s)
    head = ''
    if sdk:
        head += SDK + '\n'
    head += '<script>window.HP_STORE = 1</script>\n<script src="./i18n/portal.js"></script>\n'
    if hide:
        head += '<style>' + ','.join(hide) + '{display:none!important}</style>\n'
    head += extra_head
    # SDK · 포털 연결은 다른 스크립트보다 먼저 (AudioContext 감싸기)
    s = re.sub(r'(<head[^>]*>)', r'\1\n' + head.replace('\\', '\\\\'), s, count=1)
    if pause:
        s = re.sub(r'<html([^>]*)>', lambda m: '<html' + m.group(1) + (' data-pause="%s"' % pause if 'data-pause' not in m.group(1) else '') + '>', s, count=1)
    s = s.replace('(Claude에 로그인한 사람만 접속할 수 있어요)', '').replace(' (이 문구를 Claude에게 알려 주세요)', '')
    if strip_brand:
        s = s.replace(' · 한판 HANPAN', '').replace('한판 HANPAN · ', '')
    # 게임 코드는 포털 정보(언어 · 기기)를 받은 뒤 시작
    s = re.sub(r'<script type="module" src="(\.?/?js/[a-z]+\.js)"></script>', lambda m: '<script type="module">(window.HP_PORTAL ? HP_PORTAL.ready : Promise.resolve()).then(() => import("./%s")).catch((e) => { console.error(e); window.dispatchEvent(new ErrorEvent("error", { message: String(e && e.message || e) })); });</script>' % m.group(1).lstrip('./'), s, count=1)
    if home:
        s = s.replace('</body>', home + '\n</body>')
    open(path, 'w', encoding='utf-8').write(s)


DATA_RE = re.compile(r'^(gjmap|gjhwy|gjseoul|hw_[a-z]+|rp_[a-z]+|rg_[a-z]+)\.js$')
CLASSIC_START = ('<script>window.__RK_CLASSIC = 1; (window.HP_PORTAL ? HP_PORTAL.ready : Promise.resolve()).then(function () {'
                 ' var s = document.createElement("script"); s.src = "js/app.js";'
                 ' s.onerror = function () { window.dispatchEvent(new ErrorEvent("error", { message: "게임 파일(js/app.js)을 읽지 못했어요" })); };'
                 ' document.body.appendChild(s); });</script>')


def make_classic(g, vendor_dir):
    """ES 모듈 → 일반 스크립트 하나 (zip을 풀고 index.html을 더블클릭해도, 앱 WebView에서도 열리게)"""
    ip = os.path.join(g, 'index.html')
    s = open(ip, encoding='utf-8').read()
    m = re.search(r'<script type="module" src="\.?/?(js/[a-z]+\.js)"></script>', s) or re.search(r'import\("\./(js/[a-z]+\.js)"\)', s)
    if not m:
        return
    entry = m.group(1)
    js = os.path.join(g, 'js')
    # 지도 자료(아주 큰 파일)는 따로: js/data/이름.js (필요할 때만 불러옴)
    os.makedirs(os.path.join(js, 'data'), exist_ok=True)
    for f in sorted(os.listdir(js)):
        if DATA_RE.match(f):
            t = open(os.path.join(js, f), encoding='utf-8').read()
            name = f[:-3]
            t = re.sub(r'^export default ', '(globalThis.__RKD || (globalThis.__RKD = {}))[%s] = ' % json.dumps(name), t, count=1, flags=re.M)
            open(os.path.join(js, 'data', f), 'w', encoding='utf-8').write(t)
            os.remove(os.path.join(js, f))
    subprocess.run(['node', os.path.join(ROOT, 'tools', 'classic.mjs'), os.path.join(g, entry), os.path.join(js, 'app.js'), vendor_dir], check=True)
    for f in os.listdir(js):
        if f.endswith('.js') and f != 'app.js':
            os.remove(os.path.join(js, f))
    s = re.sub(r'<script type="importmap">.*?</script>\s*', '', s, flags=re.S)
    s = re.sub(r'<script type="module" src="\.?/?js/[a-z]+\.js"></script>', lambda _: CLASSIC_START, s, count=1)
    s = re.sub(r'<script type="module">\(window\.HP_PORTAL.*?</script>', lambda _: CLASSIC_START, s, count=1, flags=re.S)
    open(ip, 'w', encoding='utf-8').write(s)


def ensure_menu_attr(path, menu):
    s = open(path, encoding='utf-8').read()
    if 'data-lang-menu' not in s:
        s = re.sub(r'<html([^>]*)>', lambda m: '<html' + m.group(1) + ' data-lang-menu="%s">' % menu, s, count=1)
        open(path, 'w', encoding='utf-8').write(s)


def portal_index(dst, links):
    s = open(os.path.join(ROOT, 'portal/index.html'), encoding='utf-8').read()
    for url, folder in links.items():
        s = s.replace(url, './%s/index.html' % folder)
    s = s.replace('target="_blank"', '')
    # 스토어판: 온라인 대전 문구 정리 + 영어
    s = s.replace('봇과 연습하거나 방 코드로 친구와 함께.', '봇과 실전 연습.').replace('컴퓨터, 한 키보드 둘이서, 온라인 방.', '컴퓨터 또는 한 키보드 둘이서.')
    s = s.replace(' 온라인 대전은 이 페이지들을 공유받아 로그인한 사람끼리 됩니다.', ' 지도 © OpenStreetMap contributors.').replace('>멀티<', '>봇<')
    os.makedirs(os.path.join(dst, 'i18n'), exist_ok=True)
    for f in ('i18n.js', 'en_portal.js'):
        shutil.copy(os.path.join(ROOT, 'shared', f), os.path.join(dst, 'i18n', f))
    s = s.replace('</head>', '<script src="./i18n/i18n.js"></script>\n<script src="./i18n/en_portal.js"></script>\n</head>', 1)
    s = s.replace('<html lang="ko">', '<html lang="ko" data-lang-menu="body">', 1)
    open(os.path.join(dst, 'index.html'), 'w', encoding='utf-8').write(s)


LINKS = {
    'https://claude.ai/artifact/4unzeNHuHw2BVyQXtad6Ts': 'hanpandrive', 'https://claude.ai/artifact/3h8puaA8Er32RnpAFmf3o8': 'corebreaker',
    'https://claude.ai/artifact/Kzs6Dxy9u3p2LHmNX6wrZJ': 'poparena', 'https://claude.ai/artifact/QPhLEkQPALRm86SqFZiaL6': 'cubeland',
    'https://claude.ai/artifact/Jk4WCxvPQQACRzGW2bir6w': 'lastisland', 'https://claude.ai/artifact/JdYjQr27ktGKe8RwxejmL2': 'duelstrike',
    'https://claude.ai/artifact/U9YexRBQNzFLxF7gDghQ5v': 'hanpanmini', '../racing/index.html': 'turbocircuit',
}


def zipdir(d, out):
    if os.path.exists(out):
        os.remove(out)
    subprocess.run(['zip', '-qr9X', out, '.'], cwd=d, check=True)


def build_bundle(dst, *, pwa):
    os.makedirs(dst)
    shutil.copytree(VENDOR, os.path.join(dst, 'vendor'))
    for src, folder, en, menu, pause, hide in GAMES:
        g = os.path.join(dst, folder)
        copy_game(src, g)
        ensure_menu_attr(os.path.join(g, 'index.html'), menu)
        patch_html(os.path.join(g, 'index.html'), vendor='../vendor/', sdk=False, home=HOME, hide=hide, pause=pause, strip_brand=False,
                   extra_head='<link rel="manifest" href="../manifest.webmanifest">\n' if pwa else '')
        make_classic(g, VENDOR)
    shutil.rmtree(os.path.join(dst, 'vendor'))
    portal_index(dst, LINKS)
    for f in ('README.txt',):
        shutil.copy(os.path.join(ROOT, 'store', f), os.path.join(dst, f))
    shutil.copy(os.path.join(ROOT, 'store', 'privacy.html'), os.path.join(dst, 'privacy.html'))


def build_pwa(dst):
    st = os.path.join(ROOT, 'store')
    os.makedirs(os.path.join(dst, 'icons'), exist_ok=True)
    for f in os.listdir(os.path.join(st, 'icons')):
        shutil.copy(os.path.join(st, 'icons', f), os.path.join(dst, 'icons', f))
    shutil.copy(os.path.join(st, 'manifest.webmanifest'), dst)
    files = []
    for base, _, fs in os.walk(dst):
        for f in fs:
            rel = os.path.relpath(os.path.join(base, f), dst).replace(os.sep, '/')
            if rel in ('sw.js', 'README.txt'):
                continue
            files.append('./' + rel)
    files.sort()
    h = hashlib.sha1(''.join(files).encode() + str(sum(os.path.getsize(os.path.join(dst, f[2:])) for f in files)).encode()).hexdigest()[:10]
    sw = open(os.path.join(st, 'sw.js'), encoding='utf-8').read().replace('__VER__', h).replace('__CORE__', json.dumps(
        [f for f in files if '/js/data/' not in f]))
    open(os.path.join(dst, 'sw.js'), 'w', encoding='utf-8').write(sw)
    s = open(os.path.join(dst, 'index.html'), encoding='utf-8').read()
    reg = ('<link rel="manifest" href="./manifest.webmanifest"><meta name="theme-color" content="#0b0f1a">'
           '<link rel="icon" href="./icons/icon-192.png"><link rel="apple-touch-icon" href="./icons/icon-192.png">\n'
           '<script>if("serviceWorker"in navigator&&location.hostname!=="appassets.androidplatform.net")addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))</script>\n')
    s = s.replace('</head>', reg + '</head>', 1)
    open(os.path.join(dst, 'index.html'), 'w', encoding='utf-8').write(s)


def build_crazy(root):
    for src, folder, en, menu, pause, hide in GAMES:
        d = os.path.join(root, folder)
        copy_game(src, d)
        ensure_menu_attr(os.path.join(d, 'index.html'), menu)
        needs3d = 'three' in open(os.path.join(d, 'index.html'), encoding='utf-8').read()
        if needs3d:
            shutil.copytree(VENDOR, os.path.join(d, 'vendor'))
        patch_html(os.path.join(d, 'index.html'), vendor='./vendor/', sdk=True, home='', hide=hide, pause=pause, strip_brand=True)
        make_classic(d, VENDOR)
        if os.path.isdir(os.path.join(d, 'vendor')):
            shutil.rmtree(os.path.join(d, 'vendor'))
        zipdir(d, os.path.join(root, '%s_crazygames.zip' % folder))


def check(d):
    """상대 경로만 쓰는지, 다른 게임/앱 링크가 없는지 확인"""
    bad = []
    for base, _, fs in os.walk(d):
        for f in fs:
            if not f.endswith(('.html', '.js', '.css')):
                continue
            p = os.path.join(base, f)
            s = open(p, encoding='utf-8', errors='ignore').read()
            for m in re.finditer(r'''(?:src|href)\s*=\s*["'](/[^/"'][^"']*)''', s):
                bad.append((p, 'absolute ' + m.group(1)))
            for w in ('claude.ai', 'play.google.com', 'apps.apple.com', 'Claude', 'requestFullscreen'):
                if w in s and not p.endswith(('three.module.js',)):
                    bad.append((p, w))
    return bad


def store_assets():
    d = os.path.join(DIST, 'store_assets'); os.makedirs(os.path.join(d, 'covers'), exist_ok=True)
    st = os.path.join(ROOT, 'store')
    for f in ('feature_1024x500.png', 'privacy.html'):
        shutil.copy(os.path.join(st, f), d)
    shutil.copy(os.path.join(st, 'icons', 'icon-512.png'), d)
    for f in os.listdir(os.path.join(st, 'covers')):
        shutil.copy(os.path.join(st, 'covers', f), os.path.join(d, 'covers', f))
    zipdir(d, os.path.join(DIST, 'store_assets.zip'))
    # 안드로이드 프로젝트: 게임 파일(assets/www)까지 넣어서 Android Studio에서 바로 실행되게
    ap = os.path.join(DIST, '_android', 'android')
    if os.path.exists(os.path.dirname(ap)):
        shutil.rmtree(os.path.dirname(ap))
    shutil.copytree(os.path.join(st, 'android'), ap, ignore=IGN)
    shutil.copytree(os.path.join(DIST, 'web'), os.path.join(ap, 'app', 'src', 'main', 'assets', 'www'))
    out = os.path.join(DIST, 'hanpan_android_project.zip')
    if os.path.exists(out):
        os.remove(out)
    subprocess.run(['zip', '-qr9', out, 'android'], cwd=os.path.dirname(ap), check=True)
    shutil.rmtree(os.path.dirname(ap))
    cg = os.path.join(DIST, 'crazygames')
    subprocess.run('zip -q0 ../hanpan_crazygames_8games.zip *_crazygames.zip', shell=True, cwd=cg, check=True)


if __name__ == '__main__':
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    build_bundle(os.path.join(DIST, 'itch'), pwa=False)
    zipdir(os.path.join(DIST, 'itch'), os.path.join(DIST, 'hanpan_itch.zip'))
    build_bundle(os.path.join(DIST, 'web'), pwa=True)
    build_pwa(os.path.join(DIST, 'web'))
    zipdir(os.path.join(DIST, 'web'), os.path.join(DIST, 'hanpan_web_pwa.zip'))
    build_crazy(os.path.join(DIST, 'crazygames'))
    store_assets()
    probs = check(os.path.join(DIST, 'crazygames')) + check(os.path.join(DIST, 'itch'))
    for p in probs:
        print('CHECK', *p)
    for base, _, fs in os.walk(DIST):
        for f in fs:
            if f.endswith('.zip'):
                p = os.path.join(base, f)
                n = int(subprocess.run(['unzip', '-Z1', p], capture_output=True, text=True).stdout.count('\n'))
                print('%-60s %6.1f MB %5d files' % (os.path.relpath(p, DIST), os.path.getsize(p) / 1e6, n))
