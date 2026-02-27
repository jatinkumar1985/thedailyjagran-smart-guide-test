import { cacheLife, cacheTag } from 'next/cache';
import { ArticleCategoriesService, PromoBannerService, LatestArticleService, CategoryWidgetsService, ArticleByCategoryService, QuickLinksService, ArticleTagsHomeService, AuthorListService, ArticleAuthorListingService, CategoryListingService, ArticleSidebarService, ArticleTagsPageService, SearchArticleService } from './ListingService';
import { ArticleAuthorDetailPageService, ArticleAuthorDetailService, ArticleDetailService, ArticleProductsService, PageMetaService } from './DetailService';

export async function getCachedArticleCategories() {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-categories`);

  const data = await ArticleCategoriesService();
  return data;
}
export async function getCachedArticleTagsHome() {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-tags-home`);

  const data = await ArticleTagsHomeService();
  return data;
}
export async function getCachedArticleTagsPage({slug}) {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`article-tags-${slug}`);

  const data = await ArticleTagsPageService({slug});
  return data;
}
export async function getCachedQuickLinks() {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`quick-links`);

  const data = await QuickLinksService();
  return data;
}

// Recommended: use 'hours' for most promo banners (changes rarely)
export async function getCachedPromoBanner(slug) {
  'use cache';
  
  cacheLife('hours');                    // ← best balance for promo banners
  // Alternative (if it changes more often):
  // cacheLife('minutes');
  // or custom: cacheLife({ revalidate: 1800, expire: 86400 }); // 30 min / 1 day
  
  cacheTag(`promo-banner-${slug}`);
  // Optional: add generic tag for bulk invalidation
  // cacheTag('all-promos');

  const data = await PromoBannerService({ slug });
  return data;
}

export async function getCachedLatestArticleService(pageNo = 1, limit = 10) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`latest-articles-page-${pageNo}`);

  const data = await LatestArticleService({ pageNo, limit });
  return data;
}

export async function getCachedArticleByCategoryService({ categoryType, pageNo = 1, limit = 10 } = {}) {
  'use cache';
  
  console.log('categoryType:', categoryType, 'pageNo:', pageNo, 'limit:', limit); // 👈 check this
  
  cacheLife('minutes');
  cacheTag(`articles-list-${categoryType}-${pageNo}`);

  const data = await ArticleByCategoryService({ categoryType, pageNo, limit });
  return data;
}

export async function getCachedCategoryWidgetsService() {
  'use cache';
  
  cacheLife('max');                  // Rarely changes
  cacheTag(`category-widgets`);

  const data = await CategoryWidgetsService();
  return data;
}

export async function getCachedArticleDetailService({id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`article-detail-${id}`);

  const data = await ArticleDetailService({ id });
  return data;
}

export async function getCachedArticleProductsService({id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`article-product-${id}`);

  const data = await ArticleProductsService({ id });
  return data;
}

export async function getCachedArticleAuthorDetailService({id}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`author-detail-${id}`);

  const data = await ArticleAuthorDetailService({ id });
  return data;
}
export async function getCachedArticleAuthorDetailPageService({slug}) {
  'use cache';
  
  cacheLife('minutes');                  // articles usually more fresh
  cacheTag(`author-detail-${slug}`);

  const data = await ArticleAuthorDetailPageService({ slug });
  return data;
}
export async function getCachedAuthorListService() {
  'use cache';
  
  cacheLife('max');                  // articles usually more fresh
  cacheTag(`get-author-list`);

  const data = await AuthorListService();
  return data;
}

export async function getCachedArticleAuthorListingService({ authorId, pageNo = 1, limit = 10 } = {}) {
  'use cache';
  
  console.log('authorId:', authorId, 'pageNo:', pageNo, 'limit:', limit); // 👈 check this
  
  cacheLife('minutes');
  cacheTag(`articles-list-${authorId}-${pageNo}`);

  const data = await ArticleAuthorListingService({ authorId, pageNo, limit });
  return data;
}

export async function getCachedCategoryListingService({ category, pageNo = 1, limit = 10 } = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`article-by-category-${category}-${pageNo}`);

  const data = await CategoryListingService({ category, pageNo, limit });
  return data;
}

export async function getCachedArticleSidebarService({ category} = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`article-sidebar-${category}`);

  const data = await ArticleSidebarService({ category });
  return data;
}

export async function getCachedPageMetaService({ slug} = {}) {
  'use cache';
  
  
  cacheLife('max');
  cacheTag(`get_meta-${slug}`);

  const data = await PageMetaService({ slug });
  return data;
}

export async function getCachedSearchArticleService({ keyword} = {}) {
  'use cache';
  
  
  cacheLife('minutes');
  cacheTag(`search-article-${keyword}`);

  const data = await SearchArticleService({ keyword });
  return data;
}