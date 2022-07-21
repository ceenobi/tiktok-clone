import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useStyleConfig,
  Button,
  SlideFade,
  Container,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Card = React.forwardRef((props, ref) => {
  const { variant, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });

  return <Box __css={styles} {...rest} ref={ref} />;
});

export default function Home() {
  const ref = React.createRef();

  const colors = ['#FFF', '#CEE5D0', '#4FA3A5', '#4EB1B3', '#e6e4b5'];

  const colorIndex = parseInt(Math.random() * colors.length);

  return (
    <Box
      textAlign="center"
      bg={colors[colorIndex]}
      h={{ base: null, md: '100vh' }}
      py={2}
    >
      <Container maxW="container.lg">
        <VStack justify="center" spacing={4} mb={6} mt="3rem">
          <Heading fontSize="2xl">The Buzz</Heading>
          <Text>Create post, follow people just like you, and much more!</Text>
        </VStack>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="center"
          align="center"
          gap={10}
          mt={{ base: null, lg: '5rem' }}
        >
          <SlideFade offsetY="20px" in="true">
            <Card variant="large" m="auto" ref={ref}>
              <Box
                as="video"
                src="https://i.imgur.com/H9UX0Jm.mp4"
                type="video/mp4"
                boxSize={{
                  base: '300px',
                  md: '400px',
                }}
                objectFit="contain"
                borderRadius="lg"
              />
            </Card>
          </SlideFade>
          <SlideFade offsetX="20px" in="true">
            <Box boxSize="300px">
              <Heading fontSize="xl" mb={4}>
                See what your friends are up to. Join and share in the fun!
              </Heading>
              <Button
                mt={4}
                w="full"
                variant="smooth"
                as={Link}
                to="/auth"
              >
                LOG IN / SIGN UP
              </Button>
            </Box>
          </SlideFade>
        </Flex>
      </Container>
    </Box>
  );
}
