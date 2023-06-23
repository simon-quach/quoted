import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { db, auth } from "@/firebase";

// DATABASE HELPERS
export async function addQuote(quote) {
  const quotesRef = doc(db, "users", auth.uid, "quotes");

  const quoteDoc = {
    quote: quote,
    createdAt: new Date(),
  };

  await setDoc(collection(quotesRef), quoteDoc);
}

export async function deleteQuote(quoteId) {
  const quoteRef = doc(db, "users", auth.uid, "quotes", quoteId);

  await deleteDoc(quoteRef);
}

export async function updateQuote(quoteId, newQuote) {
  const quoteRef = doc(db, "users", auth.uid, "quotes", quoteId);

  const updatedQuote = {
    quote: newQuote,
    updatedAt: new Date(),
  };

  await updateDoc(quoteRef, updatedQuote);
}

export async function getAllQuotes() {
  const quotesRef = collection(db, "users", auth.uid, "quotes");

  const querySnapshot = await getDocs(quotesRef);
  const quotes = [];
  querySnapshot.forEach((doc) => {
    quotes.push({ id: doc.id, ...doc.data() });
  });

  return quotes;
}
