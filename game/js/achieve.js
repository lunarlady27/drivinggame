// 🏅 업적 (배지): 처음 해 본 일들을 모아요
const done = (S, m) => (S.stats.done && S.stats.done[m]) || 0;
const photos = () => { try { return JSON.parse(localStorage.getItem('rk_photos') || '[]').length; } catch (e) { return 0; } };
export const ACH = [
  { id: 'km1', icon: '🚗', name: '첫 드라이브', desc: '1km 달리기', test: (S) => S.stats.km >= 1 },
  { id: 'km50', icon: '🛣️', name: '장거리 운전자', desc: '모두 50km 달리기', test: (S) => S.stats.km >= 50 },
  { id: 'km300', icon: '🌏', name: '전국 일주', desc: '모두 300km 달리기', test: (S) => S.stats.km >= 300 },
  { id: 'pax10', icon: '🧍', name: '버스 기사 새내기', desc: '버스 손님 10명 태우기', test: (S) => S.stats.pax >= 10 },
  { id: 'pax100', icon: '🚌', name: '베테랑 버스 기사', desc: '버스 손님 100명 태우기', test: (S) => S.stats.pax >= 100 },
  { id: 'bus', icon: '🏁', name: '노선 완주', desc: '버스 노선 한 번 끝까지 운행', test: (S) => done(S, 'bus') + done(S, 'passenger') + done(S, 'stopping') >= 1 },
  { id: 'taxi', icon: '🚕', name: '택시 기사', desc: '택시 운행 끝내기', test: (S) => done(S, 'taxi') >= 1 },
  { id: 'dlv', icon: '📦', name: '배달왕', desc: '택배 배달 끝내기', test: (S) => done(S, 'delivery') >= 1 },
  { id: 'ems', icon: '🚑', name: '생명을 구하는 운전', desc: '긴급 출동 끝내기', test: (S) => done(S, 'ems') >= 1 },
  { id: 'lic', icon: '🪪', name: '면허 합격', desc: '운전면허 시험 합격', test: (S) => !!S.license },
  { id: 'park', icon: '🅿️', name: '주차의 달인', desc: '주차 미션 끝내기', test: (S) => done(S, 'parking') + done(S, 'ugparking') >= 1 },
  { id: 'gradeS', icon: '🌟', name: 'S 등급', desc: '아무 미션이나 S 등급 받기', test: (S) => !!(S.stats.done && S.stats.done.S) },
  { id: 'cars3', icon: '🚙', name: '자동차 수집가', desc: '차 3대 갖기', test: (S) => (S.owned || []).filter((o) => !o.temp).length >= 3 },
  { id: 'rich', icon: '💰', name: '부자 운전자', desc: '1억 원 모으기', test: (S) => S.money >= 100000000 },
  { id: 'photo', icon: '📸', name: '사진작가', desc: '사진 모드로 사진 찍기', test: () => photos() >= 1 },
  { id: 'night', icon: '🌙', name: '밤 운전', desc: '밤에 5km 달리기', test: (S) => (S.stats.nightKm || 0) >= 5 },
  { id: 'rain', icon: '🌧️', name: '빗길 운전', desc: '비 오는 날 3km 달리기', test: (S) => (S.stats.rainKm || 0) >= 3 },
  { id: 'region', icon: '🗺️', name: '다른 도시로', desc: '광주 말고 다른 도시 지도 가 보기', test: (S, G) => !!(G && G.otherCity) },
];

export class Achievements {
  constructor(S, toast, audio) { this.S = S; this.toast = toast; this.audio = audio; this.t = 0; if (!S.ach) S.ach = {}; }
  update(dt, G) {
    this.t -= dt; if (this.t > 0) return; this.t = 2;
    const S = this.S; if (!S.ach) S.ach = {};
    for (const a of ACH) {
      if (S.ach[a.id]) continue;
      let ok = false; try { ok = a.test(S, G); } catch (e) { ok = false; }
      if (ok) {
        S.ach[a.id] = Date.now();
        this.toast(`🏅 업적 달성! <b>${a.icon} ${a.name}</b> — ${a.desc}`, 'good', 4500);
        try { this.audio.coin(); } catch (e) { /* 무시 */ }
        return; // 한 번에 하나씩
      }
    }
  }
  html() {
    const S = this.S, got = ACH.filter((a) => S.ach && S.ach[a.id]).length;
    return `<div class="ach"><h3>🏅 업적 ${got} / ${ACH.length}</h3><div class="ach-grid">${ACH.map((a) => {
      const on = S.ach && S.ach[a.id];
      return `<div class="ach-i ${on ? 'on' : ''}"><span class="ai">${on ? a.icon : '🔒'}</span><b>${a.name}</b><small>${a.desc}</small></div>`;
    }).join('')}</div></div>`;
  }
}
