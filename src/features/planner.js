import { each, escapeHtml } from '../core/dom.js';
import { MENU_GROUPS, SCREENS } from '../data/menuRepository.js';
import { icon } from '../ui/icons.js';

/* 기획정보 (메뉴정의서 항목 · iM 대응수준) */
export const imStatusBadge = status => `<span class="im im-${status}">${status}</span>`;

export function plannerPanel(screen) {
  const rows = [
    ['1Depth', escapeHtml(MENU_GROUPS[screen.depth1].label)],
    ['2Depth', escapeHtml(screen.depth2)],
    ['3Depth', escapeHtml(screen.depth3)],
    ['업무/화면유형', `${escapeHtml(screen.bizType)} · ${escapeHtml(screen.screenTypeLabel)}`],
    ['인증수준', escapeHtml(screen.authLabel)],
    ['주요 표시정보', escapeHtml(screen.displays)],
    ['주요 입력정보', escapeHtml(screen.inputs)],
    ['처리결과', escapeHtml(screen.result)],
    ['업무파트', escapeHtml(screen.part)],
    ['법규·유의', escapeHtml(screen.regulation)],
    ['iM 대응수준', imStatusBadge(escapeHtml(screen.imStatus))],
  ];
  return `<div class="spec"><h2>${icon('info')}기획정보 · ${screen.id}</h2><dl>${each(rows, ([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)}</dl></div>`;
}

export function plannerLegend() {
  const counts = {};
  for (const screen of SCREENS) counts[screen.imStatus] = (counts[screen.imStatus] || 0) + 1;
  const meaning = { '없음': '— 신규 개발 대상', '부분': '— 범위·방식 보완 대상', '미확인': '— 현행 확인 필요' };
  return `
  <div class="spec"><h2>${icon('info')}기획정보 · iM 현행 대응수준</h2>
    <dl>${each(Object.entries(counts), ([status, count]) => `<dt>${imStatusBadge(status)}</dt><dd>${count}개 화면 ${meaning[status] || '— 현행 기능 개선'}</dd>`)}</dl>
  </div>`;
}
