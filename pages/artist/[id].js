import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/Header";
import ads from "../../img/fast-food-ads-mcdonalds-300x600.webp";
import HeadDescription from "../../components/HeadDescription";
import Navbar from "../../components/NavBar";

export const getStaticPaths = async () => {
  const trackAll = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((lyrics) => {
    trackAll.push({ id: lyrics.id, ...lyrics.data() });
  });
  const paths = trackAll.map((doc) => {
    return {
      params: { id: doc.artistName.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const track = [];
  const id = context.params.id;
  const q = query(collection(db, "Songs"), where("artistName", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    track.push({ id: doc.id, ...doc.data() });
  });
  return {
    props: { data: track },
  };
};

const ArtistPage = ({ data }) => {
  return (
    <>
      <HeadDescription
        title={data[0].artistName + " - " + "Lyrics" + " | " + "tooXclusive"}
        content={"latest Lyrics from" + " " + data[0].artistName}
      />
      <Navbar />
      <Header />
      <div className="artist_container">
        <div className="artist_container__imageArea">
          <Image
            src={data[0].artwork}
            alt="trend"
            width={250}
            height={250}
            className="artist_container__image"
          />
          <div>
            <p className="artist_container__lyrics">Lyrics</p>
            <p className="artist_container__artistName">{data[0].artistName}</p>
            <p className="artist_container__songLength">{data.length} Songs </p>
          </div>
        </div>
        <div className="artist_wrapper">
          <div className="artist_wrapper__content">
            {data.map((item, i) => {
              let url = `${"/lyrics/" + item.id}`;
              return (
                <Link href={url} className="chart__container" key={i}>
                  <div className="chart__container">
                    <Image
                      src={item.artwork}
                      alt="trend"
                      width={50}
                      height={50}
                    />
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
          <div className="artist_wrapper__ads">
            <Image src={ads} width={300} height={600} alt="" priority />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistPage;
