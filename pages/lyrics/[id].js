import { useRouter } from "next/router";
import { db } from "../../firebase";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";
import Image from "next/image";
import parse from "html-react-parser";
import { Header } from "../../components/Header";
import HeadDescription from "../../components/HeadDescription";
import ReactPlayer from "react-player/youtube";

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
  const router = useRouter();
  const youtubeURL = `${"https://www.youtube.com/embed/" + data.youtube}`;

  return (
    <>
      <HeadDescription
        title={data.artistName + " - " + data.trackName + " " + "Lyrics"}
        content={
          "latest Lyrics from" +
          " " +
          data.artistName +
          " - " +
          data.trackName +
          " "
        }
      />
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
          <p className="lyrics_wrapper__track"> {data.trackName}</p>
          <p className="lyrics_wrapper__artist"> {data.artistName}</p>
        </div>
      </div>
      <div className="lyrics">
        <div>{parse(data.lyrics)}</div>
        <ReactPlayer
          url={youtubeURL}
          width="300px"
          height="600px"
          controls="false"
          config={{
            youtube: {
              playerVars: { showinfo: 1, fs: 0, modestbranding: 1 },
            },
          }}
        />
      </div>
    </>
  );
};

export default LyricsPage;
