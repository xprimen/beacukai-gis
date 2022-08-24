import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
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
  const { id } = router.query;
  const [saveLoading, setSaveLoading] = React.useState(false);
  const [beritaLoading, setBeritaLoading] = React.useState(true);
  const [title, setTitle] = React.useState<string>();
  const [content, setContent] = React.useState<string>();
  const [image, setImage] = React.useState<File>();
  const [oldImage, setOldImage] = React.useState();
  const [showImage, setShowImage] = React.useState<string>();

  const getImage = async (imageName: string) => {
    const storageRef = ref(Storage, 'berita/' + imageName);
    const getUrl = await getDownloadURL(storageRef);
    setShowImage(getUrl);
  };

  const getBerita = async () => {
    setBeritaLoading(true);
    try {
      const data = await getDoc(doc(DBfire, 'berita/' + id));
      if (data.exists()) {
        setTitle(data.data().title);
        setContent(data.data().content);
        setImage(data.data().image);
        setOldImage(data.data().image);

        //getImage
        getImage(data.data().image);
      }
    } catch (error) {
      // if (error.message == 'Missing or insufficient permissions.') {
      if (error) {
        router.push('/auth');
      }
    }
    setBeritaLoading(false);
  };

  // const handleUpload = (e:React.MouseEvent<HTMLSpanElement,React.MouseEvent>)=>{
  const handleSubmit = async () => {
    setSaveLoading(true);
    let uploadStatus = false;
    let filename = image?.name;
    if (image) {
      // delete images first
      const deleteRef = ref(Storage, 'berita/' + oldImage);
      deleteObject(deleteRef);

      filename = image?.name.replace(/[^a-z0-9]/gi, '.').toLowerCase();
      const imageRef = ref(Storage, `berita/${filename}`);
      await uploadBytes(imageRef, image);
      uploadStatus = true;
    }

    if (title && content && image && uploadStatus) {
      const date = new Date();
      const setServer = doc(DBfire, 'berita/' + id);
      await updateDoc(setServer, {
        title,
        content,
        image: filename,
        date,
      });
      alert('Berita Berhasil Di Update');
      router.push('/admin/berita');
    }
    setSaveLoading(false);
  };

  React.useEffect(() => {
    getBerita();
  }, [setBeritaLoading]);

  return (
    <LayoutAdmin>
      <HStack alignItems="center" justifyContent="space-between" mb="4">
        <Heading size="md">Edit Berita</Heading>
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
        {beritaLoading ? (
          <HStack>
            <Text>Loading...</Text>
          </HStack>
        ) : (
          <>
            <HStack alignItems="center">
              <Text w="48">Judul</Text>
              <Input value={title} flex={1} onChangeText={(v) => setTitle(v)} />
            </HStack>
            <HStack alignItems="start">
              <Text w="48">Konten</Text>
              {!beritaLoading && (
                <Box rounded={2} flex={1}>
                  <QuillNoSSRWrapper
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    value={content}
                    onChange={(a) => setContent(a)}
                  />
                </Box>
              )}
            </HStack>
            <HStack alignItems="start">
              <Text w="48">Gambar/Foto</Text>
              <VStack space="4">
                <input
                  onChange={(e) =>
                    e?.target?.files && setImage(e.target.files[0])
                  }
                  type="file"
                />
                <a target="_blank" href={showImage}>
                  Lihat Foto/Gambar
                </a>
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
          </>
        )}
      </VStack>
    </LayoutAdmin>
  );
};

export default index;
