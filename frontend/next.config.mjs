/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  // optional but recommended
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fungamess.games' },
      { protocol: 'https', hostname: 'sweepmobi.s3.us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'media.tenor.com' },
      { protocol: 'https', hostname: 'thumbs.alea.com' },
      { protocol: 'https', hostname: 'mstatic-staging.mrslotty.com' },
      { protocol: 'https', hostname: 'mstatic-staging.1gamehub.com' },
      { protocol: 'https', hostname: 'mstatic-ire1.2omega.online' },
      { protocol: 'https', hostname: 'mstatic-ire1.1gamehub.com' },
    ],
  },
  compress: true,
  // Comment out or remove the following if causing issues
  // outputFileTracingExcludes: {
  //   '**/@*/**': true,
  // },
};

export default nextConfig;
