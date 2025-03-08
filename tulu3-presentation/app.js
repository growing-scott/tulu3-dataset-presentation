// 슬라이드 데이터 정의
const slides = [
    // 슬라이드 1: 제목 및 개요
    {
        title: "Tulu3 학습 데이터 분석 및 과정",
        content: `
            <div class="slide-header">
                <h1>Tulu3 학습 데이터 분석 및 과정</h1>
            </div>
            <h2>세미나 발표 자료</h2>
            <p>이 프레젠테이션에서는 Tulu3의 학습 데이터 구성, 수집 과정, 그리고 데이터 처리 기법에 대해 알아보겠습니다.</p>
            <p>화면 하단의 화살표 버튼을 클릭하여 슬라이드를 이동할 수 있습니다.</p>
        `
    },
    
    // 슬라이드 2: 개요
    {
        title: "1. 개요",
        content: `
            <div class="slide-header">
                <h1>1. 개요</h1>
            </div>
            
            <div class="overview-container">
                <div class="overview-card">
                    <div class="overview-icon">🤖</div>
                    <h3>대규모 언어 모델</h3>
                    <p>Tulu3는 다양한 데이터셋을 활용하여 학습된 최신 대규모 언어 모델입니다.</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">📊</div>
                    <h3>데이터 구성</h3>
                    <p><span class="highlight-strong">오픈 소스 데이터(57%)</span>와 <span class="highlight-strong">합성 데이터(43%)</span>를 조합하여 학습되었습니다.</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">🔍</div>
                    <h3>프롬프트 큐레이션</h3>
                    <p>기존 데이터셋에서 고품질 프롬프트를 선별하고 개선하는 과정을 통해 학습 효율성을 높였습니다.</p>
                </div>
                
                <div class="overview-card">
                    <div class="overview-icon">🧹</div>
                    <h3>Decontamination</h3>
                    <p>학습 데이터와 평가 데이터 간의 중복을 방지하여 모델의 성능 평가 신뢰성을 높였습니다.</p>
                </div>
            </div>
            
            <div class="overview-stats">
                <div class="stat-item">
                    <div class="stat-number">939,344</div>
                    <div class="stat-label">총 프롬프트 수</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">57%</div>
                    <div class="stat-label">오픈 소스 데이터</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">43%</div>
                    <div class="stat-label">합성 데이터</div>
                </div>
            </div>
            
            <div class="overview-quote">
                <blockquote>
                    "Tulu3는 다양한 사용자 요청을 일반화하여 처리할 수 있는 능력을 갖추고 있습니다."
                </blockquote>
            </div>
        `
    },
    
    // 슬라이드 3: 학습 데이터 수집 및 구성
    {
        title: "2. 학습 데이터 수집 및 구성",
        content: `
            <div class="slide-header">
                <h1>2. 학습 데이터 수집 및 구성</h1>
            </div>
            <h2>2.1 오픈 소스 데이터 (57%)</h2>
            <p><strong>목적</strong>: 다양한 사용자 요청을 일반화하여 처리할 수 있는 능력 향상</p>
            <p><strong>수집 과정</strong>:</p>
            <ul>
                <li>공개적으로 이용 가능한 데이터셋 광범위 조사</li>
                <li>전문가 주석 데이터, 실제 사용자 제공 데이터, 합성 데이터 포함</li>
                <li>사람이 직접 리뷰하여 엄격한 선별 과정 진행</li>
            </ul>
            
            <h3>주요 데이터셋</h3>
            <table>
                <thead>
                    <tr>
                        <th>카테고리</th>
                        <th>데이터셋</th>
                        <th>프롬프트 수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="5">일반 (General)</td>
                        <td>OpenAssistant Guanaco</td>
                        <td>7,132개</td>
                    </tr>
                    <tr>
                        <td>TÜLU 3 Hardcoded</td>
                        <td>24개</td>
                    </tr>
                    <tr>
                        <td>No Robots</td>
                        <td>9,500개</td>
                    </tr>
                    <tr>
                        <td>WildChat GPT-4</td>
                        <td>100,000개</td>
                    </tr>
                    <tr>
                        <td>Evol CodeAlpaca</td>
                        <td>107,276개</td>
                    </tr>
                    <tr>
                        <td rowspan="3">지식 회상<br>(Knowledge Recall)</td>
                        <td>FLAN v2</td>
                        <td>89,982개</td>
                    </tr>
                    <tr>
                        <td>SciRIFF</td>
                        <td>35,357개</td>
                    </tr>
                    <tr>
                        <td>TableGPT</td>
                        <td>5,000개</td>
                    </tr>
                    <tr>
                        <td rowspan="5">수학 및 추론<br>(Math & Reasoning)</td>
                        <td>TÜLU 3 Persona MATH</td>
                        <td>149,960개</td>
                    </tr>
                    <tr>
                        <td>TÜLU 3 Persona GSM</td>
                        <td>49,980개</td>
                    </tr>
                    <tr>
                        <td>TÜLU 3 Persona Algebra</td>
                        <td>20,000개</td>
                    </tr>
                    <tr>
                        <td>OpenMathInstruct</td>
                        <td>50,000개</td>
                    </tr>
                    <tr>
                        <td>NuminaMath-TIR</td>
                        <td>34,439개</td>
                    </tr>
                </tbody>
            </table>
            
            <h2>2.2 합성 데이터 (43%)</h2>
            <p><strong>목적</strong>: 기존 공개 데이터로 부족한 특정 기술 영역 보완</p>
            <p><strong>방법론</strong>: 페르소나(Persona) 기반 데이터 합성</p>
            <ul>
                <li>특정 관점에서 데이터를 합성하도록 모델 유도</li>
                <li>예: "신경망을 연구하는 머신러닝 연구자" 페르소나로 코딩 문제 생성</li>
            </ul>
            
            <h3>전체 데이터셋 규모</h3>
            <p><strong>총 939,344개의 프롬프트</strong> 수집</p>
        `
    },
    
    // 슬라이드 4: 프롬프트 큐레이션
    {
        title: "3. 프롬프트 큐레이션 (Prompt Curation)",
        content: `
            <div class="slide-header">
                <h1>3. 프롬프트 큐레이션 (Prompt Curation)</h1>
            </div>
            <h2>3.1 프롬프트 큐레이션의 개념</h2>
            <p>프롬프트 큐레이션은 <strong>기존 데이터셋에서 품질이 높은 프롬프트를 선별하여 모델이 효율적으로 학습하도록 하는 과정</strong>입니다.</p>
            <p>불필요한 데이터(단순하거나 반복적인 데이터)를 제거하여 학습 효율성을 향상시킵니다.</p>
            
            <h2>3.2 프롬프트 큐레이션 과정</h2>
            <h3>데이터 필터링 및 정제</h3>
            <ul>
                <li><strong>단순하거나 불필요한 프롬프트</strong> (예: "2+2는?") 삭제</li>
                <li><strong>중복 데이터</strong> 및 <strong>비효율적 질문</strong> 제거</li>
            </ul>
            
            <h3>프롬프트 개선 및 보강</h3>
            <ul>
                <li>단순한 질문을 <strong>추론적이고 논리적인 사고가 필요한 형태</strong>로 변경</li>
                <li><strong>예시</strong>:
                    <ul>
                        <li>변경 전: "2+2는 얼마인가요?" (단순 계산형 질문)</li>
                        <li>변경 후: "사과를 2개 가지고 있는데, 2개를 더 샀다면 사과는 총 몇 개인가요? 답을 설명해 주세요." (추론과 설명이 요구되는 질문)</li>
                    </ul>
                </li>
            </ul>
        `
    },
    
    // 슬라이드 5: 프롬프트 합성
    {
        title: "4. 프롬프트 합성 (Prompt Synthesis)",
        content: `
            <div class="slide-header">
                <h1>4. 프롬프트 합성 (Prompt Synthesis)</h1>
            </div>
            <h2>4.1 프롬프트 합성의 개념</h2>
            <p>프롬프트 합성은 <strong>새로운 프롬프트를 인공적으로 생성하는 과정</strong>입니다.</p>
            <p>기존 데이터에서 좋은 질문을 고르는 큐레이션과 달리, 완전히 새로운 질문을 만드는 작업입니다.</p>
            
            <h2>4.2 프롬프트 합성 기법</h2>
            <h3>페르소나 기반(persona-driven)</h3>
            <ul>
                <li>특정 역할이나 관점(페르소나)을 설정하여, 해당 관점에서의 질문과 응답 데이터를 생성</li>
                <li><strong>예시 페르소나</strong>: 고등학교 수학 교사, 파이썬 개발자, 금융 전문가</li>
            </ul>
            
            <h3>Self-Play & Bootstrapping</h3>
            <ul>
                <li>AI가 스스로 질문을 만들고 답을 생성하여 데이터 확장</li>
                <li><strong>예시</strong>:
                    <ul>
                        <li>원본 질문: "광합성이란 무엇인가?"</li>
                        <li>AI 생성 질문: "지구상에서 광합성이 멈추면 어떤 일이 벌어질까?"</li>
                    </ul>
                </li>
            </ul>
            
            <h3>LLM-as-a-Teacher (대형 언어모델 활용)</h3>
            <ul>
                <li>기존 고성능 모델(예: GPT-4)을 활용하여 고품질 합성 프롬프트 생성</li>
                <li><strong>예시</strong>:
                    <ul>
                        <li>GPT-4 활용: "광합성 과정을 설명해줘." → "식물에서 일어나는 광합성의 화학적 과정을 자세히 설명해줘."</li>
                    </ul>
                </li>
            </ul>
        `
    },
    
    // 슬라이드 6: Decontamination (데이터 비오염화)
    {
        title: "5. Decontamination (데이터 비오염화)",
        content: `
            <div class="slide-header">
                <h1>5. Decontamination (데이터 비오염화)</h1>
            </div>
            <h2>5.1 Decontamination의 개념</h2>
            <p>모델이 평가 데이터(Test Set)를 미리 학습하는 문제를 방지하기 위한 과정입니다.</p>
            <p>학습 데이터(Training Set)에서 평가 데이터와 겹치는 부분을 제거합니다.</p>
            
            <h2>5.2 Decontamination 과정</h2>
            <h3>평가 데이터 전처리</h3>
            <ul>
                <li>평가 데이터(test set)를 문장 단위로 분리하여 분석 가능한 형태로 준비</li>
                <li>데이터 정규화 및 표준화 작업 수행</li>
            </ul>
            
            <h3>학습 데이터와 평가 데이터 간 유사성 검사</h3>
            <ul>
                <li>유사도 평가 방법:
                    <ul>
                        <li><strong>N-gram 매칭</strong>: 연속된 N개 단어 단위로 겹치는 정도 비교</li>
                        <li><strong>Cosine Similarity</strong>: 문장 간 벡터 유사도 계산</li>
                        <li><strong>Jaccard Index</strong>: 두 집합의 교집합 비율로 유사도 계산</li>
                        <li><strong>Dense Embeddings</strong>: 의미적 유사도 계산</li>
                    </ul>
                </li>
            </ul>
            
            <h3>중복 데이터 필터링 및 수정</h3>
            <ul>
                <li>학습 데이터가 평가 데이터와 매우 유사(90% 이상)하면 완전히 삭제</li>
                <li>부분적으로 유사(60~90%)하다면, 사람이 직접 확인하고 수정</li>
            </ul>
            
            <h2>5.3 Decontamination 예시</h2>
            <div class="example-box">
                <h3>🚩 Before (중복 데이터가 존재하는 경우)</h3>
                <p><strong>평가 데이터</strong>: "Where is the Eiffel Tower?" (에펠탑은 어디에 있나요?)</p>
                <p><strong>학습 데이터</strong>: "The Eiffel Tower is located in Paris." (에펠탑은 파리에 있다.)</p>
                <p><strong>문제점</strong>: 모델이 학습 단계에서 이미 평가 데이터가 물어보는 정보를 직접적으로 학습한 상태가 됩니다.</p>
                
                <h3>✅ After (Decontamination 수행 후)</h3>
                <p><strong>평가 데이터</strong>: "Where is the Eiffel Tower?" (에펠탑은 어디에 있나요?)</p>
                <p><strong>학습 데이터</strong>: "The Eiffel Tower is a famous landmark in France, known for its structure." (에펠탑은 프랑스의 유명한 랜드마크이며, 구조물로 유명하다.)</p>
                <p><strong>개선된 점</strong>: 모델은 평가 데이터 질문에 대해 단순 암기 대신, 문맥이나 일반적인 정보에 근거하여 답을 추론해야 합니다.</p>
            </div>
        `
    },
    
    // 슬라이드 7: Tulu3 SFT 데이터셋 구조와 결론
    {
        title: "6. Tulu3 SFT 데이터셋 구조와 결론",
        content: `
            <div class="slide-header">
                <h1>6. Tulu3 SFT 데이터셋 구조와 결론</h1>
            </div>
            <h2>6.1 Tulu-3 SFT 데이터셋 구조</h2>
            <p>Hugging Face에 공개된 <a href="https://huggingface.co/datasets/allenai/tulu-3-sft-mixture" target="_blank">allenai/tulu-3-sft-mixture</a> 데이터셋은 다음과 같은 구조로 되어 있습니다:</p>
            
            <div class="code-block">
                <pre>
                    {
                    "id": "고유 식별자",
                    "messages": [
                        {
                        "content": "사용자 질문/요청",
                        "role": "user"
                        },
                        {
                        "content": "AI 응답",
                        "role": "assistant"
                        }
                    ],
                    "source": "출처 데이터셋"
                    }
                </pre>
            </div>
            
            <ul>
                <li><strong>messages</strong>: 대화 형식의 리스트로, 모델 학습에 직접 사용되는 핵심 데이터
                    <ul>
                        <li><strong>content</strong>: 실제 텍스트 내용 (사용자 질문 또는 AI 응답)</li>
                        <li><strong>role</strong>: 메시지 역할 ("user" 또는 "assistant")</li>
                    </ul>
                </li>
                <li><strong>id</strong>: 각 데이터 샘플의 고유 식별자</li>
                <li><strong>source</strong>: 데이터의 출처 데이터셋</li>
            </ul>
            
            <h2>6.2 학습 과정에서의 역할</h2>
            <p>이 데이터셋은 지도 학습 미세 조정(Supervised Fine-Tuning, SFT)에 사용됩니다:</p>
            <ol>
                <li>모델은 <code>"user"</code> 역할의 content를 입력으로 받습니다.</li>
                <li>모델은 <code>"assistant"</code> 역할의 content를 생성하도록 학습됩니다.</li>
                <li>학습 과정에서 모델은 "이런 질문이 들어오면 이렇게 응답해야 한다"는 패턴을 배웁니다.</li>
            </ol>
            
            <h2>6.3 Tulu3 모델 파이프라인</h2>
            <div class="diagram-container">
                <div class="mermaid">
                    graph TD
                        subgraph 데이터셋
                            A[일반 데이터]
                            B[지식 데이터]
                            C[코딩 데이터]
                            D[보안 데이터]
                            E[수학 데이터]
                            F[챗 데이터]
                        end
                        
                        subgraph 큐레이션
                            G[데이터 필터링]
                            H[프롬프트 개선]
                        end
                        
                        subgraph 합성
                            I[Self-Play]
                            J[LLM-as-a-Teacher]
                            K[데이터 증강]
                        end
                        
                        subgraph Decontamination
                            L[평가 데이터 색인화]
                            M[유사도 검사]
                            N[중복 데이터 제거]
                        end
                        
                        subgraph 학습과정
                            O[SFT]
                            P[DPO]
                            Q[RLVR]
                        end
                        
                        subgraph 평가
                            R[평가 수행]
                            S{평가 기준 만족?}
                            T[모델 공개]
                        end
                        
                        A --> G
                        B --> G
                        C --> G
                        D --> G
                        E --> G
                        F --> G
                        
                        G --> H
                        H --> I
                        H --> J
                        H --> K
                        
                        I --> L
                        J --> L
                        K --> L
                        
                        L --> M --> N
                        
                        N --> O --> P --> Q
                        
                        Q --> R --> S
                        S -- 미달 --> H
                        S -- 달성 --> T
                </div>
            </div>
            
            <h2>6.4 결론</h2>
            <p>Tulu3의 학습 데이터 준비 과정은 다양한 출처의 데이터를 수집하고, 철저한 큐레이션과 합성, 그리고 Decontamination을 통해 고품질의 학습 데이터를 구축하는 과정입니다.</p>
            <p>이러한 과정을 통해 Tulu3는 다양한 작업에서 높은 성능을 발휘할 수 있게 되었습니다.</p>
            <p>감사합니다.</p>
        `
    }
];

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 메인 앱 컨테이너 가져오기
    const appContainer = document.getElementById('app');
    
    // 프레젠테이션 컨테이너 생성
    const presentationContainer = document.createElement('div');
    presentationContainer.className = 'presentation';
    
    // 슬라이드 생성
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.id = `slide-${index}`;
        if (index === 0) slideElement.classList.add('active');
        
        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        slideContent.innerHTML = slide.content;
        
        slideElement.appendChild(slideContent);
        presentationContainer.appendChild(slideElement);
    });
    
    // 네비게이션 버튼 생성
    const navigation = document.createElement('div');
    navigation.className = 'navigation';
    
    const prevButton = document.createElement('button');
    prevButton.className = 'nav-btn prev';
    prevButton.innerHTML = '&larr;';
    prevButton.disabled = true;
    
    const nextButton = document.createElement('button');
    nextButton.className = 'nav-btn next';
    nextButton.innerHTML = '&rarr;';
    
    navigation.appendChild(prevButton);
    navigation.appendChild(nextButton);
    
    // 슬라이드 인디케이터 생성
    const slideIndicator = document.createElement('div');
    slideIndicator.className = 'slide-indicator';
    slideIndicator.textContent = `1 / ${slides.length}`;
    
    // 앱에 요소 추가
    appContainer.appendChild(presentationContainer);
    appContainer.appendChild(navigation);
    appContainer.appendChild(slideIndicator);
    
    // 현재 슬라이드 인덱스
    let currentSlideIndex = 0;
    
    // 슬라이드 변경 함수
    const changeSlide = (index) => {
        // 현재 활성화된 슬라이드 비활성화
        document.querySelector('.slide.active').classList.remove('active');
        
        // 새 슬라이드 활성화
        document.getElementById(`slide-${index}`).classList.add('active');
        
        // 현재 슬라이드 인덱스 업데이트
        currentSlideIndex = index;
        
        // 버튼 상태 업데이트
        prevButton.disabled = currentSlideIndex === 0;
        nextButton.disabled = currentSlideIndex === slides.length - 1;
        
        // 슬라이드 인디케이터 업데이트
        slideIndicator.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
        
        // 문서 제목 업데이트
        document.title = `${slides[currentSlideIndex].title} - Tülu 3 프레젠테이션`;
        
        // Mermaid 다이어그램 초기화 (현재 슬라이드에 다이어그램이 있는 경우)
        if (document.querySelector('.slide.active .mermaid')) {
            mermaid.init(undefined, document.querySelectorAll('.slide.active .mermaid'));
        }
    };
    
    // 이전 버튼 클릭 이벤트
    prevButton.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            changeSlide(currentSlideIndex - 1);
        }
    });
    
    // 다음 버튼 클릭 이벤트
    nextButton.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            changeSlide(currentSlideIndex + 1);
        }
    });
    
    // 키보드 이벤트 처리
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
            changeSlide(currentSlideIndex - 1);
        } else if (e.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
            changeSlide(currentSlideIndex + 1);
        }
    });
    
    // Mermaid 초기화
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    });
    
    // 첫 번째 슬라이드의 Mermaid 다이어그램 초기화
    if (document.querySelector('.slide.active .mermaid')) {
        mermaid.init(undefined, document.querySelectorAll('.slide.active .mermaid'));
    }
    
    // 음성 인식 및 합성 기능 구현
    const voiceRecognitionBtn = document.getElementById('voice-recognition-btn');
    const textToSpeechBtn = document.getElementById('text-to-speech-btn');
    const voiceStatus = document.getElementById('voice-status');
    
    // 음성 인식 설정
    let recognition = null;
    let isRecognizing = false;
    
    // SpeechRecognition API 지원 확인
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR'; // 한국어 설정
        recognition.continuous = true;
        recognition.interimResults = false;
        
        // 음성 인식 결과 처리
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            voiceStatus.textContent = `인식된 명령: ${transcript}`;
            
            // 음성 명령 처리
            if (transcript.includes('다음') || transcript.includes('다음 슬라이드') || transcript.includes('넥스트')) {
                if (currentSlideIndex < slides.length - 1) {
                    changeSlide(currentSlideIndex + 1);
                }
            } else if (transcript.includes('이전') || transcript.includes('이전 슬라이드') || transcript.includes('프리비어스')) {
                if (currentSlideIndex > 0) {
                    changeSlide(currentSlideIndex - 1);
                }
            } else if (transcript.includes('처음') || transcript.includes('처음으로') || transcript.includes('시작')) {
                changeSlide(0);
            } else if (transcript.includes('마지막') || transcript.includes('끝으로') || transcript.includes('끝')) {
                changeSlide(slides.length - 1);
            } else if (transcript.includes('읽어') || transcript.includes('읽어줘') || transcript.includes('낭독')) {
                readCurrentSlide();
            }
            
            // 특정 슬라이드로 이동 (예: "슬라이드 3으로 이동")
            const slideNumberMatch = transcript.match(/슬라이드\s*(\d+)/);
            if (slideNumberMatch && slideNumberMatch[1]) {
                const slideNumber = parseInt(slideNumberMatch[1]);
                if (slideNumber > 0 && slideNumber <= slides.length) {
                    changeSlide(slideNumber - 1);
                }
            }
        };
        
        recognition.onend = () => {
            if (isRecognizing) {
                recognition.start();
            } else {
                voiceRecognitionBtn.classList.remove('active');
                voiceStatus.textContent = '음성 인식 비활성화';
                setTimeout(() => {
                    voiceStatus.classList.add('hidden');
                }, 2000);
            }
        };
        
        recognition.onerror = (event) => {
            console.error('음성 인식 오류:', event.error);
            voiceStatus.textContent = `오류: ${event.error}`;
        };
    } else {
        voiceRecognitionBtn.style.display = 'none';
        voiceStatus.textContent = '이 브라우저는 음성 인식을 지원하지 않습니다.';
    }
    
    // 음성 인식 토글 기능
    voiceRecognitionBtn.addEventListener('click', () => {
        if (!recognition) return;
        
        if (isRecognizing) {
            isRecognizing = false;
            recognition.stop();
            voiceRecognitionBtn.classList.remove('active');
            voiceStatus.textContent = '음성 인식 중지됨';
        } else {
            isRecognizing = true;
            recognition.start();
            voiceRecognitionBtn.classList.add('active');
            voiceStatus.textContent = '음성 인식 활성화 - 명령을 말하세요';
            voiceStatus.classList.remove('hidden');
        }
    });
    
    // 음성 합성 (TTS) 기능
    const readCurrentSlide = () => {
        if ('speechSynthesis' in window) {
            const currentSlide = slides[currentSlideIndex];
            
            // HTML 태그 제거하고 텍스트만 추출
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = currentSlide.content;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            
            // 슬라이드 제목과 내용을 합쳐서 읽기
            const textToRead = `${currentSlide.title}. ${textContent.trim()}`;
            
            // 기존 음성 합성 중지
            window.speechSynthesis.cancel();
            
            // 새 음성 합성 시작
            const utterance = new SpeechSynthesisUtterance(textToRead);
            utterance.lang = 'ko-KR';
            utterance.rate = 1.0; // 속도 (0.1 ~ 10)
            utterance.pitch = 1.0; // 음높이 (0 ~ 2)
            
            // 음성 합성 시작
            window.speechSynthesis.speak(utterance);
            
            // 상태 표시
            voiceStatus.textContent = '현재 슬라이드 읽는 중...';
            voiceStatus.classList.remove('hidden');
            
            // 음성 합성 종료 이벤트
            utterance.onend = () => {
                voiceStatus.textContent = '읽기 완료';
                setTimeout(() => {
                    voiceStatus.classList.add('hidden');
                }, 2000);
            };
        } else {
            voiceStatus.textContent = '이 브라우저는 음성 합성을 지원하지 않습니다.';
            voiceStatus.classList.remove('hidden');
            setTimeout(() => {
                voiceStatus.classList.add('hidden');
            }, 3000);
        }
    };
    
    // 음성 합성 버튼 클릭 이벤트
    textToSpeechBtn.addEventListener('click', readCurrentSlide);
}); 