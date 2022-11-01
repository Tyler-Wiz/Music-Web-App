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
      <h2>Trending Songs</h2>
      <div className="new">
        {trending.map(
          ({ artistName, artwork, trackName, lyrics, youtube, id }) => {
            let url = `${"/lyrics/" + id}`;
            return (
              <div key={trackName}>
                <div className="trending">
                  <Link href={url}>
                    <Image
                      src={artwork}
                      alt="trend"
                      className="trending__image"
                      width={110}
                      height={110}
                      priority
                    />
                  </Link>
                  <div className="trending__track">{trackName}</div>
                  <div className="trending__artist">{artistName}</div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

export default Trending;
