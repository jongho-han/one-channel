export const APP = {
  version: 'v3.7',
  specVersion: 'v2.0',                 // 기준 메뉴정의서 버전
  today: '2026.10.02',                 // 샘플 데이터 기준일
  storageKeys: { largeText: 'im_big' },
  shortcut: {
    name: 'iM라이프 사이버창구',
    url: 'https://www.imlifeins.co.kr/cyber/main.do',   // 운영 시 실제 메인 URL
  },
  features: {
    hideGuestLoginOnMobile: true,       // v3.0: 모바일 메인에서 로그인 박스 숨김
    compactShortcutBarOnMobile: true,   // v3.0: 모바일 '바로가기 추가' 버튼 축소 · 안내 문구와 한 줄
    hideLifeGuideOnMobile: true,        // v3.5: 모바일 메인에서 '이럴 땐 이렇게' 숨김
  },
};
