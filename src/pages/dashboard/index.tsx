import React from 'react';

import Header from '../../components/Header';
import Summary from '../../components/Summary';
import TransactionTable from '../../components/TransactionTable';
import { TransactionProvider } from '../../hooks/useTransaction';
import { withSSRAuth } from '../../utils/withSSRAuth';

import {
  Container
} from '../../styles/components/dashboard/styles';



const Dashboard: React.FC = () => {
  return (
    <>
      <TransactionProvider>
        <Header />
        <Container>
          <Summary />
          <TransactionTable />
        </Container>
      </TransactionProvider>
    </>
  );
};


export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})


export default Dashboard;
