import Login from './login';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  return <Login />
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})