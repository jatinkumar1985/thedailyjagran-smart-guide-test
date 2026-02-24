// app/article/[slug]/page.js

import { Suspense } from 'react';
import { getCachedArticleDetailService, getCachedArticleAuthorDetailService, getCachedArticleProductsService, getCachedCategoryListingService, getCachedArticleSidebarService } from '@/services/CachedServices';
import Breadcrumb from '@/components/detail/Breadcrumb';
import Faq from '@/components/detail/Faq';
import HeroWidget from '@/components/detail/HeroWidget';
import Products from '@/components/detail/Products';
import ProductTableWidget from '@/components/detail/ProductTableWidget';
import RelatedProducts from '@/components/detail/RelatedProducts';
import ArticleSideBar from '@/components/detail/ArticleSideBar';
import Schema from '@/components/detail/Schema';

async function ArticleContent({ params }) {
    const { slug, category } = await params;
    const id = slug.split('-').pop().trim();

    const [articleData, ArticleProducts] = await Promise.all([
        getCachedArticleDetailService({ id }),
        getCachedArticleProductsService({ id }),
    ]);

    const data = articleData?.data?.article;

    const authorData = await getCachedArticleAuthorDetailService({ id: data?.author_id });
    const author = authorData?.data?.author;
    
    const relatedArticleResult = await getCachedCategoryListingService({ category: category, pageNo:1, limit:8 });
    const articleSidebarResult = await getCachedArticleSidebarService({ category: category, pageNo:1, limit:6 });
    const [relatedArticleData,articleSidebarData] = await Promise.all([relatedArticleResult,articleSidebarResult]);  
    // console.log(articleSidebarData,'articleSidebarData');
    const trackingTagString = author?.authorData?.tracking_tag;
    const trackingTag = trackingTagString && JSON.parse(trackingTagString);
    const tracking_tag = (trackingTag && trackingTag[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID]) || process.env.NEXT_PUBLIC_DEFAULT_TAG;

    return (
        <>
            <Schema schema={data} schemaProduct={ArticleProducts?.data?.products} author={author} />
            <div className='max-w-7xl mx-4 lg:mx-auto py-6'>
                <Breadcrumb breadcrumb={data} />
                <HeroWidget data={data} author={author} />
                <div className='grid grid-cols-4 lg:mb-20'>
                    <div className='col-span-4 lg:col-span-3 lg:pr-14'>
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: data?.body }} />
                        <ProductTableWidget
                            ArticleDetail={data}
                            ArticleProducts={ArticleProducts}
                            tracking_tag={"?tag=" + tracking_tag}
                        />
                        <Products
                            ArticleProducts={ArticleProducts}
                            tracking_tag={"?tag=" + tracking_tag}
                        />
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: data?.bottom_of_article }} />
                        <div className="text-sm leading-6 mb-6 mt-6">
                            <p>
                                <strong>Disclaimer:</strong>{' '}
                                <em className="text-gray-500">
                                    {/* ...disclaimer text... */}
                                </em>
                            </p>
                        </div>
                        <div className='mb-6 lg:mb-0'>{data && <Faq Faq={data} />}</div>
                    </div>
                    <div className='col-span-4 lg:col-span-1'>
                        <div className='sticky top-10 mt-10 lg:mt-0 mb-8'>
                            {relatedArticleData && <ArticleSideBar label="More For You" listing={relatedArticleData} articleid={id} />}
                        </div>
                    </div>
                </div>
                {articleSidebarData && <RelatedProducts label="Recommended" SubCategory={articleSidebarData} articleid={id} />}
            </div>
        </>
    );
}

function ArticleSkeleton() {
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

export default function Page({ params }) {
    return (
        <Suspense fallback={<ArticleSkeleton />}>
            <ArticleContent params={params} />
        </Suspense>
    );
}