import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import curve from "./../assets/curve.svg";
import profileCurve from "./../assets/profileCurve.svg";
import {useEffect, useState, useRef} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { heightInPercent } from '../utils/utilities'
import { widthInPercent } from '../utils/utilities';

import { useAuth } from '../context/AuthProvider';

export default function WithGradientPage(props) {
	const refRBSheet = useRef();

	const [welcome, setWelcome] = useState("");
	const auth = useAuth();
	const user = auth.user;

	useEffect(() => {
		const hour = new Date().getHours();
		const welcomeTypes = ["morning", "afternoon", "evening"];
		if (hour < 12) setWelcome(welcomeTypes[0]);
		else if (hour < 18) setWelcome(welcomeTypes[1]);
		else setWelcome(welcomeTypes[2]);
	}, []);

	return (
		<Styled.container>
		<RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          height={heightInPercent(65)}
          customStyles={{
            container: {
              borderRadius: 12,
            },
            draggableIcon: {
              backgroundColor: "#BDC6EC",
            },
          }}
        ></RBSheet>
			{
				props.isProfile 
				?
				<Styled.profileCurve source={profileCurve}></Styled.profileCurve>
				:
				<Styled.curve source={curve}></Styled.curve>		
			}
			<Styled.header>
				{
					props?.isProfile
					?
					<Styled.user>
						<h1 style={{margin: 0}}>{user.name}</h1>
						<Styled.subscriptionType>
							<p>{}</p>
						</Styled.subscriptionType>
					</Styled.user>
					:
					<Styled.wish>
						<p style={{margin: 0}}>GOOD</p>
						<h1 style={{margin: '-5px 0px'}}>{welcome.toUpperCase()}</h1>
					</Styled.wish>
				}
				{(user.subscriptionType && user.subscriptionType !== null) && <Styled.addBook>Add Book</Styled.addBook>}
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
	profileCurve: styled.Image`
		position: absolute;
		height: 185px;
		width: 250px;
		top: 0;
		right: 0;
	`,
	header: styled.View`
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20px
	`,
	user: styled.View`
		padding-top: 3rem;
		color: #1B1B1B;
	`,
	subscriptionType: styled.View`
		color: #E3E3E3;
		background: #42086F;
		text-align: center;
		padding-vertical: 5px;
		border-radius: 15px;
		width: fit-content;
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