import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import BookTile from '../components/BookTile';

export default function Books() {
  return (
    <Styled.container>
      {/* <Loading /> */}
		<Styled.list 
			data={[
				{
					id: '1',
					name: 'Michael Scott',
			  	},
				// {
				// 	id: '2',
				// 	name: 'Michael Scott',
			  	// }
			]}
				keyExtractor={(item) => item.id}
				renderItem={({item}) => <BookTile  />
			}	
		/>
    </Styled.container>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
  `,
  list: styled.FlatList`
	padding: 10px
  `
};