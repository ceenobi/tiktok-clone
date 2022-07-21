import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Heading,
  VStack,
  Flex,
  Container,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';
import { useToastHook } from '../lib/useToast';

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = UserAuth();
  const [handleToast] = useToastHook();
  const navigate = useNavigate();

  const query = useQuery();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    await resetPassword(query.get('oobCode'), password)
      .then(res => {
        handleToast({
          message: 'Password reset! You can log in now',
          status: 'success',
        });
        navigate('/auth');
      })
      .catch(error => {
        console.log(error.message);
        handleToast({ message: error.message, status: 'error' });
      });
    setIsSubmitting(false);
  };

  return (
    <Box mt="7rem" textAlign="center" ml={{ base: 'none', md: 20 }}>
      <Container maxW="container.lg">
        <Flex direction="column" justify="center" p={3} m="auto">
          <VStack spacing={4} mb={2} mt={2}>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Reset your password
            </Heading>
            <Text>Enter your new password</Text>
          </VStack>
          <Box w={{ base: '270px', lg: '400px' }} m="auto">
            <form onSubmit={handleSubmit}>
              <VStack spacing="20px" py={2}>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    type="password"
                    autoComplete="password"
                    size="lg"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  w="full"
                  type="submit"
                  variant="smooth"
                  isLoading={isSubmitting}
                >
                  RESET PASSWORD
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
