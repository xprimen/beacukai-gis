import React from 'react';
import { Avatar, Box, Button, HStack, Input, Text, VStack } from 'native-base';
import { NextPage } from 'next';
import LayoutAdmin from '../../layouts/Admin/LayoutAdmin';
import { FaSave } from 'react-icons/fa';

const profile: NextPage = () => {
  return (
    <LayoutAdmin>
      <HStack
        p={4}
        flex={1}
        justifyContent="flex-start"
        direction={['column', 'column', 'row']}
        space={4}
      >
        <VStack
          width={['full', 'full', '2/6']}
          justifyContent="center"
          alignItems="center"
          space={4}
          shadow={2}
          bg="white"
          p={4}
        >
          <Avatar size="2xl">A</Avatar>
          <Text bold>Admin</Text>
        </VStack>
        <VStack flex={1} space="4" shadow={2} bg="white" p={4}>
          <HStack alignItems="center" direction={['column', 'row']}>
            <Text width={['full', '2/6']}>Nama</Text>
            <Box flex={1} width="full">
              <Input placeholder="Nama" />
            </Box>
          </HStack>
          <HStack alignItems="center" direction={['column', 'row']}>
            <Text width={['full', '2/6']}>Username</Text>
            <Box flex={1} width="full">
              <Input placeholder="Username" />
            </Box>
          </HStack>
          <HStack alignItems="center" direction={['column', 'row']}>
            <Text width={['full', '2/6']}>Password</Text>
            <Box flex={1} width="full">
              <Input placeholder="Password" />
            </Box>
          </HStack>
          <HStack alignItems="center" space="1">
            <Button color="white" leftIcon={<FaSave size={12} />}>
              Simpan
            </Button>
            <Button color="white" colorScheme="muted">
              Reset
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </LayoutAdmin>
  );
};

export default profile;
