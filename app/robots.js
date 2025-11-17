export default function robots() {
  const baseUrl = 'https://nerdbillyfab.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/checkout', '/order-confirmation', '/payment-success'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
