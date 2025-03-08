'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram = ({ chart, className = '' }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 다이어그램 렌더링 시작 시 로딩 상태로 설정
    setLoading(true);
    setError(null);

    // Mermaid 초기화
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
      logLevel: 3, // 오류 로깅 레벨 설정
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        diagramPadding: 8,
        nodeSpacing: 30,
        rankSpacing: 50,
        padding: 15
      },
      themeVariables: {
        primaryColor: '#0284c7',
        primaryTextColor: '#0f172a',
        primaryBorderColor: '#0284c7',
        lineColor: '#64748b',
        secondaryColor: '#7dd3fc',
        tertiaryColor: '#f1f5f9'
      }
    });

    // 다이어그램 렌더링
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      try {
        // 고유한 ID 생성
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        
        // Mermaid 다이어그램 렌더링
        const { svg } = await mermaid.render(id, chart);
        
        // 렌더링된 SVG를 컨테이너에 삽입
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          
          // 다크 모드 대응을 위한 클래스 추가
          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.classList.add('mermaid-svg');
            // SVG 크기 조정
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', 'auto');
            
            // 노드 텍스트 스타일 개선
            const textElements = svgElement.querySelectorAll('text');
            textElements.forEach(text => {
              text.style.fontSize = '13px';
              text.style.fontWeight = '500';
            });
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Mermaid 렌더링 오류:', err);
        setError('다이어그램을 렌더링하는 중 오류가 발생했습니다.');
        setLoading(false);
        
        // 오류 메시지 표시
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md p-4 text-red-700 dark:text-red-300">
              <p>다이어그램 렌더링 오류</p>
              <pre class="text-xs mt-2 overflow-auto">${err instanceof Error ? err.message : '알 수 없는 오류'}</pre>
            </div>
          `;
        }
      }
    };

    // 다이어그램 렌더링 실행
    renderDiagram();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [chart]);

  return (
    <div className={`mermaid-diagram ${className}`}>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}
      <div ref={containerRef} className={loading ? 'hidden' : ''}>
        {/* 다이어그램이 여기에 렌더링됩니다 */}
      </div>
    </div>
  );
};

export default MermaidDiagram; 