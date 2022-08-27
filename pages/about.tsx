import { NextPage } from 'next';
import React from 'react';
import LayoutPublic from '../layouts/Public/LayoutPublic';
import TitlePage from '../features/public/TitlePage';
import { Box, Heading, Text } from 'native-base';

const about: NextPage = () => {
  return (
    <LayoutPublic>
      <TitlePage title="Tentang Website" />
      <Box py={'16'} px={['8', '8', '16', '32', '56']}>
        <Heading mb="8" size="md">
          Sekilas Tentang Website ini
        </Heading>
        <Text textAlign="justify">
          Website ini merupakan website informasi kantor wilayah djbc sumbagtim
          yang masih bersifat uji coba. Segala fitur yang dimiliki akan terus
          dievaluasi untuk dilakukan peningkatan di kemudian hari. Untuk info
          lebih lanjut hubungi: (Telp) 0711-362781
        </Text>
      </Box>
    </LayoutPublic>
  );
};

export default about;
