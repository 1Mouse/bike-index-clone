/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "bikebook.s3.amazonaws.com",
      },
      {
        hostname: "files.bikeindex.org",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "127.0.0.1",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
