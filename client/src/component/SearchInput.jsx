import React from 'react';
import { Input, InputGroup, InputRightElement, useColorModeValue } from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

export default function SearchInput() {
  const { searchTerm, setSearchTerm } = UserAuth();
  const navigate = useNavigate()

  const searchItem = () => {
    if (searchTerm.trim()) {
      navigate(`/search?keyword=${searchTerm}`);
    }
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      searchItem();
    }
  };
  return (
    <>
      <InputGroup size="lg">
        <Input
          type="text"
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search accounts and videos"
          _placeholder={{ color: 'inherit' }}
          focusBorderColor="gray.400"
          value={searchTerm}
          onKeyDown={handleKeyPress}
          rounded="xl"
          bg={useColorModeValue('gray.100', 'gray.700')}
          //onFocus={() => navigate('/search')}
        />
        <InputRightElement
          pointerEvents="none"
          children={<IoMdSearch color="gray.300" />}
        />
      </InputGroup>
    </>
  );
}
