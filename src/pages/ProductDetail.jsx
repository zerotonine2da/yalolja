import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {collection, getDoc, doc} from 'firebase/firestore';
import {db} from '../shared/firebase';

const ProductDetail = () => {
  const {productId} = useParams();
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', productId));

        if (productDoc.exists()) {
          setProductDetail(productDoc.data());
        } else {
          console.error('Product not found');
        }
      } catch (error) {}
    };
  });

  return (
    <div>
      <h2></h2>
      <p></p>
      <p></p>
    </div>
  );
};

export default ProductDetail;
