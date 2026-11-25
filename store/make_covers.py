#!/usr/bin/env python3
"""게임 화면 + 제목으로 스토어 표지 만들기
   CrazyGames: 1920x1080 · 800x1200 · 800x470 / itch.io: 630x500 / Play 스크린샷: 1920x1080 (글자 없음)"""
import os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

K = '/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc'
B = '/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc'
GAMES = {  # 폴더: (영어 제목, 한 줄, 강조 색, 초점 x 0~1)
    'hanpandrive': ('HANPAN DRIVE', 'Drive real Korean cities', (255, 196, 40), 0.5),
    'corebreaker': ('CORE BREAKER', '5v5 tactical shooter', (255, 90, 70), 0.5),
    'poparena': ('POP ARENA', '3v3 hero brawler', (255, 120, 200), 0.5),
    'cubeland': ('CUBELAND', 'Mine · build · explore', (120, 220, 90), 0.6),
    'lastisland': ('LAST ISLAND', 'Battle royale for 20', (90, 200, 255), 0.5),
    'duelstrike': ('DUEL STRIKE', '1v1 fighting', (255, 150, 40), 0.32),
    'hanpanmini': ('HANPAN MINI', '5 quick games', (160, 130, 255), 0.5),
}
SIZES = {'cover_1920x1080': (1920, 1080), 'cover_800x1200': (800, 1200), 'cover_800x470': (800, 470), 'itch_630x500': (630, 500)}


def crop(im, w, h, fx):
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = min(max(0, round(im.width * fx - w / 2)), im.width - w)
    y = (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def fit_font(d, text, path, maxw, start):
    size = start
    while size > 10:
        f = ImageFont.truetype(path, size, index=1)
        if d.textlength(text, font=f) <= maxw:
            return f
        size -= 2
    return ImageFont.truetype(path, 10, index=1)


def cover(src, g, w, h, text=True):
    title, sub, col, fx = GAMES[g]
    im = crop(Image.open(src).convert('RGB'), w, h, fx)
    im = ImageEnhance.Color(im).enhance(1.15)
    if not text:
        return im
    # 아래쪽 어둡게 (글자 읽기 쉽게)
    grad = Image.new('L', (1, h))
    for y in range(h):
        t = max(0, (y / h - 0.45) / 0.55)
        grad.putpixel((0, y), int(225 * t ** 1.4))
    shade = Image.new('RGB', (w, h), (6, 9, 18))
    im = Image.composite(shade, im, grad.resize((w, h)))
    d = ImageDraw.Draw(im)
    pad = round(min(w, h) * 0.07)
    ft = fit_font(d, title, K, w - pad * 2, round(h * (0.16 if w > h else 0.085)))
    fs = ImageFont.truetype(B, max(14, round(ft.size * 0.36)), index=1)
    bb = d.textbbox((0, 0), title, font=ft)
    th = bb[3] - bb[1]
    ty = h - pad - th - round(fs.size * 1.5)
    x = (w - (bb[2] - bb[0])) // 2 - bb[0] if w <= h else pad - bb[0]
    for o in range(max(3, ft.size // 18), 0, -1):  # 그림자
        d.text((x + o, ty - bb[1] + o), title, font=ft, fill=(0, 0, 0))
    d.text((x, ty - bb[1]), title, font=ft, fill=(255, 255, 255))
    # 강조 띠
    bar_y = ty + th + round(fs.size * 0.35)
    sw = d.textlength(sub, font=fs)
    sx = (w - sw) // 2 if w <= h else pad
    bw = round(ft.size * 0.9); bx = (w - bw) // 2 if w <= h else pad
    d.rectangle([bx, bar_y, bx + bw, bar_y + max(3, ft.size // 22)], fill=col)
    d.text((sx, bar_y + max(6, ft.size // 10)), sub, font=fs, fill=(235, 240, 250))
    return im


if __name__ == '__main__':
    src_dir, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    for g in GAMES:
        src = os.path.join(src_dir, g + '.png')
        if not os.path.exists(src):
            print('skip', g); continue
        for name, (w, h) in SIZES.items():
            cover(src, g, w, h).save(os.path.join(out, f'{g}_{name}.jpg'), quality=90)
        cover(src, g, 1920, 1080, text=False).save(os.path.join(out, f'{g}_screenshot_1920x1080.jpg'), quality=90)
        print('ok', g)
