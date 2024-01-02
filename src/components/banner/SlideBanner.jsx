import React, {useRef} from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lck1 from '../../assets/imgs/banners/Lck1.jpg';
import Lck2 from '../../assets/imgs/banners/Lck2.jpg';
import Lck3 from '../../assets/imgs/banners/Lck3.webp';
import Lck4 from '../../assets/imgs/banners/Lck4.jpg';
import ReactModal from 'react-modal';
import {useRecoilState} from 'recoil';
import {modalState} from '../../shared/recoil';
const SlideBanner = () => {
  const sliderRef = useRef(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };
  const handleSlideClick = () => {
    // 새 탭에서 예매 사이트로 이동
    window.open('https://tickets.interpark.com/contents/search?keyword=lck', '_blank'); // 실제 예매 사이트의 URL로 변경해야 합니다.
  };
  const handleclickoutube = () => {
    setModalOpen(true);
  };
  return (
    <ScSlideBanner>
      <Slider ref={sliderRef} {...settings}>
        <ScSlide>
          <img src={Lck1} alt="Lck1" />
        </ScSlide>
        <ScSlide>
          <img src={Lck2} onClick={handleclickoutube} alt="Lck2" />
        </ScSlide>
        <ScSlide>
          <img src={Lck3} alt="Lck3" />
        </ScSlide>
        <ScSlide onClick={handleSlideClick}>
          <img src={Lck4} alt="Lck4" />
        </ScSlide>
      </Slider>
      <ScButtonPrev onClick={goToPrev}>◁</ScButtonPrev>
      <ScButtonNext onClick={goToNext}>▷</ScButtonNext>
      {modalOpen && (
        <ScModal>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Nu9HTOIUxLk?si=PDpx19t6ytBB5vlp&amp;start=2"
            title="YouTube Arcane2 teaser"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <ScCloseButton onClick={() => setModalOpen(false)}>닫기</ScCloseButton>
        </ScModal>
      )}
    </ScSlideBanner>
  );
};

const ScSlideBanner = styled.div`
  position: relative;
  margin: 0 auto;
`;

const ScSlide = styled.div`
  img {
    width: 100%;
    height: 870px;
    object-fit: cover;
  }
`;

const ScButtonNext = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const ScButtonPrev = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
`;
const ScModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  max-width: 80%;
  width: 800px;

  iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 10px;
  }

  button {
    background-color: #80f080;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
`;
const ScCloseButton = styled.button``;
export default SlideBanner;
