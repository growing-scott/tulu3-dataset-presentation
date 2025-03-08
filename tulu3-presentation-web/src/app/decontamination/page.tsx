import Navigation from '@/components/Navigation';
import { dataProcessingSteps } from '@/data/tulu3Data';

export default function DecontaminationPage() {
  // Decontamination 단계 정보 가져오기
  const decontaminationStep = dataProcessingSteps.find(step => step.id === 'decontamination');

  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="slide-container">
          <h1 className="slide-title">Decontamination (데이터 비오염화)</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            모델이 평가 데이터(Test Set)를 미리 학습하는 문제를 방지하기 위한 과정
          </p>
        </div>
      </section>

      <section className="section">
        <div className="slide-container">
          <h2 className="slide-title">Decontamination의 개념</h2>
          <div className="card mb-8">
            <p className="slide-text">
              Decontamination은 모델이 평가 데이터(Test Set)를 미리 학습하는 문제를 방지하기 위한 과정입니다. 학습 데이터(Training Set)에서 평가 데이터와 겹치는 부분을 제거하여 모델 평가의 정확성을 보장합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="slide-subtitle">Decontamination의 중요성</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>모델 성능 평가의 정확성 보장</li>
                <li>모델의 실제 추론 능력 평가</li>
                <li>단순 암기가 아닌 이해 기반 응답 유도</li>
                <li>공정한 모델 비교 가능</li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">Decontamination 과정</h3>
              <ul className="list-disc pl-5 space-y-2">
                {decontaminationStep?.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-900">
        <div className="slide-container">
          <h2 className="slide-title">Decontamination 과정 상세</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="card">
              <h3 className="slide-subtitle">평가 데이터 전처리</h3>
              <p className="mb-4">
                평가 데이터(test set)를 문장 단위로 분리하여 분석 가능한 형태로 준비합니다.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <ol className="list-decimal pl-5 space-y-1">
                  <li>평가 데이터 수집</li>
                  <li>문장 단위 분리</li>
                  <li>데이터 정규화</li>
                  <li>표준화 작업 수행</li>
                </ol>
              </div>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">유사성 검사</h3>
              <p className="mb-4">
                학습 데이터와 평가 데이터 간 유사성을 다양한 방법으로 검사합니다.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <p className="font-semibold">유사도 평가 방법:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>N-gram 매칭</li>
                  <li>Cosine Similarity</li>
                  <li>Jaccard Index</li>
                  <li>Dense Embeddings</li>
                </ul>
              </div>
            </div>
            
            <div className="card">
              <h3 className="slide-subtitle">중복 데이터 필터링</h3>
              <p className="mb-4">
                유사도 검사 결과에 따라 중복 데이터를 필터링하거나 수정합니다.
              </p>
              <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <ul className="list-disc pl-5 space-y-1">
                  <li>90% 이상 유사: 완전히 삭제</li>
                  <li>60~90% 유사: 사람이 직접 확인 후 수정</li>
                  <li>60% 미만 유사: 유지</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="slide-container">
          <h2 className="slide-title">Decontamination 예시</h2>
          
          <div className="card mb-8">
            <h3 className="slide-subtitle">🚩 Before (중복 데이터가 존재하는 경우)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">데이터 종류</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">내용</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">평가 데이터 (유지됨)</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">"Where is the Eiffel Tower?" (에펠탑은 어디에 있나요?)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">학습 데이터에서 삭제할 예시</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">"The Eiffel Tower is located in Paris." (에펠탑은 파리에 있다.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <h4 className="font-bold text-lg mb-2">❌ 이 경우의 문제점:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>학습 데이터에 이미 <strong>"에펠탑이 파리에 있다"</strong> 는 정보가 그대로 들어가 있습니다.</li>
                <li>모델은 학습 단계에서 이미 평가 데이터가 물어보는 정보를 직접적으로 학습한 상태가 됩니다.</li>
                <li>따라서 평가 데이터의 질문에 대한 답변을 모델이 추론이나 이해 없이, <strong>단순히 기억해 두었던 내용을 그대로 꺼내서 응답(암기)</strong> 할 위험이 생깁니다.</li>
                <li>이는 모델의 실제 추론 능력을 평가할 수 없게 만들며, 성능 평가를 <strong>왜곡</strong>시킵니다.</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h3 className="slide-subtitle">✅ After (Decontamination 수행 후)</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">데이터 종류</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">내용</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">평가 데이터 (유지됨)</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">"Where is the Eiffel Tower?" (에펠탑은 어디에 있나요?)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">학습 데이터 수정 예시</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-gray-100">"The Eiffel Tower is a famous landmark in France, known for its structure." (에펠탑은 프랑스의 유명한 랜드마크이며, 구조물로 유명하다.)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <h4 className="font-bold text-lg mb-2">💡 개선된 점:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>평가 데이터("에펠탑의 위치는?")에서 요구하는 정확한 정보("파리")가 학습 데이터에 직접적으로 제시되지 않도록 합니다.</li>
                <li>대신 학습 데이터는 보다 <strong>간접적이고 일반적인 형태의 정보만 제공합니다</strong>. (예: 에펠탑은 프랑스의 유명한 구조물이라는 일반적 사실 제공)</li>
                <li>이렇게 하면 모델은 평가 데이터 질문에 대해 <strong>단순 암기 대신, 문맥이나 일반적인 정보에 근거하여 답을 추론</strong>해야 합니다.</li>
              </ul>
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