import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import arrowRight from './../assets/icons/rightArrow.png'

export default function ProfileLinks ({text, rerouteTo}) {
	return (
		<TouchableWithoutFeedback>
			<Styled.linkTile>
				<p style={{margin: 0}}>{text}</p>
				<img src={arrowRight}></img>
			</Styled.linkTile>
		</TouchableWithoutFeedback>
	)
}

const Styled = {
	linkTile: styled.View`
		flex-direction: row;
		justify-content: space-between;
		backgroundColor: #DFDEDE; 
		color: #636363;
		border-radius: 10px;
		padding-vertical: 10px;
		padding-horizontal: 10px;
	`
}