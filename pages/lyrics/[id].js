import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import Image from "next/image";
import parse from "html-react-parser";
import { Header } from "../../components/Header";
import HeadDescription from "../../components/HeadDescription";
import ReactPlayer from "react-player/youtube";
import { AllSongsConfig } from "../../modules/hooks/allSongs-config";
import Link from "next/link";
import Navbar from "../../components/NavBar";

export const getServerSideProps = async ({ params }) => {
  const id = params.id;
  const docRef = doc(db, "Songs", id);
  const docSnap = await getDoc(docRef);
  return {
    props: { data: docSnap.data() },
  };
};

const LyricsPage = ({ data }) => {
  const youtubeURL = `${"https://www.youtube.com/embed/" + data.youtube}`;
  const [allSongs] = AllSongsConfig();

  const allRelated = allSongs.filter((item) => {
    if (
      item.artistName.includes(data.artistName) ||
      item.trackName.includes(data.trackName)
    ) {
      return item;
    }
  });

  let url = `${"/artist/" + data.artistName}`;

  const related = allRelated.slice(0, 5);

  const lyrics = data.lyrics.replace(/(<([^>]+)>)/gi, "");
  const cutLyrics = lyrics.substring(0, 120);

  return (
    <>
      <HeadDescription
        title={data.artistName + " - " + data.trackName + " " + "Lyrics"}
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
        <ReactPlayer
          url={youtubeURL}
          width="300px"
          height="600px"
          config={{
            youtube: {
              playerVars: { showinfo: 1, fs: 0, modestbranding: 1 },
            },
          }}
        />
      </div>
      <p className="related_desc">Similar</p>
      <div className="related">
        {related.map((item, i) => {
          let url = `${"/lyrics/" + item.id}`;
          return (
            <div key={i}>
              <Link href={url}>
                <Image
                  src={item.artwork}
                  alt=""
                  width={120}
                  height={120}
                  className="related__image"
                  priority
                />
                <div className="trending__track">{item.trackName}</div>
                <div className="trending__artist">{item.artistName}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LyricsPage;
