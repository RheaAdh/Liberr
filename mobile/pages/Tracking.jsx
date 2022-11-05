import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import WithGradientPage from './WithGradientPage';
import {useAuth} from '../context/AuthProvider';
import { useEffect, useState } from 'react';
import api from '../utils/api.service';

export default function Tracking({navigation}) {

  const auth = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData () {
      try {
        setLoading(true)
        const res = await api.get('/profile/orders', { 'x-auth-token': auth.token });
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  if (loading) return <Loading fullScreen={true} />
  return (
    <WithGradientPage navigation={navigation}>
      <Styled.container>
      <Styled.heading>Tracking</Styled.heading>
      </Styled.container>
    </WithGradientPage>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
    padding-top: 100px;
  `,
  heading: styled.Text``,
};