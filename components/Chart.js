import React from "react";
import Image from "next/image";
import { sortArray } from "../modules/hooks/sortArray";
import more from "../img/more.png";

const Chart = ({ chart }) => {
  let number = 1;
  const [sort_by] = sortArray();
  const featuredChart = chart
    .slice(0, 7)
    .sort(sort_by("album", false, (a) => a.toUpperCase()));

  return (
    <div className="chart">
      <h2>Chart</h2>
      <div>
        {featuredChart.map((item, i) => {
          let combineId = `${item.artistName + "-" + item.trackName}`;
          let id = combineId.replace(/\s/g, "");
          return (
            <div className="chart__container" key={i}>
              <div className="chart__container">
                <p className="chart__position">0{number + i}</p>
                <Image src={item.artwork} alt="trend" width={50} height={50} />
                <div className="chart__track">{item.trackName}</div>
              </div>
              <div className="chart__artist">{item.artistName}</div>
              <div className="chart__container">
                <i className="fa-solid fa-play"></i>
                <i className="fa-regular fa-heart"></i>
                <Image src={more} alt="trend" width={15} height={15} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="chart__more-container">
        <div className="chart__more">See More</div>
      </div>
    </div>
  );
};

export default Chart;
