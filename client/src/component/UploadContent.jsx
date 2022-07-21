import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Button,
  VStack,
  Icon,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { TbUpload } from 'react-icons/tb';

import { UserAuth } from '../context/AuthContext';
import { useToastHook } from '../lib/useToast';
import { client } from '../lib/client';

export default function UploadContent() {
  const [videoAsset, setVideoAsset] = useState();
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [next, setNext] = useState(false);
  const [handleToast] = useToastHook();
  const { loading, setLoading, user} = UserAuth();

  const uploadVideo = async e => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then(data => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const closeModal = () => onClose()
  
  const handleDiscard = () => {
     setSavingPost(false);
     setVideoAsset(undefined);
     setCaption('');
     setTopic('');
   };

   

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);
      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        topic: topic,
      };
      client.create(doc).then(() => {
        handleToast({ message: 'Video posted', status: 'success' });
        closeModal();
        window.location.reload()
        
      });
    }
  };

  const switchMode = () => {
    setNext(prevNext => !prevNext);
  };

  return (
    <>
      <Button
        variant="with-shadow"
        leftIcon={<TbUpload />}
        display={{ base: 'block', lg: 'block' }}
        onClick={onOpen}
        size="sm"
      >
        Upload
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} m="auto" justify="center">
              {!next ? (
                <>
                  <Flex justify="center" direction="column" textAlign="center">
                    <Heading as="h2" fontSize="lg">
                      Upload Video
                    </Heading>
                    <Text fontSize="md">Post a video to your account</Text>
                  </Flex>
                  <VStack textAlign="center" justify="center">
                    {loading ? (
                      <Text textAlign="center">Uploading...</Text>
                    ) : (
                      <VStack spacing={0} align="center">
                        {videoAsset ? (
                          <Box boxSize="250px">
                            <Box
                              as="video"
                              src={videoAsset.url}
                              controls
                              loop
                              boxSize="100%"
                              bg="black"
                              borderRadius="lg"
                            />
                          </Box>
                        ) : (
                          <VStack spacing={4}>
                            <Icon as={FaCloudUploadAlt} boxSize="40px" />
                            <Text textStyle="p">Select video to upload</Text>
                            <Box w="250px">
                              <Input
                                variant="unstyled"
                                py={3}
                                type="file"
                                cursor="pointer"
                                name="upload-video"
                                onChange={e => uploadVideo(e)}
                              />
                            </Box>
                          </VStack>
                        )}
                      </VStack>
                    )}
                    {wrongFileType && (
                      <Text
                        w="260px"
                        textAlign="center"
                        color="red.400"
                        fontWeight="bold"
                        mt={4}
                      >
                        {' '}
                        Please select a video file (mp4 or webm or ogg)
                      </Text>
                    )}
                  </VStack>
                </>
              ) : (
                <Box mt={4} p={3} minW="250px">
                  <form>
                    <VStack spacing={3}>
                      <FormControl>
                        <FormLabel htmlFor="caption" fontWeight="black">
                          Caption
                        </FormLabel>
                        <Input
                          id="caption"
                          type="text"
                          value={caption}
                          onChange={e => setCaption(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="topic" fontWeight="black">
                         Topic
                        </FormLabel>
                        {/* <Select
                          id="topic"
                          onChange={e => {
                            setTopic(e.target.value);
                          }}
                        >
                          {topics.map(item => (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Select> */}
                        <Input
                          id="topic"
                          type="text"
                          value={topic}
                          onChange={e => setTopic(e.target.value)}
                        />
                      </FormControl>
                    </VStack>
                  </form>
                </Box>
              )}
              {next && (
                <Flex gap={10}>
                  <Button
                    onClick={handleDiscard}
                    colorScheme="teal"
                    variant="outline"
                    mt={4}
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={handlePost}
                    variant="solid"
                    bg="red.400"
                    disabled={videoAsset?.url ? false : true}
                    mt={4}
                  >
                    {savingPost ? 'Posting...' : 'Post'}
                  </Button>
                </Flex>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={switchMode} mt={4} mr="3" variant="ghost">
              {!next ? 'Next' : 'Back'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
