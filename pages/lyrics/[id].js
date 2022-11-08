import { db } from "../../firebase";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import Image from "next/image";
import parse from "html-react-parser";
import { Header } from "../../components/Header";
import HeadDescription from "../../components/HeadDescription";
import Link from "next/link";
import Navbar from "../../components/NavBar";
import { AllSongsConfig } from "../../modules/hooks/allSongs-config";

export const getStaticPaths = async () => {
  const trackAll = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((lyrics) => {
    trackAll.push({ id: lyrics.id, ...lyrics.data() });
  });
  const paths = trackAll.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "Songs", id);
  const docSnap = await getDoc(docRef);

  return {
    props: { data: docSnap.data() },
  };
};

const LyricsPage = ({ data }) => {
  const youtubeURL = `${"https://www.youtube.com/embed/" + data.youtube}`;
  let url = `${"/artist/" + data.artistName}`;

  const [allSongs] = AllSongsConfig();

  const related = allSongs.filter((item) => {
    if (item.artistName.includes(data.artistName)) {
      return item;
    }
  });

  const relatedPost = related.slice(0, 5);

  const lyrics = data.lyrics.replace(/(<([^>]+)>)/gi, "");
  const cutLyrics = lyrics.substring(0, 120);

  return (
    <>
      <HeadDescription
        title={
          data.trackName +
          " Lyrics " +
          " by " +
          data.artistName +
          "  |  " +
          "tooXclusive"
        }
        content={data.artistName + " " + data.trackName + " - " + cutLyrics}
      />
      <Navbar />
      <Header />
      <div className="lyrics_wrapper">
        <Image
          src={data.artwork}
          alt=""
          width={200}
          height={200}
          className="lyrics_wrapper__image"
          priority
        />
        <div>
          <div className="lyrics_wrapper__desc">Lyrics</div>
          <p className="lyrics_wrapper__track">{data.trackName}</p>
          <Link href={url} className="lyrics_wrapper__artist">
            {data.artistName}
          </Link>
        </div>
      </div>
      <div className="lyrics">
        <div>{parse(data.lyrics)}</div>
        <div>
          <p className="related_desc">Similar</p>
          <div className="related">
            {relatedPost.map((item, i) => {
              let url = `${"/lyrics/" + item.id}`;
              return (
                <div key={i}>
                  <Link href={url} className="related__container">
                    <Image
                      src={item.artwork}
                      alt=""
                      width={30}
                      height={30}
                      className="related__image"
                      priority
                    />
                    <div>
                      <div className="trending__track">{item.trackName}</div>
                      <div className="trending__artist">{item.artistName}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="youtube">
            <iframe
              width="300px"
              height="600px"
              src={
                youtubeURL.includes("/watch?v=")
                  ? youtubeURL.replace("/watch?v=", "/embed/")
                  : youtubeURL
              }
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default LyricsPage;
