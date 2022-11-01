import { getServerSideSitemap } from "next-sitemap";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

export const getServerSideProps = async (ctx) => {
  const trackAll = [];
  const querySnapshot = await getDocs(collection(db, "Songs"));
  querySnapshot.forEach((lyrics) => {
    trackAll.push({ id: lyrics.id, ...lyrics.data() });
  });

  const fields = trackAll.map((capsule) => ({
    loc: `https://www.example.com/${capsule.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
