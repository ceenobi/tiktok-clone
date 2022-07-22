import React from 'react';
import { Text, Flex } from '@chakra-ui/react';

const ErrorComponent = () => {
  return (
    <Flex justify="center" mt={5} py={5}>
      <Text textStyle="p">Something went wrong</Text>
    </Flex>
  );
};

export class AppError extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <ErrorComponent /> : children;
  }
}
