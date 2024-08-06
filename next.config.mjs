/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
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
