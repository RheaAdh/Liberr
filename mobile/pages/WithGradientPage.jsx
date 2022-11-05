import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import curve from "./../assets/curve.svg";
import {useEffect, useState} from 'react';

export default function WithGradientPage(props) {

	const [welcome, setWelcome] = useState("");

	useEffect(() => {
		const hour = new Date().getHours();
		const welcomeTypes = ["morning", "afternoon", "evening"];
		if (hour < 12) setWelcome(welcomeTypes[0]);
		else if (hour < 18) setWelcome(welcomeTypes[1]);
		else setWelcome(welcomeTypes[2]);
	}, []);

	return (
		<Styled.container>
			<Styled.curve source={curve}></Styled.curve>
			<Styled.header>
				<Styled.wish>
					<p style={{margin: 0}}>GOOD</p>
					<h1 style={{margin: '-5px 0px'}}>{welcome.toUpperCase()}</h1>
				</Styled.wish>
				<Styled.addBook>Add Book</Styled.addBook>
			</Styled.header>
			{props.children}
		</Styled.container>
	)
}

const Styled = {
	container: styled(SafeAreaView)`
	  flex: 1;
	`,
	curve: styled.Image`
		position: absolute;
		height: 185px;
		width: 350px;
		top: 0;
		left: 0;
	`,
	header: styled.View`
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px
	`,
	wish: styled.View`
		color: #FFFFFF
	`,
	addBook: styled.TouchableOpacity`
		background: #1B1B1B;
		padding: 8px 10px;
		border-radius: 8px;
		color: #FFFFFF;
		font-weight: bold;
	`
  };