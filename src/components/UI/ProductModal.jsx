import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {
  productNameState,
  priceState,
  likesState,
  teamState,
  isLatestState,
  categoryState,
  productIdState,
} from '../../recoil/productModal';
import {useRecoilState} from 'recoil';
import {v4 as uuidv4} from 'uuid';

import {addDoc, collection, getDocs, query, serverTimestamp, writeBatch} from 'firebase/firestore';
import {db, storage} from '../../shared/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Loading from '../../components/Loading';

const ProductModal = ({onClose, onSave}) => {
  const [productId, setProductId] = useRecoilState(productIdState);
  const [productName, setProductName] = useRecoilState(productNameState);
  const [price, setPrice] = useRecoilState(priceState);
  const [team, setTeam] = useRecoilState(teamState);
  const [isLatest, setIsLatest] = useRecoilState(isLatestState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [like, setLike] = useRecoilState(likesState);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const isMountedRef = useRef(true);
  const [loading, setLoading] = useState(false); // 스피니 로딩

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
      setLoading(true);
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      const imageUrl = await getDownloadURL(storageRef);
      const collectionRef = collection(db, 'products');
      const newProductId = uuidv4();
      const newProduct = {
        productId: newProductId,
        imgUrl: imageUrl,
        productName,
        price,
        isLatest: false,
        team,
        like,
        category,
        createdAt: serverTimestamp(),
      };

      await addDoc(collectionRef, newProduct);
      console.log('Product added to Firebase:', newProduct);
    } catch (error) {
      console.error('에러', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: '상품 등록 중 에러가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: '완료',
        text: '상품을 등록했습니다.',
      });
    }
  };

  const handleCloseModal = () => {
    if (isMountedRef.current) {
      setProductName('');
      setPrice('');
      setTeam('');
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

    if (!productName) {
      Swal.fire({
        icon: 'error',
        title: '제품명이 입력되지 않았습니다.',
      });
      return;
    }
    if (!price) {
      Swal.fire({
        icon: 'error',
        title: '가격이 입력되지 않았습니다.',
      });
      return;
    }
    if (!team) {
      Swal.fire({
        icon: 'error',
        title: '팀명이 입력되지 않았습니다.',
      });
      return;
    }
    if (!category) {
      Swal.fire({
        icon: 'error',
        title: '카테고리가 선택되지 않았습니다.',
      });
      return;
    }

    if (!imageFile) {
      Swal.fire({
        icon: 'error',
        title: '이미지가 선택되지 않았습니다.',
      });
      return;
    }

    try {
      setLoading(true);
      await addNewProduct();
      [setProductId, setProductName, setPrice, setTeam, setIsLatest, setCategory, setLike].forEach(setState =>
        setState(''),
      );
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('에러가 발생했습니다', error.message);
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  const handlePriceChange = e => {
    //문자 제거
    const checkNumber = e.target.value.replace(/[^0-9]/g, '');

    //숫자에 콤마 추가
    const formattedPrice = checkNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setPrice(formattedPrice);
  };

  return (
    <ModalWrapper style={{display: isModalOpen ? 'flex' : 'none'}}>
      {loading ? <Loading /> : null}
      <InputForm>
        <h2>제품 등록</h2>
        <InputFormLayout>
          <div class="image">
            <ImageContainer>
              {imagePreview ? (
                <ImagePreviewContainer>
                  <img src={imagePreview} alt="Preview" />
                </ImagePreviewContainer>
              ) : (
                <ImagePreviewContainer>
                  <p>
                    <FontAwesomeIcon icon={faImage} fontSize="100px" />
                  </p>
                </ImagePreviewContainer>
              )}
            </ImageContainer>
            <ScDivFileSelect>
              <ModalInput id="fileSelect" type="file" onChange={handleImgUpload} />
              <label htmlFor="fileSelect">사진 추가</label>
            </ScDivFileSelect>
          </div>
          <div class="content">
            <ModalContext>
              <ScDivContentLayout>
                <label>제품명 </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="제품명"
                />
              </ScDivContentLayout>

              <ScDivContentLayout>
                <label>가격 </label>
                <input type="text" value={price} onChange={handlePriceChange} placeholder="가격" />
              </ScDivContentLayout>

              <ScDivContentLayout>
                <label>카테고리</label>
                <ScDivRadioLayout>
                  <label>
                    <input
                      type="radio"
                      value="top"
                      onChange={e => setCategory(e.target.value)}
                      checked={category === 'top'}
                    />{' '}
                    TOP
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="bottom"
                      onChange={e => setCategory(e.target.value)}
                      checked={category === 'bottom'}
                    />{' '}
                    Bottom
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="acc"
                      onChange={e => setCategory(e.target.value)}
                      checked={category === 'acc'}
                    />{' '}
                    Accessories
                  </label>
                </ScDivRadioLayout>
              </ScDivContentLayout>

              <ScDivContentLayout>
                <label>신상품</label>
                <ScDivRadioLayout>
                  <label>
                    <input
                      type="radio"
                      value={true}
                      onChange={e => setIsLatest(e.target.value)}
                      checked={isLatest === 'true'}
                    />
                    사용
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={false}
                      onChange={e => setIsLatest(e.target.value)}
                      checked={isLatest === 'false'}
                    />{' '}
                    미사용
                  </label>
                </ScDivRadioLayout>
              </ScDivContentLayout>

              <ScDivContentLayout>
                <label>팀명</label>
                <input type="text" value={team} onChange={e => setTeam(e.target.value)} placeholder="팀명" />
              </ScDivContentLayout>
            </ModalContext>
          </div>
        </InputFormLayout>
        <ButtonContainer>
          <button onClick={handleUploadButton}>등록</button>
          <button onClick={handleCloseModal}>취소</button>
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
  width: 900px;
  height: 500px;
  z-index: 100;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 11 */
  border-radius: 12px;

  padding: 20px;
  &::-webkit-scrollbar {
    width: 6px; /* Chrome & Safari */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  & h2 {
    font-size: 24px;
    font-weight: 700;
    padding: 20px;
  }
`;

const InputFormLayout = styled.div`
  padding-top: 30px;
  display: flex;
  .image {
    flex-basis: 35%;
    padding-top: 20px;
  }
  .content {
    flex-basis: 65%;
  }
`;

const ModalContext = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ScDivContentLayout = styled.div`
  padding-left: 5px;
  display: flex;
  align-items: center;
  gap: 10px;

  & label {
    font-weight: 600;
    text-align: left;
    min-width: 65px;
  }

  & input {
    padding: 5px;
    width: 400px;

    border: none;
    border-bottom: 1px solid black;
  }

  & select {
    width: 400px;
    border: 1px solid black;
  }
`;

const ModalInput = styled.input``;

const ButtonContainer = styled.div`
  padding-top: 50px;
  gap: 10px;
  display: flex;
  justify-content: center;

  & button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    font-weight: 700;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
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
    object-fit: cover;
    width: 200px;
    height: 150px;
  }

  p {
    object-fit: cover;
    width: 200px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ScDivFileSelect = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row-reverse;
  align-items: center;
  padding-right: 10px;
  & input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  & label {
    border: 1px solid #1e1e1e;
    padding: 5px 14px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 15px;
    outline: none;
    cursor: pointer;
    width: 130px;
    text-align: center;

    &:hover {
      background-color: #1e1e1e;
      color: #fff;
      //box-shadow: none;
      border: none;
    }
  }
`;

const ScDivRadioLayout = styled.div`
  display: flex;
  flex-direction: wrap;
  gap: 3px;
  & label {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 0;

    & input {
      margin-right: 5px;
      width: 20px;
      font-size: 13px;
      font-weight: 0;
    }
  }
`;

export default ProductModal;
