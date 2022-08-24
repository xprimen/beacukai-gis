import { Box } from 'native-base';
import React from 'react';
import { MenuPublicType } from '../../configs/types';
import Footer from '../../features/public/Footer';
import Header from '../../features/public/Header';

const dataMenus: MenuPublicType[] = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'Wilayah',
    link: '/wilayah',
    // children: [
    //   {
    //     label: 'Sumbagsel',
    //     link: '/statistik/sumbagsel',
    //   },
    //   {
    //     label: 'Sumsel',
    //     link: '/statistik/sumsel',
    //   },
    //   {
    //     label: 'Jambi',
    //     link: '/statistik/jambi',
    //   },
    //   {
    //     label: 'Bangka',
    //     link: '/statistik/bangka',
    //   },
    //   {
    //     label: 'Belitung',
    //     link: '/statistik/belitung',
    //   },
    // ],
  },
  {
    label: 'Berita',
    link: '/berita',
  },
  {
    label: 'Tentang',
    link: '/about',
  },
];

const LayoutPublic: React.FC = ({ children }) => {
  return (
    <Box overflowY="auto" flex={1}>
      <Header dataMenus={dataMenus} />
      {children}
      <Footer />
    </Box>
  );
};

export default LayoutPublic;
