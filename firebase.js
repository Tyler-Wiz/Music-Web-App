import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWP68vTiDzT-3xaapQSmZxMvoX6anzYmk",
  authDomain: "plug-26bab.firebaseapp.com",
  projectId: "plug-26bab",
  storageBucket: "plug-26bab.appspot.com",
  messagingSenderId: "454059640444",
  appId: "1:454059640444:web:a57bc5b35940cc03e5abf9",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };

export const db = getFirestore();

export const getAllTracks = async () => {
  const querySnapshot = await getDocs(collection(db, "Trending"));
  return querySnapshot;
};

export const getAllNew = async () => {
  const querySnapshot = await getDocs(collection(db, "NewRelease"));
  return querySnapshot;
};

export const getAllPlaylist = async () => {
  const querySnapshot = await getDocs(collection(db, "Playlist"));
  return querySnapshot;
};

export const getPlaylistSongs = async (itemId) => {
  const allTracklist = await getDocs(
    collection(db, "Playlist", itemId, "tracklist")
  );
  return allTracklist;
};
