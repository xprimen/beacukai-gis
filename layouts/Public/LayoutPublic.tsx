import { Box, Center, Container, Text } from 'native-base';
import React from 'react';
import Hero from '../../features/public/Hero';

// const LayoutPublic: React.FC = ({ children }) => {
//   return (
//     <Center>
//       <Hero />
//       {/* <Container minW={['full', 'full', '5/6']} bg="coolGray.400">
//         <Text>dasdasd</Text>
//       </Container> */}
//     </Center>
//   );
// };

const imageToSlide: object[] = [
  {
    title: '01',
    imageUrl: '/images/slideshow/01.jpg',
  },
  {
    title: '02',
    imageUrl: '/images/slideshow/02.jpg',
  },
];

const LayoutPublic: React.FC = ({ children }) => {
  return <Hero images={imageToSlide} />;
};

export default LayoutPublic;
