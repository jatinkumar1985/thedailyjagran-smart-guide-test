import Script from 'next/script';
import React from 'react'

export default function Schema({schemaData,category}) {
    const schema = schemaData?.seo_details;
    const schemaListing = schemaData?.rows;
    const WebPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${schema?.meta_title}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${category}`,
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
    const AuthorListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": schemaListing.map((items, index) => ({
            "@type": "ListItem",
            "additionalType": "Article",
            "position": index+1,
            "name": `${items.title}`,
            "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items.category?.category_slug}/${items.subcategory?.category_slug}/${items.page_url}-${items.id}`,
            "image": `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items.thumb_image}`
        }))
    };
    return (
        <>
            <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageJsonLd) }} />
            <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AuthorListJsonLd) }} />
        </>
    )
}