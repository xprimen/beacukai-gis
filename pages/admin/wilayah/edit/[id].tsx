import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  ArrowBackIcon,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import { useRouter } from 'next/router';
import React from 'react';
import { DBfire } from '../../../../configs/firebase/clientApp';
import LayoutAdmin from '../../../../layouts/Admin/LayoutAdmin';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [nama, setNama] = React.useState('');

  const getWilayah = async () => {
    setWilayahLoading(true);
    try {
      const data = await getDoc(doc(DBfire, 'wilayah/' + id));
      if (data.exists()) {
        setNama(data.data().nama);
      }
    } catch (error) {
      // if (error.message == 'Missing or insufficient permissions.') {
      if (error) {
        router.push('/auth');
      }
    }
    setWilayahLoading(false);
  };

  const handleSubmit = async () => {
    setSaveLoading(true);
    if (nama) {
      const setServer = doc(DBfire, 'wilayah/' + id);
      const update = await updateDoc(setServer, { nama });
      alert('Wilayah Berhasil Di Update');
      router.push('/admin/wilayah');
    }
    setSaveLoading(false);
  };

  React.useEffect(() => {
    getWilayah();
  }, []);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Edit Wilayah</Heading>
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
        {wilayahLoading ? (
          <HStack>
            <Text>Loading...</Text>
          </HStack>
        ) : (
          <>
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
          </>
        )}
      </VStack>
    </LayoutAdmin>
  );
};

export default index;
