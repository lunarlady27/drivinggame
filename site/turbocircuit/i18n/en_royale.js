window.HP_I18N && HP_I18N.add({
  exact: {
    '✈️ 비행기에서 Space(또는 ⬇ 버튼)로 뛰어내려요 · M 지도에서 내릴 곳 표시': '✈️ Press Space (or ⬇) to jump from the plane · Mark a landing spot on the M map', '비행 중': 'In flight', '비어 있음': 'Empty',
    '생존자': 'Alive', '20명 중 남는 자리는 봇이에요': 'Empty slots out of 20 are filled by bots', '▶ 출발': '▶ Take off', '방장이 출발하기를 기다리는 중…': 'Waiting for the host to take off…',
    '치료 중…': 'Healing…', '장전 중…': 'Reloading…', '낙하산 · 이동키로 방향 조종': 'Parachute · steer with movement keys',
    '권총': 'Pistol', '기관단총': 'SMG', '산탄총': 'Shotgun', '돌격소총': 'Assault rifle', '저격총': 'Sniper rifle', '방탄복 1': 'Armor 1', '방탄복 2': 'Armor 2', '방탄복 3': 'Armor 3', '붕대': 'Bandage', '구급상자': 'Medkit',
    '바다곰': 'SeaBear', '번개토끼': 'BoltBunny', '고요한늑대': 'CalmWolf', '붉은여우': 'RedFox', '하늘매': 'SkyHawk', '모래뱀': 'SandSnake', '은빛사슴': 'SilverDeer', '푸른고래': 'BlueWhale', '초록개구리': 'GreenFrog', '밤부엉이': 'NightOwl',
    '얼음펭귄': 'IcePenguin', '불꽃용': 'FlameDragon', '돌거북': 'StoneTurtle', '바람수리': 'WindEagle', '달빛고양이': 'MoonCat', '숲다람쥐': 'ForestSquirrel', '노을참새': 'SunsetSparrow', '안개표범': 'MistLeopard', '파도수달': 'WaveOtter', '별빛나비': 'StarButterfly', '천둥코뿔소': 'ThunderRhino', '꿀벌기사': 'BeeKnight',
    '라스트 아일랜드 — 배틀로얄': 'Last Island — Battle Royale', '라스트 아일랜드 · 20명 중 마지막 1명 · 한판 HANPAN': 'Last Island · Be the last of 20', '✈️ 출발 (봇 19명)': '✈️ Take off (19 bots)',
    'WASD 이동 · 마우스 조준 · 클릭 사격 (누르고 있으면 연사) · 우클릭 멀리 보기 · E 줍기 · R 장전 · Q 회복 · 1/2 무기 · M 지도 (눌러서 내릴 곳 표시) · Space 뛰어내리기': 'WASD move · aim with mouse · click to shoot (hold for auto) · right click zoom · E pick up · R reload · Q heal · 1/2 weapons · M map (click to mark a drop spot) · Space jump out',
    '눌러서 내릴 곳 표시 · M 으로 닫기': 'Click to mark your drop spot · M to close', '자기장 밖!': 'Outside the zone!', '자기장이 줄어들어요': 'The zone is shrinking', '1등! 마지막 생존자': '#1! Last one standing', '탈락': 'Eliminated', '관전 중': 'Spectating', '우승!': 'Winner!',
  },
  patterns: [['^🏆 우승 (\\d+) · 🎮 (\\d+)판 · 💀 처치 (\\d+) · 최고 (.+)$', '🏆 Wins $1 · 🎮 $2 games · 💀 Kills $3 · Best $4'],['^줍기: (.+)$', 'Pick up: $1'], ['^(.+): 뛰어내리기 · (.+): 지도에서 내릴 곳 표시$', '$1: jump out · $2: mark drop spot on the map'], ['^(\\d+)등$', '#$1'], ['^(\\d+)등 · 💀 처치 (\\d+)$', '#$1 · 💀 Kills $2'], ['^(\\d+)판 · 💀 처치 (\\d+)$', '$1 games · 💀 Kills $2'], ['^(.+)\\s*→\\s*(.+) 처치$', '$1 → $2 eliminated'], ['^(.+)님이 (.+)님을 처치$', '$1 eliminated $2']],
  words: { '처치': 'Kills', '판': ' games', '등': '#', '생존자': 'Alive', '뛰어내리기': 'jump out', '빨리 내려가기': 'dive faster', '줍기': 'Pick up', '자기장': 'zone' },
});
