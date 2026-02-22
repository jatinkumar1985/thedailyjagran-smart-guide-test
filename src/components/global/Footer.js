import React from 'react'
import GlobalLink from './GlobalLink'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className='bg-black pb-12 lg:pb-0'>
            <div className='max-w-7xl mx-auto px-6 sm:px-6 lg:px-0 pb-6 lg:pt-6'>
                <div className='grid grid-cols-3 gap-2 lg:gap-20 py-8 border-b border-gray-700'>
                    <div className='col-span-3 lg:col-span-1 mb-4'>
                        <div className='lg:w-full mb-4'>
                            <GlobalLink href="/" className="flex justify-start">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/thedailyjagran-logo.svg`}
                                    alt="jagran reviews"
                                    width={300}
                                    height={113}
                                    className="w-37.5 h-10 cursor-pointer"
                                    loading="lazy"
                                />
                            </GlobalLink>
                        </div>
                        <p className='text-sm text-gray-200 mb-4'>Jagran Reviews brings you expert-led product reviews, in-depth comparisons, smart buying guides, and curated deals across top categories. Make confident purchase decisions with trusted insights, latest trends, and value-driven recommendations — all in one place.</p>
                        <p className='text-sm text-gray-200 mb-4'>For any feedback or complaint email to <GlobalLink href="mailto:compliant_gro@jagrannewmedia.com" className="text-gray-50 underline">compliant_gro@jagrannewmedia.com</GlobalLink></p>
                        <div className='lg:w-full'>
                            <div className='flex justify-start gap-2 mb-2 lg:mb-2'>
                                <GlobalLink href="https://www.facebook.com/profile.php?id=61583792707837&sk=about" target="_blank" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src="/icons/facebook.svg"
                                        alt="Facebook"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                                {/* <GlobalLink href="/" className="size-10 border border-white/50 rounded-lg flex items-center justify-center p-3 hover:bg-white/10">
                                    <Image
                                        src="/icons/twitter.svg"
                                        alt="Twitter"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy"
                                    />
                                </GlobalLink> */}
                                <GlobalLink href="https://www.instagram.com/jagranreviews/" target="_blank" className="size-10 border border-white/50 rounded-full flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src="/icons/instagram.svg"
                                        alt="Instagram"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy" // Explicit lazy loading
                                    />
                                </GlobalLink>
                                {/* <GlobalLink href="/" className="size-10 border border-white/50 rounded-lg flex items-center justify-center p-2.5 hover:bg-white/10">
                                    <Image
                                        src="/icons/youtube.svg"
                                        alt="YouTube"
                                        width={16}
                                        height={16}
                                        className="w-7 h-7 cursor-pointer"
                                        loading="lazy"
                                    />
                                </GlobalLink> */}
                            </div>
                            <p className='text-white mb-2 text-xs font-semibold'>Connect & Share</p>
                            <p className='text-sm text-gray-200 lg:mb-4'>Expert-curated deals you can trust, refreshed regularly - <GlobalLink href="/deals" className="text-gray-50 underline font-bold">Check Deals</GlobalLink></p>
                        </div>
                    </div>
                    <div className='col-span-3 lg:col-span-2 lg:flex gap-10'>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                            <GlobalLink href="/about-us" className="text-sm text-gray-400 hover:text-white">About Us</GlobalLink>
                            <GlobalLink href="/contact-us" className="text-sm text-gray-400 hover:text-white">Contact Us</GlobalLink>
                            <GlobalLink href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white">Terms & Conditions</GlobalLink>
                            <GlobalLink href="/cookie-policy" className="text-sm text-gray-400 hover:text-white">Cookie Policy</GlobalLink>
                            <GlobalLink href="/affiliate-disclaimer" className="text-sm text-gray-400 hover:text-white">Affiliate Disclaimer</GlobalLink>
                            <GlobalLink href="/advertise-with-us" className="text-sm text-gray-400 hover:text-white">Advertise With Us</GlobalLink>
                            <GlobalLink href="/dnpa-code-of-conduct-compliance-statement" className="text-sm text-gray-400 hover:text-white">DNPA Code of Conduct Compliance Statement</GlobalLink>
                            <GlobalLink href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</GlobalLink>
                            <GlobalLink href="/correction-policy" className="text-sm text-gray-400 hover:text-white">Correction Policy</GlobalLink>
                        </div>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                            <GlobalLink href="https://www.jagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Hindi</GlobalLink>
                            <GlobalLink href="https://www.thedailyjagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">The Daily Jagran</GlobalLink>
                            <GlobalLink href="https://www.gujaratijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Gujarati Jagran</GlobalLink>
                            <GlobalLink href="https://www.marathijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Marathi</GlobalLink>
                            <GlobalLink href="https://www.onlymyhealth.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Only My Health</GlobalLink>
                            <GlobalLink href="https://www.jagranjosh.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Jagran Josh</GlobalLink>
                        </div>
                        <div className='flex flex-wrap lg:flex-col gap-2 lg:gap-4 mb-2 lg:w-52'>
                            <GlobalLink href="https://www.naidunia.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Nai Dunia</GlobalLink>
                            <GlobalLink href="https://www.inextlive.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Inextlive</GlobalLink>
                            <GlobalLink href="https://www.herzindagi.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Her Zindagi</GlobalLink>
                            <GlobalLink href="https://www.punjabijagran.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Punjabi Jagran</GlobalLink>
                            <GlobalLink href="https://www.vishvasnews.com/" target="_blank" className="text-sm text-gray-400 hover:text-white">Vishvas News</GlobalLink>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap lg:flex-nowrap justify-between'>
                    <div className='py-4'>
                        <span className="text-sm text-gray-400 whitespace-nowrap">© 2026 Jagran New Media. All Rights Reserved.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}