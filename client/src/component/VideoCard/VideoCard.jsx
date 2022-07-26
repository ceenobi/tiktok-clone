import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Icon,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { AiOutlineLike } from 'react-icons/ai';
import { FcLike } from 'react-icons/fc';
import { CgComment } from 'react-icons/cg';
import { RiShareForwardBoxLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';

import { client } from '../../lib/client';
import { UserAuth } from '../../context/AuthContext';
import CreatedVidCard from './CreatedVidCard';

export default function VideoCard({ item }) {
  const [userFollowed, setUserFollowed] = useState(false);
  const { user, liked, setLiked } = UserAuth();
  const navigate = useNavigate();

  const boxStyle = {
    boxSize: '40px',
    borderRadius: 'full',
    display: 'flex',
    justify: 'center',
    align: 'center',
    bg: useColorModeValue('gray.200', 'gray.700'),
    _hover: {
      bg: 'red.400',
      color: 'paint.white',
    },
  };

  const follow = () => {
    setUserFollowed(true);
    client
      .patch(item._id)
      .setIfMissing({ isFollowed: [] })
      .insert('after', 'isFollowed[-1]', [
        {
          _key: uuidv4(),
          _ref: user?._id,
        },
      ])
      .commit();
  };

  const unFollow = () => {
    setUserFollowed(false);
    client
      .patch(item._id)
      .unset([`isFollowed[_ref=="${user?._id}"]`])
      .commit();
  };

  const addLike = () => {
    setLiked(true);
    client
      .patch(user?._id)
      .setIfMissing({ likes: [0] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuidv4(),
          _ref: user?._id,
        },
      ])
      .commit();
  };

  const removelike = () => {
    setLiked(false);
    client
      .patch(user?._id)
      .unset([`likes[_ref=="${user?._id}"]`])
      .commit();
  };

  return (
    <Box py={5} px={2} mb={4} borderBottom="1px solid #CBD5E0">
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: 'column', sm: 'row' }}
        flexWrap="wrap"
      >
        <HStack spacing={3}>
          <Avatar
            as={Link}
            to={`/profile/${item.postedBy?._id}`}
            src={item.postedBy.image}
            size="md"
            name={item.postedBy.userName}
          />
          <Box textAlign="left" fontWeight="bold">
            <Box mb={3}>
              <HStack spacing="4px">
                <Text as={Link} to={`/profile/${item.postedBy?._id}`}>
                  {item.postedBy.userName}
                </Text>
                <Icon as={GoVerified} color="paint.teal" />
              </HStack>
              <Text textStyle="p">#{item.topic}</Text>
            </Box>
            <Box mb={3}>
              <Text textStyle="p" as={Link} to={`/detail/${item._id}`}>
                {item.caption}
              </Text>
            </Box>
          </Box>
        </HStack>
        <Box mb={3}>
          {userFollowed ? (
            <Button variant="with-shadow" onClick={unFollow}>
              Following
            </Button>
          ) : (
            <Button variant="with-shadow" onClick={follow}>
              Follow
            </Button>
          )}
        </Box>
      </Flex>
      <Flex direction="column" ml={{ base: 'none', md: '70px' }}>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <CreatedVidCard created={item} />
          <Stack
            spacing="30px"
            justify={{ base: 'flex-start', md: 'flex-end' }}
            ml="10px"
            direction={{ base: 'row', md: 'column' }}
          >
            <Box textAlign="center">
              <Box sx={boxStyle}>
                {liked ? (
                  <Icon
                    as={FcLike}
                    boxSize="20px"
                    m="auto"
                    onClick={removelike}
                    cursor="pointer"
                  />
                ) : (
                  <Icon
                    as={AiOutlineLike}
                    boxSize="20px"
                    m="auto"
                    onClick={addLike}
                    cursor="pointer"
                  />
                )}
              </Box>
              <Text textStyle="p">{item?.likes?.length || 0}</Text>
            </Box>
            <Box textAlign="center">
              <Box sx={boxStyle}>
                <Icon
                  as={CgComment}
                  boxSize="20px"
                  m="auto"
                  onClick={() => navigate(`/detail/${item._id}`)}
                  cursor="pointer"
                />
              </Box>
              <Text textStyle="p">{item?.comments?.length || 0}</Text>
            </Box>
            <Box textAlign="center">
              <Box sx={boxStyle}>
                <Icon
                  as={RiShareForwardBoxLine}
                  boxSize="20px"
                  m="auto"
                  cursor="pointer"
                />
              </Box>
              <Text textStyle="p">Share</Text>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
