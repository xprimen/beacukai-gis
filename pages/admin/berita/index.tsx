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
import moment from 'moment';
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
import { IBerita } from '../../../configs/types';
import LayoutAdmin from '../../../layouts/Admin/LayoutAdmin';

const berita: NextPage = () => {
  const [dataBerita, setDataBerita] = React.useState<IBerita[] | null>();
  const [beritaLoading, setBeritaLoading] = React.useState(true);
  const [dataDocs, setDataDocs] = React.useState<QuerySnapshot<DocumentData>>();
  const [tablePage, setTablePage] = React.useState<number>(1);
  const limitTable = 10;

  const previousPageTable = async () => {
    setBeritaLoading(true);
    const lastVisible = dataDocs?.docs[0];
    const prev = await getDocs(
      query(
        collection(DBfire, 'berita'),
        orderBy('date', 'desc'),
        limit(limitTable),
        endBefore(lastVisible)
      )
    );
    // console.log(lastVisible, prev);
    if (!prev.empty && tablePage >= 0) {
      const ret = prev.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          image: doc.data().image,
          date: doc.data().date.seconds * 1000,
        };
      });
      setDataDocs(prev);
      setDataBerita(ret);
      setTablePage(tablePage - 1);
    }
    setBeritaLoading(false);
  };

  const nextPageTable = async () => {
    setBeritaLoading(true);
    const lastVisible = dataDocs?.docs[dataDocs?.docs.length - 1];
    const next = await getDocs(
      query(
        collection(DBfire, 'berita'),
        orderBy('date', 'desc'),
        limit(limitTable),
        startAfter(lastVisible)
      )
    );
    if (!next.empty) {
      const ret = next.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          image: doc.data().image,
          date: doc.data().date.seconds * 1000,
        };
      });
      setDataDocs(next);
      setDataBerita(ret);
      setTablePage(tablePage + 1);
    }
    setBeritaLoading(false);
  };

  const getBerita = async () => {
    setBeritaLoading(true);
    try {
      const data = await getDocs(
        query(
          collection(DBfire, 'berita'),
          orderBy('date', 'desc'),
          limit(limitTable)
        )
      );
      const ret = data.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          image: doc.data().image,
          date: doc.data().date.seconds * 1000,
        };
      });
      setDataDocs(data);
      setDataBerita(ret);
    } catch (error) {
      // if (error.message == 'Missing or insufficient permissions.') {
      if (error) {
        router.push('/auth');
      }
    }
    setBeritaLoading(false);
  };

  const deleteData = async (id: string) => {
    if (confirm('Yakin Akan Menghapus Data ini?')) {
      if (id) {
        const deleteProcess = await deleteDoc(doc(DBfire, 'berita', id));
        console.log(deleteProcess);
        getBerita();
      }
    }
  };

  React.useEffect(() => {
    getBerita();
  }, [setDataBerita]);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Data Berita</Heading>
        <Button
          color="white"
          onPress={() => router.push('/admin/berita/add')}
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
                <td>Tanggal</td>
                <td>Judul Berita</td>
                <td style={{ textAlign: 'center' }}>Opsi</td>
              </tr>
            </thead>
            <tbody>
              {beritaLoading ? (
                <tr>
                  <td colSpan={4}>
                    <Center>Loading...</Center>
                  </td>
                </tr>
              ) : (
                dataBerita?.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <Center>{(tablePage - 1) * limitTable + 1 + i}</Center>
                    </td>
                    <td>{moment(d.date).format('D MMM YYYY')}</td>
                    <td>{d.title}</td>
                    <td>
                      <HStack
                        alignItems="center"
                        justifyContent="center"
                        space={1}
                      >
                        <Tooltip label="Edit" placement="top">
                          <IconButton
                            onPress={() =>
                              router.push(`/admin/berita/edit/${d.id}`)
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

export default berita;
