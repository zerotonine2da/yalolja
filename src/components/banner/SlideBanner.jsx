import React, {useRef} from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lck1 from '../../assets/imgs/banners/Lck1.jpg';
import Lck2 from '../../assets/imgs/banners/Lck2.jpg';
import Lck3 from '../../assets/imgs/banners/Lck3.webp';

const SlideBanner = () => {
  const sliderRef = useRef(null);

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

  return (
    <ScSlideBanner>
      <Slider ref={sliderRef} {...settings}>
        <ScSlide>
          <img src={Lck1} alt="Lck1" />
        </ScSlide>
        <ScSlide>
          <img src={Lck2} alt="Lck2" />
        </ScSlide>
        <ScSlide>
          <img src={Lck3} alt="Lck3" />
        </ScSlide>
      </Slider>
      <ScButtonPrev onClick={goToPrev}>◁</ScButtonPrev>
      <ScButtonNext onClick={goToNext}>▷</ScButtonNext>
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

export default SlideBanner;
