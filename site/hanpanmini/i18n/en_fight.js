window.HP_I18N && HP_I18N.add({
  exact: {
    '진': 'Jin', '바람의 권사': 'Wind Fist Master', '기공파': 'Ki Wave', '돌풍각': 'Gale Kick', '승천권': 'Rising Fist', '폭풍 연격': 'Storm Barrage',
    '루나': 'Luna', '달빛 무용가': 'Moonlight Dancer', '초승달 날': 'Crescent Blade', '섬광 돌진': 'Flash Rush', '반월 차기': 'Half-Moon Kick', '월광 난무': 'Moonlight Frenzy',
    '강철': 'Kang', '산을 옮기는 장사': 'Mountain Mover', '대지 강타': 'Earth Smash', '어깨 돌진': 'Shoulder Charge', '업어치기': 'Shoulder Throw', '천지 메치기': 'Heaven & Earth Slam',
    '미오': 'Mio', '얼음 마법사': 'Ice Mage', '얼음 화살': 'Ice Arrow', '빙판 미끄럼': 'Ice Slide', '얼음 기둥': 'Ice Pillar', '절대 영도': 'Absolute Zero',
    '노을 도장': 'Sunset Dojo', '밤의 도시': 'Night City', '설산 신전': 'Snow Temple', '파이터': 'Fighter',
    '캐릭터는 메뉴에서 고른 1P 캐릭터로 싸워요': 'You fight with the 1P character picked in the menu', '▶ 대전 시작': '▶ Start fight',
    '듀얼 스트라이크 · 1대1 대전 격투 · 한판 HANPAN ·': 'Duel Strike · 1v1 Fighting ·', '듀얼 스트라이크 · 1대1 대전 격투 ·': 'Duel Strike · 1v1 Fighting ·', '듀얼 스트라이크 — 대전 격투': 'Duel Strike — 1v1 Fighting', '1P 캐릭터': '1P Character', '대전 방식': 'Match type', '상대 (2P · 컴퓨터)': 'Opponent (2P · CPU)', '컴퓨터 실력': 'CPU skill', '무대': 'Stage', '⚔️ 대전 시작': '⚔️ FIGHT',
    '1P: A/D 이동 · W 점프 · S 앉기 · 뒤로 누르면 막기 (앉아 막기는 아래+뒤) · J 약손 · K 강손 · L 발차기 · U 필살기 (앞+U, 아래+U는 다른 필살기) · I 초필살 (게이지 가득) · 공격이 맞는 순간 U로 이어 치기': '1P: A/D move · W jump · S crouch · hold back to block (crouch block = down+back) · J light punch · K heavy punch · L kick · U special (forward+U and down+U are other specials) · I super (full gauge) · press U as a hit lands to cancel into a special',
    "2P: 방향키 · 숫자패드 1/2/3 공격 · 4 필살 · 5 초필살 (또는 , . / ; ')": "2P: arrow keys · numpad 1/2/3 attacks · 4 special · 5 super (or , . / ; ')",
    '약손': 'LP', '강손': 'HP', '발': 'K', '필살': 'SP', '초필': 'SU', '🤖 컴퓨터와 대전': '🤖 vs CPU', '👥 둘이서 (한 키보드)': '👥 2 players (one keyboard)', '🛰️ 온라인 방': '🛰️ Online room',
    '방을 만들면 내가 1P, 들어온 친구가 2P': 'Create a room: you are 1P, your friend joins as 2P', '방에 못 들어갔어요': "Couldn't join the room",
    '초필살 준비! (I)': 'SUPER READY! (I)', '필살 게이지': 'Super gauge', '1P 승리!': '1P wins!', '2P 승리!': '2P wins!',
  },
  patterns: [['^초필살! (.+)$', 'SUPER! $1'], ['^(\\d+) 콤보!?$', '$1 HIT COMBO!'], ['^(\\d+)승 (\\d+)패$', '$1W $2L'], ['^전적 (\\d+)승 (\\d+)패$', 'Record $1W $2L'], ['^라운드 (\\d+)$', 'Round $1'], ['^최종 라운드$', 'Final Round']],
  words: { '체력': 'HP', '앞+기공': 'fwd+special', '아래+기공': 'down+special', '기공': 'special', '초필살': 'super', '콤보': 'combo', '승': 'W', '패': 'L', '전적': 'Record' },
});
