import { Box } from 'native-base';
import React from 'react';
import Menus from '../../components/Menus';

// base: 0,
//   sm: 480,
//   md: 768,
//   lg: 992,
//   xl: 1280,

const LeftSide: React.FC = () => {
  /* const [isSM, isMD, isLG, isXL] = useMediaQuery([
    {
      minWidth: 0,
      maxWidth: 479,
    },
    {
      minWidth: 480,
      maxWidth: 767,
    },
    {
      minWidth: 768,
      maxWidth: 991,
    },
    {
      minWidth: 992,
      maxWidth: 1279,
    },
    {
      minWidth: 1280,
    },
  ]); */

  return (
    <Box>
      <Menus />
    </Box>
  );
};

export default LeftSide;
