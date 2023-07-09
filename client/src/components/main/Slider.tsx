import React from 'react';
import ReactSlider, { Settings } from 'react-slick';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { PrevButton, NextButton } from '../styles/Slider.styled';

const DEFAULT_SETTINGS: Settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  swipe: true,
  draggable: false,
  prevArrow: (
    <PrevButton>
      <MdArrowBackIos />
    </PrevButton>
  ),
  nextArrow: (
    <NextButton>
      <MdArrowForwardIos />
    </NextButton>
  ),
};

interface Props {
  settings?: Settings;
  children: any;
}

const Slider: React.FC<Props> = ({ settings = DEFAULT_SETTINGS, children }) => {
  return <ReactSlider {...settings}>{children}</ReactSlider>;
};

export default Slider;
