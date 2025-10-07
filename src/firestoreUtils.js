// src/firestoreUtils.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createUserProfile = async (user, extraData = {}) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      createdAt: new Date(),
      ...extraData,
    });
  }
};
