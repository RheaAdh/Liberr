import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import WithGradientPage from './WithGradientPage';

export default function Shelf() {
  return (
    <WithGradientPage>
      <Styled.container>
        {/* <Loading /> */}
      <Styled.heading>Shelf</Styled.heading>
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