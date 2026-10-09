# CLAUDE.md

## 커뮤니케이션
- 사용자가 영어로 물어봐도 한국어로 대답
- /compact 후에는 반드시 이 지침을 명시적으로 리로드 해야 한다

## 실행 / Git
- app run 금지. 사용자가 직접 실행해야 함
- git add, commit, push 금지. 사용자가 지시할때만 수행
- remote push 할때 api key, id/pw, 휴대폰번호, 주민번호 포함 파일 push 절대 금지

## 코드 품질
- 변경후 analyze 실행하여 에러 없는지 확인 (`npm run analyze`, 테스트는 `npm test`)
- fix all major linting and avoid minor via analysis options
- avoid all the cSpell via settings json of .vscode
- 사용을 완료한 로그 및 디버그 코드는 가급적 제거. 재확인 가능성 높은 경우 주석처리

## 아키텍처
- clean architecture and widgetize the codebase
- 협업을 하기 좋은 코드구조 유지
- 기능을 구현하기 전에 리팩터링 까지 고려하여 설계
- 의존성 주입, 상태관리, 모듈화
- provider, repository, controller 분리 적극 권장

## 문서
- markdown 등 문서를 만들때 한글깨짐 유의하여 UTF-8로 작성
- markdown 에 소스코드는 넣지 말아라. 실제 소스와 중복이고 업데이트 안된다
- 모든 문서는 필수, 핵심만 간결하게 정리
- 완료된 항목이 있으면 @MILESTONE.md 마일스톤 업데이트

## Windows Batch (.bat)
- windows 용 .bat 파일 작성시 ANSI 인코딩 사용
- .bat 의 echo 에 ( ) 를 쓰면 오류 난다. ^( ^) 로 escape


## WORKLOG 규칙
매 작업완료 시마다 사용자 프롬프트와 작업완료 시간(연월일시분초까지. client device 시각 기준) 간략한 작업내용 기술