import styled, { css } from "styled-components";
import { Form } from '@unform/web';

import InputLogin from "../../../components/InputLogin";



export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const LoginContainer = styled.div`
  width: 400px;
  height: 460px;
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

export const FormContainer = styled(Form)`
  width: 100%;
`;

interface IContainerText {
  textAlign?: string;
}

export const ContainerText = styled.div<IContainerText>`
  width: 100%;
  margin: 5px 0;
  font-size: small;
  text-align: ${p => p.textAlign || "center"};
  a {
    font-weight: bold;
    color: ${p => p.theme.colors.purple};
  }
`;


export const Email = styled(InputLogin)``;

export const Password = styled(InputLogin)``;
