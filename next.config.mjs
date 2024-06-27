/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-charts.com",
        // pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "originserver-static1-uat.pvrcinemas.com",
        // pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
