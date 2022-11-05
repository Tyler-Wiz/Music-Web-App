import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const AllSongsConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allSongs, setAllSongs] = useState([]);

  const getData = async () => {
    const trackAll = [];
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "Songs"));
    querySnapshot.forEach((lyrics) => {
      trackAll.push({ id: lyrics.id, ...lyrics.data() });
    });
    setAllSongs([...trackAll]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isLoading]);

  return [allSongs];
};
