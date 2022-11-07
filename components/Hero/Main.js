import React from "react";
import Chart from "../Chart";
import NewRelease from "../NewRelease";
import Trending from "../Trending";
import Footer from "./Footer";
import { Header } from "../Header";
import Navbar from "../NavBar";

const Main = ({ trending, newRelease, chart }) => {
  return (
    <>
      <Navbar />
      <div className="main">
        <Header />
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1115876871453816"
          data-ad-slot="1282142215"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        <Trending trending={trending} />
        <div className="chartAdsArea">
          <Chart chart={chart} />
          <div className="chartAds">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-1115876871453816"
              data-ad-slot="1282142215"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          </div>
        </div>
        <NewRelease newRelease={newRelease} />
      </div>
    </>
  );
};

export default Main;
