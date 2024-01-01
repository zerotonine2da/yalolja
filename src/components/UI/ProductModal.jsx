import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {
  productNameState,
  priceState,
  likeState,
  teamState,
  isLatestState,
  categoryState,
} from '../../recoil/productModal';
import {useRecoilState} from 'recoil';

import {addDoc, collection} from 'firebase/firestore';
import {db, storage} from '../../shared/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import Swal from 'sweetalert2';

const ProductModal = ({onClose, onSave}) => {
  const [productName, setProductName] = useRecoilState(productNameState);
  const [price, setPrice] = useRecoilState(priceState);
  const [team, setTeam] = useRecoilState(teamState);
  const [isLatest, setIsLatest] = useRecoilState(isLatestState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [like, setLike] = useRecoilState(likeState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const isMountedRef = useRef(true);

  const handleImgUpload = e => {
    const imgFile = e.target.files[0];

    if (imgFile) {
      setImageFile(imgFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imgFile);
    }
  };

  const handleIsLatestChange = e => {
    setIsLatest(e.target.checked);
  };

  const addNewProduct = async () => {
    try {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      const imageUrl = await getDownloadURL(storageRef);
      const collectionRef = collection(db, 'products');
      const newProduct = {
        imgUrl: imageUrl,
        productName,
        price,
        isLatest: false,
        team,
        like,
        category,
      };

      await addDoc(collectionRef, newProduct);
      console.log('Product added to Firebase:', newProduct);
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleCloseModal = () => {
    if (isMountedRef.current) {
      setIsModalOpen(false);
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleUploadButton = async e => {
    e.preventDefault();

    if (!productName || !price || !team || !category || !like || !imageFile) {
      Swal.fire({
        icon: 'error',
        title: '입력값이 없습니다.',
        text: '요구하는 값을 입력해주세요.',
      });
    }

    console.log(handleUploadButton);
    await addNewProduct();
    [setProductName, setPrice, setTeam, setIsLatest, setCategory, setLike].forEach(setState => setState(''));
    setImageFile(null);
    setImagePreview(null);
    handleCloseModal();
  };

  return (
    <ModalWrapper style={{display: isModalOpen ? 'flex' : 'none'}}>
      <InputForm>
        <ImageContainer>
          {imagePreview && (
            <ImagePreviewContainer>
              <img src={imagePreview} alt="Preview" />
            </ImagePreviewContainer>
          )}
        </ImageContainer>
        <ModalContext>
          <ModalInput type="file" onChange={handleImgUpload} />
          <ModalInput
            type="text"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="제품명"
          />
          <ModalInput type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="가격" />
          <ModalInput type="text" value={team} onChange={e => setTeam(e.target.value)} placeholder="팀명" />
          <ModalInput type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="카테고리" />
          <ModalInput type="number" value={like} onChange={e => setLike(e.target.value)} placeholder="좋아요" />
          <ModalInput type="checkbox" checked={isLatest} onChange={handleIsLatestChange} />
        </ModalContext>
        <ButtonContainer>
          <FuncButton onClick={handleUploadButton}>저장</FuncButton>
          <FuncButton onClick={handleCloseModal}>닫기</FuncButton>
        </ButtonContainer>
      </InputForm>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 600;
`;

const InputForm = styled.form`
  background-color: white;
  width: 500px;
  height: 600px;
  z-index: 100;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 11 */
  &::-webkit-scrollbar {
    width: 6px; /* Chrome & Safari */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const ModalContext = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ModalInput = styled.input`
  padding: 5px;
`;

const ButtonContainer = styled.div`
  padding: 10px;
  gap: 10px;
  display: flex;
  justify-content: center;
`;

const FuncButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImagePreviewContainer = styled.div`
  width: 70%;
  height: 50%;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default ProductModal;
