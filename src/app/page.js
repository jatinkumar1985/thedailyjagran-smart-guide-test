import { Suspense } from 'react';
import PromoBanner from "@/components/global/PromoBanner";
import ArticleWidget from "@/components/home/ArticleWidget";
import LatestNews from "@/components/home/LatestNews";
import { getCachedPromoBanner, getCachedLatestArticleService, getCachedArticleByCategoryService, getCachedArticleTagsHome, } from "@/services/CachedServices";
import TopSearch from '@/components/global/TopSearch';

// ──────────────────────────────────────────────
//  Configuration – easy to extend / reorder
// ──────────────────────────────────────────────
const WIDGET_CONFIG = [
  { category: 'home-solutions-electronics', label: 'Home Solutions and Electronics', articlesPerPage: 4, },
  { category: 'home-solutions-electronics', label: 'Gadget Zone', articlesPerPage: 4, },
  { category: 'household-furnishings', label: 'Household Furnishings', articlesPerPage: 4, },
  { category: 'style-vault', label: 'Style Vault', articlesPerPage: 4, },
  { category: 'glam-and-glamour', label: 'Glam and Glamour', articlesPerPage: 4, },
  { category: 'fit-zone', label: 'Fit Zone', articlesPerPage: 4, },
  { category: 'reading-corner', label: 'Reading Corner', articlesPerPage: 4, },
  { category: 'what-to-gift', label: 'What To Gift', articlesPerPage: 4, },
  { category: 'others', label: 'Others', articlesPerPage: 4, },
];

export default async function Home() {
  // Prepare all parallel fetches
  const promises = [
    getCachedArticleTagsHome(),
    getCachedPromoBanner('no-category'),
    getCachedLatestArticleService(1, 5),
    ...WIDGET_CONFIG.map((cfg) =>
      getCachedArticleByCategoryService({
        categoryType: cfg.category,
        pageNo: 1,
        limit: cfg.articlesPerPage,
      })
    ),
  ];
  const results = await Promise.allSettled(promises);

  const [topSearchesResult, promoResult, latestResult, ...widgetResults] = results;

  const topSearchesData  = topSearchesResult.status === 'fulfilled' ? topSearchesResult.value : null;
  const promoData  = promoResult.status === 'fulfilled' ? promoResult.value : null;
  const latestData = latestResult.status === 'fulfilled' ? latestResult.value : null;

  // Pair widget results with their config (order preserved)
  const widgets = widgetResults.map((result, index) => {
    const config = WIDGET_CONFIG[index];
    return {
      config,
      data: result.status === 'fulfilled' ? result.value : null,
    };
  });

  return (
    <>
      <TopSearch TopSearches={topSearchesData} />
      {latestData && <LatestNews LatestNewsData={latestData} />}

      {promoData && (
        <Suspense fallback={ <div className="h-64 bg-gray-100 animate-pulse rounded-xl mx-4 lg:mx-auto max-w-7xl mt-2 lg:mt-8" /> } >
          <PromoBanner PromoBannerData={promoData} />
        </Suspense>
      )}

      {widgets.map(({ config, data }, idx) =>
        data ? (
          <ArticleWidget key={`${config.category}-${idx}`} listing={data} label={config.label} />
        ) : null
      )}
    </>
  );
}