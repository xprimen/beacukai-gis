import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from 'native-base';
import Image from 'next/image';
import React, { useRef } from 'react';

const index: React.FC = () => {
  return (
    <Box
      bg="blue.800"
      py="12"
      px="4"
      borderTopColor="yellow.400"
      borderTopWidth="2"
    >
      <HStack flexWrap="wrap" space="8">
        <HStack
          w={['full', 'full', '2/6']}
          height={{
            base: '32',
            md: 'auto',
          }}
        >
          <Image
            src="/images/logo_bc_plm.png"
            layout="fill"
            objectFit="contain"
            alt="Bea Cukai Palembang"
          />
        </HStack>
        <VStack flex={1}>
          <Heading size="md" color="yellow.400">
            KEMENTERIAN KEUANGAN
          </Heading>
          <Text color="yellow.400">
            DIREKTORAT JENDERAL BEA DAN CUKAI PALEMBANG
          </Text>
          <Text color="yellow.400">
            Kantor Pusat : Jl. Jenderal A Yani (By Pass) Rawamangun, Jakarta
            Timur - 13230
          </Text>
          <Text color="yellow.400">
            Kantor Palembang : Jl. Mayor Memet Sastrawirya Nomor 360, Boom Baru,
            Palembang, Sumatera Selatan, Indonesia
          </Text>
          <Text color="yellow.400">Telp : (0711) 710528</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default index;
