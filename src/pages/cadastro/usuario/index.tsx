import React, { useCallback, useRef } from 'react';

import { useRouter } from 'next/router';

import * as Yup from 'yup';

import { MdEmail } from 'react-icons/md'
import { CgPassword, CgUser } from 'react-icons/cg';

import { FormHandles } from '@unform/core';

import { useToast } from '../../../hooks/toast';

import { user } from '../../../hooks/user';

import Button from '../../../components/Button';

import validationErrorsYup from '../../../utils/validate/validateErrorsYup';

import {
  Container,
  Login,
  FormContainer,
  Content,
  Title,
  Name,
  Email,
  Password,
  Footer
} from '../../../styles/components/cadastro/usuario/styles'



interface ICreateUser {
  name: string;
  email: string;
  password: string;
}


const CadastroUsuario: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { registerUser, loading } = user();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (formData: ICreateUser) => {

    try {
      formRef.current ?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório.'),
        email: Yup.string().required('E-mail é obrigatório.').email(),
        password: Yup.string().required('A senha é obrigatório.'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await registerUser(formData)

      addToast({
        type: 'success',
        title: 'Parabéns.',
        description: 'Seu usuário foi cadastro com sucesso.'
      });

      router.push("/login")
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
    } finally {
      formRef.current ?.reset({})
    }

  }, [addToast, registerUser]);

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src="/logo.svg" alt="GoFinances" />
          </div>
          <Content>
            <Title>CADASTRO DE USUÁRIO</Title>
            <FormContainer ref={formRef} onSubmit={handleSubmit} action="">
              <Name name="name" type="text" placeholder="Nome" icon={CgUser} />
              <Email name="email" type="text" placeholder="E-mail" icon={MdEmail} />
              <Password name="password" type="password" placeholder="Senha" icon={CgPassword} />
              <Footer>
                <Button type="submit" disabled={loading}> Salvar </Button>
                <Button type="button" onClick={() => router.push("/login")} className="btn-secondary"> voltar </Button>
              </Footer>
            </ FormContainer>
          </Content>
        </Login>
      </Container>
    </>
  );
};


export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default CadastroUsuario;
