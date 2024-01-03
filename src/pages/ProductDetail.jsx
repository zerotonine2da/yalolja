import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDoc, doc} from 'firebase/firestore';
import {db, auth} from '../shared/firebase';
import {productNameState, priceState, likesState, imgUploadState} from '../recoil/productModal';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import LikeFunc from '../components/like/LikeFunc';
import {onAuthStateChanged} from 'firebase/auth';
import {addComments} from '../api/api';
import Button from '../components/UI/Button';

const ProductDetail = () => {
  const {productId} = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [productName, setProductName] = useRecoilState(productNameState);
  const [price, setPrice] = useRecoilState(priceState);
  const [like, setLike] = useRecoilState(likesState);
  const [imgUrl, setImgUrl] = useRecoilState(imgUploadState);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('comments', comments);
  }, [comments]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));

        if (productDoc.exists()) {
          const data = productDoc.data();
          setProductDetail(data);
          setProductName(data.productName);
          setPrice(data.price);
          setLike(data.like);
          setImgUrl(data.imgUrl);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
    fetchProductDetail();
  }, [productId, setProductName, setPrice, setImgUrl, setLike]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      return;
    }
    try {
      await addComments(user.uid, productId, newComment);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  return (
    <>
      <DetailProductWrapper>
        <ImgWrapper>
          <img src={imgUrl} alt="Product Img" />
        </ImgWrapper>
        <ProductContextWrapper>
          <ProductName>{productName}</ProductName>
          <ProductPrice>{price}원</ProductPrice>
          <LikeFunc productId={productId} initialLikeCount={like} />
        </ProductContextWrapper>
      </DetailProductWrapper>
    </>
  );
};

const DetailProductWrapper = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 50px;
  margin-top: 30px;
`;

const ImgWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
`;

const ProductContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 10px;
  border: 1px solid #ccc;
`;

const ProductName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ProductPrice = styled.h3`
  font-size: 24px;
  font-weight: 600;

  margin-top: 10px;
  margin-bottom: 10px;

  padding: 10px;

  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export default ProductDetail;
