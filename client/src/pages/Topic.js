import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { client } from '../lib/client';
import { topicPostsQuery } from '../lib/queries';
import Loader from '../utils/Loader';
import VideoCard from '../component/VideoCard/VideoCard';
import { UserAuth } from '../context/AuthContext';

export default function Topic() {
  const [topics, setTopics] = useState([]);
  const { topicId } = useParams();
  const { loading } = UserAuth();

  useEffect(() => {
    const query = topicPostsQuery(topicId);
    client.fetch(query).then(data => {
      setTopics(data);
    });
  }, [topicId]);

  return (
    <Box>
      <Flex h="full" className="videos" gap={10} direction="column">
        {loading && <Loader />}
        {topics?.length ? (
          topics?.map(item => <VideoCard item={item} key={item._id} />)
        ) : (
          <Text textAlign="center">No results</Text>
        )}
      </Flex>
    </Box>
  );
}
