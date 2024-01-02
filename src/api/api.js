import {db} from '../shared/firebase';
import {
  collection,
  doc,
  getDocs,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  where,
  writeBatch,
  orderBy,
} from 'firebase/firestore';

export const getProducts = async () => {
  const q = query(collection(db, 'products'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getLatestProducts = async () => {
  const q = query(collection(db, 'products'), where('isLatest', '==', true), orderBy('createdAt'));
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

export const addLikeProduct = async (userId, productId) => {
  const productDocRef = doc(db, 'products', productId);
  const batch = writeBatch(db);

  try {
    // 해당 상품의 현재 정보를 가져옴
    const productSnapshot = await getDoc(productDocRef);
    const productData = productSnapshot.data();

    // 사용자가 이미 좋아요를 눌렀는지 확인
    const productLikes = productData.likes || [];
    const userLiked = productLikes.some(like => like.uid === userId.uid);

    // 좋아요 토글 처리
    if (userLiked) {
      // 사용자가 이미 좋아요를 눌렀으면 좋아요 취소
      batch.update(productDocRef, {
        like: increment(-1),
        likes: arrayRemove(userId),
      });
    } else {
      // 사용자가 좋아요를 누르지 않았으면 좋아요 추가
      batch.update(productDocRef, {
        like: increment(1),
        likes: arrayUnion(userId),
      });
    }

    await batch.commit();
    //console.log('좋아요 토글이 성공적으로 처리완.');
  } catch (error) {
    console.error('좋아요 토글 중 오류가 발생.', error);
  }
};
