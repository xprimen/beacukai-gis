import { Box, Heading, HStack, Text } from 'native-base';
import React from 'react';

const Appbar = () => {
  return (
    <Box bgColor="amber.100" h={60} maxH={60}>
      <HStack flex={1} justifyContent="space-between">
        <HStack alignItems="center" bgColor="blueGray.100">
          <Heading>GIS</Heading>
        </HStack>
        <HStack alignItems="center" bgColor="coolGray.100">
          Logo
        </HStack>
        <HStack alignItems="center" bgColor="cyan.100">
          Menu
        </HStack>
      </HStack>
    </Box>
  );
};

export default Appbar;
