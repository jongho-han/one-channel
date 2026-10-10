import { contractByNo } from './customerRepository.js';

/* 계약별 내려받을 수 있는 서류 (약관 · 안내장) — 샘플 */
const ANNUAL_NOTICE_YEARS = [2025, 2024];        // 연간 계약안내장 발행 연도(최근순)
const VARIABLE_NOTICE = { id: 'variable-2026q3', title: '2026년 3분기 변액보험 운용현황 안내장', date: '2026.09.30' };

const startYear = contract => Number(contract.startDate.slice(0, 4));

/** 계약의 서류 목록 → [{ id, kind: '약관'|'안내장', title, date }] (약관 먼저, 안내장은 최근순) */
export function contractDocuments(contract) {
  return [
    { id: 'terms', kind: '약관', title: '보험약관', date: contract.startDate },
    ...(contract.isVariable ? [{ kind: '안내장', ...VARIABLE_NOTICE }] : []),
    ...ANNUAL_NOTICE_YEARS
      .filter(year => year >= startYear(contract))
      .map(year => ({ id: `annual-${year}`, kind: '안내장', title: `${year}년 연간 계약안내장`, date: `${year}.12.31` })),
  ];
}

/** 증권번호 + 서류 id → { contract, document } (없으면 document: undefined) */
export function findContractDocument(no, id) {
  const contract = contractByNo(no);
  return { contract, document: contractDocuments(contract).find(item => item.id === id) };
}
