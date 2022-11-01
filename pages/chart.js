import React from "react";
import { Header } from "../components/Header";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { sortArray } from "../modules/hooks/sortArray";
import Navbar from "../components/NavBar";

const chart = ({ chartAll }) => {
  let number = 1;
  const [sort_by] = sortArray();
  const featuredChart = chartAll.sort(
    sort_by("album", false, (a) => a.toUpperCase())
  );

  return (
    <>
      <Header />
      <Navbar />
      <div className="main_chart">
        <div className="main_chart__desc">
          <Image
            src="https://tooxclusive.com/wp-content/uploads/2022/10/Top-20-Songs-Of-2018-11561414550.jpeg "
            alt=""
            width={200}
            height={200}
            className="main_chart__image"
          />
          <div>
            <p className="lyrics_wrapper__desc">Top 20 Songs Of The Week</p>
            <p className="lyrics_wrapper__track">Plug Playlist</p>
            <p className="lyrics_wrapper__artist">2022</p>
          </div>
        </div>
        {featuredChart.map((item, i) => {
          let url = `${"/lyrics/" + item.id}`;
          return (
            <Link href={url} className="chart__container" key={i}>
              <div className="chart__container">
                <p className="chart__position">{number + i}</p>
                <Image src={item.artwork} alt="trend" width={50} height={50} />
                <div className="chart__track">{item.trackName}</div>
              </div>
              <div className="chart__artist">{item.artistName}</div>
              <div className="love_container">
                <i className="fa-solid fa-play"></i>
                <i className="fa-regular fa-heart"></i>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default chart;

export const getStaticProps = async () => {
  const trackAll = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((lyrics) => {
    trackAll.push({ id: lyrics.id, ...lyrics.data() });
  });

  const chartAll = trackAll.filter((item) => {
    if (item.album.includes("top")) {
      return item;
    }
  });

  return {
    props: { chartAll },
  };
};
