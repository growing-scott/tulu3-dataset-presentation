# Tulu3 학습 데이터 분석 및 과정 프레젠테이션

이 프로젝트는 Tulu3의 학습 데이터 수집, 처리, 그리고 학습 과정에 대한 웹 프레젠테이션입니다.

## 개요

Tulu3는 다양한 데이터셋을 활용하여 학습된 대규모 언어 모델입니다. 이 웹 프레젠테이션에서는 Tulu3의 학습 데이터 수집, 처리, 그리고 학습 과정에 대해 상세히 설명합니다.

## 주요 내용

- **데이터셋 개요**: Tulu3 학습에 사용된 다양한 데이터셋 소개
- **프롬프트 큐레이션**: 기존 데이터셋에서 품질이 높은 프롬프트를 선별하는 과정
- **프롬프트 합성**: 새로운 프롬프트를 인공적으로 생성하는 과정
- **Decontamination**: 모델이 평가 데이터를 미리 학습하는 문제를 방지하는 과정
- **학습 과정**: Tulu3 모델의 학습 파이프라인 설명

## 기술 스택

- Next.js
- React
- TypeScript
- Tailwind CSS
- Chart.js
- Mermaid.js

## 설치 및 실행

### 필수 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/tulu3-presentation-web.git
cd tulu3-presentation-web

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:3000`으로 접속하여 프레젠테이션을 확인할 수 있습니다.

### 빌드

```bash
npm run build
# 또는
yarn build
```

### 프로덕션 서버 실행

```bash
npm run start
# 또는
yarn start
```

## 프로젝트 구조

```
tulu3-presentation-web/
├── public/              # 정적 파일
├── src/
│   ├── app/             # Next.js 앱 라우터
│   │   ├── page.tsx     # 메인 페이지
│   │   ├── datasets/    # 데이터셋 페이지
│   │   ├── curation/    # 프롬프트 큐레이션 페이지
│   │   ├── synthesis/   # 프롬프트 합성 페이지
│   │   ├── decontamination/ # Decontamination 페이지
│   │   └── training/    # 학습 과정 페이지
│   ├── components/      # 재사용 가능한 컴포넌트
│   └── data/            # 데이터 파일
├── package.json         # 프로젝트 의존성 및 스크립트
├── tsconfig.json        # TypeScript 설정
└── tailwind.config.js   # Tailwind CSS 설정
```

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 LICENSE 파일을 참조하세요.

## 참고 자료

- [Tulu3 공식 문서](https://github.com/allenai/open-instruct)
- [Tulu3 논문](https://arxiv.org/abs/2306.04751) 