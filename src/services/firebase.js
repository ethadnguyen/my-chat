import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAGHRYecf3XFYcHaUDar_uT7DEMm84O1p0",
  authDomain: "my-chat-9cd32.firebaseapp.com",
  projectId: "my-chat-9cd32",
  storageBucket: "my-chat-9cd32.appspot.com",
  messagingSenderId: "7249980387",
  appId: "1:7249980387:web:99a6785090272a65ac4ed6",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.displayName, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.log(error);
    }
    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (QuerySnapshot) => {
      const messages = QuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

export { loginWithGoogle, sendMessage, getMessages };
