import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Heading,
  Container,
  VStack,
  Flex,
  Icon,
  Grid,
  ScaleFade,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';

import { UserAuth } from '../context/AuthContext';
import { useToastHook } from '../lib/useToast';

export default function ForgotPassword({ setOpenModal }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { forgotPassword } = UserAuth();
  const [handleToast] = useToastHook();

  const boxStyle = {
    w: '100vw',
    position: 'fixed',
    right: '0',
    top: '0',
    zIndex: 100,
    transition: 'all 1s ease',
    background: 'rgba(0, 0, 0, 0.75)',
  };

  const innerBoxStyle = {
    h: '100vh',
    overflow: 'auto',
    justifyContent: 'center',
    position: 'relative',
    p: '1.4rem 1rem',
    display: 'flex',
    alignItems: 'center',
  };

  const close = () => setOpenModal(false);

  const onSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgotPassword(email);
      handleToast({
        message: `An email has been sent to ${email} for reset instructions`,
        status: 'success',
      });
    } catch (error) {
      console.log(error.message);
      handleToast({ message: error.message, status: 'error' });
    }
    setIsSubmitting(false);
    close();
  };

  return (
    <>
      <Box sx={boxStyle}>
        <Container maxW="container.lg" textAlign="center" sx={innerBoxStyle}>
          <ScaleFade initialScale={0.9} in="true">
            <Grid
              bg="#23232d"
              p={3}
              boxShadow="xl"
              w={{ base: 'full', lg: '600px' }}
              color="paint.white"
            >
              <Flex justify="flex-end">
                <Icon
                  as={AiOutlineClose}
                  onClick={() => setOpenModal(false)}
                  cursor="pointer"
                  fontSize="30px"
                />
              </Flex>

              <VStack spacing={4} mb={2} mt={2}>
                <Heading as="h2" fontSize="2xl" mb={4}>
                  Reset your password
                </Heading>
                <Text>Enter your email to reset your password</Text>
              </VStack>
              <Box w={{ base: 'full', lg: '400px' }} m="auto">
                <form onSubmit={onSubmit}>
                  <VStack spacing="20px" py={2}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input
                        type="email"
                        size="lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      w="full"
                      type="submit"
                      variant="smooth"
                      isLoading={isSubmitting}
                    >
                      SEND LINK
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ScaleFade>
        </Container>
      </Box>
    </>
  );
}
