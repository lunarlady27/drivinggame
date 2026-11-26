// 여러 게임이 같이 쓰는 낱말 · 문장
window.HP_I18N && HP_I18N.add({
  exact: {
    '한판': 'HANPAN', '한판 HANPAN': 'HANPAN', '다시 하기': 'Play again', '메뉴': 'Menu', '메뉴로': 'To menu', '계속': 'Resume', '계속하기': 'Resume', '멈춤': 'Paused', '❚❚ 멈춤': '❚❚ Pause', '일시정지': 'Paused', '나가기': 'Leave', '그만두기': 'Quit', '처음부터': 'Restart',
    '쉬움': 'Easy', '보통': 'Normal', '어려움': 'Hard', '참가': 'Join', '방 코드': 'Room code', '방 만들기': 'Create room', '🛰️ 방 만들기': '🛰️ Create room', '방장이 시작하기를 기다리는 중…': 'Waiting for the host to start…',
    '승리!': 'Victory!', '패배': 'Defeat', '무승부': 'Draw', '점수': 'Score', '최고': 'Best', '이름': 'Name', '닉네임': 'Nickname', '캐릭터': 'Character', '모드': 'Mode', '처치': 'Kills', '쓰러짐': 'Downed', '체력': 'HP', '사거리': 'Range', '연결 중…': 'Connecting…',
    '봇이 채워요': 'Filled by bots', '봇 실력': 'Bot skill', '함께 하기는 이 페이지를 공유받아 로그인한 사람끼리 돼요': 'Online play works with signed-in people the page is shared with', '플레이어': 'Player', '볼륨': 'Volume', '설정': 'Settings', '닫기': 'Close', '확인': 'OK', '취소': 'Cancel', '저장': 'Save', '시작': 'Start', '▶ 시작': '▶ Start',
    '온라인은 이 페이지를 공유받아 로그인한 사람끼리 돼요': 'Online play works with signed-in people the page is shared with', '함께 하기는 이 페이지를 공유받아 로그인한 사람끼리 돼요 · 지금은 봇과 플레이': 'Online play works with signed-in people the page is shared with · play with bots for now', '함께 하기는 이 페이지를 공유받아 로그인한 사람끼리 됩니다 · 지금은 봇과 연습할 수 있어요': 'Online play works with signed-in people the page is shared with · practice with bots for now',
    '온라인 대전은 이 버전에서 준비 중이에요 · 지금은 봇(컴퓨터)과 함께 즐겨 주세요': 'Online play is coming soon — play with bots (CPU) for now',
  },
  patterns: [['^플레이어(\\d+)$', 'Player$1'], ['^전적 (\\d+)승 / (\\d+)판$', 'Record $1W / $2 games'], ['^(\\d+)초$', '$1s'], ['^(\\d+)명$', '$1 players'], ['^(\\d+)점$', '$1 pts']],
  words: { '체력': 'HP', '공격': 'ATK', '사거리': 'Range', '우클릭': 'Right click', '좌클릭': 'Left click', '승리': 'Victory', '패배': 'Defeat', '점수': 'Score', '최고': 'Best', '초': 's', '명': ' players' },
});
