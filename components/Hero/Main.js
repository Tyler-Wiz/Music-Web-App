import React from "react";
import Chart from "../Chart";
import NewRelease from "../NewRelease";
import { Playlist } from "../Playlist";
import Trending from "../Trending";
import { HeroHeader } from "./HeroHeader";
import ads from "../../img/fast-food-ads-mcdonalds-300x600.webp";
import Image from "next/image";

const Main = ({ trending, newRelease, chart }) => {
  return (
    <div className="main">
      <HeroHeader />
      <Trending trending={trending} />
      <div className="chartAdsArea">
        <Chart chart={chart} />
        <div className="chartAds">
          <Image src={ads} width={300} height={600} alt="" priority />
        </div>
      </div>
      <NewRelease newRelease={newRelease} />
      <Playlist />
    </div>
  );
};

export default Main;
