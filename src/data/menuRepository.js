import MENU_SPEC from './menu-spec.json';

/* 메뉴정의서 */
export const SCREENS = MENU_SPEC;
export const SCREEN_BY_ID = Object.fromEntries(SCREENS.map(screen => [screen.id, screen]));

/** 1Depth 표시 순서와 이름 · 아이콘 (메뉴정의서의 '기타'는 화면에서 '서류·안내'로 표시) */
export const MENU_ORDER = ['MyPage', '보험', '대출', '증명서발급', '기타'];
export const MENU_GROUPS = {
  'MyPage':     { label: 'MyPage',     icon: 'user'   },
  '보험':       { label: '보험',       icon: 'shield' },
  '대출':       { label: '대출',       icon: 'won'    },
  '증명서발급': { label: '증명서발급', icon: 'cert'   },
  '기타':       { label: '서류·안내',  icon: 'doc'    },
};

/** 메인 검색이 화면 이름 외에 함께 찾는 말 */
export const SEARCH_KEYWORDS = {
  'SL-MY-01': '주소 이사 연락처 전화번호 휴대폰 이메일 개인정보',
  'SL-MY-02': '안내장 우편 이메일 모바일 수신',
  'SL-MY-03': '마케팅 동의 철회 광고 문자',
  'SL-MY-05': '고객확인 KYC 자금세탁',
  'SL-CT-01': '내계약 계약현황 보유계약 한눈에',
  'SL-CT-02': '보장내용 가입금액 특약 계약조회',
  'SL-CT-03': '펀드 수익률 변액 적립금',
  'SL-CT-04': '휴면 잠자는 숨은보험금',
  'SL-CT-08': '거래내역 입출금 납입내역',
  'SL-PY-01': '보험금 청구 병원 실손 진단서 영수증 입원 통원 수술',
  'SL-PY-02': '청구 진행 보완서류 서류추가 심사',
  'SL-PY-03': '숨은보험금 찾기 미수령 만기',
  'SL-PY-05': '중도인출 적립금 인출 급전',
  'SL-PM-01': '보험료 납입 미납 연체 선납',
  'SL-PM-02': '자동이체 계좌변경 출금일',
  'SL-CH-04': '해지 환급금 해약',
  'SL-CH-06': '청약철회 취소 철회',
  'SL-CH-10': '수익자 변경 계약자',
  'SL-LN-01': '대출 잔액 이자',
  'SL-LN-02': '약관대출 보험계약대출 대출신청 급전',
  'SL-LN-04': '대출상환 이자납입 갚기',
  'SL-CF-01': '연말정산 소득공제 세액공제 납입증명',
  'SL-CF-02': '납입증명서 보험료',
  'SL-CF-03': '증권 재발급',
  'SL-CF-04': '해지환급금 증명',
  'SL-EX-01': '청구서류 양식 다운로드 서류',
};

/** 메뉴정의서를 1Depth → 2Depth → [3Depth 화면] 구조로 묶음 */
function groupScreens() {
  const tree = {};
  for (const screen of SCREENS) {
    tree[screen.depth1] ??= {};
    (tree[screen.depth1][screen.depth2] ??= []).push(screen);
  }
  return tree;
}
export const MENU_TREE = groupScreens();

/** 하고 싶은 일을 입력하면 맞는 화면을 점수순으로 추천 */
export function searchScreens(query) {
  const words = query.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean);
  if (!words.length) return [];

  const score = screen => {
    const haystack = `${screen.depth3} ${screen.depth2} ${SEARCH_KEYWORDS[screen.id] || ''}`.toLowerCase();
    return words.reduce((sum, word) => sum + (screen.depth3.includes(word) ? 3 : haystack.includes(word.toLowerCase()) ? 1 : 0), 0);
  };
  return SCREENS.map(screen => [score(screen), screen])
    .filter(([points]) => points > 0)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 7)
    .map(([, screen]) => screen);
}
