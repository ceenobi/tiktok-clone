import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import { UserAuth } from '../context/AuthContext';
import Loader from '../utils/Loader';
import VideoCard from './VideoCard/VideoCard';

export default function Feed() {
  const { loading, feeds } = UserAuth();

  return (
    <Flex h="full" className="videos" direction="column" ml={{ base: 'none', md: 20 }}>
      {loading && <Loader />}
      {feeds.length ? (
        feeds?.map(item => <VideoCard item={item} key={item._id} />)
      ) : (
        <Text textAlign="center" mt="5rem">
          No results. Start posting!
        </Text>
      )}
    </Flex>
  );
}
