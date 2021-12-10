// You can choose which headers to add to the list
// after learning more below.
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self';script-src 'self' 'unsafe-eval' 'unsafe-inline';style-src 'self' 'unsafe-inline'`,
  },
];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
