import Image from "next/image";
import { useRef } from "react";
import { PlaylistData } from "../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AllSongsConfig } from "../modules/hooks/allSongs-config";
import "swiper/css";

export const Playlist = () => {
  const swiperRef = useRef();
  const [isLoading, trending] = AllSongsConfig();

  return (
    <div className="playlist">
      {!isLoading && (
        <>
          <div className="slide_button">
            <h2>Weekly Top Playlist</h2>
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
            slidesPerView={4}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}>
            {PlaylistData.map(({ imageUrl, name, author }) => (
              <SwiperSlide key={name}>
                <Image src={imageUrl} alt="trend" width={270} height={260} />
                <p className="playlist__name">{name}</p>
                <p className="playlist__author">{author}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};
