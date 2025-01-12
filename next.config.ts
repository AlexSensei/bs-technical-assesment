import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1sc13y7hrlskd.cloudfront.net",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
