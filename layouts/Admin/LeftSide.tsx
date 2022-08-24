import { Box } from 'native-base';
import React from 'react';
import Menus from '../../features/admin/Menus';

// base: 0,
//   sm: 480,
//   md: 768,
//   lg: 992,
//   xl: 1280,

const LeftSide: React.FC = () => {
  return (
    <Box>
      <Menus />
    </Box>
  );
};

export default LeftSide;
