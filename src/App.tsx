import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

import { Dashboard } from './components/Dashboard';
import { themeConfig } from './config/layout';

function App() {
  return (
    <ChakraProvider theme={themeConfig}>
      <Container>
        <Dashboard />
      </Container>
    </ChakraProvider>
  );
}

export default App;
