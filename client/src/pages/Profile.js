import React, { useState, useEffect } from 'react';
import {
  Box,
  HStack,
  Heading,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Avatar,
  Icon,
  Button,
  Grid,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { v4 as uuidv4 } from 'uuid';

import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from '../lib/queries';
import { client } from '../lib/client';
import Loader from '../utils/Loader';
import CreatedVidCard from '../component/VideoCard/CreatedVidCard';
import { UserAuth } from '../context/AuthContext';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [created, setCreated] = useState(null);
  const [userLikes, setUserLikes] = useState(null);
  const [userFollow, setUserFollow] = useState(null);
  const { profileId } = useParams();
  const { user } = UserAuth();

  const follow = () => {
    setUserFollow(true);
    client
      .patch(user._id)
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
    setUserFollow(false);
    client
      .patch(user._id)
      .unset([`isFollowed[_ref=="${user?._id}"]`])
      .commit();
  };

  useEffect(() => {
    const query = singleUserQuery(profileId);
    client.fetch(query).then(data => {
      setProfile(data[0]);
    });
  }, [profileId]);

  useEffect(() => {
    const likedQuery = userLikedPostsQuery(profileId);
    client.fetch(likedQuery).then(data => {
      setUserLikes(data);
    });
  }, [profileId]);

  useEffect(() => {
    const createdPostQuery = userCreatedPostsQuery(profileId);
    client.fetch(createdPostQuery).then(data => {
      setCreated(data);
    });
  }, [profileId]);

  if (!profile) return <Loader />;

  return (
    <Box py={3}>
      <Flex>
        <Box w="full">
          <Flex justify="space-between">
            <HStack spacing={3}>
              <Avatar
                size="md"
                src={
                  profile
                    ? profile?.image
                    : 'https://res.cloudinary.com/ceenobi/image/upload/v1652448096/icons/user_v0yarf.svg'
                }
                name={profile.userName}
              />
              <Flex gap={2}>
                <Heading as="h2" fontSize="md">
                  {profile.userName}
                </Heading>
                <Icon as={GoVerified} color="paint.teal" />
              </Flex>
            </HStack>
            {user?._id !== profileId ? (
              <>
                {userFollow ? (
                  <Button variant="with-shadow" ml="auto" onClick={unFollow}>
                    Following
                  </Button>
                ) : (
                  <Button variant="with-shadow" ml="auto" onClick={follow}>
                    Follow
                  </Button>
                )}
              </>
            ) : null}
          </Flex>
          <Tabs isFitted>
            <TabList>
              <Tab>
                <Text>Videos</Text>
              </Tab>
              <Tab>
                <Text>Liked</Text>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)',
                    xl: 'repeat(2, 1fr)',
                    '2xl': 'repeat(2, 1fr)',
                    base: 'repeat(1, 1fr)',
                  }}
                  gap={3}
                >
                  <Box>
                    {created?.length ? (
                      created?.map(item => (
                        <CreatedVidCard created={item} key={item._id} />
                      ))
                    ) : (
                      <Flex textAlign="center">
                        <Text mt="4rem">No videos found. Start posting.</Text>
                      </Flex>
                    )}
                  </Box>
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)',
                    xl: 'repeat(2, 1fr)',
                    '2xl': 'repeat(2, 1fr)',
                    base: 'repeat(1, 1fr)',
                  }}
                  gap={3}
                >
                  {userLikes?.length ? (
                    userLikes?.map(item => (
                      <CreatedVidCard created={item} key={item._id} />
                    ))
                  ) : (
                    <Flex justify="center" textAlign="center">
                      <Text mt="4rem">No videos Liked. Start Liking.</Text>
                    </Flex>
                  )}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Box>
  );
}
