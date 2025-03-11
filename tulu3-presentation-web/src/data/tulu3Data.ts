import { DataCategory, DataProcessingStep, PersonaExample, DecontaminationExample, DatasetDetail, EtcSynthesisExample } from '../types';

// 데이터셋 정보 인터페이스
interface DatasetInfo {
  name: string;
  description: string;
}

interface PersonaExample {
  persona: string;
  prompt: string;
  response: string;
}

interface EtcSynthesisExample {
  type: string;
  prompt: string;
  response: string;
  persona?: string;
}

// 데이터 카테고리 정의
export const dataCategories: DataCategory[] = [
  {
    id: 'general',
    name: '일반 (General)',
    description: '일반적인 대화, 요약, 브레인스토밍 등 다양한 일상적 작업을 포함합니다.',
    percentage: 27,
    color: '#4C51BF',
    isSynthetic: false
  },
  {
    id: 'knowledge-recall',
    name: '지식 회상 (Knowledge Recall)',
    description: '사실적 정보 회상과 지식 기반 질문에 대한 응답을 포함합니다.',
    percentage: 14,
    color: '#38B2AC',
    isSynthetic: true
  },
  {
    id: 'math-reasoning',
    name: '수학 및 추론 (Math & Reasoning)',
    description: '수학 문제, 논리적 추론, 복잡한 문제 해결 능력을 테스트하는 데이터셋입니다.',
    percentage: 35,
    color: '#ED8936',
    isSynthetic: true
  },
  {
    id: 'coding',
    name: '코딩 (Coding)',
    description: '프로그래밍 문제, 코드 생성, 디버깅 및 설명 등의 작업을 포함합니다.',
    percentage: 15,
    color: '#9F7AEA',
    isSynthetic: false
  },
  {
    id: 'safety',
    name: '안전 및 비준수 (Safety & Non-Compliance)',
    description: '모델의 안전성과 유해한 요청에 대한 거부 능력을 향상시키기 위한 데이터셋입니다.',
    percentage: 12,
    color: '#F56565',
    isSynthetic: true
  },
  {
    id: 'multilingual',
    name: '다국어 (Multilingual)',
    description: '영어 외 다양한 언어로 된 작업과 번역 관련 데이터를 포함합니다.',
    percentage: 22,
    color: '#48BB78',
    isSynthetic: false
  },
  {
    id: 'precise-if',
    name: '정확한 지시 (Precise IF)',
    description: '정확한 지시 따르기(Instruction Following)를 위한 데이터셋입니다.',
    percentage: 3,
    color: '#ECC94B',
    isSynthetic: true
  }
];

// 주요 데이터셋 정보
export const mainDatasets: Record<string, DatasetInfo[]> = {
  'general': [
    {
      name: 'OpenAssistant Guanaco',
      description: '고품질 대화 데이터셋'
    },
    {
      name: 'Tulu 3 Hardcoded',
      description: '모델의 기본 응답을 위한 하드코딩된 프롬프트'
    },
    {
      name: 'No Robots',
      description: '일반적인 대화 및 지시 따르기 작업을 위한 데이터셋'
    },
    {
      name: 'WildChat GPT-4',
      description: 'GPT-4로 생성된 고품질 대화 데이터셋'
    },
    {
      name: 'UltraFeedback',
      description: '사용자 피드백 기반 데이터셋'
    }
  ],
  'knowledge-recall': [
    {
      name: 'FLAN v2',
      description: '지식 회상 및 다양한 NLP 작업을 위한 데이터셋'
    },
    {
      name: 'SciRIFF',
      description: '과학 문헌 이해 및 정보 추출을 위한 데이터셋'
    },
    {
      name: 'TableGPT',
      description: '표 형식 데이터 이해 및 분석을 위한 데이터셋'
    }
  ],
  'math-reasoning': [
    {
      name: 'Tulu 3 Persona MATH',
      description: '고급 수학 문제 해결을 위한 합성 데이터셋'
    },
    {
      name: 'Tulu 3 Persona GSM',
      description: '초등학교 수준의 수학 문제를 위한 합성 데이터셋'
    },
    {
      name: 'Tulu 3 Persona Algebra',
      description: '대수학 문제 해결을 위한 합성 데이터셋'
    },
    {
      name: 'OpenMathInstruct 2',
      description: '다양한 수학 문제 해결 능력 향상을 위한 데이터셋'
    },
    {
      name: 'NuminaMath-TIR',
      description: '수학적 추론 능력 향상을 위한 데이터셋'
    }
  ],
  'coding': [
    {
      name: 'Tulu 3 Persona Python',
      description: '파이썬 코딩 문제 해결을 위한 합성 데이터셋'
    },
    {
      name: 'Evol CodeAlpaca',
      description: '코드 생성 및 프로그래밍 문제 해결을 위한 데이터셋'
    }
  ],
  'safety': [
    {
      name: 'Tulu 3 CoCoNot',
      description: '유해한 콘텐츠 감지 및 거부를 위한 데이터셋'
    },
    {
      name: 'Tulu 3 WildJailbreak',
      description: '모델 제한 우회 시도에 대응하기 위한 데이터셋'
    },
    {
      name: 'Tulu 3 WildGuardMix',
      description: '다양한 유해 요청에 대한 거부 능력 향상을 위한 데이터셋'
    }
  ],
  'multilingual': [
    {
      name: 'Aya',
      description: '다국어 지원을 위한 데이터셋'
    }
  ],
  'precise-if': [
    {
      name: 'Tulu 3 Persona IF',
      description: '정확한 지시 따르기를 위한 합성 데이터셋'
    },
    {
      name: 'Daring Anteater',
      description: '복잡한 지시 따르기 작업을 위한 데이터셋'
    }
  ]
};

