/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.adon-line.de",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
