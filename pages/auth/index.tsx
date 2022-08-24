import {
  Box,
  Button,
  Image as ImageNB,
  Input,
  Text,
  VStack,
} from 'native-base';
import { NextPage } from 'next';
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import LayoutAuth from '../../layouts/Auth/LayoutAuth';
import { useAuth } from '../../services';

const index: NextPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const { login, loading } = useAuth();

  const handleLogin = () => {
    login(email, password);
  };

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
              <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
            </Box>
          </VStack>
          <VStack space="2" mb="8">
            <Text bold width={['full', '2/6']}>
              Password
            </Text>
            <Box flex={1} width="full">
              <Input
                placeholder="Password"
                type="password"
                onChangeText={setPassword}
              />
            </Box>
          </VStack>
          <Button
            textTransform="uppercase"
            color="white"
            isLoading={loading}
            isDisabled={loading}
            leftIcon={<FaSignInAlt size={12} />}
            onPress={handleLogin}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </LayoutAuth>
  );
};

export default index;