// 데이터셋 상세 정보
export const datasetDetails: DatasetDetail[] = [
  {
    id: 'openassistant-guanaco',
    name: 'OpenAssistant Guanaco',
    category: '일반 (General)',
    count: 7132,
    sftCount: 7132,
    dpoCount: 7132,
    reference: 'Köpf et al. [2024]',
    description: '고품질 대화 데이터셋으로 Open Assistant 데이터셋의 일부를 사용',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'tulu3-hardcoded',
    name: 'Tulu 3 Hardcoded',
    category: '일반 (General)',
    count: 24,
    sftCount: 24,
    dpoCount: 24,
    reference: '-',
    description: '모델의 기본 응답을 위한 하드코딩된 프롬프트',
    dataType: '합성',
    license: 'CC-BY-4.0'
  },
  {
    id: 'no-robots',
    name: 'No Robots',
    category: '일반 (General)',
    count: 9500,
    sftCount: 9500,
    dpoCount: 9500,
    reference: 'Rajani et al. [2023]',
    description: '일반적인 대화 및 지시 따르기 작업을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'CC-BY-NC-4.0'
  },
  {
    id: 'wildchat-gpt4',
    name: 'WildChat GPT-4',
    category: '일반 (General)',
    count: 241307,
    sftCount: 100000,
    dpoCount: 100000,
    reference: 'Zhao et al. [2024]',
    description: 'GPT-4로 생성된 고품질 대화 데이터셋',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'ultrafeedback',
    name: 'UltraFeedback',
    category: '일반 (General)',
    count: 0,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Cui et al. [2023]',
    description: '사용자 피드백 기반 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'flan-v2',
    name: 'FLAN v2',
    category: '지식 회상 (Knowledge Recall)',
    count: 89982,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Longpre et al. [2023]',
    description: '지식 회상 및 다양한 NLP 작업을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'sciriff',
    name: 'SciRIFF',
    category: '지식 회상 (Knowledge Recall)',
    count: 35357,
    sftCount: 10000,
    dpoCount: 0,
    reference: 'Wadden et al. [2024]',
    description: '과학 문헌 이해 및 정보 추출을 위한 데이터셋',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'tablegpt',
    name: 'TableGPT',
    category: '지식 회상 (Knowledge Recall)',
    count: 5000,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Zha et al. [2023]',
    description: '표 형식 데이터 이해 및 분석을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'MIT'
  },
  {
    id: 'tulu3-persona-math',
    name: 'Tulu 3 Persona MATH',
    category: '수학 및 추론 (Math & Reasoning)',
    count: 149960,
    sftCount: 0,
    dpoCount: 0,
    reference: '-',
    description: '고급 수학 문제 해결을 위한 합성 프롬프트',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'tulu3-persona-gsm',
    name: 'Tulu 3 Persona GSM',
    category: '수학 및 추론 (Math & Reasoning)',
    count: 49980,
    sftCount: 0,
    dpoCount: 0,
    reference: '-',
    description: '초등학교 수준의 수학 문제를 위한 합성 프롬프트',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'tulu3-persona-algebra',
    name: 'Tulu 3 Persona Algebra',
    category: '수학 및 추론 (Math & Reasoning)',
    count: 20000,
    sftCount: 0,
    dpoCount: 0,
    reference: '-',
    description: '대수학 문제 해결을 위한 합성 프롬프트',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'openmathinstrct-2',
    name: 'OpenMathInstruct 2',
    category: '수학 및 추론 (Math & Reasoning)',
    count: 50000,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Toshniwal et al. [2024]',
    description: '다양한 수학 문제 해결 능력 향상을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'numinamath-tir',
    name: 'NuminaMath-TIR',
    category: '수학 및 추론 (Math & Reasoning)',
    count: 64312,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Beeching et al. [2024]',
    description: '수학적 추론 능력 향상을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'tulu3-persona-python',
    name: 'Tulu 3 Persona Python',
    category: '코딩 (Coding)',
    count: 34999,
    sftCount: 0,
    dpoCount: 0,
    reference: '-',
    description: '파이썬 코딩 문제 해결을 위한 합성 프롬프트',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'evol-codealpaca',
    name: 'Evol CodeAlpaca',
    category: '코딩 (Coding)',
    count: 107276,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Luo et al. [2023]',
    description: '코드 생성 및 프로그래밍 문제 해결을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'tulu3-coconot',
    name: 'Tulu 3 CoCoNot',
    category: '안전 및 비준수 (Safety & Non-Compliance)',
    count: 10983,
    sftCount: 10983,
    dpoCount: 10983,
    reference: 'Brahman et al. [2024]',
    description: '유해한 콘텐츠 감지 및 거부를 위한 데이터셋',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'tulu3-wildjailbreak',
    name: 'Tulu 3 WildJailbreak',
    category: '안전 및 비준수 (Safety & Non-Compliance)',
    count: 50000,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Jiang et al. [2024]',
    description: '모델 제한 우회 시도에 대응하기 위한 데이터셋',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'tulu3-wildguardmix',
    name: 'Tulu 3 WildGuardMix',
    category: '안전 및 비준수 (Safety & Non-Compliance)',
    count: 50000,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Han et al. [2024]',
    description: '다양한 유해 요청에 대한 거부 능력 향상을 위한 데이터셋',
    dataType: '합성',
    license: 'Apache 2.0'
  },
  {
    id: 'aya',
    name: 'Aya',
    category: '다국어 (Multilingual)',
    count: 202285,
    sftCount: 202285,
    dpoCount: 0,
    reference: 'Singh et al. [2024b]',
    description: '다국어 지원을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  },
  {
    id: 'tulu3-persona-if',
    name: 'Tulu 3 Persona IF',
    category: '정확한 IF (Precise IF)',
    count: 29980,
    sftCount: 0,
    dpoCount: 0,
    reference: '-',
    description: '정확한 지시 따르기를 위한 합성 프롬프트',
    dataType: '합성',
    license: 'ODC-BY-1.0'
  },
  {
    id: 'daring-anteater',
    name: 'Daring Anteater',
    category: '정확한 IF (Precise IF)',
    count: 0,
    sftCount: 0,
    dpoCount: 0,
    reference: 'Wang et al. [2024d]',
    description: '복잡한 지시 따르기 작업을 위한 데이터셋',
    dataType: '오픈 소스',
    license: 'Apache 2.0'
  }
];

// 데이터 처리 단계 정의
export const dataProcessingSteps: DataProcessingStep[] = [
  {
    id: 'curation',
    name: '프롬프트 큐레이션',
    description: '기존 데이터셋에서 고품질 프롬프트를 선택하여 모델 학습 효율성을 향상시키는 과정입니다.',
    details: [
      '단순한 질문을 논리적 추론이 필요한 질문으로 변환',
      '중복 데이터 제거 및 데이터 품질 향상',
      '특정 능력에 초점을 맞춘 데이터 선별'
    ]
  },
  {
    id: 'synthesis',
    name: '프롬프트 합성',
    description: '새로운 프롬프트를 인공적으로 생성하여 데이터 다양성을 확보하는 과정입니다.',
    details: [
      '페르소나 기반 접근법을 통한 다양한 관점 생성',
      'Self-Play & Bootstrapping을 통한 데이터 확장',
      'LLM-as-a-Teacher / 대형 언어 모델을 교사로 활용한 데이터 생성',
      '데이터 증강 및 변형을 통한 다양성 확보'
    ]
  },
  {
    id: 'decontamination',
    name: '데이터 오염 제거',
    description: '학습 데이터와 평가 데이터 간의 중복을 제거하여 정확한 모델 평가를 보장하는 과정입니다.',
    details: [
      '평가 데이터 전처리 및 정규화',
      '학습 데이터와 평가 데이터 간 유사성 검사',
      '유사성 점수에 기반한 중복 데이터 필터링',
      '오염 제거 후 데이터 품질 검증'
    ]
  }
];

// 페르소나 기반 합성 예시
export const personaExamples: PersonaExample[] = [
  {
    persona: '의학 전문가',
    prompt: '당뇨병 환자를 위한 식이 요법에 대해 설명해주세요.',
    response: '당뇨병 환자의 식이 요법은 혈당 관리에 중요한 역할을 합니다. 탄수화물 섭취를 모니터링하고, 복합 탄수화물을 선택하며, 식이 섬유가 풍부한 음식을 섭취하는 것이 좋습니다. 또한 규칙적인 식사 시간, 적절한 단백질 섭취, 건강한 지방 선택이 중요합니다. 개인별 혈당 반응은 다를 수 있으므로 의료 전문가와 상담하여 맞춤형 계획을 세우는 것이 좋습니다.'
  },
  {
    persona: '법률 전문가',
    prompt: '지적 재산권 침해에 대한 법적 대응 방안을 알려주세요.',
    response: '지적 재산권 침해에 대한 법적 대응으로는 1) 침해 중지 요청서 발송, 2) 대체적 분쟁 해결 방법(조정, 중재), 3) 임시 금지 명령 신청, 4) 손해 배상 소송 제기 등이 있습니다. 침해 유형과 관할권에 따라 적용 가능한 법률이 다르므로, 전문 변호사와 상담하여 최적의 전략을 수립하는 것이 중요합니다.'
  },
  {
    persona: '교육자',
    prompt: '초등학생들에게 기후 변화를 어떻게 가르칠 수 있을까요?',
    response: '초등학생들에게 기후 변화를 가르치기 위해서는 1) 간단한 실험과 시각적 자료 활용, 2) 스토리텔링을 통한 감정적 연결, 3) 일상생활에서 실천할 수 있는 작은 행동 강조, 4) 자연 관찰 활동과 현장 학습, 5) 긍정적인 변화 가능성 강조가 효과적입니다. 학생들의 나이와 이해 수준에 맞게 복잡한 개념을 단순화하고, 두려움보다는 희망과 행동에 초점을 맞추는 것이 중요합니다.'
  }
];

// 그 외 합성 예시
export const etcSynthesisExamples: EtcSynthesisExample[] = [
  {
    type: 'Self-Play & Bootstrapping',
    prompt: '광합성이란 무엇인가?',
    response: 'AI 생성 질문: 지구상에서 광합성이 멈추면 어떤 일이 벌어질까?'
  },
  {
    type: 'LLM-as-a-Teacher',
    prompt: 'GPT-4 활용: "광합성 과정을 설명해줘."',
    response: '식물에서 일어나는 광합성의 화학적 과정을 자세히 설명해줘.'
  },
  {
    type: 'Augmentation & Variation',
    prompt: '광합성 작용에 대해 설명하라.',
    response: '광합성의 화학적 과정에 대해 서술하시오.'
  }
];

// 오염 제거 예시
export const decontaminationExamples: DecontaminationExample[] = [
  {
    before: '파이썬에서 리스트를 정렬하는 방법은 무엇인가요?',
    after: '파이썬에서 딕셔너리의 값을 기준으로 정렬하는 방법은 무엇인가요?',
    explanation: '평가 데이터셋에 기본 리스트 정렬 질문이 포함되어 있어, 더 구체적이고 복잡한 정렬 질문으로 대체했습니다.'
  },
  {
    before: '기후 변화의 주요 원인은 무엇인가요?',
    after: '북극 지역의 기후 변화가 지역 생태계에 미치는 구체적인 영향은 무엇인가요?',
    explanation: '일반적인 기후 변화 질문이 평가 데이터와 중복되어, 더 구체적이고 지역적인 질문으로 변경했습니다.'
  }
]; 
