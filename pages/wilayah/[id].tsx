import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import _ from 'lodash';
import moment from 'moment';
import {
  Box,
  ChevronDownIcon,
  Heading,
  HStack,
  Menu,
  Pressable,
  Skeleton,
  Text,
  theme,
  VStack,
} from 'native-base';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { DBfire } from '../../configs/firebase/clientApp';
import { IDataPnerimaan, IPenerimaan, IWilayah } from '../../configs/types';
import TitlePage from '../../features/public/TitlePage';
import LayoutPublic from '../../layouts/Public/LayoutPublic';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const index: NextPage = () => {
  const router = useRouter();
  const id: string | string[] | undefined = router.query.id;
  const [tahunSelected, setTahunSelected] = React.useState(
    parseInt(moment().format('YYYY'), 10)
  );
  const [selectedWilayahText, setSelectedWilayahText] = React.useState('');

  const [dataWilayah, setDataWilayah] = React.useState<IWilayah[]>([]);
  const [dataPenerimaan, setDataPenerimaan] = React.useState<IDataPnerimaan>();
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [penerimaanLoading, setPenerimaanLoading] = React.useState(true);
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

  const options = React.useMemo(
    () => ({
      responsive: true,
    }),
    []
  );

  const showListTahun = React.useCallback(
    () =>
      _.range(parseInt(moment().format('YYYY'), 10), 2017).map(
        (a: number, i: number) => {
          return (
            <Menu.ItemOption value={a} key={i}>
              {a.toString()}
            </Menu.ItemOption>
          );
        }
      ),
    []
  );

  const getWilayah = async () => {
    const data = await getDocs(collection(DBfire, 'wilayah'));
    const ret = data.docs.map((doc) => {
      if (doc.id === id) {
        setSelectedWilayahText(doc.data().nama);
      }
      return {
        id: doc.id,
        nama: doc.data().nama,
      };
    });
    setDataWilayah(ret);
    setWilayahLoading(false);
  };

  const getPenerimaan = async () => {
    const q = query(
      collection(DBfire, 'penerimaan'),
      where('id_wilayah', '==', doc(DBfire, '/wilayah/' + id)),
      where('tahun', '==', tahunSelected)
    );
    const data = await getDocs(q);
    const ret = data.docs.map((doc) => {
      const newData = doc.data();
      const set: IPenerimaan = {
        id: doc.id,
        bea_keluar: newData.bea_keluar,
        bea_masuk: newData.bea_masuk,
        cukai: newData.cukai,
        komoditi: newData.komoditi,
        bulan: newData.bulan,
        tahun: newData.tahun,
      };
      return set;
    });
    const bea_masuk = {
      labels: bulans,
      datasets: [
        {
          //   label: 'Bea Masuk ' + tahunSelected,
          data: ret.map((d) => d.bea_masuk),
          backgroundColor: theme.colors.blue[700],
        },
      ],
    };
    const bea_keluar = {
      labels: bulans,
      datasets: [
        {
          //   label: 'Bea Keluar ' + tahunSelected,
          data: ret.map((d) => d.bea_keluar),
          backgroundColor: theme.colors.red[700],
        },
      ],
    };
    const cukai = {
      labels: bulans,
      datasets: [
        {
          //   label: 'Cukai ' + tahunSelected,
          data: ret.map((d) => d.cukai),
          backgroundColor: theme.colors.green[700],
        },
      ],
    };
    const komoditi = {
      labels: bulans,
      datasets: [
        {
          //   label: 'Bea Keluar ' + tahunSelected,
          data: ret.map((d) => d.komoditi),
          backgroundColor: theme.colors.yellow[700],
        },
      ],
    };
    setDataPenerimaan({
      bea_masuk,
      bea_keluar,
      cukai,
      komoditi,
    });
    setPenerimaanLoading(false);
  };

  React.useEffect(() => {
    getWilayah();
    if (id) getPenerimaan();
  }, [id, tahunSelected, setDataWilayah, setDataPenerimaan]);

  return (
    <LayoutPublic>
      <TitlePage
        title={
          !wilayahLoading
            ? selectedWilayahText
              ? 'Wilayah ' + selectedWilayahText
              : ''
            : '...'
        }
      />
      <VStack space="16" py="16" px={['8', '8', '16', '32', '48']}>
        {wilayahLoading ? (
          <VStack flex={1} space="8">
            <Skeleton />
            <HStack
              flexWrap="wrap"
              justifyContent="end"
              alignItems="center"
              space="4"
            >
              <Skeleton h="8" w="16" />
              <Skeleton h="8" w="16" />
            </HStack>
            <HStack
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              flex={1}
            >
              <Box
                w="1/2"
                width={['full', 'full', 'full', 'full', '1/2']}
                height="sm"
                alignItems="center"
                p="4"
              >
                <Skeleton flex={1} />
              </Box>
              <Box
                w="1/2"
                width={['full', 'full', 'full', 'full', '1/2']}
                height="sm"
                alignItems="center"
                p="4"
              >
                <Skeleton flex={1} />
              </Box>
              <Box
                w="1/2"
                width={['full', 'full', 'full', 'full', '1/2']}
                height="sm"
                alignItems="center"
                p="4"
              >
                <Skeleton flex={1} />
              </Box>
              <Box
                w="1/2"
                width={['full', 'full', 'full', 'full', '1/2']}
                height="sm"
                alignItems="center"
                p="4"
              >
                <Skeleton flex={1} />
              </Box>
            </HStack>
          </VStack>
        ) : (
          <VStack flex={1} space="8">
            <Heading size="md" textAlign="center">
              Statistik Penerimaan Negara Bea Cukai Wilayah{' '}
              {selectedWilayahText}
            </Heading>
            <HStack justifyContent="end" space="4" alignItems="center">
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <HStack
                        alignItems="center"
                        space="4"
                        shadow={2}
                        px="4"
                        py="2"
                      >
                        <Text>{tahunSelected}</Text> <ChevronDownIcon />
                      </HStack>
                    </Pressable>
                  );
                }}
              >
                <Menu.OptionGroup
                  type="radio"
                  title="Tahun"
                  defaultValue={tahunSelected}
                  onChange={(val) => {
                    setTahunSelected(val);
                  }}
                >
                  {showListTahun()}
                </Menu.OptionGroup>
              </Menu>
              <Menu
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <HStack
                        alignItems="center"
                        space="4"
                        shadow={2}
                        px="4"
                        py="2"
                      >
                        <Text>
                          {!wilayahLoading ? selectedWilayahText : 'loading'}
                        </Text>{' '}
                        <ChevronDownIcon />
                      </HStack>
                    </Pressable>
                  );
                }}
              >
                <Menu.OptionGroup
                  type="radio"
                  title="Wilayah"
                  defaultValue={id}
                  onChange={(val) => {
                    //   redirect(val);
                    //   setSelectedWilayahID(val);
                    router.push('/wilayah/' + val);
                  }}
                >
                  {dataWilayah?.map((d) => (
                    <Menu.ItemOption key={d.id} value={d.id}>
                      {d.nama}
                    </Menu.ItemOption>
                  ))}
                </Menu.OptionGroup>
              </Menu>
            </HStack>
            <HStack flex={1} flexWrap="wrap" justifyContent="center">
              <HStack
                width={['full', 'full', 'full', 'full', '1/2']}
                alignItems="center"
                p="4"
              >
                <Box shadow="4" flex={1} p="4">
                  {!penerimaanLoading && dataPenerimaan && (
                    <Bar options={options} data={dataPenerimaan.bea_masuk} />
                  )}
                  <Text bold textAlign="center">
                    Pertumbuhan Bea Masuk (Import)
                  </Text>
                </Box>
              </HStack>
              <HStack
                width={['full', 'full', 'full', 'full', '1/2']}
                alignItems="center"
                p="4"
              >
                <Box shadow="4" flex={1} p="4">
                  {!penerimaanLoading && dataPenerimaan && (
                    <Bar options={options} data={dataPenerimaan.bea_keluar} />
                  )}
                  <Text bold textAlign="center">
                    Pertumbuhan Bea Keluar (Export)
                  </Text>
                </Box>
              </HStack>
              <HStack
                width={['full', 'full', 'full', 'full', '1/2']}
                alignItems="center"
                p="4"
              >
                <Box shadow="4" flex={1} p="4">
                  {!penerimaanLoading && dataPenerimaan && (
                    <Bar options={options} data={dataPenerimaan.komoditi} />
                  )}
                  <Text bold textAlign="center">
                    Pertumbuhan Komoditi
                  </Text>
                </Box>
              </HStack>
              <HStack
                width={['full', 'full', 'full', 'full', '1/2']}
                alignItems="center"
                p="4"
              >
                <Box shadow="4" flex={1} p="4">
                  {!penerimaanLoading && dataPenerimaan && (
                    <Bar options={options} data={dataPenerimaan.cukai} />
                  )}
                  <Text bold textAlign="center">
                    Pertumbuhan Cukai
                  </Text>
                </Box>
              </HStack>
            </HStack>
          </VStack>
        )}
      </VStack>
    </LayoutPublic>
  );
};

export default index;
