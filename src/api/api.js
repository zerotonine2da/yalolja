import {db} from '../shared/firebase';
import {collection, doc, getDocs, increment, updateDoc, query, where} from 'firebase/firestore';

export const getLatestProducts = async () => {
  const q = query(collection(db, 'products'), where('isLatest', '==', true));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getTopProducts = async () => {
  const q = query(collection(db, 'products'), where('category', '==', 'top'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getAccProducts = async () => {
  const q = query(collection(db, 'products'), where('category', '==', 'acc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getBottomProducts = async () => {
  const q = query(collection(db, 'products'), where('category', '==', 'bottom'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getHitProducts = async () => {
  const q = query(collection(db, 'products'), where('like', '>=', 30));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addLikeProduct = async productId => {
  const productDocRef = doc(db, 'products', productId);

  await updateDoc(productDocRef, {
    like: increment(1),
  });

  return productId;
};
