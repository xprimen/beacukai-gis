import React from 'react';
import { NextPage } from 'next';
import { Box, Heading, HStack, Image, Text, View, VStack } from 'native-base';
import { useRouter } from 'next/router';
import LayoutPublic from '../../layouts/Public/LayoutPublic';
import TitlePage from '../../features/public/TitlePage';
import { collection, doc, getDoc } from 'firebase/firestore';
import { DBfire, Storage } from '../../configs/firebase/clientApp';
import { IBerita } from '../../configs/types';
import { getDownloadURL, ref } from 'firebase/storage';
import moment from 'moment';

const index: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [dataBerita, setDataBerita] = React.useState<IBerita>();
  const [beritaLoading, setBeritaLoading] = React.useState(true);
  const [newImage, setNewImage] = React.useState('');

  const getImage = async (imageName: string) => {
    // if (dataBerita) {
    const storageRef = ref(Storage, 'berita/' + imageName);
    const getUrl = await getDownloadURL(storageRef);
    setNewImage(getUrl);
    // }
  };

  const getBerita = async () => {
    if (id) {
      const data = await getDoc(doc(DBfire, '/berita', id.toString()));
      if (data.exists()) {
        getImage(data.data().image);
        setDataBerita({
          id: data.id,
          title: data.data().title,
          content: data.data().content,
          date: data.data().date.seconds * 1000,
          image: data.data().image,
        });
      }
      setBeritaLoading(false);
    }
  };

  React.useEffect(() => {
    getBerita();
  }, [id]);

  return (
    <LayoutPublic>
      <TitlePage title="Berita" />
      <VStack space="8" py="16" px={['8', '8', '16']}>
        <HStack h="lg" w="full">
          {!newImage && (
            <Image
              height="full"
              width="full"
              src="/images/no-image.png"
              alt="title"
            />
          )}
          {dataBerita && newImage && (
            <Image src={newImage} h="full" w="full" alt={dataBerita.title} />
          )}
        </HStack>
        {dataBerita && (
          <VStack space="4">
            <Text bold fontSize="xs" color="blue.700">
              {moment(dataBerita.date).format('D MMM YYYY')}
            </Text>
            <Heading size="lg">{dataBerita.title}</Heading>
            <Text dataDetectorType="link" textAlign="justify">
              <div dangerouslySetInnerHTML={{ __html: dataBerita.content }} />
            </Text>
          </VStack>
        )}
      </VStack>
    </LayoutPublic>
  );
};

export default index;
