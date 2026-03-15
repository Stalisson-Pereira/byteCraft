import { doc, getDoc, serverTimestamp, setDoc, getFirestore } from "firebase/firestore";
import type { User } from "firebase/auth";

import { firebaseApp } from "@/lib/firebase";

export const db = getFirestore(firebaseApp);

export async function upsertUserProfile(user: User) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  const base = {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    providerIds: user.providerData.map((p) => p.providerId),
    lastLoginAt: serverTimestamp(),
  };

  if (snap.exists()) {
    await setDoc(ref, base, { merge: true });
    return;
  }

  await setDoc(
    ref,
    {
      ...base,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
}
