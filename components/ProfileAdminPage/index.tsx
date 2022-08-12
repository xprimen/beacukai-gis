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

interface Props {
  isOpen: boolean;
  textColor: string;
}

// const index = ({ isOpen, textColor }: Props) => {
const ProfileAdminPage: React.FC<Props> = ({ isOpen, textColor }) => {
  // const textColor = useColorModeValue(
  //   theme.colors.lightText,
  //   theme.colors.darkText
  // );
  return (
    <HStack alignItems="center" space="2" paddingX="4" flex={1}>
      <Avatar>A</Avatar>
      <Text color={textColor}>Name</Text>
      {isOpen ? (
        <ChevronUpIcon color={textColor} />
      ) : (
        <ChevronDownIcon color={textColor} />
      )}
    </HStack>
  );
};

export default ProfileAdminPage;
