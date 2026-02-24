import GlobalLink from '@/components/global/GlobalLink'
import LazyMedia from '@/components/global/LazyMedia'
import Image from 'next/image'
import React from 'react'

export default function RelatedProducts({SubCategory,label,articleid}) {
    const categorySlug = SubCategory?.data?.article?.seo_details?.category?.category_slug;
    const subcategorySlug = SubCategory?.data?.article?.seo_details?.subcategory?.category_slug;  
    
    // Filter items excluding current article
    const filteredItems = SubCategory?.data?.article?.rows?.filter((items) => {
        return items.id != articleid;
    }) || [];
    
    // Hide component if no items to show after filtering
    if (filteredItems.length === 0) {
        return null;
    }
    
    return (
        <div className='mb-0 lg:mb-0'>
            <h2 className='text-xl lg:text-2xl uppercase font-black mb-4 lg:mb-6 flex justify-between items-center'>
                <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-red-300 before:-z-10'>{label}</span>
                <GlobalLink
                    href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${categorySlug}}`}
                    className="inline-flex items-center gap-x-2 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
                >
                    <span className=''>View More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5 text-red-700" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </GlobalLink>
            </h2>
            <div className="px-0 lg:px-0 mb-0 lg:mb-8 lg:grid lg:grid-cols-4 space-y-4 lg:gap-6">
                {filteredItems.map((items, index) => (
                    <div key={index} className={`flex flex-row lg:flex-col rounded-xl overflow-hidden group`} >
                        <GlobalLink ariaLabel={items.title} href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items?.category?.category_slug}/${items?.page_url}-${items?.id}`} className={`shrink-0 w-28 lg:w-full mb-2`} >
                            <LazyMedia
                                type="image"
                                src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items.thumb_image}`}
                                alt={items.title}
                                width={1200}
                                height={645}
                                className={`object-cover rounded-xl`}
                            />
                        </GlobalLink>
                        <div className={`ml-4 lg:ml-0 lg:mt-2`} >
                            <p className={`mb-1 text-[9px]/2 uppercase text-gray-500 hover:text-red-700`}>
                                <GlobalLink ariaLabel={items?.category?.category_name} href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items?.category?.category_slug}`}>{items?.category?.category_name}</GlobalLink>
                            </p>
                            <h3 className={`text-gray-900 group-hover:underline text-[13px]/4 lg:text-base/5.5 font-bold`} >
                                <GlobalLink ariaLabel={items.title} href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items?.category?.category_slug}/${items?.page_url}-${items?.id}`}>{items.title}</GlobalLink>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}