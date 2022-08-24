import {
  Box,
  Button,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  Hidden,
  HStack,
  IconButton,
  // Image,
  Link as LinkNB,
  Menu,
  Text,
  useMediaQuery,
  VStack,
} from 'native-base';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosStats } from 'react-icons/io';
import { MenuPublicType } from '../../../configs/types';
import './Header.module.scss';

interface IProps {
  dataMenus: MenuPublicType[];
}

const index: React.FC<IProps> = ({ dataMenus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSmall] = useMediaQuery({
    minWidth: 0,
    maxWidth: 767,
  });

  const subLinkGenerate = (sublinks: MenuPublicType[]) =>
    sublinks.map((sublink, index) => (
      <Menu.Item key={index} flexDir="row" alignItems="center">
        <IoIosStats />
        <Text ml="2">{sublink.label}</Text>
      </Menu.Item>
    ));
  const linkGenerate = (dataMenus: MenuPublicType[]) =>
    dataMenus.map((menu, index: number) => (
      <Link href={menu.link} passHref key={index}>
        <LinkNB
          height="full"
          px="4"
          alignItems="center"
          _text={{
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
          _hover={{
            bg: 'blue.800',
            borderTopWidth: '2',
            borderTopColor: 'yellow.400',
            _text: {
              color: 'yellow.400',
            },
          }}
        >
          {menu.children ? (
            <Menu
              bg="white"
              trigger={(triggerProps) => {
                return (
                  <LinkNB
                    {...triggerProps}
                    height="full"
                    flexDir="row"
                    alignItems="center"
                    _hover={{
                      _text: {
                        color: 'yellow.400',
                      },
                    }}
                  >
                    <Text bold mr="2">
                      {menu.label}
                    </Text>
                    <ChevronDownIcon />
                  </LinkNB>
                );
              }}
            >
              {subLinkGenerate(menu.children)}
            </Menu>
          ) : (
            menu.label
          )}
        </LinkNB>
      </Link>
    ));

  const combineParentChild = (
    dataMenus: MenuPublicType[]
  ): MenuPublicType[] => {
    const combined: MenuPublicType[] = [];
    dataMenus.forEach((menu, i1) => {
      menu.level = 0;
      combined.push(menu);
      if (menu.children) {
        menu.children.forEach((child) => {
          child.level = 1;
          combined.push(child);
        });
      }
    });

    return combined;
  };

  const linkGenerateSmall = (dataMenus: MenuPublicType[]): any => {
    const newMenu = combineParentChild(dataMenus);
    return newMenu.map((menu, index: number) => (
      <Link href={menu.link} passHref key={index}>
        <LinkNB
          onPress={() => setIsOpen(false)}
          pl={menu.level && menu.level > 0 ? 4 * (menu.level + 1) : '4'}
          pr="4"
          py="4"
          borderBottomWidth={2}
          borderBottomColor="muted.100"
          alignItems="center"
          _text={{
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
          _hover={{
            bg: 'blue.800',
            borderTopWidth: '2',
            borderTopColor: 'yellow.400',
            _text: {
              color: 'yellow.400',
            },
          }}
        >
          {menu.label}
        </LinkNB>
      </Link>
    ));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wideMenu = useCallback(() => {
    if (!isMounted) return null;
    return (
      <Hidden till="md">
        <HStack
          height="full"
          justifyContent="flex-end"
          alignItems="center"
          px="4"
        >
          {linkGenerate(dataMenus)}
        </HStack>
      </Hidden>
    );
  }, [isMounted]);

  const smallMenu = useCallback(() => {
    if (!isMounted) return null;
    return (
      <Hidden from="md">
        <VStack
          flex={1}
          overflowY="auto"
          overflowX="hidden"
          position="fixed"
          height="full"
          zIndex={100}
          bg="white"
          display={isOpen ? 'flex' : 'none'}
          // display="flex"
          width="full"
        >
          <Box alignItems="center" h="20" my="4">
            <Image
              src="/images/logo_bc_plm.png"
              layout="fill"
              priority={true}
              objectFit="contain"
              alt="Logo Bea Cukai Palembang"
            />
          </Box>
          <Button
            variant="ghost"
            size="md"
            position="absolute"
            roundedRight={0}
            zIndex={101}
            right={0}
            top={0}
            height={50}
            onPress={() => setIsOpen(false)}
          >
            <CloseIcon />
          </Button>
          <Box
            flex={1}
            overflowY="auto"
            borderTopWidth={2}
            borderTopColor="muted.100"
          >
            {linkGenerateSmall(dataMenus)}
          </Box>
        </VStack>
      </Hidden>
    );
  }, [isMounted, isOpen, isSmall]);

  return (
    <>
      {smallMenu()}
      <HStack
        bg="white"
        maxH="20"
        h="20"
        shadow="3"
        px="4"
        alignItems="center"
        justifyContent="space-around"
        position="relative"
      >
        <Box w={['full', 'md']} maxH="20" h={['80%', 'md']} position="relative">
          <Image
            src="/images/logo-text.png"
            layout="fill"
            priority={true}
            objectFit="contain"
            alt="Logo Bea Cukai"
          />
        </Box>
        {isMounted && isSmall && (
          <IconButton
            mr="4"
            onPress={() => setIsOpen(!isOpen)}
            size="md"
            variant="ghost"
            icon={<HamburgerIcon />}
          />
        )}
        {wideMenu()}
      </HStack>
    </>
  );
};

export default index;
