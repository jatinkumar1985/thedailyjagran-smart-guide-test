import React from 'react'

export default function Schema({schema,schemaListing}) {
    const WebPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${schema?.meta_title}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors`,
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
        "itemListElement": schemaListing.map((author, index) => ({
            "@type": "ListItem",
            "name": `${author.first_name} ${author.last_name}`.trim(),
            "position": index + 1,
            "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${author.author_url}-${author.id}`,
        }))
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AuthorListJsonLd) }} />
        </>
    )
}