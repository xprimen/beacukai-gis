import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  endBefore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  SnapshotOptions,
  startAfter,
} from 'firebase/firestore';
import { ObjectIteratee } from 'lodash';
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  ChevronRightIcon,
  Heading,
  HStack,
  IconButton,
  Text,
  theme,
  Tooltip,
  VStack,
} from 'native-base';
import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { DBfire } from '../../../configs/firebase/clientApp';
import { IPenerimaan, IWilayah } from '../../../configs/types';
import LayoutAdmin from '../../../layouts/Admin/LayoutAdmin';
import { numberToString } from '../../../helpers/number';

const penerimaan: NextPage = () => {
  const [dataPenerimaan, setDataPenerimaan] = React.useState<
    IPenerimaan[] | null | undefined
  >();
  const [penerimaanLoading, setPenerimaanLoading] = React.useState(true);
  const [dataDocs, setDataDocs] = React.useState<QuerySnapshot<DocumentData>>();
  const [tablePage, setTablePage] = React.useState<number>(1);
  const limitTable = 10;
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

  const previousPageTable = async () => {
    setPenerimaanLoading(true);
    const lastVisible = dataDocs?.docs[0];
    const prev = await getDocs(
      query(
        collection(DBfire, 'penerimaan'),
        orderBy('tahun', 'desc'),
        limit(limitTable),
        endBefore(lastVisible)
      )
    );
    // console.log(lastVisible, prev);
    if (!prev.empty && tablePage >= 0) {
      const ret = prev.docs.map(async (doc) => {
        const getWilayah: DocumentSnapshot<DocumentData> = await getDoc(
          doc.data().id_wilayah
        );
        let wilayah: IWilayah = {
          id: getWilayah.id,
          nama: getWilayah.get('nama'),
        };
        return {
          id: doc.id,
          tahun: doc.data().tahun,
          bulan: doc.data().bulan,
          wilayah,
          bea_masuk: doc.data().bea_masuk,
          bea_keluar: doc.data().bea_keluar,
          cukai: doc.data().cukai,
          komoditi: doc.data().komoditi,
        };
      });
      setDataDocs(prev);
      setDataPenerimaan(await Promise.all(ret));
      setTablePage(tablePage - 1);
    }
    setPenerimaanLoading(false);
  };

  const nextPageTable = async () => {
    setPenerimaanLoading(true);
    const lastVisible = dataDocs?.docs[dataDocs?.docs.length - 1];
    const next = await getDocs(
      query(
        collection(DBfire, 'penerimaan'),
        orderBy('tahun', 'desc'),
        limit(limitTable),
        startAfter(lastVisible)
      )
    );
    if (!next.empty) {
      const ret = next.docs.map(async (doc) => {
        const getWilayah: DocumentSnapshot<DocumentData> = await getDoc(
          doc.data().id_wilayah
        );
        let wilayah: IWilayah = {
          id: getWilayah.id,
          nama: getWilayah.get('nama'),
        };
        return {
          id: doc.id,
          tahun: doc.data().tahun,
          bulan: doc.data().bulan,
          wilayah,
          bea_masuk: doc.data().bea_masuk,
          bea_keluar: doc.data().bea_keluar,
          cukai: doc.data().cukai,
          komoditi: doc.data().komoditi,
        };
      });
      setDataDocs(next);
      setDataPenerimaan(await Promise.all(ret));
      setTablePage(tablePage + 1);
    }
    setPenerimaanLoading(false);
  };

  const getPenerimaan = async () => {
    setPenerimaanLoading(true);
    try {
      const data = await getDocs(
        query(
          collection(DBfire, 'penerimaan'),
          orderBy('tahun', 'desc'),
          limit(limitTable)
        )
      );
      const ret = data.docs.map(async (doc) => {
        const getWilayah: DocumentSnapshot<DocumentData> = await getDoc(
          doc.data().id_wilayah
        );
        let wilayah: IWilayah = {
          id: getWilayah.id,
          nama: getWilayah.get('nama'),
        };
        return {
          id: doc.id,
          tahun: doc.data().tahun,
          bulan: doc.data().bulan,
          wilayah,
          bea_masuk: doc.data().bea_masuk,
          bea_keluar: doc.data().bea_keluar,
          cukai: doc.data().cukai,
          komoditi: doc.data().komoditi,
        };
      });
      setDataDocs(data);
      setDataPenerimaan(await Promise.all(ret));
    } catch (error) {
      console.log(error);
      // if (error.message == 'Missing or insufficient permissions.') {
      // if (error) {
      //   router.push('/auth');
      // }
    }
    setPenerimaanLoading(false);
  };

  const deleteData = async (id: string) => {
    if (confirm('Yakin Akan Menghapus Data ini?')) {
      if (id) {
        const deleteProcess = await deleteDoc(doc(DBfire, 'penerimaan', id));
        getPenerimaan();
      }
    }
  };

  React.useEffect(() => {
    getPenerimaan();
  }, [setDataPenerimaan]);
  // console.log(dataPenerimaan);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Data Penerimaan</Heading>
        <Button
          color="white"
          onPress={() => router.push('/admin/penerimaan/add')}
          leftIcon={<FaPlus size={12} />}
          size="md"
        >
          Tambah
        </Button>
      </HStack>
      <HStack
        p={4}
        shadow={2}
        bg="white"
        flex={1}
        justifyContent="flex-start"
        direction={['column', 'column', 'row']}
        space={4}
      >
        <VStack flex={1} overflow="auto" space="4">
          <table className="table-data">
            <thead>
              <tr
                style={{
                  backgroundColor: theme.colors.blue[800],
                  color: 'white',
                }}
              >
                <td style={{ textAlign: 'center' }}>No.</td>
                <td>Tahun</td>
                <td>Bulan</td>
                <td>Wilayah</td>
                <td>Bea Masuk</td>
                <td>Bea Keluar</td>
                <td>Cukai</td>
                <td>Komoditi</td>
                <td style={{ textAlign: 'center' }}>Opsi</td>
              </tr>
            </thead>
            <tbody>
              {penerimaanLoading ? (
                <tr>
                  <td colSpan={9}>
                    <Center>Loading...</Center>
                  </td>
                </tr>
              ) : (
                dataPenerimaan?.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <Center>{(tablePage - 1) * limitTable + 1 + i}</Center>
                    </td>
                    <td>{d.tahun}</td>
                    <td>{bulans[d.bulan]}</td>
                    <td>{d.wilayah?.nama}</td>
                    <td>Rp {numberToString(d.bea_masuk)}</td>
                    <td>Rp {numberToString(d.bea_keluar)}</td>
                    <td>Rp {numberToString(d.cukai)}</td>
                    <td>Rp {numberToString(d.komoditi)}</td>
                    <td>
                      <HStack
                        alignItems="center"
                        justifyContent="center"
                        space={1}
                      >
                        <Tooltip label="Edit" placement="top">
                          <IconButton
                            onPress={() =>
                              router.push(`/admin/penerimaan/edit/${d.id}`)
                            }
                            size="sm"
                            colorScheme="success"
                            color="white"
                            variant="solid"
                            icon={<FaEdit size={12} />}
                          />
                        </Tooltip>
                        <Tooltip label="Delete" placement="top">
                          <IconButton
                            onPress={() => deleteData(d.id)}
                            size="sm"
                            colorScheme="danger"
                            color="white"
                            variant="solid"
                            icon={<FaTrash size={12} />}
                          />
                        </Tooltip>
                      </HStack>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <HStack flex={1} space="2">
            <Box>
              <IconButton
                onPress={previousPageTable}
                variant="outline"
                size="xs"
                icon={<ChevronLeftIcon />}
              />
            </Box>
            <Text>{tablePage}</Text>
            <Box>
              <IconButton
                onPress={nextPageTable}
                variant="outline"
                size="xs"
                icon={<ChevronRightIcon />}
              />
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </LayoutAdmin>
  );
};

export default penerimaan;
