import GlobalLink from '@/components/global/GlobalLink';
import TopSearch from '@/components/global/TopSearch';
import { getCachedArticleCategories, getCachedArticleTagsHome } from '@/services/CachedServices';
import React from 'react'

export default async function Page() {
    const topSearchesResult = getCachedArticleTagsHome();
    const articleCategoriesResult = getCachedArticleCategories();
    const [topSearchesData,articleCategoriesData] = await Promise.all([topSearchesResult,articleCategoriesResult]);      
    return (
        <>
            <TopSearch TopSearches={topSearchesData} />
            <div className='max-w-7xl mx-4 lg:mx-auto py-6 lg:py-6'>
                <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>
                    <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-yellow-300 before:-z-10'>
                        Sitemap
                    </span>
                </h1>
                <div className="grid grid-cols-1 gap-3 lg:gap-4 sm:grid-cols-4">
                    <div
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:border-gray-400"
                    >
                        <div className="min-w-0 flex-1">
                            <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}`} className="focus:outline-hidden">
                                <p className="text-sm font-medium text-gray-900">Home</p>
                                <p className="truncate text-xs text-gray-500">Amazon Sale: Modern Home, Tech & Gadget Offers</p>
                            </GlobalLink>
                        </div>
                    </div>
                    {articleCategoriesData?.data?.category.map((items,id) => (
                        <div
                            key={id}
                            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:border-gray-400"
                        >
                            <div className="min-w-0 flex-1">
                                <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items.category_slug}`} className="focus:outline-hidden">
                                    <p className="text-sm font-medium text-gray-900">{items.category_name}</p>
                                    <p className="truncate text-xs text-gray-500">{items.meta_title}</p>
                                </GlobalLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>       
    )
}