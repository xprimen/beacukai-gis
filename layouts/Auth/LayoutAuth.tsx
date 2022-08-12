import { Center, useColorModeValue } from 'native-base';
import Image from 'next/image';
import React from 'react';

const LayoutAuth: React.FC = ({ children }) => {
  return (
    <Center
      position="relative"
      flex={1}
      bg={useColorModeValue(
        process.env.NEXT_PUBLIC_LIGHT_BG,
        process.env.NEXT_PUBLIC_DARK_BG
      )}
    >
      <Image
        src="/images/beacukaihd.jpeg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="BG-login"
      />
      {children}
    </Center>
  );
};

export default LayoutAuth;
