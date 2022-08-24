import React from 'react';
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import { useRouter } from 'next/router';
import LayoutAdmin from '../../../../layouts/Admin/LayoutAdmin';
import { IWilayah } from '../../../../configs/types';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { DBfire } from '../../../../configs/firebase/clientApp';

const index = () => {
  const router = useRouter();
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [nama, setNama] = React.useState('');

  const handleSubmit = async () => {
    setSaveLoading(true);
    if (nama) {
      const setServer = collection(DBfire, 'wilayah');
      const add = await addDoc(setServer, { nama });
      if (add.id) {
        alert('Wilayah Baru Berhasil Ditambahkan');
        router.push('/admin/wilayah');
      }
    }
    setSaveLoading(false);
  };

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Tambah Wilayah</Heading>
        <Button
          colorScheme="success"
          onPress={() => router.back()}
          leftIcon={<ArrowBackIcon />}
          size="md"
        >
          Kembali
        </Button>
      </HStack>
      <VStack
        p={4}
        shadow={2}
        bg="white"
        flex={1}
        justifyContent="flex-start"
        space={4}
      >
        <HStack alignItems="center">
          <Text w="48">Nama Wilayah</Text>
          <Input
            placeholder="Nama Wilayah"
            value={nama}
            flex={1}
            onChangeText={(v) => setNama(v)}
          />
        </HStack>
        <HStack>
          <Button
            isDisabled={saveLoading}
            isLoading={saveLoading}
            onPress={handleSubmit}
            colorScheme="primary"
          >
            Simpan
          </Button>
        </HStack>
      </VStack>
    </LayoutAdmin>
  );
};

export default index;
