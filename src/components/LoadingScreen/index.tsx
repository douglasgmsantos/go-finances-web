import React from 'react';

import ReactLoading from 'react-loading';

import { Container } from './styles';

interface ILoadingScreen {
  color: string;
}

const LoadingScreen: React.FC<ILoadingScreen> = ({ color }: ILoadingScreen) => {
  return (
    <Container>
      <ReactLoading
        type="spin"
        width={25}
        height={25}
        color={color}
      />
    </Container>
  )

}

export default LoadingScreen;
