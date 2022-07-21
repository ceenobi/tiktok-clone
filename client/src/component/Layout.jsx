import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export function Layout({ children }) {
  return (
    <Box w="full" overflow="hidden" h="100vh">
      <Navbar />
      <Container maxW="container.xl" mt="5rem">
        <Flex gap={{ base: 'none', lg: '40' }} justify='space-between'>
          <Box h="88vh" overflow="auto" mt={2}>
            <Sidebar />
          </Box>
          <Flex
            gap={10}
            overflow="auto"
            h="88vh"
            flex="1"
            mt={4}
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
