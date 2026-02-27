"use client";
import { useEffect } from "react";

export default function DataLayer({ datalayer, author }) {
  useEffect(() => {
    // const lastPageType = localStorage.getItem("page_type") || "na";
    // const lastStoryId = localStorage.getItem("product_id") || "na";
    // const lastAuthor = localStorage.getItem("author") || "na";
    // console.log(datalayer);
    
    const currentPageType = "article detail";
    const currentStoryId = datalayer?.id || "na";
    const currentAuthor = `${author?.first_name?.toLowerCase()} ${author?.last_name?.toLowerCase()}` || "na";

    // ── Get first 25 words from body ───────────────────────────────
    let previewTags = "na";
    if (datalayer?.meta_keyword && typeof datalayer?.meta_keyword === "string" && datalayer?.meta_keyword.trim()) {
      const words = datalayer?.meta_keyword.trim().split(/\s+/);
      previewTags = words.slice(0, 25).join(" ");
      // Optional: add ellipsis if article is longer
      // if (words.length > 25) previewTags += " ...";
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'english_pageview',
        language: 'english',
        tvc_page_cat: datalayer?.category?.category_name.toLowerCase() || 'na',
        tvc_page_type: 'article detail',
        tvc_detail_page: 'article detail',
        tvc_author: `${author?.first_name?.toLowerCase() || ''} ${author?.last_name?.toLowerCase() || ''}`.trim() || 'na',
        storyID: datalayer?.id || 'na',
        tvc_word_count: datalayer?.body?.length !== 0 ? (datalayer?.body.split(/\s+/).length) : 'na', 
        tvc_publish_date: datalayer?.publish_date_schema || 'na',
        tvc_update_date: datalayer?.updated_at_schema || 'na',
        article_tags: previewTags,
        is_affiliate_page:true,
        tvc_video_embed:'no',
        article_type:'affiliate article'
    });

    // console.log("PDP → referrer:", lastPageType, lastStoryId, lastAuthor);
    // store current page metadata for next navigation
    localStorage.setItem("page_type", currentPageType);
    localStorage.setItem("product_id", currentStoryId);
    localStorage.setItem("author", currentAuthor);
  }, [datalayer, author]);

  return null;
}