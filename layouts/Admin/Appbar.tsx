import React from 'react';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Menu,
  Text,
  Link as LinkNB,
  useContrastText,
  useColorModeValue,
  theme,
  useMediaQuery,
  HamburgerIcon,
  IconButton,
} from 'native-base';
import { Pressable } from 'react-native';
import Link from 'next/link';
import ProfileAdminPage from '../../components/ProfileAdminPage';
import ColorModeSwitch from '../../components/ColorModeSwitch';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

interface Props {
  showBurger: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Appbar: React.FC<Props> = ({ showBurger, isOpen, setIsOpen }) => {
  const bgColor: string = theme.colors.blue[800];
  const iconColor = useColorModeValue(
    theme.colors.darkText,
    theme.colors.lightText
  );
  const textColor = useContrastText(bgColor);
  // const onPress = (event: React.MouseEventHandler): void => {
  //   console.log(event);
  // };
  // const [isShowBurger] = useMediaQuery({
  //   minWidth: 0,
  //   maxWidth: 767,
  // });

  return (
    <HStack
      bg={useColorModeValue(bgColor, process.env.NEXT_PUBLIC_DARK_BG)}
      justifyContent="space-between"
      direction={['column', 'row']}
      py={{
        base: '4',
        sm: '4',
      }}
      space="2"
      width="full"
      _dark={{
        borderBottomColor: 'gray.700',
        borderBottomWidth: 1,
      }}
    >
      <HStack alignItems="center" space="2" px={4}>
        {/* {showBurger && <HamburgerIcon color={textColor} size="sm" />} */}
        {/* {showBurger && ( */}
        <IconButton
          onPress={() => setIsOpen(!isOpen)}
          size="md"
          variant="ghost"
          icon={<HamburgerIcon color={textColor} />}
        />
        {/* )} */}
        <Link href="/admin" passHref>
          <HStack alignItems="center" space="2" mr="4">
            <Heading size="lg" color={textColor}>
              GIS
            </Heading>
            <Text italic color={textColor}>
              (Geographic Information System)
            </Text>
          </HStack>
        </Link>
      </HStack>
      <HStack alignSelf="flex-end">
        {/* <ColorModeSwitch /> */}
        <Menu
          width={{
            base: '48',
          }}
          placement="bottom right"
          trigger={(triggerProps, state) => {
            return (
              <Pressable {...triggerProps}>
                <ProfileAdminPage isOpen={state.open} textColor={textColor} />
              </Pressable>
            );
          }}
          _dark={{
            bgColor: process.env.NEXT_PUBLIC_DARK_BG,
          }}
        >
          <Menu.Item py={0}>
            <Link href="/admin/profile" passHref>
              <HStack py={4} alignItems="center" justifyContent="space-between">
                <Text>Profile</Text>
                <FaUser color={iconColor} />
              </HStack>
            </Link>
          </Menu.Item>
          <Menu.Item py={0}>
            <HStack alignItems="center" justifyContent="space-between" py={4}>
              <Text>Logout</Text>
              <FaSignOutAlt color={iconColor} />
            </HStack>
          </Menu.Item>
        </Menu>
      </HStack>
    </HStack>
  );
};

export default Appbar;
