import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export function Layout({ children }) {
  return (
    <Box w="full" overflow="hidden" h="100vh">
      <Navbar />
      <Container maxW="container.lg" mt="5rem">
        <Flex justify="space-between">
          <Box h="92vh" overflow="auto" mt={2}>
            <Sidebar />
          </Box>
          <Flex
            overflow="auto"
            h="88vh"
            flex="1"
            mt={2}
            direction="column"
            className="videos"
          >
            {children}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
