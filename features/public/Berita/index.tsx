import { getDownloadURL, listAll, ref } from 'firebase/storage';
import _ from 'lodash';
import moment from 'moment';
import {
  Box,
  Heading,
  HStack,
  Image as ImageNB,
  Link as LinkNB,
  Skeleton,
  Stack,
  Text,
  useMediaQuery,
} from 'native-base';
import Link from 'next/link';
import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Storage } from '../../../configs/firebase/clientApp';
import { IBerita } from '../../../configs/types';

const index: React.FC<{ data: IBerita[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const [isSmall] = useMediaQuery({
    minWidth: 0,
    maxWidth: 991,
  });
  const [isMiddle] = useMediaQuery({
    minWidth: 992,
    maxWidth: 1279,
  });

  const [listImages, setListImages] = React.useState<
    { imageName: string; url: string }[]
  >([]);

  const getImages = React.useCallback(async () => {
    const storageRef = ref(Storage, 'berita');
    const list = await listAll(storageRef);
    let imgs: { imageName: string; url: string }[] = [];
    list.items.forEach(async (imageRef) => {
      await getDownloadURL(imageRef).then((url) => {
        imgs.push({ imageName: imageRef.name, url: url });
      });
    });
    setListImages(imgs);
  }, []);

  const getImage = (imageName: string) => {
    if (listImages) {
      const image = _.find(listImages, (d) => {
        return d.imageName === imageName;
      });
      return image?.url;
    }
  };

  React.useEffect(() => {
    getImages();
  }, []);

  const showData = () => {
    if (loading) {
      return (
        <HStack alignItems="center" width="md" justifyContent="center">
          <Skeleton
            width="1/4"
            textAlign="center"
            shadow="3"
            height="32"
            roundedLeft="lg"
          />
          <Skeleton
            width="3/4"
            textAlign="center"
            shadow="3"
            height="32"
            roundedRight="lg"
          />
        </HStack>
      );
    } else if (!data.length) {
      return (
        <HStack alignItems="center" justifyContent="center">
          <Box
            width="md"
            textAlign="center"
            shadow="3"
            px="16"
            py="8"
            rounded="lg"
          >
            <Text bold color="primary.600">
              I'm Sorry We Have No Data
            </Text>
          </Box>
        </HStack>
      );
    } else {
      return (
        <Swiper
          style={{
            alignItems: 'center',
          }}
          slidesPerView={isSmall ? 1 : 2}
          spaceBetween={30}
          // centeredSlides={true}
          speed={1200}
          // effect="fade"
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          className="berita"
          pagination={{
            clickable: true,
          }}
          // navigation={true}
          modules={[Autoplay, Pagination]}
        >
          {data &&
            data.map((d, index) => (
              <SwiperSlide key={index}>
                <Link href={`/berita/${d.id}`} passHref>
                  <LinkNB>
                    <Stack
                      flex={1}
                      mb="12"
                      direction={{
                        base: 'column',
                        sm: 'row',
                        md: 'row',
                      }}
                      rounded="lg"
                      overflow="hidden"
                      shadow="1"
                      _light={{
                        backgroundColor: 'gray.100',
                      }}
                      _dark={{
                        backgroundColor: 'gray.700',
                      }}
                    >
                      <Box
                        w={{
                          base: 'full',
                          sm: '1/3',
                          md: '1/3',
                        }}
                        h={{
                          base: '48',
                          sm: 'full',
                          md: 'full',
                        }}
                      >
                        {!getImage(d.image) && (
                          <ImageNB
                            height="full"
                            width="full"
                            src="/images/no-image.png"
                            alt={d.image}
                          />
                        )}
                        {getImage(d.image) && (
                          <ImageNB
                            height="full"
                            width="full"
                            src={getImage(d.image)}
                            alt={d.image}
                          />
                          // <Image
                          //   // widht="100%"
                          //   // height="100%"
                          //   layout="fill"
                          //   objectFit="cover"
                          //   src={getImage(d.image)}
                          //   alt={d.title}
                          // />
                        )}
                      </Box>

                      <Stack flex="1" p="4" space={[3, 3, 1.5]}>
                        <Stack space="2">
                          <Heading size="md" ml="-1">
                            {d.title}
                          </Heading>
                          <Text
                            fontSize="xs"
                            color="blue.500"
                            fontWeight="500"
                            ml="-0.5"
                            mt="-1"
                          >
                            {moment(d.date).format('D MMM YYYY')}
                          </Text>
                        </Stack>
                        <Text fontWeight="400" textAlign="justify">
                          {d.content
                            .replace(/(<([^>]+)>)/gi, '')
                            .substring(0, isMiddle ? 100 : 350)}
                        </Text>
                      </Stack>
                    </Stack>
                  </LinkNB>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      );
    }
  };

  return (
    <Box alignItems="center" py="16" bg="coolGray.50">
      <Fade direction="up">
        <Heading>Berita</Heading>
      </Fade>
      <HStack
        mt="16"
        justifyContent="center"
        width="full"
        px={['4', '4', '32']}
      >
        {showData()}
      </HStack>
    </Box>
  );
};

export default index;
