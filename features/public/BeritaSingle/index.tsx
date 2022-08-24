import { getDownloadURL, ref } from 'firebase/storage';
import moment from 'moment';
import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Link as LinkNB,
  useBreakpointValue,
  Image,
} from 'native-base';
import Link from 'next/link';
import React from 'react';
import { Storage } from '../../../configs/firebase/clientApp';
import { IBerita } from '../../../configs/types';

interface IProps {
  data: IBerita;
}

const index: React.FC<IProps> = ({ data }) => {
  const [newImage, setNewImage] = React.useState('');

  const getImage = async (imageName: string) => {
    const storageRef = ref(Storage, 'berita/' + imageName);
    const getUrl = await getDownloadURL(storageRef);
    setNewImage(getUrl);
  };

  React.useEffect(() => {
    getImage(data.image);
  }, []);

  return (
    <Link href={`/berita/${data.id}`} passHref>
      <LinkNB>
        <Stack
          direction={['column', 'column', 'row']}
          flex={1}
          space="4"
          overflow="clip"
        >
          <Box w={['full', 'full', '1/4']} h={['48', 'sm', '48']}>
            {!newImage && (
              <Image
                height="full"
                width="full"
                src="/images/no-image.png"
                alt={data.title}
              />
            )}
            {newImage && (
              <Image src={newImage} w="full" h="full" alt={data.title} />
            )}
          </Box>
          <Stack
            bg="blueGray.100"
            rounded="md"
            flex={1}
            p={[4]}
            space={[3, 3, 1.5]}
          >
            <Stack space="2">
              <Heading size="md" color="muted.600">
                {data.title}
              </Heading>
              <Text fontSize="xs" color="muted.400" fontWeight="500">
                {moment(data.date).format('D MMM YYYY')}
              </Text>
            </Stack>
            <Text
              overflowY="hidden"
              maxH="20"
              fontWeight="400"
              textAlign="justify"
            >
              {data.content.replace(/(<([^>]+)>)/gi, '').substring(0, 500)}
            </Text>
          </Stack>
        </Stack>
      </LinkNB>
    </Link>
  );
};

export default index;
