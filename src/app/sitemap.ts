import { MetadataRoute } from 'next';
import { PRODUCT_FAMILIES } from '../data/content';
import { PTFE_WIRE_SIZES, COMPARISONS, APPLICATIONS, STANDARDS } from '../../content/ptfeWireSizes';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || 'https://www.jainpolymers.com';

  // Static routes
  const staticRoutes = ['', '/about', '/contact', '/quality', '/products', '/resources'];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static routes
  staticRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add product category routes
  PRODUCT_FAMILIES.forEach((family) => {
    sitemapEntries.push({
      url: `${siteUrl}/products/${family.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Read articles directory dynamically
  const articlesDirectory = path.join(process.cwd(), 'content/articles');
  let articleSlugs: string[] = [];
  try {
    if (fs.existsSync(articlesDirectory)) {
      const files = fs.readdirSync(articlesDirectory);
      articleSlugs = files
        .filter((file) => file.endsWith('.md'))
        .map((file) => file.replace(/\.md$/, ''));
    }
  } catch (e) {
    console.error('Error reading articles for sitemap:', e);
  }

  // Add guide articles
  articleSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${siteUrl}/resources/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Add pSEO wire size pages
  PTFE_WIRE_SIZES.forEach((wire) => {
    sitemapEntries.push({
      url: `${siteUrl}/ptfe-wire/${wire.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Add pSEO comparisons pages
  COMPARISONS.forEach((comp) => {
    sitemapEntries.push({
      url: `${siteUrl}/compare/${comp.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Add pSEO applications pages
  APPLICATIONS.forEach((app) => {
    sitemapEntries.push({
      url: `${siteUrl}/applications/${app.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Add pSEO standards pages
  STANDARDS.forEach((std) => {
    sitemapEntries.push({
      url: `${siteUrl}/standards/${std.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemapEntries;
}
