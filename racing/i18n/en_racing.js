// 터보 서킷 영어
window.HP_I18N && HP_I18N.add({
  exact: {
    '터보 서킷 — 카트 레이싱': 'Turbo Circuit — Kart Racing', '터보 서킷': 'Turbo Circuit',
    '터보 서킷 · 드리프트로 모아서 부스트! · 한판 HANPAN': 'Turbo Circuit · Drift to charge a boost!', '터보 서킷 · 드리프트로 모아서 부스트!': 'Turbo Circuit · Drift to charge a boost!',
    '단일 레이스': 'Single race', '그랑프리': 'Grand Prix', '4트랙': '4 tracks', '우승': 'Victory', '타임 어택': 'Time attack', '트랙': 'Track', '카트': 'Kart', '상대 실력': 'Rival skill', '바퀴 수': 'Laps', '출발!': 'Start!',
    '해변 서킷': 'Beach Circuit', '네온 시티': 'Neon City', '설산 고개': 'Snowy Pass', '붉은 협곡': 'Red Canyon',
    '완만한 곡선이 이어지는 바닷가 · 처음이라면 여기!': 'Gentle seaside curves · start here!', '밤의 도심 · 직각에 가까운 코너가 많아요': 'Downtown at night · lots of tight corners',
    '눈 덮인 산길 · 연속 헤어핀을 드리프트로!': 'Snowy mountain road · drift the hairpins!', '긴 직선과 급커브 · 최고 속도 승부': 'Long straights and sharp turns · top speed wins',
    '번개호': 'Bolt', '파도호': 'Wave', '새싹호': 'Sprout', '황금호': 'Goldie', '유령호': 'Phantom', '노을호': 'Sunset',
    '균형 잡힌 기본기': 'Well balanced', '부드러운 핸들링': 'Smooth handling', '초보 추천 · 빠른 가속': 'Beginner pick · quick acceleration', '최고 속도 · 무거운 핸들': 'Top speed · heavy steering',
    '빠르지만 까다로움': 'Fast but tricky', '드리프트 장인': 'Drift master', '속도': 'Speed', '가속': 'Accel', '핸들': 'Handling',
    '부스터': 'Booster', '트리플 부스터': 'Triple booster', '기름 웅덩이': 'Oil slick', '방패': 'Shield', '유도탄': 'Homing missile',
    '하늘': 'Sky', '바다': 'Sea', '민트': 'Mint', '도토리': 'Acorn', '구름': 'Cloud', '별빛': 'Starlight', '콩떡': 'Bean', '모래': 'Sandy', '솜사탕': 'Candy', '파랑': 'Blue',
    '스타트 부스트!': 'Start boost!', '슈퍼 미니 부스트!': 'Super mini-boost!', '미니 부스트': 'Mini-boost', '발사!': 'Fired!', '유도탄이 날아와요!': 'Missile incoming!',
    '미끄덩!': 'Slipped!', '맞았어요!': 'Hit!', '방패로 막았어요!': 'Blocked by shield!', '역주행!': 'Wrong way!', '1등!': '1st!',
    '다시 시작': 'Restart', '다시 달리기': 'Race again', '그만하기': 'Quit', '타임 어택 결과': 'Time attack results', '우승!': 'Victory!', '그랑프리 우승!': 'Grand Prix champion!',
    '순위': 'Pos', '기록': 'Time', '베스트 랩': 'Best lap', '유령 카트를 저장했어요.': 'Ghost kart saved.',
    '괄호 기록은 결승선까지 남은 거리로 계산한 예상 기록이에요.': 'Times in brackets are estimates from the distance left to the finish.',
    '혼자 달려 기록 도전 · 최고 기록은 유령 카트로 함께 달려요': 'Race alone for a record · your best run drives along as a ghost',
    '순위 점수 합계로 우승!': 'Most points wins!', '상대 7명': '7 rivals',
    '⬆/W 가속 · ⬇/S 브레이크·후진 · ⬅➡/AD 핸들 · Space / Shift 드리프트 (꺾으면서 누르고 있다가 떼면 부스트, 파랑 → 주황) · E / Ctrl 아이템 · Esc 일시정지 · 출발 신호 직전(GO 바로 전)에 가속하면 스타트 부스트!':
      '⬆/W accelerate · ⬇/S brake/reverse · ⬅➡/AD steer · Space / Shift drift (hold while turning, release to boost, blue → orange) · E / Ctrl item · Esc pause · Hit the gas right before GO for a start boost!',
    '드리프트': 'Drift', '브레이크': 'Brake', '등': 'th place',
  },
  patterns: [
    ['^(\\d+)바퀴$', '$1 laps'], ['^한 바퀴 (.+)$', 'Lap $1'], ['^(\\d+)등 골인!$', 'Finished $1th!'], ['^(\\d+)등$', '$1th'], ['^베스트 (.+)$', 'Best $1'],
    ['^(\\W*)새 한 바퀴 기록 (.+?)!?$', '$1New lap record $2!'], ['^(\\W*)새 3바퀴 기록 (.+?)!?$', '$1New 3-lap record $2!'], ['^우승 (\\d+)회$', '$1 wins'], ['^(\\d+)판$', '$1 races'], ['^그랑프리 순위 (\\d+)/(\\d+)$', 'Grand Prix standings $1/$2'],
    ['^그랑프리 (\\d+)/(\\d+)$', 'Grand Prix $1/$2'], ['^그랑프리 (\\d+)위 시상대!$', 'Grand Prix podium: $1th!'], ['^그랑프리 (\\d+)위$', 'Grand Prix: $1th'],
    ['^다음 경기 ▶ (.+)$', 'Next race ▶ $1'], ['^(.+) 조준!$', 'Locked on $1!'], ['^최고 (.+)$', 'Best $1'], ['^레이서(\\d+)$', 'Racer$1'],
  ],
  words: { '바퀴': 'laps', '한 바퀴': 'lap', '최고': 'Best', '그랑프리': 'Grand Prix', '타임 어택': 'Time attack', '기록': 'record' },
});
