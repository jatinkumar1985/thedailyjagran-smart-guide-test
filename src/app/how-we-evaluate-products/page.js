import React from 'react'

const Meta = {
    meta_title: "Smart Guide Review Philosophy: How We Evaluate Products",
    meta_keyword: "",
    meta_description: "Learn how Daily Jagran evaluates products with a data-centric method using verified user reviews, market popularity, multi-brand benchmarking, simple explanations, and rating stability checks.",
}

export async function generateMetadata(){
  return {
    title: Meta.meta_title,
    description: Meta.meta_description,
    keywords: Meta.meta_keyword,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/our-editorial-standards`,
    },
    openGraph: {
      title: Meta.meta_title,
      description: Meta.meta_description,
      url: `${process.env.NEXT_PUBLIC_MODE_BASE_URL}/our-editorial-standards`,
      images: process.env.NEXT_PUBLIC_BASE_OG_IMAGE,
      siteName:process.env.NEXT_PUBLIC_DOMIN_NAME,
    },
  };
}

export default function Page() {
    return (
        <div className='max-w-7xl mx-auto py-6 article-body'>
            <h1 className='text-4xl font-bold'>Our Review Philosophy: How We Evaluate Products</h1>
            <p>At The Daily Jagran, we eliminate the guesswork through a data-centric review process. We do not test products in the lab rather focus on rigorous and unbiased methodology.</p>
            <h3>1. Reviews From Verified Users</h3>
            <p>Our major source of information extraction is Amazon users and their real life experiences. We thoroughly monitor reviews in detail and find major areas of improvement and highlights suggested by users. For instance, if 50 different users over three months mention a specific hinge on a laptop or a noise level in an AC, we consider this a factual performance trait.</p>
            <h3>2. Existing Popularity In The Market</h3>
            <p>There are multiple products available on Amazon that fall under the category of “Best Sellers”. We keep a keen eye on those products and check their consistency. We also check for selling history over the past few years and how many lineups have been introduced by a particular brand. We look for the why behind the popularity to see if the hype actually matches, and then only consider it, adding in our listicles.</p>
            <h3>3. Multi-Brand Benchmarking</h3>
            <p>Before picking up the products for reviewing we compare it firsthand with other competitors and find out why it is worth reviewing. For example, when reviewing a washing machine, we compare the spin speed, water efficiency, and after sales services of leading brands like Bosch, LG, and Whirlpool.</p>
            <h3>4. Serving Layman’s Understanding</h3>
            <p>Technical specifications should not be intimidating, rather should be easily accessible and meet every level of understanding. As there are many technical terms associated with every product, we target breaking them into simplest language, so that every type of user can get a crisp and clear understanding of whether he/she should go for that particular product or not.</p>
            <h3>5. Integrating Reviews With Stability</h3>
            <p>We just not simply go for quick and vague ratings and reviews; we cross check if the product maintains a consistent rating over months or not. In our best-rated and top-rated articles, we ensure picking up the products with a 4 or above rating on Amazon to justify our titles. We do reviews of those products that have been consistently ranking top in the charts and look out for the most popular models that users keep on coming back.</p>
        </div>       
    )
}