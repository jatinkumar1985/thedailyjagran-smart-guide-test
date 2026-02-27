import Head from 'next/head'
import React from 'react'

export default function DataLayer({category}) {
    const dataLayerPush = JSON.stringify({
        event: 'english_pageview',
        language: 'english',
        tvc_page_cat: `${category}`,
        tvc_page_type: `${category} landing page`
    });
    return (
        <>
            <script key="data-layer" dangerouslySetInnerHTML={{ __html: ` window.dataLayer = window.dataLayer || []; window.dataLayer.push(${dataLayerPush});`, }} />
        </>
    )
}