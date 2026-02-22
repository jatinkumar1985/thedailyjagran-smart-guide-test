"use client"
import React, { useState } from 'react'
import GlobalButton from '../global/GlobalButton';
import GlobalLink from '../global/GlobalLink';
import LazyMedia from '../global/LazyMedia';
import Rating from './Rating';

export default function ProductTableWidget({ArticleDetail,ArticleProducts,tracking_tag}) {
    const items = ArticleDetail?.data?.article 
    // Top Products table
    const [visibleRows, setVisibleRows] = useState(3);
    
    const handleShowMore = () => {
        setVisibleRows((prev) => prev + 3); // Adjust the number to show more rows each time
    };

    // Helper function to calculate discount percentage
    const calculateDiscount = (salesPrice, price) => {
        if (!salesPrice || !price) return null;
        const original = parseFloat(salesPrice);
        const discounted = parseFloat(price);
        if (original <= discounted || original <= 0) return null;
        
        const discount = ((original - discounted) / original) * 100;
        return Math.round(discount); // Rounds to nearest integer
    };
    const myntra_tracking_tag = ''
    return ArticleProducts && (
        <>
            <ul className='overflow-hidden mb-6 lg:mb-8 rounded-lg bg-white border border-dashed border-slate-400 shadow-[0_0_30px_rgba(0,0,0,0.1)]'>
                {ArticleProducts &&
                    ArticleProducts.data.products.rows.slice(0, visibleRows).map((item, id) => {
                        const incrementedId = id + 1;
                        const formattedId = incrementedId < 10 ? `0${incrementedId}` : incrementedId;
                        // console.log(item);

                        /*const itemDecodedUrl = item?.amazon_url
                            ? Buffer.from(item.amazon_url, 'base64').toString('utf8')
                            : '';*/
                        const itemDecodedUrl = item.amazon_url
                        const amazon1url = itemDecodedUrl.split('?')[0];

                        const amazon = amazon1url.includes("www.myntra.com")
                            ? amazon1url + myntra_tracking_tag + tracking_tag
                            : amazon1url + tracking_tag;

                        // Calculate dynamic discount
                        const discountPercentage = calculateDiscount(item.sales_price, item.price);
                        
                        return (
                            <li key={id} className='flex py-5 flex-col relative border-b border-dashed border-gray-400 last:border-0'>
                                {/* <td>{formattedId}</td> */}
                                {discountPercentage && <div className='block w-full absolute left-0 top-0'><div className='flagDiscount'>{discountPercentage}% OFF</div></div>}
                                <div className={`px-5 text-base font-semibold flex justify-between gap-2 ${discountPercentage ? 'pt-4' : ''} `}>
                                    <div className='flex-1'>
                                        <GlobalLink
                                            href={amazon}
                                            className="hover:underline mb-2 block"
                                            target='_blank'
                                            rel="nofollow sponsored"
                                            eventName="affiliate_product_click"
                                            data={{
                                                // section_name: "table",
                                                // product_name: item.title.toLowerCase(),
                                                // cta_text: item.title.toLowerCase(),
                                                // card_position_in_section: id + 1,
                                                // category: items?.category?.category_name.toLowerCase(),
                                                // loggeduser_id: "guest",
                                                // registration_status: "guest",
                                                // storyID: item.id,
                                                // tvc_page_cat: items?.category?.category_name.toLowerCase(),
                                                // uid: "na",
                                                // usertype: "na"
                                            }}
                                        >{item.title}</GlobalLink>
                                        <div className='flex gap-2'>
                                            <div className='w-[50px]'>
                                            <LazyMedia
                                                type="image"
                                                alt={item?.alt}
                                                width={603}
                                                height={182}
                                                className="h-auto mt-1"
                                                src="https://www.jagranimages.com/images/Amazon_logo.svg"
                                            />
                                            </div>
                                            <div><Rating rating={item?.rating} size="xs" /></div>
                                        
                                        </div>
                                        {/* {items?.display_features != 0 ? <td className="py-4 text-base">{item.feature}</td> : ''} */}
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        {item.sales_price ? <span className="text-gray-500 line-through text-xs">₹{item.sales_price}</span> : ''}
                                        {item.price ? <span className="text-red-600 font-bold text-xl mb-2">₹{item.price}</span> : ''}
                                        <GlobalLink
                                            href={amazon}
                                            className="cursor-pointer whitespace-nowrap text-[10px] uppercase font-bold px-4 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            target='_blank'
                                            rel="nofollow sponsored"
                                            eventName="purchase"
                                            data={{
                                                language: "english",
                                                category: item?.category?.category_name,
                                                sub_category: item?.subcategory?.category_name,
                                                page_type: "article detail",
                                                content_group: "Item Details Page",
                                                ecommerce: {
                                                    transaction_id: "",
                                                    value: "",
                                                    tax: "",
                                                    shipping: "",
                                                    currency: "INR",
                                                    coupon: "",
                                                    customer_type: "new",
                                                    items: [
                                                        {
                                                            item_id: item?.id,
                                                            item_name: item?.title.toLowerCase(),
                                                            affiliation: "",
                                                            coupon: "",
                                                            discount: "",
                                                            index: 0,
                                                            item_brand: item?.all_specifications?.find(item => item.key === 'Brand')?.value.toLowerCase() || 'na',
                                                            item_category: item?.category?.category_name,
                                                            item_category2: item?.subcategory?.category_name,
                                                            item_category3: "",
                                                            item_category4: "",
                                                            item_category5: "",
                                                            item_list_id: "related_products",
                                                            item_list_name: "Related Products",
                                                            item_variant: "",
                                                            location_id: "",
                                                            price: item?.price,
                                                            quantity: ""
                                                        }
                                                    ]
                                                }
                                            }}
                                        >Get This</GlobalLink>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                {ArticleProducts &&
                    visibleRows < ArticleProducts.data.products.rows.length && (<li className='py-4 flex justify-center'><GlobalButton
                        onClick={handleShowMore}
                        className="cursor-pointer text-xs uppercase font-bold px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        eventName="cta_click"
                        data={{
                            // section_name: "na",
                            // cta_text: "show more products",
                            // loggeduser_id: "guest",
                            // registration_status: "guest",
                            // storyID: items.id,
                            // tvc_page_cat: items?.category?.category_name.toLowerCase(),
                            // uid: "na",
                            // usertype: ""
                        }}
                    >Show More Products</GlobalButton></li>)}
            </ul>
            {/* <div className='mb-10'>
                <div className="-my-2 overflow-x-auto">
                    <div className="inline-block min-w-full align-middle border border-gray-200 rounded-xl">
                        <table className="relative min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left" >Top Products</th>
                                    {items?.display_features != 0 ? <th scope="col" className="px-3 py-3.5 text-left">Feature</th> : ''}
                                    <th scope="col" className="py-3.5 pr-4 pl-3">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {ArticleProducts &&
                                    ArticleProducts.data.products.rows.slice(0, visibleRows).map((item, id) => {
                                        const incrementedId = id + 1;
                                        const formattedId = incrementedId < 10 ? `0${incrementedId}` : incrementedId;
                                        
                                        const itemDecodedUrl = item.amazon_url
                                        const amazon1url = itemDecodedUrl.split('?')[0];

                                        const amazon = amazon1url.includes("www.myntra.com")
                                            ? amazon1url + myntra_tracking_tag + tracking_tag
                                            : amazon1url + tracking_tag;


                                        return (
                                            <tr key={id}>
                                                <td className="py-4 pr-3 pl-4 text-base font-semibold">
                                                    <GlobalLink
                                                        href={amazon}
                                                        className="hover:underline"
                                                        target='_blank'
                                                        rel="nofollow sponsored"
                                                        eventName="affiliate_product_click"
                                                        data={{
                                                            
                                                        }}
                                                    >{item.title}</GlobalLink>
                                                </td>
                                                {items?.display_features != 0 ? <td className="px-3 py-4 text-base">{item.feature}</td> : ''}
                                                <td className="py-4 pr-4 pl-3 text-right text-base">{item.rating}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                            {ArticleProducts &&
                                visibleRows < ArticleProducts.data.products.rows.length && (
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                                                <GlobalButton
                                                    onClick={handleShowMore}
                                                    className="cursor-pointer text-xs uppercase font-bold px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                                    eventName="cta_click"
                                                    data={{
                                                       
                                                    }}
                                                >Show More Products</GlobalButton>
                                            </td>
                                        </tr>
                                    </tfoot>
                                )}
                        </table>
                    </div>
                </div>
                
            </div> */}
        </>
    )
}