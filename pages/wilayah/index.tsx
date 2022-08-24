import { collection, getDocs } from 'firebase/firestore';
import {
  Box,
  Heading,
  HStack,
  Link as LinkNB,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { DBfire } from '../../configs/firebase/clientApp';
import { IWilayah } from '../../configs/types';
import TitlePage from '../../features/public/TitlePage';
import LayoutPublic from '../../layouts/Public/LayoutPublic';

const index: NextPage = () => {
  const [dataWilayah, setDataWilayah] = React.useState<IWilayah[]>([]);
  const [wilayahLoading, setWilayahLoading] = React.useState(true);

  const getWilayah = async () => {
    const data = await getDocs(collection(DBfire, 'wilayah'));
    const ret = data.docs.map((doc) => {
      return {
        id: doc.id,
        nama: doc.data().nama,
      };
    });
    setDataWilayah(ret);
    setWilayahLoading(false);
  };

  React.useEffect(() => {
    getWilayah();
  }, []);

  const showData = () => {
    if (wilayahLoading) {
      return (
        <HStack flexWrap="wrap" space="8" justifyContent="center">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              alignItems="center"
              justifyContent="center"
              shadow="4"
              rounded="lg"
              h="32"
              w="32"
            />
          ))}
        </HStack>
      );
    } else if (!dataWilayah.length) {
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
        <HStack flexWrap="wrap" flex={1} space="16" justifyContent="center">
          {dataWilayah.map((d, index) => (
            <Link
              href={{
                pathname: `/wilayah/${d.id}`,
              }}
              key={d.id}
              passHref
            >
              <LinkNB>
                <Zoom delay={index * 200} duration={1200}>
                  <VStack
                    flex={1}
                    rounded="lg"
                    alignItems="center"
                    justifyContent="center"
                    shadow="4"
                    maxW="32"
                    maxH="32"
                    w="32"
                    h="32"
                    space="4"
                  >
                    <FaMapMarkedAlt fontSize={48} />
                    <Text textAlign="center" bold textTransform="uppercase">
                      {d.nama}
                    </Text>
                  </VStack>
                </Zoom>
              </LinkNB>
            </Link>
          ))}
        </HStack>
      );
    }
  };
  return (
    <LayoutPublic>
      <TitlePage title="Wilayah" />
      <VStack space="16" py="16" px={['8', '8', '16', '32', '56']}>
        <Box textAlign="center">
          <Fade direction="down">
            <Heading>Statistik Wilayah</Heading>
          </Fade>
        </Box>
        {showData()}
      </VStack>
    </LayoutPublic>
  );
};

export default index;
