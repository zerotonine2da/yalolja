import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import {atom, useRecoilState} from 'recoil';
import T1Logo from '../assets/imgs/teamLogo/T1.png';
import GengLogo from '../assets/imgs/teamLogo/GengLogo.png';
import HanwhaLogo from '../assets/imgs/teamLogo/Hanwha.png';
import KawngDongLogo from '../assets/imgs/teamLogo/Kwangdong.png';
import BrionLogo from '../assets/imgs/teamLogo/Brion.png';
import DrxLogo from '../assets/imgs/teamLogo/Drx.png';
import NongsimLogo from '../assets/imgs/teamLogo/Nongsim.png';
import KtLogo from '../assets/imgs/teamLogo/KT.png';
import LilvLogo from '../assets/imgs/teamLogo/SandBox.png';
import DplusLogo from '../assets/imgs/teamLogo/Dplus.png';

const uniqueAutoplayState = atom({
  key: 'uniqueAutoplayState',
  default: true,
});

const TeamLogos = () => {
  const [autoPlay, setAutoPlay] = useRecoilState(uniqueAutoplayState);
  const [selectedLogo, setSelectedLogo] = React.useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: autoPlay,
    pauseOnHover: true,
  };

  const handleLogoClick = logo => {
    // 로고를 클릭하면 Recoil 상태 갱신
    setAutoPlay(!autoPlay);
    setSelectedLogo(logo);
  };

  return (
    <ScTeamLogos>
      <Slider {...sliderSettings}>
        {teamLogos.map((logo, index) => (
          <ScLogo key={index} onClick={() => handleLogoClick(logo)} selected={selectedLogo === logo}>
            <img src={logo} alt={`Team Logo ${index + 1}`} />
          </ScLogo>
        ))}
      </Slider>
    </ScTeamLogos>
  );
};

const ScTeamLogos = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  max-width: 60%;

  margin: 0 auto;
`;

const ScLogo = styled.div`
  cursor: pointer;
  img {
    width: 80%;
    height: 70px;
    border-radius: 8px;
    object-fit: contain;
    ${props =>
      props.selected &&
      `
    border: 2px solid black; 
  `}
  }
`;

const teamLogos = [
  T1Logo,
  GengLogo,
  HanwhaLogo,
  KawngDongLogo,
  BrionLogo,
  DrxLogo,
  NongsimLogo,
  KtLogo,
  LilvLogo,
  DplusLogo,
];

export default TeamLogos;
