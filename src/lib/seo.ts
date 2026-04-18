import { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
}

const SITE_CONFIG = {
  name: 'شهادات الودائع البنكية المصرية',
  description:
    'استكشف أفضل شهادات الادخار المصرية واحسب أرباحك بسهولة مع حاسبة الشهادات البنكية المتقدمة',
  url: 'https://egyptian-bank-certificates.vercel.app',
  ogImage: '/og-image.png',
  keywords: [
    'شهادات الادخار المصرية',
    'حاسبة الأرباح البنكية',
    'شهادات البنوك المصرية',
    'استثمار البنوك في مصر',
    'أسعار الفائدة المصرية',
    'أفضل شهادات الادخار',
    'حساب أرباح الشهادات',
    'شهادات البنك المركزي',
    'ودائع بنكية مصرية',
    'استثمار آمن في مصر',
  ],
};

export function generateSEOMetadata(config: SEOConfig = {}): Metadata {
  const title = config.title || SITE_CONFIG.name;
  const description = config.description || SITE_CONFIG.description;
  const keywords = config.keywords?.length
    ? config.keywords
    : SITE_CONFIG.keywords;
  const ogImage = config.ogImage || SITE_CONFIG.ogImage;
  const canonical = config.canonical || SITE_CONFIG.url;

  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    openGraph: {
      type: config.ogType || 'website',
      locale: 'ar_EG',
      url: canonical,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@EgyptianBanks',
      site: '@EgyptianBanks',
    },

    applicationName: SITE_CONFIG.name,

    appleWebApp: {
      capable: true,
      title: SITE_CONFIG.name,
      statusBarStyle: 'default',
    },

    verification: {
      google: 'your-google-verification-code',
    },

    robots: {
      index: !config.noindex,
      follow: !config.noindex,
      googleBot: {
        index: !config.noindex,
        follow: !config.noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical,
    },

    other: {
      'theme-color': '#2563eb',
      'msapplication-TileColor': '#2563eb',
      'msapplication-config': '/browserconfig.xml',
    },
  };
}

/* =========================
   Structured Data Helpers
========================= */

export function generateStructuredData(
  type: string,
  data: Record<string, any>
) {
  return {
    __html: JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
      },
      null,
      2
    ),
  };
}

/* =========================
   Bank App Schema
========================= */

export function generateBankCalculatorStructuredData() {
  return generateStructuredData('SoftwareApplication', {
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EGP',
    },
    creator: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    featureList: [
      'حاسبة أرباح الشهادات البنكية',
      'مقارنة بين شهادات الادخار',
      'حساب العائد الاستثماري',
      'معلومات عن أسعار الفائدة',
      'تحليل الشهادات المتدرجة',
    ],
    screenshot: SITE_CONFIG.ogImage,
  });
}

/* =========================
   Breadcrumb Schema
========================= */

export function gener9yMnTm4NSzvG9rrwjM2ec8xZgh1cafXH8(
  items: Array<{ name: string; url: string }>
) {
  return generateStructuredData('BreadcrumbList', {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

/* =========================
   FAQ Schema
========================= */

export function generateFAQStructuredData(
  faqs: Array<{ question: string; answer: string }>
) {
  return generateStructuredData('FAQPage', {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

/* =========================
   Exports
========================= */

export const SITE_URL = SITE_CONFIG.url;
export const SITE_NAME = SITE_CONFIG.name;
export const SITE_DESCRIPTION = SITE_CONFIG.description;
