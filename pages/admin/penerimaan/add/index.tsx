import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import _ from 'lodash';
import {
  ArrowBackIcon,
  Button,
  ChevronDownIcon,
  Heading,
  HStack,
  Input,
  Menu,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { useRouter } from 'next/router';
import React from 'react';
import { DBfire } from '../../../../configs/firebase/clientApp';
import { IWilayah } from '../../../../configs/types';
import LayoutAdmin from '../../../../layouts/Admin/LayoutAdmin';

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [penerimaanLoading, setPenerimaanLoading] = React.useState(true);
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [wilayah, setWilayah] = React.useState<any>();
  const [IDwilayah, setIDWilayah] = React.useState<string | undefined>();
  const [selectedWilayah, setSelectedWilayah] = React.useState<string>();
  const [tahun, setTahun] = React.useState<string | undefined>();
  const [bulan, setBulan] = React.useState<string | undefined>();
  const [bea_masuk, setBea_masuk] = React.useState<string | undefined>();
  const [bea_keluar, setBea_keluar] = React.useState<string | undefined>();
  const [cukai, setCukai] = React.useState<string | undefined>();
  const [komoditi, setKomoditi] = React.useState<string | undefined>();
  const bulans = React.useMemo(
    () => [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ],
    []
  );

  /* const getPenerimaan = async () => {
    setPenerimaanLoading(true);
    try {
      const data = await getDoc(doc(DBfire, 'penerimaan/' + id));
      if (data.exists()) {
        const getWilayah: DocumentSnapshot<DocumentData> = await getDoc(
          data.data().id_wilayah
        );
        setSelectedWilayah(getWilayah?.data()?.nama);
        setTahun(data.data().tahun);
        setBulan(data.data().bulan);
        setIDWilayah(getWilayah.id);
        setBea_masuk(data.data().bea_masuk);
        setBea_keluar(data.data().bea_keluar);
        setCukai(data.data().cukai);
        setKomoditi(data.data().komoditi);
      }
    } catch (error) {
      // if (error.message == 'Missing or insufficient permissions.') {
      if (error) {
        router.push('/auth');
      }
    }
    setPenerimaanLoading(false);
  }; */

  const getWilayah = async () => {
    setWilayahLoading(true);
    try {
      const data = await getDocs(collection(DBfire, 'wilayah'));
      const ret = data.docs.map((doc) => {
        return {
          id: doc.id,
          nama: doc.data().nama,
        };
      });
      setWilayah(ret);
    } catch (error) {
      console.log(error);
    }
    setWilayahLoading(false);
  };

  const handleSubmit = async () => {
    setSaveLoading(true);
    const setServer = collection(DBfire, 'penerimaan');
    const update = await addDoc(setServer, {
      tahun: Number(tahun),
      bulan: Number(bulan),
      id_wilayah: doc(DBfire, '/wilayah/' + IDwilayah),
      bea_masuk: Number(bea_masuk),
      bea_keluar: Number(bea_keluar),
      cukai: Number(cukai),
      komoditi: Number(komoditi),
    });
    alert('Penerimaan Berhasil Di Update');
    router.push('/admin/penerimaan');
    setSaveLoading(false);
  };

  React.useEffect(() => {
    getWilayah();
  }, []);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Tambah Penerimaan</Heading>
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
          <Text w="48">Tahun</Text>
          <Input value={tahun} flex={1} onChangeText={(v) => setTahun(v)} />
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Bulan</Text>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable
                  flex={1}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <HStack
                    // flex={1}
                    p="4"
                    shadow={4}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {bulan ? bulans[parseInt(bulan, 10)] : 'Pilih Bulan'}
                    <ChevronDownIcon />
                  </HStack>
                </Pressable>
              );
            }}
          >
            <Menu.OptionGroup
              type="radio"
              title="Bulan"
              defaultValue={bulan}
              onChange={(val) => {
                setBulan(val);
              }}
            >
              {bulans.map((d, i) => (
                <Menu.ItemOption key={i} value={i}>
                  {d}
                </Menu.ItemOption>
              ))}
            </Menu.OptionGroup>
          </Menu>
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Wilayah</Text>
          <Menu
            trigger={(triggerProps) => {
              return (
                <Pressable
                  flex={1}
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <HStack
                    // flex={1}
                    p="4"
                    shadow={4}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {selectedWilayah ? selectedWilayah : 'Pilih Wilayah'}
                    <ChevronDownIcon />
                  </HStack>
                </Pressable>
              );
            }}
          >
            <Menu.OptionGroup
              type="radio"
              title="Tahun"
              defaultValue={IDwilayah}
              onChange={(val) => {
                setIDWilayah(val);
                const getWilayah = _.find(wilayah, (d) => d.id === val);
                setSelectedWilayah(getWilayah?.nama);
              }}
            >
              {wilayah &&
                wilayah.map((d: { id: string; nama: string }, i: number) => (
                  <Menu.ItemOption flex={1} value={d.id} key={i}>
                    {d.nama}
                  </Menu.ItemOption>
                ))}
            </Menu.OptionGroup>
          </Menu>
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Bea Masuk</Text>
          <Input
            value={bea_masuk}
            flex={1}
            onChangeText={(v) => setBea_masuk(v)}
          />
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Bea Keluar</Text>
          <Input
            value={bea_keluar}
            flex={1}
            onChangeText={(v) => setBea_keluar(v)}
          />
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Cukai</Text>
          <Input value={cukai} flex={1} onChangeText={(v) => setCukai(v)} />
        </HStack>
        <HStack alignItems="center">
          <Text w="48">Komoditi</Text>
          <Input
            value={komoditi}
            flex={1}
            onChangeText={(v) => setKomoditi(v)}
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
