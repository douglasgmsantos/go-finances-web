import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';


import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  type: string;
};


const Button: React.FC<ButtonProps> = ({ children, loading, type, ...rest }) => (
  <Container type={type} {...rest}>
    {loading ? (
      <ReactLoading
        type="spin"
        width={25}
        height={25} />
    ) : (
        children
      )}
  </Container>
);

export default Button;
