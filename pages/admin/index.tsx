import React from 'react';
import { Heading, Text, VStack } from 'native-base';
import { NextPage } from 'next';
import LayoutAdmin from '../../layouts/Admin/LayoutAdmin';

const index: NextPage = () => {
  return (
    <LayoutAdmin>
      <VStack
        p={4}
        shadow={2}
        bg="white"
        flex={1}
        justifyContent="flex-start"
        space={4}
      >
        <Heading>Selamat Datang Admin</Heading>
        <Text>
          Di Halaman Administrator ini Anda Dapat Mengelola Data. Silahkan Pilih
          Menu di Samping.
        </Text>
      </VStack>
    </LayoutAdmin>
  );
};

export default index;
