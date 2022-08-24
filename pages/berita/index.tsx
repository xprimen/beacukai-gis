import React from 'react';
import { Box, HStack, Skeleton, Stack, VStack } from 'native-base';
import { NextPage } from 'next';
import BeritaSingle from '../../features/public/BeritaSingle';
import TitlePage from '../../features/public/TitlePage';
import LayoutPublic from '../../layouts/Public/LayoutPublic';
import { Fade } from 'react-awesome-reveal';
import { collection, getDocs, query } from 'firebase/firestore';
import { DBfire } from '../../configs/firebase/clientApp';
import { IBerita } from '../../configs/types';

const index: NextPage = () => {
  const [dataBerita, setDataBerita] = React.useState<IBerita[]>([]);
  const [beritaLoading, setBeritaLoading] = React.useState(true);

  const getBerita = async () => {
    const data = await getDocs(query(collection(DBfire, 'berita')));
    const ret = data.docs.map((doc) => {
      return {
        id: doc.id,
        date: doc.data().date.seconds * 1000,
        title: doc.data().title,
        content: doc.data().content,
        image: doc.data().image,
      };
    });
    setDataBerita(ret);
    setBeritaLoading(false);
  };

  React.useEffect(() => {
    getBerita();
  }, []);

  return (
    <LayoutPublic>
      <TitlePage title="Berita" />
      <Stack
        direction="row"
        flexWrap="wrap"
        py="12"
        px={['8', '8', '16', '32', '56']}
        space="4"
      >
        <VStack space="8" flex={1}>
          {beritaLoading &&
            [...Array(10)].map((_, i) => (
              <HStack
                // key={i}
                // direction={['column', 'column', 'row']}
                flex={1}
                space="4"
                overflow="clip"
              >
                <Box w={['full', 'full', '1/4']} h={['48', 'sm', '48']}>
                  <Skeleton height="32" w="full" />
                </Box>
                <Box flex={1}>
                  <Skeleton height="32" w="full" />
                </Box>
              </HStack>
            ))}
          {dataBerita.map((d, i) => (
            <Fade key={i} direction="down" delay={i * 150} triggerOnce>
              <BeritaSingle data={d} />
            </Fade>
          ))}
        </VStack>
      </Stack>
    </LayoutPublic>
  );
};

export default index;
