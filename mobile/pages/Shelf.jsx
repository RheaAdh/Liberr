import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';

export default function Shelf() {
  return (
    <Styled.container>
      {/* <Loading /> */}
		<Styled.heading>Shelf</Styled.heading>
    </Styled.container>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
  `,
  heading: styled.Text``,
};