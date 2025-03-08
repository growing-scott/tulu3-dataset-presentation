/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // 정적 내보내기를 위한 설정
  images: {
    unoptimized: true, // S3 호스팅을 위해 이미지 최적화 비활성화
  },
  // 기본 경로 설정 (필요한 경우 수정)
  // basePath: '',
  // 트레일링 슬래시 설정
  trailingSlash: true,
};

module.exports = nextConfig; 