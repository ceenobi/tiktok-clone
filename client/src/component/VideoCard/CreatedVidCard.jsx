import React, { useEffect, useRef } from 'react';
import { Box, Flex, IconButton, AspectRatio } from '@chakra-ui/react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

import { UserAuth } from '../../context/AuthContext';

export default function CreatedVidCard({ created }) {
  const {
    playing,
    setPlaying,
    isVideoMuted,
    setIsVideoMuted,
    isHover,
    setIsHover,
  } = UserAuth();
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
  return (
    <Box>
      <Box
        w={{ base: 'full', md: '290px' }}
        rounded="xl"
        mb={3}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        position="relative"
        display={{ base: 'none', md: 'block' }}
      >
        <Box
          as="video"
          src={created.video.asset.url}
          type="video/mp4"
          loop
          w="full"
          h={{ base: '500px', lg: '528px' }}
          objectFit="contain"
          borderRadius="xl"
          ref={videoRef}
          sx={{
            aspectRatio: '9/16',
          }}
        />
        {isHover && (
          <Flex
            w="full"
            justify="space-between"
            position="absolute"
            bottom="7%"
            px={5}
          >
            {playing ? (
              <IconButton
                size="md"
                color="whiteAlpha.900"
                variant="unstyled"
                icon={<BsFillPauseFill fontSize="30px" />}
                onClick={onVideoPress}
              />
            ) : (
              <IconButton
                size="md"
                color="whiteAlpha.900"
                variant="unstyled"
                icon={<BsFillPlayFill fontSize="30px" />}
                onClick={onVideoPress}
              />
            )}
            {isVideoMuted ? (
              <IconButton
                size="md"
                color="whiteAlpha.900"
                variant="unstyled"
                icon={<HiVolumeOff fontSize="30px" />}
                onClick={() => setIsVideoMuted(false)}
              />
            ) : (
              <IconButton
                size="md"
                color="whiteAlpha.900"
                variant="unstyled"
                icon={<HiVolumeUp fontSize="30px" />}
                onClick={() => setIsVideoMuted(true)}
              />
            )}
          </Flex>
        )}

        {/* <Text mt={4} mb={6} as={Link} to={`/detail/${created._id}`}>
        {created.caption}
      </Text> */}
      </Box>
      <Box display={{ base: 'block', md: 'none' }} mb={3}>
        <AspectRatio maxW="560px" ratio={1}>
          <iframe
            title={created.caption}
            src={created.video.asset.url}
            allowFullScreen
          />
        </AspectRatio>
      </Box>
    </Box>
  );
}
