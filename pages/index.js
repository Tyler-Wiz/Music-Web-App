import Head from "next/head";
import Hero from "../components/Hero/Hero";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Home({ trending, newRelease, chart, trackAll }) {
  return (
    <div>
      <Head>
        <title>Song Lyrics Website</title>
        <meta
          name="description"
          content="Song Lyrics Website from Nigerian Artist, Wizkid, Burna Boy, Asake, Kizz Daniel, Ayra Starr, Oxlade"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero
        trending={trending}
        newRelease={newRelease}
        chart={chart}
        trackAll={trackAll}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const trackAll = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((lyrics) => {
    trackAll.push({ id: lyrics.id, ...lyrics.data() });
  });

  const trending = trackAll.filter((item) => {
    if (item.tag.includes("trending")) {
      return item;
    }
  });

  const newRelease = trackAll.filter((item) => {
    if (item.category.includes("new")) {
      return item;
    }
  });

  const chart = trackAll.filter((item) => {
    if (item.album.includes("five")) {
      return item;
    }
  });

  return {
    props: { trending, newRelease, chart },
  };
};
