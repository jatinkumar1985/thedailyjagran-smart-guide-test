import Script from 'next/script';
import React from 'react';

function escapeJsonLd(json) {
    // Escapes < to prevent XSS in JSON-LD script
    return JSON.stringify(json).replace(/</g, '\\u003c');
}

export default function Schema({ schema = {}, schemaProduct = {}, author = {} }) {
    // Destructure with defaults to avoid repeated optional chaining and undefined
    const {
        category = {},
        subcategory = {},
        meta_title = '',
        meta_description = '',
        meta_keyword = [],
        page_url = '',
        id = '',
        big_image = '',
        schema_body = '',
        schema_bottom_body = '',
        publish_date_schema = '',
        updated_at_schema,
        faq = []
    } = schema;

    const { category_name = '', category_slug = '' } = category;
    const { category_name: subcat_name = '', category_slug: subcat_slug = '' } = subcategory;
    const authorUrl = author ? `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${author.author_url || ''}-${author.id || ''}` : '';
    const authorName = `${author?.first_name || ''} ${author?.last_name || ''}`.trim();

    const baseUrl = process.env.NEXT_PUBLIC_MODE_BASE_URL || '';
    const imgPath = process.env.NEXT_PUBLIC_MODE_IMAGE_PATH || '';
    const logoUrl = process.env.NEXT_PUBLIC_BASE_SITE_SCHEMA_LOGO || '';

    const canonicalUrl = [
        baseUrl,
        category_slug,
        subcat_slug,
        `${page_url}-${id}`
    ].filter(Boolean).join('/');

    const BreadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: baseUrl
            },
            {
                "@type": "ListItem",
                position: 2,
                name: category_name,
                item: [baseUrl, category_slug].filter(Boolean).join('/')
            },
            {
                "@type": "ListItem",
                position: 3,
                name: subcat_name,
                item: [baseUrl, category_slug, subcat_slug].filter(Boolean).join('/')
            }
        ]
    };

    const ArticleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl
        },
        inLanguage: "en",
        headline: meta_title,
        description: meta_description,
        keywords: meta_keyword && Array.isArray(meta_keyword) ? meta_keyword : (typeof meta_keyword === 'string' ? meta_keyword.split(',') : []),
        articleSection: category_name,
        url: canonicalUrl,
        image: {
            "@type": "ImageObject",
            url: imgPath + big_image,
            width: 1200,
            height: 675
        },
        datePublished: publish_date_schema,
        dateModified: updated_at_schema || publish_date_schema,
        articleBody: [schema_body, schemaProduct?.schema_products || '', schema_bottom_body].filter(Boolean).join(' '),
        author: (authorName && authorUrl) ? [{
            "@type": "Person",
            name: authorName,
            url: authorUrl
        }] : [],
        publisher: {
            "@type": "Organization",
            name: "Jagran Reviews",
            url: baseUrl,
            logo: {
                "@type": "ImageObject",
                url: logoUrl,
                width: 600,
                height: 60
            }
        },
        associatedMedia: {
            "@type": "ImageObject",
            url: imgPath + big_image,
            caption: meta_title,
            description: meta_description,
            width: 1200,
            height: 675
        }
    };

    const WebPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta_title,
        url: canonicalUrl,
        description: meta_description,
        publisher: {
            "@type": "Organization",
            name: "Jagran",
            logo: {
                "@type": "ImageObject",
                url: logoUrl,
                width: 600,
                height: 60
            }
        }
    };

    // Guard against empty/undefined FAQ, optimize map filter
    const faqEntities = Array.isArray(faq) && faq.length > 0
        ? faq
            .filter(item => (item && item.question && item.answer))
            .map(item => ({
                "@type": "Question",
                name: String(item.question || '').replace(/<\/?[^>]+(>|$)|"/g, ""),
                acceptedAnswer: {
                    "@type": "Answer",
                    text: String(item.answer || '').replace(/<\/?[^>]+(>|$)|"/gi, "")
                }
            }))
        : [];

    const FAQPageJsonLd = faqEntities.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqEntities
    } : null;

    // No need for console.log in optimized code, so remove it

    return (
        <>
            <Script
                id="jsonld-breadcrumb"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: escapeJsonLd(BreadcrumbJsonLd) }}
            />
            <Script
                id="jsonld-article"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: escapeJsonLd(ArticleJsonLd) }}
            />
            <Script
                id="jsonld-webpage"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: escapeJsonLd(WebPageJsonLd) }}
            />
            {FAQPageJsonLd && (
                <Script
                    id="jsonld-faq"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: escapeJsonLd(FAQPageJsonLd) }}
                />
            )}
        </>
    );
}