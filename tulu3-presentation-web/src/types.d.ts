import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// 모듈 선언
declare module 'react' {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
}

declare module 'next/link';
declare module 'next/navigation';

// 데이터 타입 정의
export interface DataCategory {
  id: string;
  name: string;
  description: string;
  percentage?: number;
  color?: string;
  isSynthetic?: boolean;
}

export interface DataProcessingStep {
  id: string;
  name: string;
  description: string;
  details: string[];
}

export interface PersonaExample {
  persona: string;
  prompt: string;
  response: string;
}

export interface DecontaminationExample {
  before: string;
  after: string;
  explanation: string;
}

// 데이터셋 상세 정보 인터페이스
export interface DatasetDetail {
  id: string;
  name: string;
  category: string;
  count: number;
  sftCount: number;
  dpoCount: number;
  reference: string;
  description: string;
  dataType: string;
  license: string;
} 