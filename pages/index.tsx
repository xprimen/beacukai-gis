import { collection, getDocs, limit, query } from 'firebase/firestore';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { DBfire } from '../configs/firebase/clientApp';
import { IBerita, IImageToSlide, IWilayah } from '../configs/types';
import Berita from '../features/public/Berita';
import Hero from '../features/public/Hero';
import Information from '../features/public/Information';
import Wilayah from '../features/public/Wilayah';
import LayoutPublic from '../layouts/Public/LayoutPublic';

const index: NextPage = () => {
  const imageToSlide: IImageToSlide[] = React.useMemo(
    () => [
      {
        title: '01',
        imageUrl: '/images/slideshow/01.jpg',
      },
      {
        title: '02',
        imageUrl: '/images/slideshow/02.jpg',
      },
    ],
    []
  );
  const [dataWilayah, setDataWilayah] = React.useState<IWilayah[]>([]);
  const [wilayahLoading, setWilayahLoading] = React.useState(true);
  const [dataBerita, setDataBerita] = React.useState<IBerita[]>([]);
  const [beritaLoading, setBeritaLoading] = React.useState(true);

  const getWilayah = async () => {
    const data = await getDocs(query(collection(DBfire, 'wilayah'), limit(5)));
    const ret = data.docs.map((doc) => {
      return {
        id: doc.id,
        nama: doc.data().nama,
      };
    });
    setDataWilayah(ret);
    setWilayahLoading(false);
  };

  const getBerita = async () => {
    const data = await getDocs(query(collection(DBfire, 'berita'), limit(5)));
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
    getWilayah();
    getBerita();
  }, []);

  return (
    <LayoutPublic>
      <Hero imageToSlide={imageToSlide} />
      <Information />
      <Wilayah data={dataWilayah} loading={wilayahLoading} />
      <Berita data={dataBerita} loading={beritaLoading} />
    </LayoutPublic>
  );
};

export default index;
