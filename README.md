# 유튜브 API 플레이어

## ✏️ working category

개인 사이드 프로젝트
<br />

## 📃 using lang

TypeScript,React,ReactPlayer,ContextAPI,SCSS
<br />
<br />

## 프로젝트 아이디어

매번 노래를 들을 때 유튜브에 들어간 후 곡 제목을 입력하여 듣는 것에 대하여 번거롭다고 생각,
유튜브 주소만 입력하면 노래가 나올 순 없을까? 하는 생각으로 시작
<br />
<br />

## Preview

  <img src="./public/img/preview.jpg" alt="" />

### 📌 주요기능

- 유튜브에 있는 음악(주소)을(를) form에 입력하면 플레이어가 스트레밍 해줌
- 재생중인 곡의 타이틀과 썸네일을 노출
- 플레이리스트에 즐겨찾기 기능 추가
- 플레이리스트 조작 기능 추가
- 오디오 컨트롤러 추가

### ✔ 기능을 만들면서 생각해야하는 부분

- [x] 이번 사이드 프로젝트는 외부 라이브러리에 의존 하는 만큼 공식문서를 최대한 분석
- [x] 유튜브 api를 통해 주소의 전체 데이터를 가져오면 필요한 부분들만 필터해서 각 배열에 넣기
- [x] 플레이리스트 배열 조작: 곡 셔플 / 클릭한 곡 바로 실행
- [x] react-player라고 해도 iframe 유튜브창을 띄워놓는 건데 외부 오디오 컨트롤러와 연결하기
- [x] 플레이리스트 중 지금 재생곡의 index 찾기

### 🚀 기능 구현

- 체크사항 기능 구현 1 : 일과 완료된 갯수 / 총 할일의 배열길이 \* 100
- 체크사항 기능 구현 2 : 쿠키를 사용하여 오늘 자정이 되면 localstorage를 지우게 함
- 체크사항 기능 구현 3 : calendar.tsx 주석 참조
