import { Box, Heading, HStack, Text, VStack } from 'native-base';
import Image from 'next/image';
import React from 'react';
import { Fade, Flip, Slide } from 'react-awesome-reveal';

const index: React.FC = () => {
  return (
    <Box
      bg="blue.800"
      borderTopColor="yellow.400"
      borderTopWidth="2"
      borderBottomColor="yellow.400"
      borderBottomWidth="2"
    >
      <HStack px="4" py="24" justifyContent="center" flexWrap="wrap">
        <VStack
          mb="16"
          w={['full', 'full', 'full', '1/2']}
          justifyContent="center"
          textAlign="center"
        >
          <Fade direction="up" duration={1500}>
            <Heading color="yellow.400">Geographic Information Systems</Heading>
          </Fade>
          <Flip direction="horizontal" duration={1500} delay={1000}>
            <Text color="yellow.200">
              Akses informasi penerimaan dan pertumbuhan ekonomi negara
            </Text>
          </Flip>
        </VStack>
        <Box w={['full', 'full', '1/2']}>
          <Slide direction="right" duration={1800}>
            <Box h="xl" w="full">
              <Image
                src="/images/Statistics.png"
                layout="fill"
                objectFit="contain"
                alt="Statistik"
              />
            </Box>
          </Slide>
        </Box>
      </HStack>
    </Box>
  );
};

export default index;
