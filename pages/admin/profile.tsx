import React from 'react';
import { Avatar, Box, Button, HStack, Input, Text, VStack } from 'native-base';
import { NextPage } from 'next';
import LayoutAdmin from '../../layouts/Admin/LayoutAdmin';
import { FaSave } from 'react-icons/fa';
import { useAuth } from '../../services';
import {
  EmailAuthCredential,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../configs/firebase/clientApp';

const profile: NextPage = () => {
  const { user } = useAuth();
  const [name, setName] = React.useState<any>(user?.displayName);
  const [email, setEmail] = React.useState<any>(user?.email);
  const [password, setPassword] = React.useState<string>();
  const [error, setError] = React.useState<string>('');

  const handleSubmit = () => {
    if (password && password?.length < 6) {
      alert('Password minimal 6 karakter');
    } else {
      if (user && password) {
        updatePassword(user, password)
          .then(() => {
            alert('Password Berhasil Diperbaharui');
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }

    if (user && user.displayName !== name) {
      updateProfile(user, {
        displayName: name,
      })
        .then(() => alert('Nama Berhasil Diperbaharui'))
        .catch((error) => {
          alert(error.message);
        });
    }
  };

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
            <Text width={['full', '2/6']}>Username</Text>
            <Box flex={1} width="full">
              <Input
                placeholder="Email"
                value={email}
                editable={false}
                onChangeText={(v) => setEmail(v)}
              />
            </Box>
          </HStack>
          <HStack alignItems="center" direction={['column', 'row']}>
            <Text width={['full', '2/6']}>Nama</Text>
            <Box flex={1} width="full">
              <Input
                placeholder="Nama"
                value={name}
                onChangeText={(v) => setName(v)}
              />
            </Box>
          </HStack>
          <HStack alignItems="center" direction={['column', 'row']}>
            <Text width={['full', '2/6']}>Password</Text>
            <Box flex={1} width="full">
              <Input
                placeholder="Password"
                onChangeText={(v) => setPassword(v)}
              />
            </Box>
          </HStack>
          <HStack alignItems="center" space="1">
            <Button
              color="white"
              onPress={handleSubmit}
              leftIcon={<FaSave size={12} />}
            >
              Simpan
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </LayoutAdmin>
  );
};

export default profile;
