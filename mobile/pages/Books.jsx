import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import BookTile from '../components/BookTile';
import WithGradientPage from './WithGradientPage';
import { useState, useEffect } from 'react';
import api from '../utils/api.service';
import Toast from 'react-native-toast-message';
import useInputState from '../hooks/useInputState';
import { useAuth } from '../context/AuthProvider';

export default function Books({navigation}) {
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const search = useInputState()
  const auth = useAuth()

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

  useEffect(async () => {
	fetchData();
  }, [])

  const getFilteredBooks= ()=> books.filter((item)=>{
	  console.log(item);
	const searchTerm = `${item.authors} ${item.name}`
	return searchTerm.toLowerCase().includes(search.value.toLowerCase())
})

const handleOrderBook = async (id)=>{
	try {
		const res = await api.post('/shelf/placeOrder', {
			bookId: id
		}, {
			'x-auth-token': auth.token
		})
		console.log(res);
		Toast.show({
			type: 'success',
			text1: 'Book order placed!',
		});
	}
	catch(err){
		Toast.show({
			type: 'error',
			text1: err.response.data.error,
		});
	}
}

  if (loading) return <Loading fullScreen />

  return (
	<WithGradientPage navigation={{navigation}}>
		<Styled.container>
			<Styled.search {...search.props} placeholder="Search for your favourite book..." />
			{getFilteredBooks().length ? <Styled.list>
			{
				getFilteredBooks().map((item) => {
					return <BookTile placeOrder={()=>handleOrderBook(item._id)} {...item} isBooksPage={true} />
				})
			}
			</Styled.list>: (search.value && <Styled.empty>
			<Styled.emptyText>No books match your search :(</Styled.emptyText>
			</Styled.empty>)
			}
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
	height: 450px;
  `,
  search: styled.TextInput`
   background-color: #fff;
    font-size: 17;
    padding: 8px;
    border-radius: 4px;
    margin: 8px 10px 8px 20px;
  `,
  empty: styled.View`
	margin-top: 20px;
  `,
  emptyText: styled.Text`
  text-align: center;
  `,
};