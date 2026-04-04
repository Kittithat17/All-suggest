import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.cpmeiji.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'd19oj5aeuefgv.cloudfront.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img.th.my-best.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.allonline.7eleven.co.th',
        pathname: '/**'
      },
      ]
    }
  };
export default nextConfig;
