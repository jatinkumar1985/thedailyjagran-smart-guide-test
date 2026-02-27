export async function ArticleCategoriesService(params) {
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-categories`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function ArticleTagsHomeService(params) {
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-tags/top-searches`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function ArticleTagsPageService(params) {
  const { slug } = params || {};
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-tags/top-searches/${slug}`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function QuickLinksService(params) {
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-tags/quick-links`;
    
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function PromoBannerService(params) {
  const { slug } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-slider/${slug}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
        // Cache-Control header is optional – Next.js prioritizes its own caching
        // 'Cache-Control': 'public, max-age=300'
      },
      // IMPORTANT: remove these – let 'use cache' + cacheLife control caching
      // cache: 'no-store',
      // next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('PromoBannerService error:', error);
    return null;
  }
}

export async function LatestArticleService(params) {
  const { pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article/${pageNo}/${limit}`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function ArticleByCategoryService(params) {
  const { categoryType, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-by-category/${categoryType}/${pageNo}/${limit}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function CategoryWidgetsService(params) {
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-category-widgets`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}

export async function AuthorListService(params) {
  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API_WMS}get-author-list/thedailyjagran.com/Affiliate`;

    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}

export async function ArticleAuthorListingService(params) {
  const { authorId, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-by-author/${authorId}/${pageNo}/${limit}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}

export async function CategoryListingService(params) {
  const { category, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-by-category/${category}/${pageNo}/${limit}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}

export async function ArticleSidebarService(params) {
  const { category, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-sidebar/${category}`;
    console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
export async function SearchArticleService(params) {
  const { keyword, pageNo = 0, limit = 10 } = params || {};

  try {
    const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}search-article/${keyword}/${pageNo}/${limit}`;
    // console.log('Fetching URL:', apiPath);
    const response = await fetch(apiPath, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SITE_TOKEN}`,
      },
      
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('LatestArticleService error:', error);
    return null;
  }
}
// You can convert other services (SubCategoryListingService etc.) the same way...