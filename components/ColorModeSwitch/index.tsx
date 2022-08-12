import {
  IconButton,
  MoonIcon,
  SunIcon,
  Tooltip,
  useColorMode,
} from 'native-base';
import React from 'react';

const ColorModeSwitch: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Tooltip
      label={colorMode === 'dark' ? 'Enable light mode' : 'Enable dark mode'}
      placement="bottom right"
      openDelay={300}
      closeOnClick={false}
    >
      <IconButton
        // position="absolute"
        // top={12}
        // right={8}
        onPress={toggleColorMode}
        icon={colorMode === 'dark' ? <SunIcon color="white" /> : <MoonIcon />}
        accessibilityLabel="Color Mode Switch"
      />
    </Tooltip>
  );
};

export default ColorModeSwitch;
