import { Suspense } from 'react';
import { getCachedArticleDetailService, getCachedArticleAuthorDetailService, getCachedArticleProductsService, getCachedCategoryListingService, getCachedArticleSidebarService, getCachedArticleTagsPage } from '@/services/CachedServices';
import Breadcrumb from '@/components/detail/Breadcrumb';
import Faq from '@/components/detail/Faq';
import HeroWidget from '@/components/detail/HeroWidget';
import Products from '@/components/detail/Products';
import ProductTableWidget from '@/components/detail/ProductTableWidget';
import RelatedProducts from '@/components/detail/RelatedProducts';
import ArticleSideBar from '@/components/detail/ArticleSideBar';
import Schema from '@/components/detail/Schema';
import TemplateCard from '@/components/detail/TemplateCard';
import * as ReactDOM from "react-dom";
import DataLayer from '@/components/detail/DataLayer';
import { notFound } from 'next/navigation';
import TopSearch from '@/components/global/TopSearch';
import TrusCardTop from '@/components/detail/TrusCardTop';
import TrusCardBottom from '@/components/detail/TrusCardBottom';

export async function generateMetadata({ params }) {
    const category = (await params).category;
    const slug = (await params).slug;
    const id = slug.split('-').pop().trim();
    const data = await getCachedArticleDetailService({ id });
    const Meta = data?.data.article || {};
    
    const mobile  = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta.mobile_image}`;
    // const desktop = `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta.big_image}`;

    // Preload with media — works in Next.js 15
    ReactDOM.preload(mobile,  { as: "image", media: "(max-width: 1023px)"  });
    // ReactDOM.preload(desktop, { as: "image", media: "(min-width: 1024px)" });
    return {
        title: Meta?.meta_title,
        description: Meta?.meta_description,
        keywords: Meta?.meta_keyword,
        robots: {
            index: true,
            follow: true,
            googleBot: {
                'max-image-preview': 'large',
            },
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${category}/${Meta?.page_url}-${Meta?.id}`,
        },
        openGraph: {
            title: Meta?.meta_title,
            description: Meta?.meta_description,
            url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${category}/${Meta?.page_url}-${Meta?.id}`,
            images: `${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${Meta?.big_image}`,
            siteName: process.env.NEXT_PUBLIC_DOMIN_NAME,
        },
    };
}

async function ArticleContent({ params }) {
    const { slug, category } = await params;
    const id = slug.split('-').pop().trim();

    const [articleData, ArticleProducts] = await Promise.all([
        getCachedArticleDetailService({ id }),
        getCachedArticleProductsService({ id }),
    ]);
    if(!articleData){
        notFound()
    }
    const data = articleData?.data?.article;

    const authorData = await getCachedArticleAuthorDetailService({ id: data?.author_id });
    const author = authorData?.data?.author;
    
    const relatedArticleResult = await getCachedCategoryListingService({ category: category, pageNo:1, limit:8 });
    const articleSidebarResult = await getCachedArticleSidebarService({ category: category, pageNo:1, limit:6 });
    const articleTagsPageResult = await getCachedArticleTagsPage({slug:category});
    const [relatedArticleData,articleSidebarData,articleTagsPageData] = await Promise.all([relatedArticleResult,articleSidebarResult,articleTagsPageResult]);  
    // console.log(articleSidebarData,'articleSidebarData');
    const trackingTagString = author?.authorData?.tracking_tag;
    const trackingTag = trackingTagString && JSON.parse(trackingTagString);
    const tracking_tag = (trackingTag && trackingTag[process.env.NEXT_PUBLIC_WMS_PRODUCT_ID]) || process.env.NEXT_PUBLIC_DEFAULT_TAG;
    // console.log(ArticleProducts,'ArticleProducts');
    const wrapTablesWithScrollDiv = (htmlString) => {
        if (!htmlString) return '';
        return htmlString
            .replace(/<table([^>]*)>/gi, '<div class="overflow-x-auto"><table$1>')
            .replace(/<\/table>/gi, '</table></div>');
    };
    return (
        <>
            {/* <ArticleSkeleton /> */}
            <Schema schema={data} schemaProduct={ArticleProducts?.data?.products} author={author} />
            <DataLayer datalayer={data} author={author} />
            {articleTagsPageData&&<TopSearch TopSearches={articleTagsPageData} />}
            <div className='max-w-7xl mx-4 lg:mx-auto pt-6 lg:pt-6'>
                <Breadcrumb breadcrumb={data} />
                <HeroWidget data={data} author={author} />
                <div className='grid grid-cols-4 lg:mb-20'>
                    <div className='col-span-4 lg:col-span-3 lg:pr-14'>
                        {ArticleProducts?.data?.template_type==="template1"&&<TrusCardTop />}
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: wrapTablesWithScrollDiv(data?.body) }} />
                        {ArticleProducts?.data?.template_type==="default"&&<ProductTableWidget
                            ArticleDetail={data}
                            ArticleProducts={ArticleProducts}
                            tracking_tag={"?tag=" + tracking_tag}
                        />}
                        {ArticleProducts?.data?.template_type==="default"&&<TrusCardTop />}
                        {ArticleProducts?.data?.template_type==="default"&&<Products
                            ArticleProducts={ArticleProducts}
                            tracking_tag={"?tag=" + tracking_tag}
                        />}
                        {ArticleProducts?.data?.template_type==="template1"&&<TemplateCard
                            ArticleCard={ArticleProducts?.data?.products}
                            tracking_tag={"?tag=" + tracking_tag}
                        />}
                        <div className="prose max-w-none article-body mb-8" dangerouslySetInnerHTML={{ __html: wrapTablesWithScrollDiv(data?.bottom_of_article) }} />
                        <div className="text-sm leading-6 mb-6 mt-6">
                            <p>
                                <strong>Disclaimer:</strong>{' '}
                                <em className="text-gray-500">
                                    {/* ...disclaimer text... */}
                                </em>
                            </p>
                        </div>
                        {ArticleProducts?.data?.template_type==="template1"&&<TrusCardBottom />}
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
            <div className='flex gap-2 mb-4'>
                <div className='h-4 w-4 bg-gray-200 rounded' />
                <div className='h-4 bg-gray-200 rounded w-1/2' />
            </div>
            <div className='h-6 bg-gray-200 rounded w-full mb-2' />
            <div className='h-6 bg-gray-200 rounded w-4/6 mb-4' />
            <div className='space-y-2 mb-4'>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='h-3 w-full bg-gray-200 rounded' />
                ))}
            </div>
            <div className='flex justify-between items-center mb-4'>
                <div className='space-y-1'>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='h-2 w-32 bg-gray-200 rounded' />
                    ))}
                </div>
                <div className='flex gap-2 shrink-0'>
                    <div className='h-9 w-24 bg-gray-200 rounded-full' />
                    <div className='h-9 w-9 bg-gray-200 rounded-full' />
                </div>
            </div>
            <div className='aspect-video bg-gray-200 rounded-xl w-full mb-4' />
            <div className='space-y-2 mb-4'>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className='h-3 w-full bg-gray-200 rounded' />
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