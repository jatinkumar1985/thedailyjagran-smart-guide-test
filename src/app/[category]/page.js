import ArticleSideBar from "@/components/detail/ArticleSideBar";
import CategoryListing from "@/components/landing/CategoryListing";
import { getCachedArticleByCategoryService, getCachedLatestArticleService } from "@/services/CachedServices";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function CategoryListingSkeleton() {
  return (
    <div className="lg:grid lg:grid-cols-3 space-y-4 lg:gap-6 mb-8">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="flex flex-row lg:flex-col rounded-xl overflow-hidden animate-pulse">
          <div className="shrink-0 w-28 lg:w-full h-24 lg:h-40 bg-gray-200 rounded-xl" />
          <div className="ml-4 lg:ml-0 lg:mt-2 flex-1 space-y-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Resolve params AND fetch data inside the Suspense boundary
async function CategoryContent({ paramsPromise }) {
  const { category } = await paramsPromise; // ✅ awaited inside Suspense

  const CategoryListingData = await getCachedArticleByCategoryService({
    categoryType: category,
    pageNo: '1',
    limit: '18',
  });

  if (!CategoryListingData) {
    notFound();
  }

  const title = category.charAt(0).toUpperCase() + category.slice(1).replaceAll('-', ' ');

  const latestResult = await getCachedLatestArticleService(1,6);
  const [latestData] = await Promise.all([latestResult]);
  
  return (
    <>
      <div className='max-w-7xl mx-4 lg:mx-auto py-4 lg:py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-7'>
          <div className='col-span-5'>
            <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>
              <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-yellow-300 before:z-[-10]'>
                {title}
              </span>
            </h1>
            <CategoryListing
              initialPosts={CategoryListingData}
              category={category}
            />
          </div>
          <div className='col-span-2 lg:pl-8 pt-8 pb-2 lg:py-14'>
            <div className='sticky top-10 mt-10 lg:mt-0'>
              {latestData && <ArticleSideBar label="you may also like" listing={latestData} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page({ params }) {
  // ✅ Do NOT await params here — pass the Promise down
  return (
    <Suspense fallback={<CategoryListingSkeleton />}>
      <CategoryContent paramsPromise={params} />
    </Suspense>
  );
}