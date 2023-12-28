import {db} from '../shared/firebase';
import {collection, doc, getDocs} from 'firebase/firestore';

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
