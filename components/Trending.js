import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AllSongsConfig } from "../modules/hooks/allSongs-config";
import { Navigation } from "swiper";
import "swiper/css";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

const Trending = ({ trending }) => {
  const swiperRef = useRef();

  return (
    <>
      {/* <div className="loading">
        <ThreeDots
          height="20"
          width="80"
          radius="9"
          color="#4141be"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={isLoading}
        />
      </div> */}
      <div className="slide_button">
        <h2>Trending Singles</h2>
        <div className="slide_button">
          <p onClick={() => swiperRef.current?.slidePrev()}>
            <i className="fa-solid fa-chevron-left"></i>
          </p>
          <p onClick={() => swiperRef.current?.slideNext()}>
            <i className="fa-solid fa-chevron-right"></i>
          </p>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={5}
        slidesPerView={5}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {trending.map(
          ({ artistName, artwork, trackName, lyrics, youtube, id }) => {
            // // let combineId = `${artistName + "-" + trackName}`;
            let urlID = id.replace(/\s/g, "");
            let url = `${"/lyrics/" + id}`;
            return (
              <SwiperSlide key={trackName} className="trending">
                <Link href={url}>
                  <Image
                    src={artwork}
                    alt="trend"
                    className="trending__image"
                    width={220}
                    height={220}
                  />
                </Link>
                <div className="trending__track">{trackName}</div>
                <div className="trending__artist">{artistName}</div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </>
  );
};

export default Trending;
