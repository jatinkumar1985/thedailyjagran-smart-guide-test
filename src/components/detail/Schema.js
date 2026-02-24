import Script from 'next/script';
import React from 'react'

export default function Schema({schema,schemaProduct,author}) {    
    const BreadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}`
            },
            {
                "@type": "ListItem",
                position: 2,
                name: `${schema?.category?.category_name}`,
                item: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${schema?.category?.category_slug}`
            },
            {
                "@type": "ListItem",
                position: 3,
                name: `${schema?.subcategory?.category_name}`,
                item: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${schema?.category?.category_slug}/${schema?.subcategory?.category_slug}`
            }
        ]
    };
    const ArticleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${schema?.category?.category_slug}/${schema?.subcategory?.category_slug}/${schema?.page_url}-${schema?.id}`
        },
        "inLanguage": "en",
        "headline": `${schema?.meta_title}`,
        "description": `${schema?.meta_description}`,
        "keywords": schema?.meta_keyword ? schema.meta_keyword : [],
        "articleSection": `${schema?.category?.category_name}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${schema?.category?.category_slug}/${schema?.subcategory?.category_slug}/${schema?.page_url}-${schema?.id}`,
        "image": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${schema?.big_image}`,
            "width": 1200,
            "height": 675
        },
        "datePublished": `${schema?.publish_date_schema}`,
        "dateModified": `${schema?.updated_at_schema || schema?.publish_date_schema}`,
        "articleBody": `${schema?.schema_body} ${schemaProduct?.schema_products} ${schema?.schema_bottom_body}`,
        "author": [{
            "@type": "Person",
            "name": `${author?.first_name} ${author?.last_name}`.trim(),
            "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${author?.author_url}-${author?.id}`
        }],
        "publisher": {
            "@type": "Organization",
            "name": `Jagran Reviews`,
            "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}`,
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_BASE_SITE_SCHEMA_LOGO}`,
                "width": 600,
                "height": 60
            }
        },
        "associatedMedia": {
            "@type": "ImageObject",
            "url": `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${schema?.big_image}`,
            "caption": `${schema?.meta_title}`,
            "description": `${schema?.meta_description}`,
            "width": 1200,
            "height": 675
        }
    };
    console.log(`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${schema?.big_image}`,'image path');
    
    const WebPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${schema?.meta_title}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${schema?.category?.category_slug}/${schema?.subcategory?.category_slug}/${schema?.page_url}-${schema?.id}`,
        "description": `${schema?.meta_description}`,
        "publisher": {
            "@type": "Organization",
            "name": `Jagran`,
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_BASE_SITE_SCHEMA_LOGO}`,
                "width": 600,
                "height": 60
            }
        }
    };
    const FAQPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": schema?.faq.map((item) => ({
            "@type": "Question",
            "name": item.question == undefined || item.question == null ? '' : item.question.replace(/<\/?[^>]+(>|$)|"/g, ""),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer == undefined || item.answer == null ? '' : item.answer.replace(/<\/?[^>]+(>|$)|"/gi, "")
            }
        }))
    };
    
    return (
        <>
            <Script
                id="jsonld-breadcrumb"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbJsonLd).replace(/</g, '\\u003c') }}
            />
            <Script
                id="jsonld-article"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ArticleJsonLd).replace(/</g, '\\u003c') }}
            />
            <Script
                id="jsonld-webpage"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageJsonLd).replace(/</g, '\\u003c') }}
            />
            {schema?.faq?.length > 0 && (
                <Script
                    id="jsonld-faq"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQPageJsonLd).replace(/</g, '\\u003c') }}
                />
            )}
        </>
    )
}