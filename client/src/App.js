import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthContextProvider } from './context/AuthContext';
import theme from './theme/theme';
import Routes from './routes';
import { Layout } from './component/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Routes />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
