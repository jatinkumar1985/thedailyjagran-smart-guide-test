import AuthorDetail from '@/components/author/AuthorDetail';
import AuthorDetailListing from '@/components/author/AuthorDetailListing';
import DataLayer from '@/components/author/DataLayer';
import Schema from '@/components/author/Schema';
import GlobalLink from '@/components/global/GlobalLink';
import { getCachedArticleAuthorDetailPageService, getCachedArticleAuthorListingService } from '@/services/CachedServices';
import React, { Suspense } from 'react'

export async function generateMetadata({ params }) {
    const slug = (await params).slug;
    const ArticleAuthorDetailApi = await getCachedArticleAuthorDetailPageService({ slug:slug });
    const [ArticleAuthorDetailData] = await Promise.all([ArticleAuthorDetailApi]);
    const Meta = ArticleAuthorDetailData?.data?.authorData || {};
    // meta title
    let metaTitle = {};
    try {
        metaTitle = JSON.parse(Meta?.meta_title_allProducts || '{}');
    } catch (err) {
        console.error("Failed to parse meta_title_allProducts:", err);
    }
    const meta_title = metaTitle[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID] || Meta?.meta_title;
    // meta description
    let metaDescription = {};
    try {
        metaDescription = JSON.parse(Meta?.meta_description_allProducts || '{}');
    } catch (err) {
        console.error("Failed to parse meta_description_allProducts:", err);
    }
    const meta_description = metaDescription[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID] || Meta?.meta_description;
    return {
        title: meta_title,
        description: meta_description,
        keywords: Meta?.meta_keyword,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                'max-image-preview': 'large',
            },
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${Meta?.author_url}-${Meta?.id}`,
        },
        openGraph: {
            title: Meta?.meta_title,
            description: Meta?.meta_description,
            url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors/${Meta?.author_url}-${Meta?.id}`,
            images: `${Meta.user_image}`,
            siteName: process.env.NEXT_PUBLIC_DOMIN_NAME,
        },
    };
}

async function AuthorContent({params}) {
    const slug = (await params).slug;
    const ArticleAuthorDetailApi = getCachedArticleAuthorDetailPageService({ slug:slug });
    
    const [ArticleAuthorDetailData] = await Promise.all([ArticleAuthorDetailApi]);
    const authorID = ArticleAuthorDetailData?.data?.authorData?.id
    const authorUrl = ArticleAuthorDetailData?.data?.authorData?.author_url
    const cleanSlug = slug.replace(/-\d+$/, '');
    if (!ArticleAuthorDetailData?.data) {
        notFound()
    }
    // Handle redirect using Next.js redirect() function
    // Handle redirect using permanentRedirect() for 301
    if (authorUrl && cleanSlug !== authorUrl) {
        permanentRedirect(`/authors/${authorUrl}-${authorID}`);
    }
    const ArticleAuthorListingApi = getCachedArticleAuthorListingService({ authorId:authorID, pageNo: '1', limit: '18' });
    const [ArticleAuthorListingData] = await Promise.all([ArticleAuthorListingApi]);
    
    console.log(ArticleAuthorListingData,'ArticleAuthorListingData');
    
    return (
        <>
            {ArticleAuthorDetailData && <Schema schema={ArticleAuthorDetailData?.data?.author?.authorData} />}
            {ArticleAuthorDetailData && <DataLayer datalayer={ArticleAuthorDetailData?.data?.author?.authorData} />}
            <div className='max-w-7xl mx-4 lg:mx-auto py-6'>
                <div className='grid grid-cols-1 lg:grid-cols-4'>
                    <div className='col-span-3'>
                        <nav aria-label="Breadcrumb" className="flex mb-6">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <div>
                                        <GlobalLink href={process.env.NEXT_PUBLIC_MODE_BASE_URL} className="text-gray-400 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-4 shrink-0" viewBox="0 0 16 16">
                                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                            </svg>
                                            <span className="sr-only">Home</span>
                                        </GlobalLink>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-3 shrink-0 text-gray-400" viewBox="0 0 16 16">
                                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                        <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/authors`} className="text-gray-400 ml-2 text-xs font-medium hover:text-red-700">
                                            Authors
                                        </GlobalLink>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        {ArticleAuthorDetailData && <AuthorDetail person={ArticleAuthorDetailData?.data?.authorData} />}
                        {/* {ArticleAuthorListingData && <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">Article by {ArticleAuthorDetailData?.data?.author?.first_name} {ArticleAuthorDetailData?.data?.author?.last_name}</h2>} */}
                        {ArticleAuthorListingData && <AuthorDetailListing
                            initialPosts={ArticleAuthorListingData}
                            authorId={authorID}
                        // fetchPosts="CategoryListingService"
                        // loadMoreData={{ category: category }}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}

function AuthorSkeleton() {
    return (
        <div className='max-w-7xl mx-4 lg:mx-auto py-6 animate-pulse'>
            <div className='h-4 bg-gray-200 rounded w-1/3 mb-6' />
            <div className='h-8 bg-gray-200 rounded w-2/3 mb-4' />
            <div className='space-y-3'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className='h-4 bg-gray-200 rounded' />
                ))}
            </div>
        </div>
    );
}

export default async function Page({params}) {
    return (
        <><Suspense fallback={<AuthorSkeleton />}><AuthorContent params={params} /></Suspense></>
    )
}