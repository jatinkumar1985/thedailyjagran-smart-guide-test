import React from 'react'
import LazyMedia from '../global/LazyMedia'

export default function TrusCardTop() {
    return (
        <div className='bg-gray-100 rounded-xl p-4 lg:p-6 mb-6 border border-dashed border-gray-300'>
            <div className='flex gap-2'>
                <div className='w-5 h-5'>
                    <LazyMedia
                        type="image"
                        src={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/secure-shield.svg`}
                        alt="Vetted Options"
                        width={20}
                        height={20}
                        className={`object-cover`}
                    />
                </div>
                <span className='font-bold'>Vetted Options</span>
            </div>
            <p className='text-sm'>We thoroughly evaluate every product through a combination of <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/our-editorial-standards`} className='text-red-700 hover:underline' target="_blank">hands-on research</a> and <a href={`${process.env.NEXT_PUBLIC_MODE_BASE_URL}/how-we-evaluate-products`} className='text-red-700 hover:underline' target="_blank">insights</a> from reputable industry sources.</p>
        </div>
    )
}