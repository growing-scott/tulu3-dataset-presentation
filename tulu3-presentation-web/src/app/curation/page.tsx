// import Navigation from '@/components/Navigation';
import { dataProcessingSteps } from '@/data/tulu3Data';

export default function CurationPage() {
  // 큐레이션 단계 정보 가져오기
  const curationStep = dataProcessingSteps.find(step => step.id === 'curation');

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-b from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="slide-container">
          <h1 className="slide-title text-white">프롬프트 큐레이션 (Prompt Curation)</h1>
          <p className="text-center text-white mb-8">
            기존 데이터셋에서 품질이 높은 프롬프트를 선별하여 모델이 효율적으로 학습하도록 하는 과정
          </p>
        </div>
      </section>

      <section className="section bg-white py-16">
        <div className="slide-container">
          <h2 className="slide-title text-gray-800">프롬프트 큐레이션의 개념</h2>
          <div className="card mb-8">
            <p className="slide-text">
              프롬프트 큐레이션은 기존 데이터셋에서 품질이 높은 프롬프트를 선별하여 모델이 효율적으로 학습하도록 하는 과정입니다. <br/> 불필요한 데이터(단순하거나 반복적인 데이터)를 제거하여 학습 효율성을 향상시킵니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="slide-subtitle">큐레이션의 목적</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>학습 데이터의 품질 향상</li>
                <li>중복 및 불필요한 데이터 제거</li>
                <li>모델 학습 효율성 증대</li>
                <li>특정 능력에 집중할 수 있는 데이터 선별</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">큐레이션 과정</h3>
              <ul className="list-disc pl-5 space-y-2">
                {curationStep?.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="slide-container">
          <h2 className="slide-title">프롬프트 개선 및 보강</h2>
          
          <div className="card mb-8">
            <p className="slide-text">
              단순한 질문을 추론적이고 논리적인 사고가 필요한 형태로 변경하는 과정은 모델의 추론 능력을 향상시키는 데 중요합니다.
            </p>
          </div>

          <div className="card">
            <h3 className="slide-subtitle">프롬프트 개선 예시</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-red-500">
                <h4 className="font-bold text-lg mb-2">변경 전 (단순 계산형 질문)</h4>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                  <p>"2+2는 얼마인가요?"</p>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  단순 계산만 요구하는 질문으로, 모델의 추론 능력을 향상시키는 데 제한적입니다.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-green-500">
                <h4 className="font-bold text-lg mb-2">변경 후 (추론이 필요한 질문)</h4>
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                  <p>"사과를 2개 가지고 있는데, 2개를 더 샀다면 사과는 총 몇 개인가요? 답을 설명해 주세요."</p>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  실생활 상황을 제시하고 설명을 요구하여 모델의 추론 및 설명 능력을 향상시킵니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="slide-container">
          <h2 className="slide-title text-gray-800">데이터 필터링 및 정제</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="slide-subtitle">단순 프롬프트 삭제</h3>
              <p className="mb-4">모델 학습에 큰 가치를 제공하지 않는 단순한 프롬프트를 제거합니다.</p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <p className="text-red-500 line-through">"안녕하세요"</p>
                <p className="text-red-500 line-through">"1+1은?"</p>
                <p className="text-red-500 line-through">"오늘 날씨 어때?"</p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">중복 데이터 제거</h3>
              <p className="mb-4">동일하거나 매우 유사한 프롬프트를 제거하여 데이터 다양성을 확보합니다.</p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <p>"파이썬으로 웹 스크래퍼를 만드는 방법을 알려주세요."</p>
                <p className="text-red-500 line-through">"파이썬을 사용해서 웹 스크래퍼를 만들고 싶어요."</p>
                <p className="text-red-500 line-through">"파이썬 웹 스크래핑 코드를 작성하는 방법은?"</p>
              </div>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">비효율적 질문 제거</h3>
              <p className="mb-4">모호하거나 비효율적인 질문을 제거하여 학습 품질을 향상시킵니다.</p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <p className="text-red-500 line-through">"그거 있잖아 그거 뭐지?"</p>
                <p className="text-red-500 line-through">"음... 어떻게 하는 거였더라?"</p>
                <p className="text-red-500 line-through">"이거 알려줘"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
