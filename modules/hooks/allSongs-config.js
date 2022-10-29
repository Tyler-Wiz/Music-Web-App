import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const AllSongsConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allSongs, setAllSongs] = useState([]);

  const colRef = collection(db, "Songs");

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(colRef, (snapshot) => {
      const trackAll = [];
      snapshot.docs.forEach((doc) => {
        trackAll.push({ id: doc.id, ...doc.data() });
      });
      setAllSongs([...trackAll]);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trending = allSongs.filter((item) => {
    if (item.tag.includes("trending")) {
      return item;
    }
  });

  const newRelease = allSongs.filter((item) => {
    if (item.category.includes("new")) {
      return item;
    }
  });

  const chart = allSongs.filter((item) => {
    if (item.album.includes("five")) {
      return item;
    }
  });

  return [isLoading, trending, newRelease, chart];
};
