import React from 'react';
import { Box, Text, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function CreatedVidCard({ created }) {
  return (
    <Box w="280px" rounded="xl">
      <Link to={`/detail/${created._id}`}>
        <AspectRatio maxW="full" maxH="500px" ratio={9 / 16}>
          <iframe title="naruto" src={created.video.asset.url} />
        </AspectRatio>
      </Link>
      <Text mt={4} mb={6}>
        {created.caption}
      </Text>
    </Box>
  );
}
