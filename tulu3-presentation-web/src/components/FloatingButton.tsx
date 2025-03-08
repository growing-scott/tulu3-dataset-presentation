"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 전환 상태를 공유하기 위한 컨텍스트
export const TransitionContext = createContext({
  isTransitioning: false,
  progress: 0
});

type SlideRoute = {
  name: string;
  path: string;
  color: string;
  icon: React.ReactNode;
  shortcut: string;
};

const slides: SlideRoute[] = [
  { 
    name: 'Home', 
    path: '/', 
    color: '#3B82F6',
    shortcut: '1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    name: 'Datasets', 
    path: '/datasets', 
    color: '#10B981',
    shortcut: '2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 15h6" />
      </svg>
    )
  },
  { 
    name: 'Prompt Curation', 
    path: '/curation', 
    color: '#F59E0B',
    shortcut: '3',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    name: 'Prompt Synthesis', 
    path: '/synthesis', 
    color: '#8B5CF6',
    shortcut: '4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  { 
    name: 'Decontamination', 
    path: '/decontamination', 
    color: '#EC4899',
    shortcut: '5',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  { 
    name: 'Model Training', 
    path: '/training', 
    color: '#EF4444',
    shortcut: '6',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
];

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [progress, setProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(800); // 전환 애니메이션 지속 시간 (ms)

  // 모든 페이지 미리 로드
  useEffect(() => {
    // 모든 슬라이드 경로를 미리 로드
    slides.forEach(slide => {
      // Next.js 13 이상에서는 router.prefetch 사용
      router.prefetch(slide.path);
    });
    
    // 개발 모드인지 확인하고 전환 애니메이션 시간 조정
    if (process.env.NODE_ENV === 'development') {
      setTransitionDuration(400); // 개발 모드에서는 애니메이션 시간 단축
    }
  }, [router]);

  // 음성 인식 초기화
  useEffect(() => {
    let recognition: any = null;
    
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      // @ts-ignore - SpeechRecognition은 TypeScript에서 기본적으로 지원되지 않음
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      
      recognition.lang = 'ko-KR';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        processVoiceCommand(command);
        
        // 마이크가 활성화된 상태라면 다시 음성 인식 시작
        if (voiceCommandActive) {
          // 약간의 지연 후 다시 시작 (onend 이벤트가 발생한 후에 시작하도록)
          setTimeout(() => {
            try {
              if (recognition && voiceCommandActive && !isListening) {
                recognition.start();
              }
            } catch (error) {
              console.error('음성 인식 시작 오류:', error);
            }
          }, 300);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('음성 인식 오류:', event.error);
        setIsListening(false);
        
        // 마이크가 활성화된 상태라면 다시 음성 인식 시작
        if (voiceCommandActive) {
          setTimeout(() => {
            try {
              if (recognition && voiceCommandActive && !isListening) {
                recognition.start();
              }
            } catch (error) {
              console.error('음성 인식 시작 오류:', error);
            }
          }, 500);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
        
        // 마이크가 활성화된 상태라면 다시 음성 인식 시작
        if (voiceCommandActive) {
          setTimeout(() => {
            try {
              if (recognition && voiceCommandActive && !isListening) {
                recognition.start();
              }
            } catch (error) {
              console.error('음성 인식 시작 오류:', error);
            }
          }, 300);
        }
      };
    }
    
    // 전역 변수에 recognition 인스턴스 저장
    (window as any).voiceRecognition = recognition;
    
    return () => {
      if (recognition) {
        recognition.onend = null;
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        
        if (isListening) {
          try {
            recognition.stop();
          } catch (error) {
            console.error('음성 인식 중지 오류:', error);
          }
        }
      }
    };
  }, []);
  
  // 음성 명령 활성화 상태 변경 시 처리
  useEffect(() => {
    const recognition = (window as any).voiceRecognition;
    
    if (recognition) {
      try {
        if (voiceCommandActive && !isListening) {
          recognition.start();
        } else if (!voiceCommandActive && isListening) {
          recognition.stop();
        }
      } catch (error) {
        console.error('음성 인식 상태 변경 오류:', error);
        
        // 오류 발생 시 상태 재설정
        if (error instanceof DOMException && error.name === 'InvalidStateError') {
          if (error.message.includes('already started')) {
            setIsListening(true);
          } else if (error.message.includes('not started')) {
            setIsListening(false);
          }
        }
      }
    }
  }, [voiceCommandActive, isListening]);

  // 음성 명령 처리
  const processVoiceCommand = (command: string) => {
    console.log('음성 명령 인식:', command);
    
    // "다음" 또는 "앞으로" 명령 처리
    if (command.includes('다음') || command.includes('앞으로')) {
      goToNextSlide();
      return;
    }
    
    // "이전" 또는 "뒤로" 명령 처리
    if (command.includes('이전') || command.includes('뒤로')) {
      goToPrevSlide();
      return;
    }
  };

  // 음성 인식 시작/중지 토글
  const toggleVoiceRecognition = () => {
    setVoiceCommandActive(!voiceCommandActive);
  };

  // 페이지 컨텐츠에 블러 효과 적용
  useEffect(() => {
    const pageContent = document.querySelector('.page-transition') as HTMLElement;
    if (pageContent) {
      if (isTransitioning) {
        pageContent.classList.add('blur-content');
      } else {
        pageContent.classList.remove('blur-content');
      }
    }
  }, [isTransitioning]);

  useEffect(() => {
    // 현재 경로에 따라 활성화된 버튼 인덱스 설정
    const index = slides.findIndex(slide => slide.path === pathname);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [pathname]);

  useEffect(() => {
    // 키보드 단축키 설정
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + 숫자 키로 페이지 이동
      if (e.altKey && !isNaN(parseInt(e.key)) && parseInt(e.key) >= 1 && parseInt(e.key) <= slides.length) {
        const index = parseInt(e.key) - 1;
        navigateTo(slides[index].path, index);
      }

      // 화살표 키로 이전/다음 페이지 이동
      if (e.altKey) {
        if (e.key === 'ArrowRight') {
          goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
          goToPrevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 페이지 전환 함수 최적화
  const navigateTo = (path: string, index: number) => {
    if (activeIndex === index || isTransitioning) return;
    
    // 방향 설정 (다음 또는 이전)
    setDirection(index > activeIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    
    // 프로그레스 바 애니메이션
    let startTime = Date.now();
    const duration = transitionDuration;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      // 블러 강도 조절 - 성능을 위해 최소화
      const pageContent = document.querySelector('.page-transition') as HTMLElement;
      if (pageContent) {
        const blurAmount = Math.min(newProgress * 4, 2); // 블러 강도 감소
        pageContent.style.filter = `blur(${blurAmount}px)`;
        pageContent.style.opacity = `${1 - newProgress * 0.2}`; // 투명도 변화 감소
      }
      
      if (newProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // 애니메이션 완료 후 페이지 이동
        router.push(path, { scroll: false }); // scroll: false로 자동 스크롤 방지
        setActiveIndex(index);
        
        // 약간의 지연 후 전환 상태 해제
        setTimeout(() => {
          setIsTransitioning(false);
          setProgress(0);
          
          // 블러 효과 제거
          if (pageContent) {
            pageContent.classList.remove('blur-content');
            pageContent.style.filter = '';
            pageContent.style.opacity = '';
          }
        }, 50); // 지연 시간 감소
      }
    };
    
    requestAnimationFrame(updateProgress);
    setIsOpen(false);
  };

  const goToNextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    navigateTo(slides[nextIndex].path, nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    navigateTo(slides[prevIndex].path, prevIndex);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, progress }}>
      {/* 심플한 전환 애니메이션 - 성능 최적화 */}
      {isTransitioning && (
        <>
          {/* 블러 오버레이 - 성능을 위해 단순화 */}
          <div 
            className="fixed inset-0 z-[59] bg-white/60 transition-opacity duration-300"
            style={{ 
              opacity: progress > 0.1 ? 0.7 : 0,
              // 성능을 위해 backdrop-filter 제거
            }}
          />
          
          {/* 프로그레스 바 컨테이너 */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-md px-6">
              {/* 프로그레스 바 */}
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-100 ease-out"
                  style={{ 
                    width: `${progress * 100}%`,
                    backgroundColor: slides[activeIndex].color
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* 키보드 단축키 도움말 */}
      <div className="fixed top-4 right-4 z-40 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-3 text-sm text-gray-700 transition-opacity duration-300 opacity-0 hover:opacity-100">
        <div className="font-medium mb-1">단축키 및 음성 명령:</div>
        <ul>
          <li><kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 rounded">←</kbd> / <kbd className="px-1 py-0.5 bg-gray-100 rounded">→</kbd>: 이전/다음 슬라이드</li>
          <li><kbd className="px-1 py-0.5 bg-gray-100 rounded">Alt</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 rounded">1-6</kbd>: 특정 슬라이드로 이동</li>
          <li className="mt-1">🎤 음성 명령: "다음", "이전"</li>
        </ul>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        {/* 마이크 버튼 - 메뉴 버튼 상단에 위치 */}
        <button
          onClick={toggleVoiceRecognition}
          className={`absolute -top-16 right-0 floating-button w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isListening ? 'bg-red-500 text-white animate-pulse' : voiceCommandActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label="음성 명령"
          title={voiceCommandActive ? "음성 인식 활성화됨 (클릭하여 중지)" : "음성 명령 (다음, 이전)"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          {isListening && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
          )}
        </button>

        {/* 음성 명령 상태 표시 */}
        {isListening ? (
          <div className="absolute -top-24 right-0 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
            듣는 중...
          </div>
        ) : voiceCommandActive && (
          <div className="absolute -top-24 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            음성 인식 활성화
          </div>
        )}

        {/* 메인 버튼 */}
        <button
          onClick={toggleMenu}
          className="floating-button w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          aria-label="네비게이션 메뉴"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* 이전/다음 버튼 */}
        <div className={`absolute -left-24 bottom-0 flex space-x-2 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={goToPrevSlide}
            className="floating-button w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shadow-md hover:bg-gray-300 transition-all duration-300"
            aria-label="이전 슬라이드"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextSlide}
            className="floating-button w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shadow-md hover:bg-gray-300 transition-all duration-300"
            aria-label="다음 슬라이드"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 슬라이드 버튼들 */}
        <div className={`transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {slides.map((slide, index) => (
            <button
              key={slide.path}
              onClick={() => navigateTo(slide.path, index)}
              className={`floating-button absolute right-0 h-10 px-4 rounded-full text-white shadow-md flex items-center justify-center whitespace-nowrap transition-all duration-500 hover:pl-6`}
              style={{
                backgroundColor: slide.color,
                bottom: isOpen ? `${(index + 1) * 60}px` : '0px',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'scale(1)' : 'scale(0.5)',
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              {slide.icon}
              {slide.name}
              <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">{slide.shortcut}</span>
              {pathname === slide.path && (
                <span className="ml-2 h-2 w-2 rounded-full bg-white animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 슬라이드 진행 표시기 */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.path}
            onClick={() => navigateTo(slide.path, index)}
            className={`slide-indicator rounded-full transition-all duration-300 ${index === activeIndex ? 'active' : 'bg-gray-300 hover:bg-gray-400'} h-2`}
            style={{ backgroundColor: index === activeIndex ? slide.color : '' }}
            aria-label={`${slide.name} 슬라이드로 이동`}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
} 