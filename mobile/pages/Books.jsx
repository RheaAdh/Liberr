import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import BookTile from '../components/BookTile';
import WithGradientPage from './WithGradientPage';
import { useState, useEffect } from 'react';
import api from '../utils/api.service';
import Toast from 'react-native-toast-message';

export default function Books() {
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
	async function fetchData () {
		try {
			setLoading(true);
			const res = await api.get('/books/availableBooks', { crossOrigin: true });
			setBooks(res);
			setLoading(false);
		}
		catch(err){
			console.log(err.config);
			setLoading(false);
			Toast.show({
				type: 'error',
				text1: err.response.data.error,
			});
		}
	}
	fetchData();
  }, [])

//   if (books.length === 0) return <Loading />
  return (
	<WithGradientPage>
		<Styled.container>
			<Styled.list>
			{
				books.length > 0 && books.map((item) => {
					return <BookTile {...item} isBooksPage={true} />
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
  list: styled.View`
	padding: 10px;
	overflow-y: scroll;
  `
};