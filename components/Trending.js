import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import Link from "next/link";

const Trending = ({ trending }) => {
  const swiperRef = useRef();

  return (
    <>
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
        spaceBetween={50}
        slidesPerView={5}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}>
        {trending.map(
          ({ artistName, artwork, trackName, lyrics, youtube, id }) => {
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
                    priority
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
