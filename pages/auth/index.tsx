import React from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Image as ImageNB,
} from 'native-base';
import { NextPage } from 'next';
import Image from 'next/image';
import { FaSignInAlt } from 'react-icons/fa';
import LayoutAuth from '../../layouts/Auth/LayoutAuth';

const index: NextPage = () => {
  return (
    <LayoutAuth>
      <Box
        flexDir="column"
        bg="blueGray.100"
        rounded="md"
        shadow="8"
        width={['xs', 'sm', 'md']}
        px="2"
        py="8"
        alignItems="center"
      >
        <Box w="24" mb="2" alignItems="center">
          <ImageNB src="/images/logo.png" size="md" alt="Logo" />
        </Box>
        <VStack flex={1} w="5/6" p={4}>
          <VStack space="2" mb="4">
            <Text bold width={['full', '2/6']}>
              Username
            </Text>
            <Box flex={1} width="full">
              <Input placeholder="Username" />
            </Box>
          </VStack>
          <VStack space="2" mb="8">
            <Text bold width={['full', '2/6']}>
              Password
            </Text>
            <Box flex={1} width="full">
              <Input placeholder="Password" />
            </Box>
          </VStack>
          <Button
            textTransform="uppercase"
            color="white"
            leftIcon={<FaSignInAlt size={12} />}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </LayoutAuth>
  );
};

export default index;
