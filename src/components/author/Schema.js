import React from 'react'

export default function Schema({schema}) {
    const WebPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${schema?.first_name} ${schema?.last_name}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${schema?.author_url}-${schema?.id}`,
        "description": `${schema?.bio}`,
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
    const PersonJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${schema?.author_url}-${schema?.id}`,
        "name": `${schema?.first_name} ${schema?.last_name}`,
        "jobTitle": `${schema?.designation}`,
        "description": `${schema?.bio}`,
        "image": `${schema?.user_image}`,
        "url": `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${schema?.author_url}-${schema?.id}`,
        "email": `mailto:${schema?.email}`,
        "nationality": {
            "@type": "Country",
            "name": "Indian"
        },
        "worksFor": {
            "@type": "Organization",
            "@id": "https://www.jagranreviews.com/",
            "name": "Jagran Reviews",
            "url": "https://www.jagranreviews.com"
        }
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WebPageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PersonJsonLd) }} />
        </>
    )
}