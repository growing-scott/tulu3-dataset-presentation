// import Navigation from '@/components/Navigation';
import { dataProcessingSteps } from '@/data/tulu3Data';
import MermaidDiagram from '@/components/MermaidDiagram';

// 클라이언트 컴포넌트를 서버 컴포넌트에서 사용하기 위해 dynamic import 사용
// const MermaidDiagram = dynamic(
//   () => import('@/components/MermaidDiagram'),
//   { ssr: false }
// );

export default function TrainingPage() {
  // Training 단계 정보 가져오기
  const trainingStep = dataProcessingSteps.find(step => step.id === 'training');

  // 첫 번째 다이어그램 데이터
  const datasetPipelineChart = `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0284c7', 'primaryTextColor': '#0f172a', 'primaryBorderColor': '#0284c7', 'lineColor': '#64748b', 'secondaryColor': '#7dd3fc', 'tertiaryColor': '#f1f5f9' }}}%%
graph TD
    classDef defaultNode fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0f172a,rx:6,ry:6
    classDef processNode fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e40af,rx:6,ry:6
    classDef dataNode fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1,rx:6,ry:6
    classDef scriptNode fill:#f0fdfa,stroke:#0d9488,stroke-width:2px,color:#0f766e,rx:6,ry:6
    
    A[원본 데이터셋] --> B[데이터셋 준비 과정]
    
    subgraph "데이터셋 준비 파이프라인"
    B --> |scripts/data/sft/prepare_all.sh| C[개별 데이터셋 처리]
    C --> |aya.py, coconot.py 등| D[데이터셋 변환]
    D --> |convert_sft_dataset| E[메시지 형식 변환]
    E --> F[기본 필터링]
    F --> |키워드/빈 메시지 필터링| G[1차 필터링된 데이터셋]
    end
    
    subgraph "Decontamination 파이프라인"
    H[평가 데이터셋] --> I[텍스트 추출]
    I --> |extract_text.py| J[추출된 텍스트]
    J --> K[N-gram 생성]
    K --> |generate_ngrams.py| L[N-gram 세트]
    end
    
    G --> M[Decontamination 검사]
    L --> M
    M --> |check_contamination.py| N[오염 여부 확인]
    
    N --> O[오염된 데이터 제거]
    O --> P[정제된 데이터셋]
    
    P --> Q[데이터셋 결합]
    Q --> |get_datasets, combine_dataset| R[통합 데이터셋]
    
    R --> S[토큰화 및 캐싱]
    S --> |TokenizerConfig, DatasetConfig| T[최종 변환]
    
    T --> U[최종 학습 데이터셋]
    
    class A,H dataNode
    class B,C,D,E,F,I,J,K,M,N,O,Q,R,S,T processNode
    class G,L,P,U dataNode`;

  // 두 번째 다이어그램 데이터
  const modelPipelineChart = `%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0284c7', 'primaryTextColor': '#0f172a', 'primaryBorderColor': '#0284c7', 'lineColor': '#64748b', 'secondaryColor': '#7dd3fc', 'tertiaryColor': '#f1f5f9' }}}%%
graph TD
    classDef defaultNode fill:#f0f9ff,stroke:#0284c7,stroke-width:2px,color:#0f172a,rx:6,ry:6
    classDef dataNode fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e40af,rx:6,ry:6
    classDef processNode fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1,rx:6,ry:6
    classDef evalNode fill:#f0fdfa,stroke:#0d9488,stroke-width:2px,color:#0f766e,rx:6,ry:6
    classDef decisionNode fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#b45309,rx:6,ry:6,shape:diamond
    
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
    S -- 달성 --> T[모델 공개]
    
    class A,B,C,D,E,F dataNode
    class G,H,I,J,K,L,M,N,O,P,Q,R processNode
    class S decisionNode
    class T evalNode`;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="slide-container">
          <h1 className="slide-title text-white">모델 학습 과정</h1>
          <p className="text-center text-white mb-8">
            Tulu3 모델의 학습 과정과 주요 기술적 결정 사항에 대한 설명
          </p>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="slide-container">
          <h2 className="slide-title">데이터셋 관련 소스</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="slide-subtitle">데이터셋 관련 도구</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>scripts/data/sft/</strong>: 다양한 데이터셋을 처리하는 스크립트
                  <ul className="list-circle pl-5 mt-1">
                    <li><code>prepare_all.sh</code>: 모든 SFT 데이터셋 준비</li>
                    <li>각 데이터셋별 처리 스크립트: <code>aya.py</code>, <code>coconot.py</code> 등</li>
                  </ul>
                </li>
                <li>
                  <strong>open_instruct/dataset_transformation.py</strong>: <br/>&nbsp;&nbsp;&nbsp;&nbsp;데이터셋 변환 및 필터링 함수
                  <ul className="list-circle pl-5 mt-1">
                    <li><code>sft_tokenize_v1</code>, <code>sft_filter_v1</code> 등의 함수</li>
                  </ul>
                </li>
                <li>
                  <strong>open_instruct/utils.py</strong>: 데이터셋 로딩, 결합, 변환 유틸리티
                </li>
                <li>
                  <strong>scripts/data/sft/utils.py</strong>: 데이터셋 필터링을 위한 유틸리티 함수
                  <ul className="list-circle pl-5 mt-1">
                    <li><code>should_be_filtered_by_keyword()</code>: 특정 키워드 필터링</li>
                    <li><code>should_be_filtered_by_empty_message()</code>: 빈 메시지 필터링</li>
                  </ul>
                </li>
                <li>
                  <strong>scripts/data/preferences/</strong>: 선호도 데이터셋 처리 스크립트
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">프롬프트 합성 도구</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>scripts/synth_pref/</strong>: 합성 선호도 데이터 생성 파이프라인
                  <ul className="list-circle pl-5 mt-1">
                    <li><code>generate_responses.py</code>: 모델 응답 생성</li>
                    <li><code>create_annotation_mix.py</code>: 응답 혼합 생성</li>
                    <li><code>annotate_preferences.py</code>: 선호도 주석 생성</li>
                    <li><code>parse_preferences.py</code>: 선호도 데이터 파싱</li>
                  </ul>
                </li>
                <li>
                  <strong>scripts/persona_driven_data_gen/</strong>: 페르소나 기반 데이터 생성 도구
                  <ul className="list-circle pl-5 mt-1">
                    <li><code>prompt_templates.py</code>: 페르소나 기반 프롬프트 템플릿</li>
                    <li><code>persona_driven_generate_ifdata.py</code>: 명령어 따르기 데이터 생성</li>
                    <li><code>persona_driven_generate_math_code.py</code>: 수학/코드 문제 생성</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="card mt-8">
            <h3 className="slide-subtitle">Decontamination 도구</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>decontamination/</strong>: 훈련-평가 데이터 중복 측정 도구
                <ul className="list-circle pl-5 mt-1">
                  <li><code>index.py</code>: 훈련 데이터셋을 Elasticsearch 인덱스로 변환</li>
                  <li><code>search.py</code>: 테스트 데이터로 인덱스를 검색하여 중복 측정</li>
                </ul>
              </li>
              <li>
                <strong>주요 기능</strong>:
                <ul className="list-circle pl-5 mt-1">
                  <li>텍스트 매칭과 벡터 기반 매칭 지원</li>
                  <li>n-gram 매칭 또는 임베딩 기반 유사도 검색</li>
                  <li>데이터 제거 및 정제된 데이터셋 생성</li>
                  <li>보고서 생성</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="slide-container">
          <h2 className="slide-title text-gray-800">학습 데이터셋 생성</h2>
          <div className="card mb-8">
            <p className="slide-text">
              Tulu3의 학습 데이터셋은 다양한 출처의 데이터를 수집하고, 철저한 큐레이션과 합성, 그리고 Decontamination을 통해 고품질의 학습 데이터를 구축하는 과정을 거쳤습니다.
            </p>
          </div>

          <div className="card">
            <h3 className="slide-subtitle">학습 데이터셋 생성 파이프라인</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <MermaidDiagram chart={datasetPipelineChart} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="slide-container">
          <h2 className="slide-title text-gray-800">결론</h2>
          
          <div className="card">
            <p className="slide-text">
              Tulu3의 학습 데이터 준비 과정은 다양한 출처의 데이터를 수집하고, 철저한 큐레이션과 합성, 그리고 Decontamination을 통해 고품질의 학습 데이터를 구축하는 과정입니다. 이러한 과정을 통해 Tulu3는 다양한 작업에서 높은 성능을 발휘할 수 있게 되었습니다.
            </p>
            
            <p className="slide-text">
              데이터 준비 과정에서 특히 주목할 만한 것은 프롬프트 큐레이션과 합성 전략입니다. 프롬프트 큐레이션을 통해 기존 데이터에서 양질의 질문들을 선별했을 뿐만 아니라, 프롬프트 합성을 통해 완전히 새로운 질문들을 추가로 생성하여 학습 데이터셋을 한층 더 풍부하게 만들었습니다.
            </p>
            
            <p className="slide-text">
              또한 페르소나 기반 데이터 합성 방법론은 특정 분야의 전문적 지식과 기술을 모델에 효과적으로 학습시키는 데 큰 역할을 했으며, 철저한 Decontamination 과정은 모델의 평가 결과가 실제 성능을 정확히 반영하도록 보장했습니다. 이러한 종합적인 데이터 준비 과정을 통해 Tulu3는 보다 풍부하고 질 높은 학습 데이터를 확보할 수 있었습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="slide-container">
          <h2 className="slide-title">Model Pipeline</h2>
          
          <div className="card">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <MermaidDiagram chart={modelPipelineChart} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section">
        <div className="slide-container">
          <h2 className="slide-title">학습 과정 상세</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="slide-subtitle">SFT (Supervised Fine-Tuning)</h3>
              <p className="mb-4">
                지도 학습 미세 조정은 모델이 사용자 입력에 대해 적절한 응답을 생성하도록 학습시키는 과정입니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>사용자 질문과 이상적인 응답 쌍으로 학습</li>
                <li>기본적인 지시 따르기 능력 향상</li>
                <li>다양한 작업 수행 능력 개발</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">DPO (Direct Preference Optimization)</h3>
              <p className="mb-4">
                직접 선호도 최적화는 인간의 선호도를 직접 모델에 반영하는 학습 방법입니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>선호되는 응답과 그렇지 않은 응답 쌍으로 학습</li>
                <li>보상 모델 없이 직접 선호도 학습</li>
                <li>인간의 가치와 선호도에 맞는 응답 생성</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">RLVR (Reinforcement Learning from Value Ranking)</h3>
              <p className="mb-4">
                가치 순위 기반 강화학습은 응답의 품질을 순위화하여 학습하는 방법입니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>여러 응답의 상대적 순위를 기반으로 학습</li>
                <li>미세한 품질 차이를 반영한 학습</li>
                <li>다양한 품질 기준을 통합적으로 반영</li>
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="slide-container">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2025 Tulu3 프레젠테이션 | 모든 정보는 교육 목적으로만 사용됩니다.
          </p>
        </div>
      </footer>
    </main>
  );
} 