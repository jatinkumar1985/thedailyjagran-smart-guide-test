"use client";
import { useEffect } from "react";

export default function DataLayer({ datalayer }) {
  useEffect(() => {
    const lastPageType = localStorage.getItem("page_type") || "na";
    const lastStoryId = localStorage.getItem("product_id") || "na";
    const lastAuthor = localStorage.getItem("author") || "na";

    const currentPageType = "author detail";
    const currentStoryId = "na";
    const currentAuthor = `${datalayer?.first_name?.toLowerCase()} ${datalayer?.last_name?.toLowerCase()}` || "na";

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'jagran_reviews_pageview',
        language: 'english',
        page_type: 'author detail',
        category: 'author detail',
        is_affiliate_page:false,
        content_group: 'author detail page',
        referrer_page_type: lastPageType,
        referrer_story_id: lastStoryId,
        referrer_author: lastAuthor,
    });

    // console.log("PDP → referrer:", lastPageType, lastStoryId, lastAuthor);
    // store current page metadata for next navigation
    localStorage.setItem("page_type", currentPageType);
    localStorage.setItem("product_id", currentStoryId);
    localStorage.setItem("author", currentAuthor);
  }, [datalayer]);

  return null;
}