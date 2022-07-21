import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function CreatedVidCard({ created }) {
  return (
    <Box w="250px">
      <Link to={`/detail/${created._id}`}>
        <Box
          as="video"
          src={created.video.asset.url}
          type="video/mp4"
          loop
          controls
          w="full"
          h='250px'
          ///objectFit="contain"
          borderRadius="lg"
        />
      </Link>
      <Text mt={4} mb={6}>
        {created.caption}
      </Text>
    </Box>
  );
}
