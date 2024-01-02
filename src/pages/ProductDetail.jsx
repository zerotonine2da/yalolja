import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getDoc, doc} from 'firebase/firestore';
import {db} from '../shared/firebase';
import {productNameState, priceState, likeState, imgUploadState} from '../recoil/productModal';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import LikeFunc from '../components/like/LikeFunc';

const ProductDetail = () => {
  const {productId} = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [productName, setProductName] = useRecoilState(productNameState);
  const [price, setPrice] = useRecoilState(priceState);
  const [like, setLike] = useRecoilState(likeState);
  const [imgUrl, setImgUrl] = useRecoilState(imgUploadState);

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

  return (
    <>
      <DetailProductWrapper>
        <ImgWrapper>
          <img src={imgUrl} alt="Product Img" />
        </ImgWrapper>
        <ProductContextWrapper>
          <ProductName>{productName}</ProductName>
          <p>{price} 원</p>
          <LikeFunc productId={productId} initialLikeCount={like} />
        </ProductContextWrapper>
      </DetailProductWrapper>
      <CommentSection>코멘트 칸</CommentSection>
    </>
  );
};

const DetailProductWrapper = styled.div`
  height: 45%;
  display: flex;

  padding: 10px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProductContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 10px;
  border: 1px solid #ccc;
`;

const ProductName = styled.h2``;

const CommentSection = styled.div``;

export default ProductDetail;
