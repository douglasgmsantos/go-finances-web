import styled from "styled-components";

import { Form } from '@unform/web';

import InputLogin from "../../../components/InputLogin";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Login = styled.div`
  width: 400px;
  height: auto;
  background: ${p => p.theme.colors.white};
  border-radius: 5px;
  top: 100px;
  position: absolute;
  border: 1px solid ${p => p.theme.colors.purple};


  .container-logo{
    display: flex;
    justify-content: center;
    height: 150px;
    background: ${p => p.theme.colors.purple};
    img {
      width: 345px
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${p => p.theme.spacing.default};
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: ${p => p.theme.spacing.default};
`;


export const FormContainer = styled(Form)`
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  button {
    width: 50%;
  }
`;

export const Name = styled(InputLogin)``;

export const Email = styled(InputLogin)``;

export const Password = styled(InputLogin)``;
