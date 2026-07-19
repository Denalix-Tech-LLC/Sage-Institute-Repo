/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        // New-client screening is handled in the practice's own HIPAA-covered
        // Microsoft Form (Option 1) — the on-site intake form is dormant.
        // Remove this redirect to re-enable /intake (see components/IntakeForm.tsx).
        source: "/intake",
        destination:
          "https://forms.office.com/Pages/ResponsePage.aspx?id=W5H1hw18gEixhjajJI8x-j-CWXtpGlpDtQ5LPzDBA89UNFFUODFFUlpFSU1JNVBMT0wwS0Q5VVFMSi4u",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
