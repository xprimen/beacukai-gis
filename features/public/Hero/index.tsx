import { HStack, Image as ImageNB } from 'native-base';
import React from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IImageToSlide } from '../../../configs/types';

const index: React.FC<{ imageToSlide: IImageToSlide[] }> = ({
  imageToSlide,
}) => {
  return (
    <HStack
      height={{
        base: '48',
        sm: '72',
        md: '400px',
        lg: '560px',
        xl: '1080px',
      }}
    >
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
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
      >
        {imageToSlide.map((image) => (
          <SwiperSlide key={image.title}>
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
