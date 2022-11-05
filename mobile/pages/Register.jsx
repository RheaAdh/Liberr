import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Register() {
  return (
    <Styled.container>
      <Styled.heading>
          Register
      </Styled.heading>
    </Styled.container>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
  `,
  heading: styled.Text``,
};