import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Text,
  Heading,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BsFillLockFill } from 'react-icons/bs';
import { FaGoogle } from 'react-icons/fa';

import { UserAuth } from '../context/AuthContext';
import { useToastHook } from '../lib/useToast';
import { client } from '../lib/client';
import ForgotPassword from '../component/ForgotPassword';

export default function UserAuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  const { createUser, signIn, signInWithGoogle } =
    UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(false);
  const [handleToast] = useToastHook();
  const isError = email === '';
  const from = location.state?.from || '/';

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  const switchMode = () => {
    setIsSignup(previsSignup => !previsSignup);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email && !password && password !== confirmPassword) {
      handleToast({ message: 'Error in credentials', status: 'error' });
    }
    setIsSubmitting(true);
    if (isSignup) {
      await createUser(email, password)
        .then(user => {
          handleToast({ message: 'Account created', status: 'success' });
          localStorage.setItem('user', JSON.stringify(user._tokenResponse));
          const { email, localId } = user._tokenResponse;
          const doc = {
            _id: localId,
            _type: 'user',
            userName: email,
          };
          client.createIfNotExists(doc);
          navigate(from, { replace: true });
        })
        .catch(error => {
          console.log(error.message);
          handleToast({ message: error.message, status: 'error' });
        });
    } else {
      await signIn(email, password)
        .then(user => {
          handleToast({ message: 'Login successful', status: 'success' });
          localStorage.setItem('user', JSON.stringify(user._tokenResponse));
          navigate(from, { replace: true });
        })
        .catch(error => {
          console.log(error.message);
          handleToast({ message: error.message, status: 'error' });
        });
    }
    if (ref.current) {
      setIsSubmitting(false);
    }
  };

  const googleRedirect = response => {
    signInWithGoogle()
      .then(user => {
        handleToast({ message: 'Login successful', status: 'success' });
        localStorage.setItem('user', JSON.stringify(user._tokenResponse));
        const { firstName, localId, photoUrl } = user._tokenResponse;
        const doc = {
          _id: localId,
          _type: 'user',
          userName: firstName,
          image: photoUrl,
        };
        client.createIfNotExists(doc);
        navigate(from, { replace: true });
      })
      .catch(e => console.log(e.message));
  };

  return (
    <Box textAlign="center">
      <VStack alignItems="center" spacing={4} mb={4}>
        <Heading fontSize="2xl" as={Link} to="/">
          TheBuzz
        </Heading>
        <Icon as={BsFillLockFill} />
      </VStack>
      <Heading as="h2" mb={4}>
        {isSignup ? 'Sign up for free' : 'Sign in'}
      </Heading>
      <Box mb={4} onClick={switchMode}>
        {isSignup ? (
          <Text textStyle="p">
            Already have a the-buzz account?{' '}
            <Box as="span" color="red.400" cursor="pointer">
              LOG IN
            </Box>
          </Text>
        ) : (
          <Text textStyle="p">
            Not registered on the-buzz yet?{' '}
            <Box as="span" color="red.400" cursor="pointer">
              SIGN UP
            </Box>
          </Text>
        )}
      </Box>
      <Box mb={4}>
        <Button
          w="140px"
          h="48px"
          variant="outline"
          leftIcon={<FaGoogle color="teal" />}
          color="black"
          bg="paint.white"
          onClick={googleRedirect}
        >
          GOOGLE
        </Button>
      </Box>
      <Box maxW="400px" m="auto">
        {openModal && <ForgotPassword setOpenModal={setOpenModal}/>}
        <form onSubmit={handleSubmit}>
          <VStack spacing="20px" py={2}>
            <FormControl isInvalid={isError} isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                size="lg"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {isError ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : (
                ''
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                size="lg"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {!isSignup && (
              <Text
                textStyle="p"
                onClick={() => setOpenModal(true)}
                cursor="pointer"
              >
                Forgot password?
              </Text>
            )}
            {isSignup && (
              <FormControl isRequired>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  type="password"
                  size="lg"
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            )}
            {isSignup ? (
              <Text textStyle="p">
                By clicking on "Sign up", you accept the&nbsp;
                <Box as="span" color="red.400">
                  TERMS AND CONDITIONS OF USE
                </Box>
                &nbsp; and the&nbsp;
                <Box as="span" color="red.400">
                  PRIVACY POLICY
                </Box>
              </Text>
            ) : (
              ''
            )}
            <Button
              mt={4}
              mb={4}
              w="full"
              type="submit"
              variant="smooth"
              isLoading={isSubmitting}
            >
              {isSignup ? 'SIGN UP' : 'SIGN IN'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
