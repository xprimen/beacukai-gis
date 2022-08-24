import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from 'native-base';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { DBfire, Storage } from '../../../../configs/firebase/clientApp';
import LayoutAdmin from '../../../../layouts/Admin/LayoutAdmin';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];

const index = () => {
  const router = useRouter();
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [title, setTitle] = React.useState<string>();
  const [content, setContent] = React.useState<string>();
  const [image, setImage] = React.useState<File>();

  const handleSubmit = async () => {
    setSaveLoading(true);
    let uploadStatus = false;
    let filename = '';
    if (image) {
      filename = image?.name.replace(/[^a-z0-9]/gi, '.').toLowerCase();
      const imageRef = ref(Storage, `berita/${filename}`);
      await uploadBytes(imageRef, image);
      uploadStatus = true;
    }

    if (title && content && image && uploadStatus) {
      const date = new Date();
      const setServer = collection(DBfire, 'berita');
      const add = await addDoc(setServer, {
        title,
        content,
        date,
        image: filename,
      });
      if (add.id) {
        alert('Berita Baru Berhasil Ditambahkan');
        router.push('/admin/berita');
      }
    }
    setSaveLoading(false);
  };

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Tambah Berita</Heading>
        <Button
          colorScheme="success"
          onPress={() => router.back()}
          leftIcon={<ArrowBackIcon />}
          size="md"
        >
          Kembali
        </Button>
      </HStack>
      <VStack
        p={4}
        shadow={2}
        bg="white"
        flex={1}
        justifyContent="flex-start"
        space={4}
      >
        <HStack alignItems="center">
          <Text w="48">Judul</Text>
          <Input value={title} flex={1} onChangeText={(v) => setTitle(v)} />
        </HStack>
        <HStack alignItems="start">
          <Text w="48">Konten</Text>
          <Box rounded={2} flex={1}>
            <QuillNoSSRWrapper
              modules={modules}
              formats={formats}
              theme="snow"
              value={content}
              onChange={(a) => setContent(a)}
            />
          </Box>
        </HStack>
        <HStack alignItems="start">
          <Text w="48">Gambar/Foto</Text>
          <VStack space="4">
            <input
              onChange={(e) => e?.target?.files && setImage(e.target.files[0])}
              type="file"
            />
          </VStack>
        </HStack>

        <HStack>
          <Button
            isDisabled={saveLoading}
            isLoading={saveLoading}
            onPress={handleSubmit}
            colorScheme="primary"
          >
            Simpan
          </Button>
        </HStack>
      </VStack>
    </LayoutAdmin>
  );
};

export default index;
