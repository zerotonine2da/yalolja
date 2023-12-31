import {db} from '../shared/firebase';
import {collection, doc, getDocs, increment, updateDoc, arrayUnion, arrayRemove, getDoc} from 'firebase/firestore';

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const addLikeProduct = async (userId, productId) => {
  const productDocRef = doc(db, 'products', productId);
  console.log(userId);
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
      await updateDoc(productDocRef, {
        like: increment(-1),
        likes: arrayRemove(userId),
      });
    } else {
      // 사용자가 좋아요를 누르지 않았으면 좋아요 추가
      await updateDoc(productDocRef, {
        like: increment(1),
        likes: arrayUnion(userId),
      });
    }

    console.log('좋아요 토글이 성공적으로 처리완.');
  } catch (error) {
    console.error('좋아요 토글 중 오류가 발생.', error);
  }
};
