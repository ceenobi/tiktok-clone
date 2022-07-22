import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthContextProvider } from './context/AuthContext';
import theme from './theme/theme';
import Routes from './routes';
import { Layout } from './component/Layout';
import Loader from './utils/Loader';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Suspense fallback={<Loader/>}>
            <Routes />
          </Suspense>
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
