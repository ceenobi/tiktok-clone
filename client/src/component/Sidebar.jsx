import React, { useState, useEffect } from 'react';
import { Box, Flex, Icon, Heading, HStack, SlideFade } from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle, ImHome } from 'react-icons/im';
import { BsPeople } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

import Discover from './Discover';
import { UserAuth } from '../context/AuthContext';
import SearchInput from '../component/SearchInput';
import Footer from './Footer';
import SuggestedAccount from './SuggestedAccount';

export default function Sidebar() {
  const { showModal, setShowModal} = UserAuth();
  const [showSide, setShowSide] = useState(false)
  const location = useLocation();
  const borderStyle = {
    borderBottom: '1px solid #CBD5E0',
    mb: '30px',
  };

  useEffect(() => {
    if (location.pathname !== '/auth') {
      setShowSide(true);
    } else {
      setShowSide(false);
    }
  }, [location]);

  return (
    <>
      {showSide && (
        <>
          <SlideFade in="true">
            <Box
              onClick={() => setShowModal(!showModal)}
              display={{ base: 'block', lg: 'none' }}
              ml={4}
              m={1}
            >
              {showModal ? (
                <Icon as={ImCancelCircle} boxSize="30px" cursor="pointer" />
              ) : (
                <Icon as={AiOutlineMenu} boxSize="30px" cursor="pointer" />
              )}
            </Box>
            {showModal && (
              <Flex
                direction="column"
                justify="start"
                textAlign="start"
                w="320px"
                mb={10}
                rounded="lg"
                p={3}
                border="gray.200"
              >
                <Box>
                  <Box py={3} sx={borderStyle}>
                    <HStack spacing="10px" mb="30px">
                      <Icon as={ImHome} boxSize="25px" color="red.400" />
                      <Heading as="h2" fontSize="md">
                        For You
                      </Heading>
                    </HStack>
                    <HStack spacing="10px" mb="30px">
                      <Icon as={BsPeople} boxSize="25px" />
                      <Heading as="h2" fontSize="md">
                        Following
                      </Heading>
                    </HStack>
                    <Box display={{ base: 'block', lg: 'none' }} mb="30px">
                      <SearchInput />
                    </Box>
                  </Box>
                  <Discover fix={borderStyle} />
                  <SuggestedAccount fix={borderStyle} />
                  <Footer />
                </Box>
              </Flex>
            )}
          </SlideFade>
          <Flex
            direction="column"
            justify="start"
            textAlign="start"
            w="320px"
            mb={10}
            rounded="lg"
            p={3}
            border="gray.200"
            display={{ base: 'none', lg: 'block' }}
          >
            <Box>
              <Box py={3} sx={borderStyle}>
                <HStack spacing="10px" mb="30px">
                  <Icon as={ImHome} boxSize="25px" color="red.400" />
                  <Heading as="h2" fontSize="md">
                    For You
                  </Heading>
                </HStack>
                <HStack spacing="10px" mb="30px">
                  <Icon as={BsPeople} boxSize="25px" />
                  <Heading as="h2" fontSize="md">
                    Following
                  </Heading>
                </HStack>
              </Box>
              <Discover fix={borderStyle} />
              <SuggestedAccount fix={borderStyle} />
              <Footer />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
