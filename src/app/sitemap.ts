import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://faststack.io';

  const routes = [
    '',
    '/solutions/http-traffic-analysis-and-uptime-monitoring',
    '/solutions/flow',
    '/solutions/flow/walkthrough',
    '/solutions/pulse',
    '/solutions/pulse/walkthrough',
    '/solutions/beam',
    '/solutions/beam/walkthrough',
    '/solutions/infrastructure-metrics',
    '/solutions/core',
    '/solutions/core/walkthrough',
    '/solutions/product-roadmap',
    '/blog',
    '/blog/product-roadmap',
    '/blog/product-vision',
    '/blog/an-introduction-to-telemetry',
    '/blog/our-initial-product-launch',
    '/contact',
    '/beta-program',
    '/platform',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('walkthrough') ? 'monthly' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
