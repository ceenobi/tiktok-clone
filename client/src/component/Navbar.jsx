import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Avatar,
  HStack,
  Box,
  Container,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FiChevronDown } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { UserAuth } from '../context/AuthContext';
import UploadContent from './UploadContent';
import SearchInput from './SearchInput';

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation()
  const { logout, user } = UserAuth();
  const bg = useColorModeValue('white', 'BlackAlpha.600');
  const borderBottomColor = useColorModeValue('gray.100', 'gray.700');

  const handleLogout = async e => {
    e.preventDefault();
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (location.pathname !== '/auth') {
      setNav(true);
    } else {
      setNav(false);
    }
  }, [location]);

  return (
    <>
      {nav && (
        <Box
          w="full"
          bg={bg}
          top={0}
          zIndex={2}
          position="fixed"
          borderBottom="1px"
          borderBottomColor={borderBottomColor}
          py={2}
        >
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <Heading justify="flex-start" fontSize="2xl" as={Link} to="/">
                TheBuzz
              </Heading>
              <Box w="300px" display={{ base: 'none', lg: 'block' }}>
                <SearchInput />
              </Box>
              <HStack
                spacing="20px"
                justify="flex-end"
                align="center"
                cursor="pointer"
              >
                <UploadContent />

                <Menu isLazy>
                  <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}
                  >
                    {' '}
                    <HStack spacing="4">
                      <Avatar
                        size="md"
                        src={
                          user
                            ? user?.image
                            : 'https://res.cloudinary.com/ceenobi/image/upload/v1652448096/icons/user_v0yarf.svg'
                        }
                        name={user?.userName}
                      />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="lg">{user?.userName}</Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <Portal>
                    <MenuList fontSize="lg" borderColor="gray.200">
                      <MenuItem
                        as={Link}
                        to={`/profile/${user?._id}`}
                        icon={<CgProfile fontSize="20px" />}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={handleLogout}
                        icon={<RiLogoutCircleRLine fontSize="20px" />}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
                <ColorModeSwitcher />
              </HStack>
            </Flex>
          </Container>
        </Box>
      )}
    </>
  );
}
