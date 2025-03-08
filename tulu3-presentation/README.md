# Tülu 3 프레젠테이션 웹사이트

이 프로젝트는 Tülu 3의 학습 데이터, 프롬프트 큐레이션 및 Decontamination 과정에 대한 세미나 발표용 웹 프레젠테이션입니다.

## 주요 기능

- PowerPoint 스타일의 슬라이드 기반 프레젠테이션
- 반응형 디자인으로 모바일 및 데스크톱 환경 지원
- Mermaid.js를 활용한 다이어그램 렌더링
- 키보드 화살표 키 또는 화면 하단 버튼으로 슬라이드 이동

## 실행 방법

1. 프로젝트 폴더에서 웹 서버를 실행합니다. 간단한 방법은 다음과 같습니다:

   ```
   # Python을 사용하는 경우
   python -m http.server

   # Node.js를 사용하는 경우
   npx serve
   ```

2. 웹 브라우저에서 `http://localhost:8000` 또는 서버가 제공하는 URL로 접속합니다.

## 프로젝트 구조

- `index.html`: 메인 HTML 파일
- `styles.css`: 프레젠테이션 스타일 정의
- `app.js`: 프레젠테이션 로직 및 슬라이드 데이터

## 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- Mermaid.js (다이어그램 렌더링)

## 슬라이드 내용

1. 제목 및 소개
2. 개요
3. Tülu 3 학습 데이터 구성
4. 프롬프트 큐레이션 (Prompt Curation)
5. 프롬프트 합성 (Prompt Synthesis)
6. Decontamination 과정
7. Decontamination 예시 및 학습 Flow Diagram
8. 결론 및 기대 효과 