import React from 'react';
import ReactSlider, { Settings } from 'react-slick';

const DEFAULT_SETTINGS: Settings = {
  dots: true, // dots를 표시
  arrows: false, // 이전/다음 버튼 숨김
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
  draggable: false,
  autoplay: true, // 자동으로 넘어감
  autoplaySpeed: 3000, // 3초마다 자동 넘김
};

interface Props {
  settings?: Settings;
  children: React.ReactNode;
}

const MonthSlider: React.FC<Props> = ({
  settings = DEFAULT_SETTINGS,
  children,
}) => {
  return <ReactSlider {...settings}>{children}</ReactSlider>;
};

export default MonthSlider;
