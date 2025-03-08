"use client";

import Navigation from '@/components/Navigation';
import { dataCategories, mainDatasets, datasetDetails } from '@/data/tulu3Data';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

// 클라이언트 컴포넌트로 Chart 동적 임포트
const DynamicCharts = dynamic(() => import('@/components/DatasetCharts'), { ssr: false });

export default function DatasetsPage() {
  // 데이터가 제대로 로드되었는지 확인
  useEffect(() => {
    console.log('Data categories:', dataCategories);
    console.log('Main datasets:', mainDatasets);
    console.log('Dataset details:', datasetDetails);
  }, []);
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tulu3 학습 데이터셋</h1>
          <p className="text-xl mb-8">
            Tulu3 모델 학습에 사용된 다양한 데이터셋에 대한 상세 정보
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">데이터셋 개요</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Tulu3의 학습 데이터는 크게 두 가지 출처에서 수집되었습니다: 오픈 소스 데이터(57%)와 합성 데이터(43%). 총 939,344개의 프롬프트가 수집되었으며, 일반(General), 지식 회상(Knowledge Recall), 수학 및 추론(Math & Reasoning) 등 핵심 기술에 중점을 두었습니다.
            </p>
            
            {/* 데이터 소스 분포 차트만 여기에 표시 */}
            <div className="max-w-md mx-auto">
              <DynamicCharts showOnlySourceChart={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {dataCategories.map((category) => (
              <div 
                key={category.id} 
                className="bg-white p-6 rounded-lg shadow-md border-l-4 flex flex-col h-full" 
                style={{ borderColor: category.color }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{category.name.split('(')[0]}</h3>
                  {category.percentage && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                      <span className="font-medium text-gray-800">{category.percentage}%</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-6">{category.description}</p>
                
                <p className="text-sm font-semibold mb-2 text-gray-800">주요 데이터셋:</p>
                {mainDatasets[category.id] && (
                  <ul className="list-disc pl-5 space-y-2">
                    {mainDatasets[category.id]?.map((dataset) => (
                      <li key={dataset.name}>
                        <span className="font-medium text-gray-800">{dataset.name}</span>
                        <p className="text-sm text-gray-700">
                          {dataset.description.replace(/\d+,?\d*개의 프롬프트(\s포함)?/, '')}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 데이터셋 상세 테이블 */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Tulu3 데이터셋 상세 분류</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-800 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 text-left font-bold">카테고리</th>
                  <th className="py-2 px-3 text-left font-bold">데이터셋</th>
                  <th className="py-2 px-3 text-left font-bold">프롬프트 수</th>
                  <th className="py-2 px-3 text-left font-bold">SFT 사용</th>
                  <th className="py-2 px-3 text-left font-bold">DPO 사용</th>
                  <th className="py-2 px-3 text-left font-bold">데이터 유형</th>
                  <th className="py-2 px-3 text-left font-bold">참고문헌</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(datasetDetails) && datasetDetails.length > 0 ? (
                  (() => {
                    let currentCategory = '';
                    return datasetDetails.map((dataset, index, array) => {
                      const isFirstInCategory = dataset.category !== currentCategory;
                      const isLastInCategory = index === array.length - 1 || array[index + 1].category !== dataset.category;
                      
                      if (isFirstInCategory) {
                        currentCategory = dataset.category;
                      }
                      
                      return (
                        <tr key={index} className={`border-t hover:bg-gray-50 ${isFirstInCategory ? 'border-t-2 border-gray-300' : ''}`}>
                          {isFirstInCategory ? (
                            <td className="py-2 px-3 font-medium text-gray-800 bg-gray-50" rowSpan={array.filter(d => d.category === dataset.category).length}>
                              {dataset.category.includes('(') ? 
                                <>
                                  {dataset.category.split('(')[0].trim()}
                                  <br />
                                  <span className="text-xs">({dataset.category.split('(')[1]}</span>
                                </> 
                                : dataset.category}
                            </td>
                          ) : null}
                          <td className="py-2 px-3 text-gray-800">{dataset.name}</td>
                          <td className="py-2 px-3 text-gray-800">{dataset.count.toLocaleString()}</td>
                          <td className="py-2 px-3 text-gray-800">{dataset.sftCount > 0 ? dataset.sftCount.toLocaleString() : '-'}</td>
                          <td className="py-2 px-3 text-gray-800">{dataset.dpoCount > 0 ? dataset.dpoCount.toLocaleString() : '-'}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              dataset.dataType === '합성' ? 'bg-pink-200 text-pink-800' : 'bg-indigo-200 text-indigo-800'
                            }`}>
                              {dataset.dataType}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-gray-800">{dataset.reference}</td>
                        </tr>
                      );
                    });
                  })()
                ) : (
                  <tr>
                    <td colSpan={8} className="py-4 text-center text-gray-500">
                      데이터를 불러오는 중입니다...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* 카테고리별 프롬프트 수와 TÜLU 3 합성 데이터셋 차트 */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8 mt-8">
            <DynamicCharts showDetailCharts={true} />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">No Robots 데이터셋 구조</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">데이터 구조</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li><strong>prompt</strong>: 사용자의 요청이나 질문을 나타내는 프롬프트 텍스트</li>
              <li><strong>messages</strong>: 모델이 실제로 학습하는 대화 쌍(사용자 요청과 모델 응답)</li>
              <li><strong>category</strong>: 프롬프트의 유형이나 목적을 나타내는 범주</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">예시 데이터</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-gray-800">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">prompt</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">messages</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">category</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">케이크를 구우려고 하는데, 어떤 맛이 좋을지 추천해줄래?</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">
                      <div className="bg-gray-100 p-2 rounded mb-2">
                        <span className="font-semibold">사용자:</span> 케이크를 구우려고 하는데, 어떤 맛이 좋을지 추천해줄래?
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <span className="font-semibold">어시스턴트:</span> 물론이죠! 다음과 같은 다양한 맛을 추천드립니다:
                        <br />1. 레몬 블루베리
                        <br />2. 초콜릿 오렌지
                        <br />3. 바닐라 라즈베리
                        <br />4. 당근 크림치즈
                        <br />5. 녹차 말차
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Brainstorm</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">이 제품 리뷰를 읽기 쉽고 짧은 문장으로 다시 써줘.</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-800">
                      <div className="bg-gray-100 p-2 rounded mb-2">
                        <span className="font-semibold">사용자:</span> 이 제품 리뷰를 읽기 쉽고 짧은 문장으로 다시 써줘.
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <span className="font-semibold">어시스턴트:</span> 다음은 이해하기 쉽도록 다시 쓴 리뷰입니다:
                        <br />- 제품이 튼튼하고 오래 갑니다.
                        <br />- 가격도 적당하고 품질이 좋아요.
                        <br />- 배송도 빨라서 좋았습니다.
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Rewrite</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">데이터 카테고리</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-700">
              <li><strong>Brainstorm</strong>: 창의적인 아이디어 생성 및 제안</li>
              <li><strong>Rewrite</strong>: 기존의 내용을 다른 방식으로 재구성하거나 단순화하여 표현</li>
            </ul>
            
            <h3 className="text-xl font-bold mb-4 text-gray-700">Messages의 역할</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>모델이 실제로 학습하는 '정답지' 역할</li>
              <li>사용자의 요청과 이에 대한 이상적인 응답이 쌍으로 구성</li>
              <li>모델이 적절하고 자연스러운 응답을 생성하는 방법을 학습하는 데 활용</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Tulu-3 SFT 데이터셋 구조</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">기본 데이터 구조</h3>
            <p className="text-gray-700 mb-4">
              Hugging Face에 공개된 <a href="https://huggingface.co/datasets/allenai/tulu-3-sft-mixture" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">allenai/tulu-3-sft-mixture</a> 데이터셋은 다음과 같은 구조로 되어 있습니다:
            </p>
            
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>messages</strong>: 대화 형식의 리스트로, 모델 학습에 직접 사용되는 핵심 데이터
                <ul className="list-circle pl-5 mt-2 space-y-1 text-gray-700">
                  <li><strong>content</strong>: 실제 텍스트 내용 (사용자 질문 또는 AI 응답)</li>
                  <li><strong>role</strong>: 메시지 역할 ("user" 또는 "assistant")</li>
                </ul>
              </li>
              <li><strong>id</strong>: 각 데이터 샘플의 고유 식별자</li>
              <li><strong>source</strong>: 데이터의 출처 데이터셋</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">데이터 예시</h3>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`{
  "id": "oasst1_5551",
  "messages": [
    {
      "content": "explain WebUSB in simple terms",
      "role": "user"
    },
    {
      "content": "WebUSB is a technology that allows web developers...",
      "role": "assistant"
    }
  ],
  "source": "ai2-adapt-dev/oasst1_converted"
}`}
              </pre>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-gray-800">학습 과정에서의 역할</h4>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>모델은 <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">"user"</code> 역할의 content를 입력으로 받습니다.</li>
                <li>모델은 <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-800">"assistant"</code> 역할의 content를 생성하도록 학습됩니다.</li>
                <li>학습 과정에서 모델은 "이런 질문이 들어오면 이렇게 응답해야 한다"는 패턴을 배웁니다.</li>
              </ol>
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