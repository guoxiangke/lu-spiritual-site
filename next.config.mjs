/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.savefamily.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 添加API代理配置
  async rewrites() {
    return [
      {
        source: '/api/devotional',
        destination: 'https://r2share.simai.life/luNT.json',
      },
    ]
  },
};

export default nextConfig;
