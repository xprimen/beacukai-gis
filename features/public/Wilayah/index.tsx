import {
  Box,
  Heading,
  HStack,
  Link as LinkNB,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import Link from 'next/link';
import React from 'react';
import { Fade, Zoom } from 'react-awesome-reveal';
import { ImStatsDots } from 'react-icons/im';
import { IWilayah } from '../../../configs/types';

const index: React.FC<{ data: IWilayah[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const showData = () => {
    if (loading) {
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
        <HStack flexWrap="wrap" space="8" justifyContent="center">
          {data.map((d, index) => (
            <Link href={`/wilayah/${d.id}`} key={d.id} passHref>
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
                    <ImStatsDots fontSize={32} />
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
    <Box>
      <VStack py="16" px="16" alignItems="center">
        <Box mb="16">
          <Fade duration={1500}>
            <Heading>Wilayah</Heading>
          </Fade>
        </Box>
        {showData()}
      </VStack>
    </Box>
  );
};

export default index;
