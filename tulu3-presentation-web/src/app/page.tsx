import React from 'react';
import Link from 'next/link';
import { dataCategories, dataProcessingSteps } from '@/data/tulu3Data';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 헤더 섹션 */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tulu3 학습 데이터 분석</h1>
          <p className="text-xl md:text-2xl mb-8">
            Tulu3 모델의 학습 데이터 구성과 처리 과정에 대한 심층 분석
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/datasets" 
              className="bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              데이터셋 살펴보기
            </Link>
            <Link 
              href="/training" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              학습 과정 이해하기
            </Link>
          </div>
        </div>
      </section>

      {/* 개요 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Tulu3 개요</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">
              Tulu3는 다양한 데이터셋을 활용하여 학습된 대규모 언어 모델로, 총 939,344개의 프롬프트로 구성된 학습 데이터를 사용했습니다.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              이 프레젠테이션에서는 Tulu3 모델의 학습 데이터 구성, 데이터 처리 과정, 그리고 각 단계별 중요성에 대해 살펴봅니다.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-indigo-50 p-4 rounded-lg inline-block">
                <p className="font-semibold text-indigo-800">총 학습 데이터: 939,344개 프롬프트</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 데이터 구성 섹션 */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">데이터 구성</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dataCategories.slice(0, 2).map((category) => (
              <div key={category.id} className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderColor: category.color }}>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{category.name} ({category.percentage}%)</h3>
                <p className="text-gray-700">{category.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              href="/datasets" 
              className="inline-block bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              데이터셋 자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 주요 데이터 처리 단계 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">주요 데이터 처리 단계</h2>
          <div className="space-y-6">
            {dataProcessingSteps.map((step) => (
              <div key={step.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{step.name}</h3>
                <p className="text-gray-700 mb-4">{step.description}</p>
                <Link 
                  href={`/${step.id}`} 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  자세히 알아보기 →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-white">© 2025 Tulu3 데이터 분석 프레젠테이션</p>
        </div>
      </footer>
    </main>
  );
} 