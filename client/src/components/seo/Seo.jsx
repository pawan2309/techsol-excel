import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Techsol Digital Excellence | Web, Cloud, AI and APIs';
const DEFAULT_DESCRIPTION =
  'Techsol builds high-performance web and app platforms, cloud infrastructure, AI automation, pharma publishing systems, and real-time sports APIs.';

const upsertMetaTag = (attribute, key, content) => {
  if (!content) return;

  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLinkTag = (rel, href) => {
  if (!href) return;

  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const clearManagedSchemas = () => {
  document
    .querySelectorAll('script[type="application/ld+json"][data-seo-managed="true"]')
    .forEach((scriptTag) => scriptTag.remove());
};

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = '/favicon.svg',
  type = 'website',
  robots = 'index,follow',
  structuredData = [],
}) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const rawPath = path || location.pathname;
    const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    const canonicalUrl = `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}`;
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${imagePath}`;

    document.title = title;

    upsertMetaTag('name', 'description', description);
    upsertMetaTag('name', 'robots', robots);

    upsertMetaTag('property', 'og:type', type);
    upsertMetaTag('property', 'og:site_name', 'Techsol');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:image', imageUrl);

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', imageUrl);

    upsertLinkTag('canonical', canonicalUrl);

    clearManagedSchemas();
    structuredData.forEach((schema) => {
      if (!schema) return;

      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-seo-managed', 'true');
      scriptTag.text = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    });

    return () => {
      clearManagedSchemas();
    };
  }, [description, image, location.pathname, path, robots, structuredData, title, type]);

  return null;
};

export default Seo;