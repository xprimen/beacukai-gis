import {
  Box,
  Divider,
  HStack,
  Link as LinkNB,
  Text,
  theme,
  useColorModeValue,
  VStack,
} from 'native-base';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsGraphUp } from 'react-icons/bs';
import { FaHome, FaMap, FaNewspaper } from 'react-icons/fa';

// const data: Menu[] = [
//   { id: 1, link: '/admin', label: 'Home' },
//   { id: 2, link: '/admin/profile', label: 'Profile' },
// ];

const Menus: React.FC = () => {
  const bgColor = useColorModeValue(
    process.env.NEXT_PUBLIC_LIGHT_BG,
    'gray.700'
  );
  const iconColor = useColorModeValue(
    theme.colors.darkText,
    theme.colors.lightText
  );

  return (
    <VStack>
      <HStack
        width={[280, 280, 260, 270]}
        flex={1}
        alignItems="center"
        justifyContent="center"
        position="relative"
        alignSelf="center"
        maxH="80px"
      >
        <Image
          src="/images/logo-text.png"
          layout="fill"
          objectFit="contain"
          alt="Logo"
        />
      </HStack>
      <Divider />
      <Box flex={1}>
        <Link href="/admin" passHref>
          <LinkNB
            px={4}
            py={4}
            bg={bgColor}
            borderBottomWidth={1}
            _dark={{
              borderColor: 'gray.900',
            }}
            _light={{
              borderColor: 'gray.300',
            }}
            _hover={{
              _light: {
                bg: 'warmGray.200',
              },
              _dark: {
                bg: 'gray.600',
              },
            }}
          >
            <HStack alignItems="center" space="2">
              <Box color="white">
                <FaHome color={iconColor} />
              </Box>
              <Text>Home</Text>
            </HStack>
          </LinkNB>
        </Link>
        <Link href="/admin/wilayah" passHref>
          <LinkNB
            px={4}
            py={4}
            bg={bgColor}
            borderBottomWidth={1}
            _dark={{
              borderColor: 'gray.900',
            }}
            _light={{
              borderColor: 'gray.300',
            }}
            _hover={{
              _light: {
                bg: 'warmGray.200',
              },
              _dark: {
                bg: 'gray.600',
              },
            }}
          >
            <HStack alignItems="center" space="2">
              <Box color="white">
                <FaMap color={iconColor} />
              </Box>
              <Text>Wilayah</Text>
            </HStack>
          </LinkNB>
        </Link>
        {/* <Link href="/admin/jenis-penerimaan" passHref>
          <LinkNB
            px={4}
            py={4}
            bg={bgColor}
            borderBottomWidth={1}
            _dark={{
              borderColor: 'gray.900',
            }}
            _light={{
              borderColor: 'gray.300',
            }}
            _hover={{
              _light: {
                bg: 'warmGray.200',
              },
              _dark: {
                bg: 'gray.600',
              },
            }}
          >
            <HStack alignItems="center" space="2">
              <Box color="white">
                <MdOutlineInput color={iconColor} />
              </Box>
              <Text>Jenis Penerimaan</Text>
            </HStack>
          </LinkNB>
        </Link> */}
        <Link href="/admin/penerimaan" passHref>
          <LinkNB
            px={4}
            py={4}
            bg={bgColor}
            borderBottomWidth={1}
            _dark={{
              borderColor: 'gray.900',
            }}
            _light={{
              borderColor: 'gray.300',
            }}
            _hover={{
              _light: {
                bg: 'warmGray.200',
              },
              _dark: {
                bg: 'gray.600',
              },
            }}
          >
            <HStack alignItems="center" space="2">
              <Box color="white">
                <BsGraphUp color={iconColor} />
              </Box>
              <Text>Penerimaan</Text>
            </HStack>
          </LinkNB>
        </Link>
        <Link href="/admin/berita" passHref>
          <LinkNB
            px={4}
            py={4}
            bg={bgColor}
            borderBottomWidth={1}
            _dark={{
              borderColor: 'gray.900',
            }}
            _light={{
              borderColor: 'gray.300',
            }}
            _hover={{
              _light: {
                bg: 'warmGray.200',
              },
              _dark: {
                bg: 'gray.600',
              },
            }}
          >
            <HStack alignItems="center" space="2">
              <Box color="white">
                <FaNewspaper color={iconColor} />
              </Box>
              <Text>Berita</Text>
            </HStack>
          </LinkNB>
        </Link>
      </Box>
    </VStack>
  );
};

export default Menus;
