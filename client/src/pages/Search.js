import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  HStack
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';
import { client } from '../lib/client';
import {
  allPostsQuery,
  searchPostsQuery,
  allUsersQuery,
} from '../lib/queries';
import Loader from '../utils/Loader';
import CreatedVidCard from '../component/VideoCard/CreatedVidCard';

export default function Search() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const { searchTerm, loading, setLoading } = UserAuth();

  useEffect(() => {
    const query = allUsersQuery();
    client.fetch(query).then(data => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = searchPostsQuery();
    client.fetch(query).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [setLoading]);

  useEffect(() => {
    setLoading(true);
    const query = allPostsQuery();
    client.fetch(query).then(data => {
      setItems(data);
      setLoading(false);
    });
  }, [setLoading]);

  const searchedAccounts = users?.filter(user =>
    user.userName.toLowerCase().includes(searchTerm)
  );

  const searchVideos = items?.filter(
    item =>
      item.caption.toLowerCase().includes(searchTerm) ||
      item.topic.toLowerCase().includes(searchTerm)
  );



  return (
    <>
      <Box>
        {loading && <Loader />}
        <Tabs isFitted>
          <TabList>
            <Tab>
              <Text>Videos</Text>
            </Tab>
            <Tab>
              <Text>Users</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {searchVideos?.length !== 0 &&
                searchVideos.map(item => (
                  <CreatedVidCard created={item} key={item._id} />
                ))}
              {searchVideos?.length === 0 && searchTerm !== '' && !loading && (
                <Box textAlign="center">
                  <Text>No Videos Found!</Text>
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              {searchedAccounts.length > 0 &&
                searchedAccounts.map(item => (
                  <HStack spacing={4} key={item._id} mb={3}>
                    <Avatar
                      as={Link}
                      to={`/profile/${item._id}`}
                      src={item.image}
                      size="md"
                      name={item.userName}
                    />
                    <Text>{item.userName}</Text>
                  </HStack>
                ))}
              {searchedAccounts?.length === 0 && searchTerm !== '' && !loading && (
                <Box textAlign="center">
                  <Text>{`No user Account found for "${searchTerm}"`}</Text>
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
