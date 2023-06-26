import {
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";

import { db, auth } from "@/firebase";

// DATABASE HELPERS
export async function addQuote(quote, author) {
  const quotesRef = collection(db, "quotes");
  const quoteDoc = {
    quote: quote,
    author: author,
    timestamp: new Date().toLocaleString(),
    uid: auth.currentUser.uid,
  };

  await addDoc(quotesRef, quoteDoc); // Use addDoc to add a new document to a collection
}

export async function deleteQuote(quoteId) {
  const quoteRef = doc(db, "quotes", quoteId); // Use doc to get a reference to a specific document

  await deleteDoc(quoteRef);
}

export async function updateQuote(quoteId, newQuote, newAuthor) {
  const quoteRef = doc(db, "quotes", quoteId); // Use doc to get a reference to a specific document

  const updatedQuote = {
    quote: newQuote,
    author: newAuthor,
    timestamp: new Date().toLocaleString(),
  };

  await updateDoc(quoteRef, updatedQuote);
}

export async function getAllQuotes() {
  const quotesRef = collection(db, "quotes");
  const orderedQuotesQuery = query(quotesRef, orderBy("timestamp", "desc")); // order by timestamp in descending order

  const querySnapshot = await getDocs(orderedQuotesQuery);
  const quotes = [];
  querySnapshot.forEach((doc) => {
    quotes.push({ id: doc.id, ...doc.data() });
  });

  return quotes;
}

export async function getQuote(quoteId) {
  const quoteRef = doc(db, "quotes", quoteId);
  const quoteSnapshot = await getDoc(quoteRef);

  if (quoteSnapshot.exists()) {
    const quoteData = quoteSnapshot.data();
    return { id: quoteSnapshot.id, ...quoteData };
  } else {
    throw new Error("Document does not exist.");
  }
}
