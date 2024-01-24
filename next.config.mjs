/** @type {import('next').NextConfig} */
const nextConfig = { 
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'runmdc.org.uk',
              port: '',
            },
          ],
  },
};

export default nextConfig;
