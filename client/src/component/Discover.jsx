import React from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { Link} from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

export default function Discover({ fix }) {
  const { feeds, showModal, setShowModal } = UserAuth();
  const queryParams = new URLSearchParams(window.location.search);
  const topic = queryParams.get('topic');

    const close = () => setShowModal(!showModal);

  return (
    <Box borderBottom={4} pb="30px" border="gray.100" sx={fix}>
      <Text mb={4} textStyle="sm">
        Discover
      </Text>
      <Flex gap={3} flexWrap="wrap">
        {feeds?.map(item => (
          <Button
            as={Link}
            to={`/topic/${item.topic}`}
            key={item._id}
            colorScheme={topic === item.topic ? 'teal' : 'gray'}
            leftIcon={item.icon}
            size="sm"
            _hover={{
              bg: topic === item.topic ? 'gray' : 'teal',
            }}
            onClick={close}
          >
            {item.topic}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}
