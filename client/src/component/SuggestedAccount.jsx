import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Avatar, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';

import { client } from '../lib/client';
import { allUsersQuery } from '../lib/queries';
import { UserAuth } from '../context/AuthContext';

export default function SuggestedAccount({ fix }) {
  const [suggest, setSuggest] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    const query = allUsersQuery();
    client.fetch(query).then(data => {
      setSuggest(data);
    });
  }, []);

  const suggested = suggest.filter(item => item._id !== user?._id);

  return (
    <Box borderBottom={4} pb="30px" border="gray.100" sx={fix}>
      <Text mb={4} textStyle="sm">
        Suggested accounts
      </Text>
      {suggested?.slice(0, 4).map(item => (
        <Flex key={item._id} mb={3} gap={2} align="center">
          <Flex gap={3}>
            <Avatar
              as={Link}
              to={`/profile/${item._id}`}
              src={item.image}
              size="sm"
              name={item.userName}
            />
            <Text>{item.userName}</Text>
          </Flex>
          <Icon as={GoVerified} color="paint.teal" />
        </Flex>
      ))}
    </Box>
  );
}
