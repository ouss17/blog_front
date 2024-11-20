/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cdn.vox-cdn.com",
      "techcrunch.com",
      "s.yimg.com",
      "media.zenfs.com",
      "www.google.com",
      "media.istockphoto.com",
      "www.lebigdata.fr",
    ],
  },
};

export default nextConfig;
