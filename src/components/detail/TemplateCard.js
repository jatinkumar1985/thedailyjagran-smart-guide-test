"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import GlobalLink from '../global/GlobalLink';
import LazyMedia from '../global/LazyMedia';

export default function TemplateCard({ArticleCard}) {
    // console.log(ArticleCard,'ArticleCard');
    const handleSwiperInit = (swiper) => {
        // Use event delegation on the pagination container — 
        // one listener catches ALL bullet clicks, no duplication risk
        const paginationEl = swiper.pagination?.el;
        if (!paginationEl) return;

        paginationEl.addEventListener('click', (e) => {
            const isBullet = e.target.classList.contains('swiper-pagination-bullet');
            if (!isBullet) return;

            // Get the index of the clicked bullet among all bullets
            const bullets = Array.from(paginationEl.querySelectorAll('.swiper-pagination-bullet'));
            const bulletIndex = bullets.indexOf(e.target);

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "trending_slider_click",
                section_name: "trending products",
                cta_header: "na",
                cta_subheader: "na",
                cta_text: `bullet ${bulletIndex + 1}`,
                page_cat: "news",
            });

            // console.log("trending_slider_click pushed to dataLayer ✅", window.dataLayer);
        });
    };
    return (
        <>
            {ArticleCard.map((data,id)=>{
                return(
                    <div className='article-body' key={id}>
                        <h3>{data.title}</h3>
                        <div dangerouslySetInnerHTML={{__html:data.body}} />
                        <div className='bg-[#fff9cc] rounded-2xl pt-6 my-6'>
                            <Swiper
                                // loop={true}
                                className="mySwiper px-4! lg:px-6! pb-10!"
                                spaceBetween={15} // Add spacing between slides
                                slidesPerView={1.5} // Show one slide at a time
                                breakpoints={{
                                    640: { slidesPerView: 2.5, spaceBetween: 25 }, // 2 slides on medium screens
                                    1024: { slidesPerView: 4, spaceBetween: 25 }, // 3 slides on large screens
                                }}
                                onSwiper={handleSwiperInit}
                                pagination={{
                                    clickable: true,
                                    bulletClass: 'swiper-pagination-bullet !bg-gray-50/10 border !border-gray-500 !w-2 lg:!w-2.5 !h-2 lg:!h-2.5 !mx-0.5',
                                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-gray-900/100 !border-gray-900/100 !-mb-[1px] !w-2.5 lg:!w-3 !h-2.5 lg:!h-3 !scale-110',
                                }}
                                modules={[Pagination]}
                            >
                                {data?.products.map((items, index) => {
                                     const calculateDiscount = (salesPrice, price) => {
                                        if (!salesPrice || !price) return null;
                                        const original = parseFloat(salesPrice);
                                        const discounted = parseFloat(price);
                                        if (original <= discounted || original <= 0) return null;
                                        
                                        const discount = ((original - discounted) / original) * 100;
                                        return Math.round(discount); // Rounds to nearest integer
                                    };
                                    // console.log(items);
                                    const discountPercentage = calculateDiscount(items?.sale_price, items?.price);
                                    
                                    return (
                                        <SwiperSlide key={index} className="overflow-hidden rounded-2xl lg:rounded-2xl bg-white group border border-[#d6c970] relative">
                                            {discountPercentage && <div className='block w-full absolute left-0 top-0'><div className='flagDiscount'>{discountPercentage}% OFF</div></div>}
                                            <GlobalLink
                                                ariaLabel={items.product_title}
                                                target="_blank"
                                                rel="nofollow sponsored"
                                                href={items.amazon_url}
                                                className="flex items-center justify-center h-44 p-2"
                                            >
                                                <LazyMedia
                                                    type="image"
                                                    src={items?.image}
                                                    alt={items.product_title || 'Article image'}
                                                    width={200}
                                                    height={200}
                                                    className="h-auto w-auto max-h-48 object-contain"
                                                />
                                            </GlobalLink>
                                            <div className={`text-gray-900 group-hover:underline font-bold px-4 mb-1`} >
                                                <GlobalLink
                                                    ariaLabel={items.product_title}
                                                    target="_blank"
                                                    rel="nofollow sponsored"
                                                    href={items.amazon_url}
                                                    className="text-[13px] lg:text-sm line-clamp-3"
                                                >{items.product_title}</GlobalLink>
                                            </div>
                                            <div className="text-lg font-bold px-4 mb-3">
                                                ₹{items.price}
                                                {items.sale_price && (
                                                    <span className="block text-sm text-gray-500 line-through">
                                                        ₹{items.sale_price}
                                                    </span>
                                                )}
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                )
            })}
        </>
    )
}