'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { datasetDetails } from '@/data/tulu3Data';

// Chart.js 등록
Chart.register(...registerables);

// 카테고리 정의
const categories = [
  { id: '일반 (General)', color: '#4C51BF' },
  { id: '지식 회상 (Knowledge Recall)', color: '#38B2AC' },
  { id: '수학 및 추론 (Math & Reasoning)', color: '#ED8936' },
  { id: '코딩 (Coding)', color: '#9F7AEA' },
  { id: '안전 및 비준수 (Safety & Non-Compliance)', color: '#F56565' },
  { id: '다국어 (Multilingual)', color: '#48BB78' },
  { id: '정확한 IF (Precise IF)', color: '#ECC94B' }
];

// 카테고리별 데이터 계산
const categoryData = categories.map(category => {
  const datasets = datasetDetails.filter(dataset => dataset.category === category.id);
  const count = datasets.reduce((sum, dataset) => sum + dataset.count, 0);
  return {
    name: category.id,
    count,
    color: category.color
  };
});

// 데이터 소스별 데이터 계산
const openSourceCount = datasetDetails.filter(dataset => dataset.dataType === '오픈 소스')
  .reduce((sum, dataset) => sum + dataset.count, 0);
const syntheticCount = datasetDetails.filter(dataset => dataset.dataType === '합성')
  .reduce((sum, dataset) => sum + dataset.count, 0);
const totalCount = openSourceCount + syntheticCount;

const sourceData = [
  { name: '오픈 소스 데이터', percentage: Math.round((openSourceCount / totalCount) * 100), color: '#4C51BF' },
  { name: '합성 데이터', percentage: Math.round((syntheticCount / totalCount) * 100), color: '#F472B6' }
];

// 오픈 소스 vs 합성 데이터 카테고리별 분포
const dataDistribution = {
  categories: categories.map(category => category.id.split(' ')[0]), // 카테고리 이름 간소화
  openSource: categories.map(category => {
    return datasetDetails
      .filter(dataset => dataset.category === category.id && dataset.dataType === '오픈 소스')
      .reduce((sum, dataset) => sum + dataset.count, 0);
  }),
  synthetic: categories.map(category => {
    return datasetDetails
      .filter(dataset => dataset.category === category.id && dataset.dataType === '합성')
      .reduce((sum, dataset) => sum + dataset.count, 0);
  })
};

interface DatasetChartsProps {
  showOnlySourceChart?: boolean;
  showDetailCharts?: boolean;
}

const DatasetCharts: React.FC<DatasetChartsProps> = ({ 
  showOnlySourceChart = false, 
  showDetailCharts = false 
}) => {
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);
  const sourceChartRef = useRef<HTMLCanvasElement | null>(null);
  const distributionChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 차트 인스턴스 저장 변수
    let pieChart: Chart | null = null;
    let barChart: Chart | null = null;
    let sourceChart: Chart | null = null;
    let distributionChart: Chart | null = null;

    // 카테고리별 파이 차트
    if (pieChartRef.current && !showOnlySourceChart) {
      const ctx = pieChartRef.current.getContext('2d');
      if (ctx) {
        pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: categoryData.map(item => item.name),
            datasets: [{
              data: categoryData.map(item => item.count),
              backgroundColor: categoryData.map(item => item.color),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 12
                  }
                }
              },
              title: {
                display: true,
                text: '카테고리별 프롬프트 분포',
                font: {
                  size: 16
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label.split('')[0] || '';
                    const value = context.raw as number;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // 카테고리별 도넛 차트 (바 차트에서 변경)
    if (barChartRef.current && showDetailCharts) {
      const ctx = barChartRef.current.getContext('2d');
      if (ctx) {
        barChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categoryData.map(item => item.name.split(' ')[0]),
            datasets: [{
              data: categoryData.map(item => item.count),
              backgroundColor: categoryData.map(item => item.color),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            cutout: '50%',
            plugins: {
              legend: {
                position: 'right',
                labels: {
                  font: {
                    size: 12
                  }
                }
              },
              title: {
                display: true,
                text: '카테고리별 프롬프트',
                font: {
                  size: 16
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw as number;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // 데이터 소스별 도넛 차트
    if (sourceChartRef.current) {
      const ctx = sourceChartRef.current.getContext('2d');
      if (ctx) {
        sourceChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: sourceData.map(item => item.name),
            datasets: [{
              data: sourceData.map(item => item.percentage),
              backgroundColor: sourceData.map(item => item.color),
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom'
              },
              title: {
                display: true,
                text: '데이터 소스 분포',
                font: {
                  size: 16
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.raw as number;
                    const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // 카테고리별 데이터 소스 분포 차트
    if (distributionChartRef.current && showDetailCharts) {
      const ctx = distributionChartRef.current.getContext('2d');
      if (ctx) {
        distributionChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dataDistribution.categories,
            datasets: [
              {
                label: '오픈 소스 데이터',
                data: dataDistribution.openSource,
                backgroundColor: '#4C51BF',
                borderWidth: 1
              },
              {
                label: '합성 데이터',
                data: dataDistribution.synthetic,
                backgroundColor: '#F472B6',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: '프롬프트 수'
                }
              }
            },
            plugins: {
              title: {
                display: true,
                text: '카테고리별 데이터 소스 분포',
                font: {
                  size: 16
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.dataset.label || '';
                    const value = context.raw as number;
                    return `${label}: ${value.toLocaleString()}`;
                  }
                }
              }
            }
          }
        });
      }
    }

    // 컴포넌트 언마운트 시 차트 정리
    return () => {
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();
      if (sourceChart) sourceChart.destroy();
      if (distributionChart) distributionChart.destroy();
    };
  }, [showOnlySourceChart, showDetailCharts]);

  if (showOnlySourceChart) {
    return (
      <div className="mx-auto" style={{ maxWidth: '300px' }}>
        <canvas ref={sourceChartRef} />
      </div>
    );
  }

  if (showDetailCharts) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <canvas ref={barChartRef} height={250} />
        </div>
        <div className="bg-white rounded-lg">
          <canvas ref={distributionChartRef} height={150} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <canvas ref={pieChartRef} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <canvas ref={sourceChartRef} />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <canvas ref={barChartRef} height={250} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <canvas ref={distributionChartRef} height={150} />
      </div>
    </div>
  );
};

export default DatasetCharts; 