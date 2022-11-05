import {useState} from 'react'
import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import WithGradientPage from './WithGradientPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Shelf({navigation}) {
  const [borrowedSelected, setBorrowedSelected] = useState(true)

  return (
    <WithGradientPage navigation={navigation}>
      <Styled.container>
      <Styled.switch>
        <TouchableOpacity onPress={()=>setBorrowedSelected(true)}>
        <Styled.heading selected={borrowedSelected}>Borrowed Shelf</Styled.heading>
        </TouchableOpacity>
      <Styled.divider></Styled.divider>
      <TouchableOpacity onPress={()=>setBorrowedSelected(false)}>
      <Styled.heading selected={!borrowedSelected}>Lending Shelf</Styled.heading>
      </TouchableOpacity>
      </Styled.switch>
      </Styled.container>
    </WithGradientPage>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
    padding-top: 100px;
  `,
  switch: styled.View`
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
  `,
  divider: styled.View`
    height: 35px;
    width: 1px;
    background-color: #4448;
`,
  heading: styled.Text`
    color: #444;
    font-size: 19;
    margin: 0 10px;
    font-family: 'heebo-500';

    ${(props)=> props.selected && `
    color: #7E0CD8;
    font-family: 'heebo-700';
    `}
  `,
};