import { Box, Heading, Text } from 'native-base';
import React from 'react';
import { Fade } from 'react-awesome-reveal';

interface IProps {
  title: string | boolean;
}

const index: React.FC<IProps> = ({ title }) => {
  return (
    <Box
      py="12"
      bg="blue.800"
      px={['8', '8', '16', '32', '56']}
      borderBottomColor="yellow.400"
      borderBottomWidth="2"
    >
      <Heading color="yellow.400">
        <Fade cascade duration={200}>
          {!title ? 'Loading...' : title}
        </Fade>
      </Heading>
    </Box>
  );
};

export default index;
