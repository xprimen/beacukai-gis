import {
  Box,
  Button,
  CloseIcon,
  Container,
  Divider,
  Stack,
  useColorModeValue,
  useMediaQuery,
} from 'native-base';
import React from 'react';
import Appbar from './Appbar';
import LeftSide from './LeftSide';

const LayoutAdmin: React.FC = ({ children }) => {
  const [isSmall] = useMediaQuery({
    minWidth: 0,
    maxWidth: 767,
  });
  const [isOpen, setIsOpen] = React.useState(isSmall ? false : true);

  return (
    <Container flex={1} maxW="full">
      <Stack
        direction={['column', 'column', 'row']}
        w="full"
        flex={1}
        divider={<Divider />}
      >
        <Box
          display={isOpen ? 'flex' : 'none'}
          width={['full', 'full', '64', '72']}
          bg="white"
          borderRightWidth={{
            base: 0,
            sm: 1,
          }}
          _light={{
            borderRightWidth: 0,
          }}
          overflowY="auto"
          overflowX="hidden"
          position={isSmall ? 'fixed' : 'relative'}
          height="full"
          zIndex={100}
        >
          {isSmall && (
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
          )}
          <LeftSide />
        </Box>
        <Box
          flex={1}
          bg={useColorModeValue(
            process.env.NEXT_PUBLIC_LIGHT_BG,
            process.env.NEXT_PUBLIC_DARK_BG
          )}
          overflow="auto"
          pb="4"
        >
          <Appbar showBurger={isSmall} isOpen={isOpen} setIsOpen={setIsOpen} />
          <Box p="8">{children}</Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LayoutAdmin;
