import {
  Avatar,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  Text,
  theme,
  useColorModeValue,
} from 'native-base';
import React from 'react';
import { useAuth } from '../../../services';

interface Props {
  isOpen: boolean;
  textColor: string;
  displayName: string | null | undefined;
}

// const index = ({ isOpen, textColor }: Props) => {
const ProfileAdminPage: React.FC<Props> = ({
  isOpen,
  textColor,
  displayName,
}) => {
  // const textColor = useColorModeValue(
  //   theme.colors.lightText,
  //   theme.colors.darkText
  // );
  return (
    <HStack alignItems="center" space="2" paddingX="4" flex={1}>
      <Avatar>A</Avatar>
      <Text color={textColor}>{displayName}</Text>
      {isOpen ? (
        <ChevronUpIcon color={textColor} />
      ) : (
        <ChevronDownIcon color={textColor} />
      )}
    </HStack>
  );
};

export default ProfileAdminPage;
