import {db} from '../shared/firebase';
import {addDoc, collection, doc, getDocs, increment, updateDoc} from 'firebase/firestore';

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
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
