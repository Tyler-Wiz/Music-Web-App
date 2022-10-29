import { useRouter } from "next/router";
import { db } from "../../firebase";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";

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
  const { id } = router.query;
  return <>{data.album}</>;
};

export default LyricsPage;
