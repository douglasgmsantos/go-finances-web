import React from 'react';

import Header from '../../components/Header';
import Summary from '../../components/Summary';
import TransactionTable from '../../components/TransactionTable';

import {
  Container
} from './styles';


const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Summary />
        <TransactionTable />
      </Container>
    </>
  );
};

export default Dashboard;
