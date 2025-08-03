import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay,  Navigation } from 'swiper/modules';
import Image from 'next/image';
import A from "../components/img/alef.png"
import B from "../components/img/beh.png"
import C from "../components/img/ceh.jpg"


export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,  Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <Image src={A}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={B}/>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={C}/>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
}
