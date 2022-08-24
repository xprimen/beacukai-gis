import {
  Box,
  Button,
  CloseIcon,
  Container,
  Divider,
  Hidden,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useMediaQuery,
} from 'native-base';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../services';
import Appbar from './Appbar';
import LeftSide from './LeftSide';

const LayoutAdmin: React.FC = ({ children }) => {
  const [isSmall] = useMediaQuery({
    minWidth: 0,
    maxWidth: 767,
  });
  const [isOpen, setIsOpen] = React.useState(isSmall ? false : true);

  const { isLogin } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLogin) router.push('/auth');
  }, []);

  return (
    <HStack flex={1}>
      <Stack
        direction={['column', 'column', 'row']}
        w="full"
        flex={1}
        divider={<Divider />}
      >
        <Box
          // display={isOpen ? 'flex' : 'none'}
          width={isOpen ? ['full', 'full', '64', '72'] : '0'}
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
          position={['fixed', 'fixed', 'relative']}
          height="full"
          zIndex={[2, 2, 0]}
        >
          <IconButton
            variant="ghost"
            size="md"
            position="absolute"
            roundedRight={0}
            zIndex={2}
            right={0}
            top={0}
            height={50}
            onPress={() => setIsOpen(false)}
            icon={<CloseIcon />}
          />
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
    </HStack>
  );
};

export default LayoutAdmin;
