// import Navigation from '@/components/Navigation';
import { dataProcessingSteps, personaExamples, etcSynthesisExamples } from '@/data/tulu3Data';

export default function SynthesisPage() {
  // 합성 단계 정보 가져오기
  const synthesisStep = dataProcessingSteps.find(step => step.id === 'synthesis');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation 컴포넌트 제거 */}
      
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">프롬프트 합성</h1>
          <p className="text-xl mb-8">
            새로운 프롬프트를 인공적으로 생성하여 데이터 다양성을 확보하는 과정
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">프롬프트 합성이란?</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-lg text-gray-900 mb-4">
              프롬프트 합성(Prompt Synthesis)은 기존 데이터셋에서 단순히 프롬프트를 선별하는 것이 아니라, 새로운 프롬프트를 인공적으로 생성하는 과정입니다.
            </p>
            <p className="text-lg text-gray-900">
              이는 큐레이션과는 다른 접근 방식으로, 특히 기존 공개 데이터에서 부족한 특정 기술 영역을 보완하고 다양한 관점과 페르소나를 학습 데이터에 포함시키기 위해 중요합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900">프롬프트 합성의 목적</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-900">
              <li>
                <strong>특정 기술 영역 보완</strong>: 기존 공개 데이터에서 부족한 특정 기술 영역(예: 수학, 코딩, 과학적 추론)을 보완
              </li>
              <li>
                <strong>다양한 페르소나와 관점</strong>: 다양한 페르소나와 관점에서 생성된 데이터로 모델 학습
              </li>
              <li>
                <strong>학습 효율성 극대화</strong>: 데이터 다양성을 통해 모델의 학습 효율성 극대화
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">합성 기법</h2>
          
          <div className="space-y-6">
            {synthesisStep && synthesisStep.details.map((detail, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{detail}</h3>
                {index === 0 && (
                  <p className="text-gray-900">
                    특정 페르소나(예: 수학 교사, 프로그래머, 과학자)의 관점에서 프롬프트를 생성하도록 모델을 유도하는 방식입니다. 이를 통해 다양한 전문 분야와 관점의 데이터를 확보할 수 있습니다.
                  </p>
                )}
                {index === 1 && (
                  <p className="text-gray-900">
                    AI가 스스로 질문을 만들고 답을 생성하여 데이터 확장<br/>모델이 생성한 응답을 다시 입력으로 사용하여 더 복잡하거나 심화된 프롬프트를 생성하는 방식입니다. 이는 모델의 능력을 점진적으로 향상시키는 데 효과적입니다.
                  </p>
                )}
                {index === 2 && (
                  <p className="text-gray-900">
                    더 큰 모델이나 전문화된 모델을 활용하여 고품질의 프롬프트와 응답을 생성하는 방식입니다. 이를 통해 작은 모델이 더 효율적으로 학습할 수 있습니다.
                  </p>
                )}
                {index === 3 && (
                  <p className="text-gray-900">
                    기존 데이터를 변형하거나 확장하여 다양한 변형을 만드는 방식입니다. 예를 들어, 같은 질문을 다른 방식으로 표현하거나, 난이도를 조정하는 등의 방법이 있습니다.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">페르소나 기반 합성 예시</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {personaExamples.map((example, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-indigo-50 p-3 rounded-t-lg">
                  <h3 className="font-bold text-gray-900">페르소나: {example.persona}</h3>
                </div>
                <div className="p-4 border-l border-r border-gray-200">
                  <p className="font-medium mb-2 text-gray-900">프롬프트:</p>
                  <p className="bg-gray-50 p-3 rounded mb-4 text-gray-900">{example.prompt}</p>
                  <p className="font-medium mb-2 text-gray-900">합성된 응답:</p>
                  <p className="bg-blue-50 p-3 rounded text-gray-900">{example.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">그 외 합성 예시</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {etcSynthesisExamples.map((example, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-indigo-50 p-3 rounded-t-lg">
                  <h3 className="font-bold text-gray-900">{example.type}</h3>
                </div>
                <div className="p-4 border-l border-r border-gray-200">
                  <p className="font-medium mb-2 text-gray-900">프롬프트:</p>
                  <p className="bg-gray-50 p-3 rounded mb-4 text-gray-900">{example.prompt}</p>
                  <p className="font-medium mb-2 text-gray-900">합성된 응답:</p>
                  <p className="bg-blue-50 p-3 rounded text-gray-900">{example.response}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      

      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">프롬프트 합성의 중요성</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-900 mb-4">
              프롬프트 합성은 단순히 데이터의 양을 늘리는 것이 아니라, 모델이 다양한 관점과 전문 지식을 효과적으로 학습할 수 있도록 돕는 중요한 과정입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-indigo-50 p-4 rounded">
                <h3 className="font-bold text-indigo-900 mb-2">다양성 확보</h3>
                <p className="text-gray-900">다양한 페르소나와 관점에서 생성된 데이터로 모델의 이해 범위를 넓힙니다.</p>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <h3 className="font-bold text-purple-900 mb-2">특화된 능력 향상</h3>
                <p className="text-gray-900">특정 분야(수학, 코딩, 과학 등)에 대한 전문적인 데이터를 생성하여 모델의 특화된 능력을 향상시킵니다.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">학습 효율성</h3>
                <p className="text-gray-900">고품질의 합성 데이터를 통해 더 적은 양의 데이터로도 효과적인 학습이 가능합니다.</p>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h3 className="font-bold text-green-900 mb-2">사용자 요구 충족</h3>
                <p className="text-gray-900">실제 사용자들이 요구할 수 있는 다양한 상황과 질문에 대응할 수 있는 능력을 향상시킵니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p>© 2025 Tulu3 데이터 분석 프레젠테이션</p>
        </div>
      </footer>
    </main>
  );
} 
