/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async redirects() {
    // Legacy SEO landing pages from the Django site, permanently redirected to home.
    return ['calicut', 'kerala', 'uae'].map((region) => ({
      source: `/digital-marketing-agency-${region}`,
      destination: '/',
      permanent: true,
    }));
  },
};

export default nextConfig;
