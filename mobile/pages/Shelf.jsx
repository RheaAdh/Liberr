import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import WithGradientPage from './WithGradientPage';
import {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthProvider';
import api from '../utils/api.service';
import Toast from 'react-native-toast-message';
import BookTile from '../components/BookTile';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Shelf({navigation}) {

  const [loading, setLoading] = useState(true);
  const [borrowedSelected, setBorrowedSelected] = useState(true)
  const [books, setBooks] = useState([]);
  const auth = useAuth();

  async function fetchBorrowedData () {
    try {
      setLoading(true);
      setBooks([])
      const res = await api.get('/shelf/getBorrowed', {'x-auth-token' : auth.token});
      setBooks(res.data.borrowed);
      setLoading(false);
    } catch(err) {
        console.log(err);
        setLoading(false);
        Toast.show({
            type: 'error',
            text1: err.response.data.error,
        });
    }
  }

  async function fetchToLendData () {
    try {
      setLoading(true);
      setBooks([])
      const res = await api.get('/shelf/getToLend', {'x-auth-token' : auth.token});
      setBooks(res.data.toLend);
      setLoading(false);
    } catch(err) {
        console.log(err);
        setLoading(false);
        Toast.show({
            type: 'error',
            text1: err.response.data.error,
        });
    }
  }

  useEffect(async () => {
    if (borrowedSelected)
      fetchBorrowedData();
    else
      fetchToLendData();
    }, [borrowedSelected])

    if (loading) return <Loading fullScreen={true}/>
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
      <Styled.list>
			{
				books.length > 0 && books.map((item, index) => {
					if (item.bookId !== null)
            return <BookTile {...item.bookId} isBooksPage={false} isBorrowedShelf={true} />
				})
			}
			</Styled.list>
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
  list: styled.View`
	  padding: 10px;
	  overflow-y: scroll;
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
    color: #ADADAD;
    font-size: 19px;
    margin: 0 10px;
    font-family: 'heebo-500';

    ${(props)=> props.selected && `
    color: #7E0CD8;
    font-family: 'heebo-700';
    `}
  `,
};