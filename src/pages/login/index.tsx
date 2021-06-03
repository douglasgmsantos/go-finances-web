import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import ReactLoading from 'react-loading';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { MdEmail } from 'react-icons/md'
import { CgPassword } from 'react-icons/cg'

import Button from '../../components/Button';

//HOOKS
import { useToast } from "../../hooks/toast"
import { useAuth } from '../../hooks/auth';

import validationErrorsYup from '../../utils/validate/validateErrorsYup';

import {
  Container,
  LoginContainer,
  Content,
  FormContainer,
  ContainerText,
  Email,
  Password
} from './styles'


// Interfaces
interface SignInFormData {
  email: string;
  password: string;
}


const Login: React.FC = () => {
  const { addToast } = useToast();
  const { signIn, loading } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const router = useRouter();

  const handleSubmit = useCallback(async (formData: SignInFormData) => {
    try {
      formRef.current ?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório.').email(),
        password: Yup.string().required('A senha é obrigatório.'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await signIn(formData);
      router.push("/dashboard");

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = validationErrorsYup(err);
        formRef.current ?.setErrors(errors);
        return;
      }

      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: err.message
        });

    }

  },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <LoginContainer>
          <div className="container-logo">
            <img src="/logo.svg" alt="GoFinances" />
          </div>

          <Content>
            <FormContainer ref={formRef} onSubmit={handleSubmit} action="">
              <Email name="email" type="text" placeholder="E-mail" icon={MdEmail} />
              <Password name="password" type="password" placeholder="Senha" icon={CgPassword} />
              <ContainerText textAlign="right">
                <Link href="/" >
                  <a style={{ textDecoration: "none" }} > Esqueci minha senha </a>
                </Link>
              </ContainerText>
              <Button type="submit" disabled={loading}>
                {loading
                  ? <ReactLoading
                    type="spin"
                    width={25}
                    height={25} />
                  : 'Enviar'}
              </Button>
              <ContainerText >
                <span>Ainda não possui conta? </span>
                <Link href="/cadastro/usuario">
                  <a style={{ textDecoration: "none" }} > Faça o cadastro agora mesmo! </a>
                </Link>
              </ContainerText>
            </ FormContainer>
          </Content>
        </LoginContainer>

      </Container>
    </>
  );
};

export default Login;
