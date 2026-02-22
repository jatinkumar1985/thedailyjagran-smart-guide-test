"use client";
import React, { useState } from 'react'
import GlobalLink from './GlobalLink';
import GlobalButton from './GlobalButton';
import Image from 'next/image';
import CommonDialogSideBar from './CommonDialogSideBar';

export default function Header({header}) {  
    const [sidebarOpen, setSidebarOpen] = useState(false);  
    return (
        <>
            <header>
                <div className='flex justify-between items-center max-w-7xl mx-auto py-4'>
                    <div className='flex justify-between w-full'>
                        <div className='w-48 flex items-center'>
                            <GlobalButton
                                onClick={() => {
                                    setSidebarOpen(true);
                                }}
                                name="menu"
                                className={`group hover:bg-gray-900 border-gray-400 hover:border-gray-900 text-gray-900 hover:text-gray-50 h-[35px] cursor-pointer border focus:outline-none rounded-full text-sm px-2 lg:px-4 py-1.5 lg:py-2 items-center flex`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-4 text-black group-hover:text-white" viewBox="0 0 16 16">
                                    <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                                <span className="ml-1 hidden sm:block sm:text-xs lg:text-xs uppercase">
                                    Menu
                                </span>
                            </GlobalButton>
                        </div>
                        <div className='flex justify-center'>
                            <GlobalLink href={process.env.NEXT_PUBLIC_MODE_BASE_URL}>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/thedailyjagran-smart-guide.svg`}
                                    alt="jagran reviews"
                                    width={184}
                                    height={32}
                                    className="h-12 lg:h-8 w-auto cursor-pointer"
                                />
                                {/* <div className="h-10 lg:h-15 w-auto cursor-pointer">
                                                <LottieAnimation src={JagranReviews} play loop />
                                            </div> */}
                            </GlobalLink>
                        </div>
                        <div className='w-48 flex items-center'>
                            <div className="w-full grid grid-cols-1">
                                <input
                                    name="search"
                                    type="text"
                                    placeholder="search..."
                                    className="col-start-1 row-start-1 block w-full rounded-full bg-white py-2.5 pr-10 pl-5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset focus:outline-gray-600 sm:pr-9 sm:text-sm/6"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-gray-400 sm:size-4" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='overflow-scroll lg:h-auto lg:overflow-visible no-scrollbar list-none border-b border-gray-200'>
                    <div className='max-w-7xl mx-auto py-4'>
                        <div className='flex items-center gap-8 whitespace-nowrap'>
                            <GlobalLink
                                href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}`}
                                eventName="top_navigation"
                                data={{
                                    cta_text: 'home',
                                    loggeduser_id: "guest",
                                    registration_status: "guest",
                                    select_type: "header",
                                    uid: "na",
                                    usertype: "guest",
                                    tvc_page_cat: "na",
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                                </svg>
                            </GlobalLink>
                            {header && <>
                                {header?.data?.category.map((items, id) => {
                                    return (
                                        <GlobalLink
                                            key={id}
                                            href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/${items.category_slug}`}
                                            className="text-sm font-semibold hover:text-red-700"
                                            eventName="top_navigation"
                                            data={{
                                                cta_text: items.category_name.toLowerCase(),
                                                loggeduser_id: "guest",
                                                registration_status: "guest",
                                                select_type: "header",
                                                uid: "na",
                                                usertype: "guest",
                                                tvc_page_cat: "na",
                                            }}
                                        >{items.category_name}</GlobalLink>
                                    )
                                })}
                            </>}
                        </div>
                    </div>
                </div>
            </header>
            <CommonDialogSideBar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                setSidebarOpen={setSidebarOpen}
                HeaderNavigationData={header}
            />
        </>       
    )
}