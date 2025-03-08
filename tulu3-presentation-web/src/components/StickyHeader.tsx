'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface StickyHeaderProps {
  title: string;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ title }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // 페이지 경로에 따라 제목 매핑
  const getPageTitle = () => {
    const pathToTitle: Record<string, string> = {
      '/': 'Tulu3 학습 데이터 분석',
      '/datasets': '데이터셋 분석',
      '/curation': '프롬프트 큐레이션',
      '/synthesis': '프롬프트 합성',
      '/decontamination': '데이터 오염 제거',
      '/training': '모델 학습 과정'
    };
    
    return pathToTitle[pathname] || title;
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          
          // 헤더 섹션의 높이(대략 300px)를 넘어서면 sticky 활성화
          setIsSticky(scrollPosition > 300);
          
          // 스크롤 방향에 따라 헤더 표시/숨김 처리
          if (scrollPosition < lastScrollY && scrollPosition > 350) {
            // 위로 스크롤 중이고 충분히 내려왔을 때 헤더 표시
            setIsVisible(true);
          } else if (scrollPosition <= 300 || scrollPosition > lastScrollY) {
            // 아래로 스크롤 중이거나 상단에 있을 때 헤더 숨김
            setIsVisible(false);
          }
          
          lastScrollY = scrollPosition;
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-3 shadow-lg transform transition-transform duration-300 ease-in-out ${
    isSticky ? 'translate-y-0' : '-translate-y-full'
  } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`;

  return (
    <div className={headerClasses}>
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
      </div>
    </div>
  );
};

export default StickyHeader; 