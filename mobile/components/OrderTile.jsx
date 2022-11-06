import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {useAuth} from '../context/AuthProvider';
import api from '../utils/api.service';

export default function OrderTile (props) {

	const auth = useAuth();

	const acceptBook = async (copyId) => {
		try {
			const res = await api.put('/global/receivedBook', { copyId : copyId }, {'x-auth-token': auth.token});
			console.log(res);
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Styled.orderTile>
			<div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
        	  <div style={{display: 'flex'}}>
        	    <img src={props.isbn.imageLink} style={{height: '50px'}}></img>
        	    <div style={{padding: '0px 10px'}}>
        	      <h3 style={{margin: 0}}>{props.isbn.bookId.name}</h3>
        	      <p style={{margin: 0}}>{props.isbn.bookId.authors[0]}</p>
        	    </div>
        	  </div>
        	  <TouchableWithoutFeedback onPress={() => acceptBook(props.isbn._id)}>
				<Styled.accept>Accept</Styled.accept>
			  </TouchableWithoutFeedback>
        	</div>
		</Styled.orderTile>
	)
}

const Styled = {
	orderTile: styled.View`
		flex-direction: row;
		margin-top: 15px;
	`,
	accept: styled.View`
    	background: #42086F;
    	padding: 10px 15px;
    	border-radius: 10px;
    	color: white
  `
}