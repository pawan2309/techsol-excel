import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ExpertiseGrid from '../components/sections/ExpertiseGrid';
import Seo from '../components/seo/Seo';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://techsol.me').replace(/\/$/, '');

const SERVICES_STRUCTURED_DATA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Software Development and Digital Engineering Services',
    provider: {
      '@type': 'Organization',
      name: 'Techsol',
      url: SITE_URL,
    },
    areaServed: 'Worldwide',
    serviceType: 'Web Development, Cloud Infrastructure, AI, APIs, and Cyber Security',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Techsol Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web and App Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Payment and Fintech Solutions' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sports Data API' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pharma Publishing Systems' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cloud Infrastructure' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI and Data Science' } },
      ],
    },
  },
];

const ServicesPage = () => {
  const scrollContainerRef = useRef(null);

  // Kill lingering ScrollTriggers from other pages on mount
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    ScrollTrigger.getAll().forEach(t => t.kill());
    window.scrollTo(0, 0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
    ScrollTrigger.refresh();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <>
      <Seo
        title="Services | Web Development, Cloud, AI and Security"
        description="Explore Techsol services including web and app development, fintech, sports data APIs, pharma publishing systems, cloud architecture, and cybersecurity."
        path="/services"
        structuredData={SERVICES_STRUCTURED_DATA}
      />
      <div style={{ background: '#131313', height: 'calc(100vh - 80px)', marginTop: '80px', color: '#e5e2e1', overflow: 'hidden' }}>
        <div
          ref={scrollContainerRef}
          style={{
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            overscrollBehavior: 'contain'
          }}
        >
          <ExpertiseGrid compact scrollContainerRef={scrollContainerRef} />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
