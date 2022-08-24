import { NextPage } from 'next';
import React from 'react';
import LayoutPublic from '../layouts/Public/LayoutPublic';
import TitlePage from '../features/public/TitlePage';
import { Box, Heading, Text } from 'native-base';

const about: NextPage = () => {
  return (
    <LayoutPublic>
      <TitlePage title="Tentang Website" />
      <Box py={'16'} px={['8', '8', '16', '32', '56']}>
        <Heading mb="8" size="md">
          Sekilas Tentang Website ini
        </Heading>
        <Text textAlign="justify">
          Website ini Merupakan Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Enim, nihil porro? Voluptatem id fuga delectus
          officia porro laborum, recusandae maxime nobis aliquid, molestias
          quos. Nobis modi nostrum minima quaerat numquam!. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Illum suscipit totam rerum, a
          ducimus ipsum, labore, esse explicabo repudiandae perferendis commodi?
          Obcaecati accusantium, repellat corporis eaque dolores nobis iste ad.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates,
          numquam hic culpa quos asperiores dolore, quia, quae quibusdam a at
          aliquid recusandae ab vitae placeat fugiat nihil magnam commodi
          tempora.
        </Text>
      </Box>
    </LayoutPublic>
  );
};

export default about;
