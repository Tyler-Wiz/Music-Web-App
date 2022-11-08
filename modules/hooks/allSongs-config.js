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
    });
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [allSongs, isLoading];
};
