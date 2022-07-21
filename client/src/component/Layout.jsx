import React from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export function Layout({ children }) {
  return (
    <Box w="full" overflow="hidden" h="100vh">
      <Navbar />
      <Container maxW="container.xl" mt="5rem">
        <Flex gap={{ base: 'none', lg: '0' }} justify="space-between">
          <Box h="95vh" overflow="auto" mt={2}>
            <Sidebar />
          </Box>
          <Flex
            overflow="auto"
            h="90vh"
            flex="1"
            mt={4}
            ml={{ base: 'none', md: 16 }}
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
