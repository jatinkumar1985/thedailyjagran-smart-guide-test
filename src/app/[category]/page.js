import CategoryListing from "@/components/landing/CategoryListing";
import { getCachedArticleByCategoryService } from "@/services/CachedServices";
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

  return (
    <>
      <h1 className='text-xl lg:text-2xl uppercase font-black mb-2 lg:mb-4 flex justify-between items-center'>
        <span className='relative before:absolute before:-top-1 before:left-0 before:w-full before:h-2/3 before:bg-yellow-300 before:z-[-10]'>
          {title}
        </span>
      </h1>
      <CategoryListing
        initialPosts={CategoryListingData}
        category={category}
      />
    </>
  );
}

export default function Page({ params }) {
  // ✅ Do NOT await params here — pass the Promise down
  return (
    <div className='max-w-7xl mx-4 lg:mx-auto py-4 lg:py-6'>
      <div className='grid grid-cols-1 lg:grid-cols-4'>
        <div className='col-span-3'>
          <Suspense fallback={<CategoryListingSkeleton />}>
            <CategoryContent paramsPromise={params} />
          </Suspense>
        </div>
        <div className='col-span-1 lg:pl-8 pt-8 pb-2 lg:py-14'>
          <div className='sticky top-10 mt-10 lg:mt-0'>
            {/* sidebar content */}
          </div>
        </div>
      </div>
    </div>
  );
}