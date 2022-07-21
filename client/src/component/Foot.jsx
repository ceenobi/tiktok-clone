import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, Avatar } from '@chakra-ui/react';
import { ImHome } from 'react-icons/im';
import { BsSearch } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';
import { useToastHook } from '../lib/useToast';
import UploadContent from './UploadContent';

export default function Foot() {
  const [active, setActive] = useState(false);
  const [setMsg] = useState(false);
  const { userId } = UserAuth();
  const [handleToast] = useToastHook();
  const location = useLocation();

  useEffect(() => {
    if (userId && location.pathname !== '/auth') {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [userId, location]);

  const alertMsg = () =>
    setMsg(
      handleToast({
        message: 'Hey there, this is not a feature yet ',
        status: 'warning',
      })
    );

  return (
    <>
      {active && (
        <Box
          positon="fixed"
          left={0}
          bottom={0}
          zIndex={2}
          w="100%"
          borderTop="1px solid #CBD5E0"
          display={{ base: 'block', lg: 'none' }}
        >
          <Flex justify="space-between" align="center" py={2} px={3}>
            <IconButton
              icon={<ImHome fontSize="30px" />}
              aria-label="home"
              variant="ghost"
              as={Link}
              to="/"
            />
            <IconButton
              icon={<BsSearch fontSize="30px" />}
              aria-label="search"
              variant="ghost"
              as={Link}
              to="/search"
            />
            <UploadContent />
            <IconButton
              icon={<BiMessageDetail fontSize="30px" />}
              aria-label="message"
              variant="ghost"
              onClick={alertMsg}
            />
            <Avatar
              size="md"
              src={
                userId
                  ? userId?.image
                  : 'https://res.cloudinary.com/ceenobi/image/upload/v1652448096/icons/user_v0yarf.svg'
              }
              name={userId.userName}
            />
          </Flex>
        </Box>
      )}
    </>
  );
}
