import React from 'react'

const Meta = {
    meta_title: "Smart Guide Selection Process: Our Editorial Standards",
    meta_keyword: "",
    meta_description: "Read Daily Jagran Smart Guide’s editorial standards framework brand reputation, manufacturing excellence, proven product history, and real-user sentiment analysis.",
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
            <h1 className='text-4xl font-bold'>The Smart Guide Selection Process: Our Editorial Standards</h1>
            <p>At The Daily Jagran, our "Smart Guide" section aims to simplify your search before presenting any product, whether it's a Laptop, TV, Beauty Products, Clothes, or more. After doing thorough research, we filter the most well-rated and highly preferred products by the users available on Amazon.</p>
            <p>Here is the 4-pillar framework we use to curate every product:</p>
            <h3>1. Reputation and Manufacturing Excellence</h3>
            <p>Rather than picking products on a random basis, we look for options backed by users' trust. We always prioritise giving place to those brands with ethical manufacturing, transparent warranty policies, and a history of honoring customer claims.</p>
            <h3>2. Backed By Proven History</h3>
            <p>We value "tried and true" over "new and flashy." Here, we select the brands and products that have a lineage of a product series to see how it has evolved. This doesn’t mean we do not include less popular brands, the main target is to bring forward the things that have been liked and appreciated by the users most, and keep on bringing them back, which helps building credibility.</p>
            <h3>3. Sentiment Analysis of Real Users</h3>
            <p>A product’s true character is revealed in the hands of the consumer. So we focus on going beyond the star ratings available on the e-commerce platform. We give preference to the reviews from verified purchasers and give careful consideration to the vague statements. In order to decide judging parameters, we follow a theme, for instance:  how a kitchen appliance handles wear after six months or how a gadget’s software performs after an update, to give users a real-world view.</p>
            <h3>4. Problem-Solution Alignment</h3>
            <p>Every product in our Smart Guide must answer a few questions to serve the users search intent well: What specific problem does this solve, and is the selected product is most ideal to whom? For example, we add valuable insights in the form of "Best for Small Spaces," "Top Budget Performance," or "Professional Grade." This ensures that you aren't just buying a "good" product, but the right product for your specific requirements.</p>
        </div>       
    )
}