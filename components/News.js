import Image from "next/image";
import React from "react";
import { AllNewsConfig } from "../modules/hooks/allNewsConfig";
import { sortArray } from "../modules/hooks/sortArray";

const News = () => {
  const [allNews] = AllNewsConfig();
  const [sort_by] = sortArray();
  const featuredChart = allNews.sort(
    sort_by("Date", false, (a) => a.toUpperCase())
  );
  const newsarr = featuredChart.reverse();

  return (
    <>
      <p className="news__desc">News</p>
      <div className="news">
        {newsarr.map((item, i) => {
          if (i === 0) {
            return (
              <div key={i} className="news__featured">
                <Image src={item.artwork} alt="" width={500} height={550} />
                <div className="featured_contents">
                  <p className="featured_contents__cat">{item.Category}</p>
                  <p className="featured_contents__title">
                    {item.title.substring(0, 50)}
                  </p>
                  <p className="featured_contents__desc">
                    {item.content
                      .replace(/(<([^>]+)>)/gi, "")
                      .substring(0, 100) + "..."}
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default News;
