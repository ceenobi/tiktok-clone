import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { footerList1, footerList2, footerList3 } from '../utils/constants';

const List = ({ items }) => (
  <Flex gap={2} flexWrap="wrap" mt={5}>
    {items.map(item => (
      <Text textStyle="sm" key={item}>
        {item}
      </Text>
    ))}
  </Flex>
);

export default function Footer() {
  return (
    <Box mt={6}>
      <List items={footerList1} />
      <List items={footerList2} />
      <List items={footerList3} />
      <Text textStyle='sm' mt={2} _hover={{textDecoration:'none'}}>@20222 The-Buzz</Text>
    </Box>
  );
}
