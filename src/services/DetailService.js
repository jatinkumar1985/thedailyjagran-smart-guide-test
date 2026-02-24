export async function ArticleDetailService(params) {
    const { id } = params || {};
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-detail/${id}`;

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
export async function ArticleProductsService(params) {
    const { id } = params || {};
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API}get-article-products/${id}`;

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
export async function ArticleAuthorDetailService(params) {
    const { id } = params || {};
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API_WMS}get-author/v2/${id}`;
        console.log(apiPath);
        
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
export async function ArticleAuthorDetailPageService(params) {
    const { slug } = params || {};
    try {
        const apiPath = `${process.env.NEXT_PUBLIC_MODE_BASE_API_WMS}get-author-detail/${slug}`;
        console.log(apiPath);
        
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