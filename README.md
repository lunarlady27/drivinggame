# 한판 드라이브 (HANPAN DRIVE)

실제 지도(OpenStreetMap) 위를 달리는 3D 운전 게임과, 같은 묶음(한판 HANPAN)의 웹 게임 7종입니다.
Three.js 로 만들었고 브라우저에서 바로 실행됩니다.

## 들어 있는 것

| 폴더 | 내용 |
|---|---|
| `game/` | 한판 드라이브 — 광주 · 서울 등 실제 지도 3D 운전 (승용차 · 버스 기사 · 구급차 · 자율주행 · 무대 시연) |
| `arena/` `cube/` `fight/` `mini/` `royale/` `shooter/` | 한판 묶음의 다른 게임들 |
| `portal/` | 7개 게임을 고르는 첫 화면 |
| `shared/` | 게임들이 같이 쓰는 번역 · 포털 스크립트 |
| `store/` | 스토어용 표지 · 아이콘 · 안드로이드 프로젝트 · 개인정보처리방침 |
| `tools/` | 빌드 도구 (file:// 에서도 열리는 한 파일 번들) |
| `build.py` | itch.io · CrazyGames · 웹 · 안드로이드용 결과물을 `dist/` 에 만듦 |

## 실행

```bash
# 개발용: game 폴더를 웹 서버로 열기
cd game && python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

## 배포 파일 만들기

```bash
python3 build.py      # dist/ 에 itch.io · CrazyGames · 웹 · 안드로이드 zip 생성
```

안드로이드 앱은 `store/android` 를 Android Studio 로 열어 서명된 App Bundle(.aab)을 만들면 됩니다 (targetSdk 36).

## 조작

- W/S 또는 ↑/↓ : 가속 · 브레이크, A/D 또는 ←/→ : 핸들
- C : 시점 바꾸기, N : 내비, 0 : 소리 끄기, 3 : 버스 위치(BIS), 4 : 시간 · 날씨, 5 : 후방 카메라
- 무대 시연 : ← → 장면 넘기기 · 스페이스 멈춤 · Esc 끝내기
- 태블릿 · 폰 : 화면 핸들 + 슬라이드 페달

## 지도 · 저작권

- 지도 데이터 © OpenStreetMap contributors (ODbL) · 타일 © OpenMapTiles / OpenFreeMap
- 게임 안의 차 · 회사 · 상표 이름은 모두 가상 이름입니다.
