import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const AllNewsConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allNews, setAllNews] = useState([]);

  const colRef = collection(db, "News");

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(colRef, (snapshot) => {
      const newsAll = [];
      snapshot.docs.forEach((doc) => {
        newsAll.push({ id: doc.id, ...doc.data() });
      });
      setAllNews([...newsAll]);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [allNews];
};
