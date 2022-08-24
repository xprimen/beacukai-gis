import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  endBefore,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore';
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
import { IWilayah } from '../../../configs/types';
import LayoutAdmin from '../../../layouts/Admin/LayoutAdmin';

const wilayah: NextPage = () => {
  const [dataWilayah, setDataWilayah] = React.useState<IWilayah[] | null>();
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [dataDocs, setDataDocs] = React.useState<QuerySnapshot<DocumentData>>();
  const [tablePage, setTablePage] = React.useState<number>(1);
  const limitTable = 10;

  const previousPageTable = async () => {
    setWilayahLoading(true);
    const lastVisible = dataDocs?.docs[0];
    const prev = await getDocs(
      query(
        collection(DBfire, 'wilayah'),
        orderBy('nama'),
        limit(limitTable),
        endBefore(lastVisible)
      )
    );
    // console.log(lastVisible, prev);
    if (!prev.empty && tablePage >= 0) {
      const ret = prev.docs.map((doc) => {
        return {
          id: doc.id,
          nama: doc.data().nama,
        };
      });
      setDataDocs(prev);
      setDataWilayah(ret);
      setTablePage(tablePage - 1);
    }
    setWilayahLoading(false);
  };

  const nextPageTable = async () => {
    setWilayahLoading(true);
    const lastVisible = dataDocs?.docs[dataDocs?.docs.length - 1];
    const next = await getDocs(
      query(
        collection(DBfire, 'wilayah'),
        orderBy('nama'),
        limit(limitTable),
        startAfter(lastVisible)
      )
    );
    if (!next.empty) {
      const ret = next.docs.map((doc) => {
        return {
          id: doc.id,
          nama: doc.data().nama,
        };
      });
      setDataDocs(next);
      setDataWilayah(ret);
      setTablePage(tablePage + 1);
    }
    setWilayahLoading(false);
  };

  const getWilayah = async () => {
    setWilayahLoading(true);
    try {
      const data = await getDocs(
        query(collection(DBfire, 'wilayah'), orderBy('nama'), limit(limitTable))
      );
      const ret = data.docs.map((doc) => {
        return {
          id: doc.id,
          nama: doc.data().nama,
        };
      });
      setDataDocs(data);
      setDataWilayah(ret);
    } catch (error) {
      // if (error.message == 'Missing or insufficient permissions.') {
      if (error) {
        router.push('/auth');
      }
    }
    setWilayahLoading(false);
  };

  const deleteData = async (id: string) => {
    if (confirm('Yakin Akan Menghapus Data ini?')) {
      if (id) {
        const deleteProcess = await deleteDoc(doc(DBfire, 'wilayah', id));
        console.log(deleteProcess);
        getWilayah();
      }
    }
  };

  React.useEffect(() => {
    getWilayah();
  }, [setDataWilayah]);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Data Wilayah</Heading>
        <Button
          color="white"
          onPress={() => router.push('/admin/wilayah/add')}
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
                <td>Nama Wilayah</td>
                <td style={{ textAlign: 'center' }}>Opsi</td>
              </tr>
            </thead>
            <tbody>
              {wilayahLoading ? (
                <tr>
                  <td colSpan={3}>
                    <Center>Loading...</Center>
                  </td>
                </tr>
              ) : (
                dataWilayah?.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <Center>{(tablePage - 1) * limitTable + 1 + i}</Center>
                    </td>
                    <td>{d.nama}</td>
                    <td>
                      <HStack
                        alignItems="center"
                        justifyContent="center"
                        space={1}
                      >
                        <Tooltip label="Edit" placement="top">
                          <IconButton
                            onPress={() =>
                              router.push(`/admin/wilayah/edit/${d.id}`)
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

export default wilayah;
