import {
  AspectRatio,
  Box,
  Factory,
  HStack,
  Image as ImageNB,
  Text,
} from 'native-base';
import Image from 'next/image';
import React from 'react';
import { Autoplay, EffectFade, Navigation, Pagination, Virtual } from 'swiper';
import './Hero.module.scss';
import SlideshowNB from '../../../components/SlideshowNB/SlideshowNB';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

type ImageType = {
  title: string;
  imageUrl: string;
};

interface Props {
  images: ImageType[];
}

const index: React.FC<Props> = ({ images }) => {
  return (
    <HStack
      height={{
        base: '32',
        sm: '72',
        md: '400px',
        lg: '424px',
        xl: '900px',
      }}
    >
      {/* <ImageNB src="/images/slideshow/01.jpg" size="full" alt="asdasd" /> */}
      <Swiper
        style={{ flex: 1 }}
        spaceBetween={30}
        centeredSlides={true}
        speed={800}
        effect="fade"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <ImageNB
              src={image.imageUrl}
              width="full"
              height="full"
              alt={image.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </HStack>
  );
};

export default index;
