import React from 'react'
import GlobalLink from '../global/GlobalLink'
import LazyMedia from '../global/LazyMedia'

export default function ArticleSideBar({listing,label,articleid}) { 
    // Filter items excluding current article
    const filteredItems = listing?.data?.article?.rows?.filter((items) => {
        return items.id != articleid;
    }) || [];
    
    // Hide component if no items to show after filtering
    if (filteredItems.length === 0) {
        return null;
    }
    const categorySlug = listing?.data?.article?.seo_details?.category?.category_slug;
    return (
        <div className='max-w-7xl mx-auto mb-10'>
            {/* <h2 className='text-lg lg:text-xl uppercase font-[900] mb-4 lg:mb-6 border-b border-gray-900 pb-2 lg:pb-4'>{label}</h2> */}
            <h2 className='text-xl lg:text-lg uppercase font-black mb-4 lg:mb-6 flex justify-between items-center'>
                <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-pink-200 before:-z-10'>{label}</span>
                {/* <GlobalLink
                    href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${categorySlug}`}
                    className="inline-flex items-center gap-x-0.5 rounded-full py-2 lg:py-2.5 text-xs font-bold uppercase"
                >
                    <span className=''>View More</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5 text-red-700" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </GlobalLink> */}
            </h2>
            <div className="space-y-6 mb-6">
                {filteredItems.slice(0,5).map((items, index) => {                                        
                    const categorySlug = items?.category?.category_slug;
                    const subcategorySlug = items?.subcategory?.category_slug;
                    return(
                        <div key={index} className={`flex flex-row rounded-xl overflow-hidden group`} >
                            <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${categorySlug}/${items?.page_url}-${items?.id}`} className={`shrink-0 w-26`} >
                                <LazyMedia
                                    type="image"
                                    src={`${process.env.NEXT_PUBLIC_MODE_IMAGE_PATH}${items?.thumb_image}`}
                                    alt={items?.title}
                                    width={1200}
                                    height={645}
                                    className={`object-cover rounded-xl`}
                                />
                            </GlobalLink>
                            <div className={`ml-4`} >
                                <p className={`mb-1 text-[9px]/2 uppercase text-pink-600 hover:text-pink-700`}>
                                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${categorySlug}`}>{items?.category?.category_name}</GlobalLink>
                                </p>
                                <h3 className={`text-gray-900 group-hover:underline text-[13px]/4 font-bold`} >
                                    <GlobalLink href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${categorySlug}/${items?.page_url}-${items?.id}`}>{items?.title}</GlobalLink>
                                </h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}