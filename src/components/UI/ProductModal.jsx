import React, {useState} from 'react';
import styled from 'styled-components';
import {productNameState, priceState, teamState, isLatestState} from '../../recoil/productModal';
import {useRecoilState} from 'recoil';

import {addDoc, collection} from 'firebase/firestore';
import {db, storage} from '../../shared/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const ProductModal = ({onClose, onSave}) => {
  const [productName, setProductName] = useRecoilState(productNameState);
  const [price, setPrice] = useRecoilState(priceState);
  const [team, setTeam] = useRecoilState(teamState);
  const [isLatest, setIsLatest] = useRecoilState(isLatestState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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
      };

      await addDoc(collectionRef, newProduct);
      console.log('Product added to Firebase:', newProduct);
      // isModalOpen(false);
    } catch (error) {
      console.error('에러', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUploadButton = e => {
    e.preventDefault();
    console.log(handleUploadButton);
    addNewProduct();
    // setIsModalOpen(false);
  };

  return (
    <ModalWrapper>
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
          <ModalInput type="checkbox" checked={isLatest} onChange={setIsLatest} />
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
`;

const ModalContext = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
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
