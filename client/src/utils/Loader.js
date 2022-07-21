import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';

export default function Loader() {
  return (
    <Flex justifyContent="center" align="center" h='100vh'>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="paint.pink"
        color="paint.teal"
        size="xl"
        label="loading"
      />
    </Flex>
  );
}
