import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled(Form)`
  margin: 1rem 0;
  width: 100%;
  height: 6rem;
  display: grid;
  grid-template-columns: 23% 23% 23% 23% 5.5%;
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
`;