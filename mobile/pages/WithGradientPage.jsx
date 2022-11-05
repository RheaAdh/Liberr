import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import curve from "./../assets/curve.svg";
import profileCurve from "./../assets/profileCurve.svg";
import {useEffect, useState, useRef} from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import { heightInPercent } from '../utils/utilities'
import { TouchableOpacity } from 'react-native-gesture-handler';
import useInputState from '../hooks/useInputState'
import Button from '../components/Button'
import api from '../utils/api.service';
import { useAuth } from '../context/AuthProvider';

export default function WithGradientPage(props) {
	const refRBSheet = useRef();
	const bookISBN = useInputState()
	const genre = useInputState()
	// const [isFiction, setIsFiction] = useState(true);
	const [isPaperback, setIsPaperback] = useState(true);

	const [welcome, setWelcome] = useState("");
	const auth = useAuth()
	const user = auth.user


	const handleSubmit = async ()=>{
		try {
			if (!bookISBN.value || !genre.value) {
				Toast.show({
					type: 'error',
					text1: 'All fields are required',
				});
				return;
			}
			const res = await api.post('/donation/donateBook',{
				isbn: bookISBN.value,
				genre: genre.value,
				isPaperBack: isPaperback
			}, {
				'x-auth-token': auth.token
			}
			)
			console.log(res);
		}
		catch(err){
			console.log(err);
		}
	}

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
        >
			<Styled.addBookModal>
			<Styled.addBookTop>
  <Styled.addBookText>ADD BOOK</Styled.addBookText>
  <Styled.input {...bookISBN.props} placeholder="ISBN number" placeholderTextColor="#636363" />
  <Styled.isbnHint>ISBN can be found at the back of your book above the bar code</Styled.isbnHint>
		{/* <Styled.addBookButtons>
			<Styled.addBookButton onPress={()=>setIsFiction(true)}>
				<Styled.addBookButtonText selected={isFiction}>Ficton</Styled.addBookButtonText>
			</Styled.addBookButton>
			<Styled.addBookButton onPress={()=>setIsFiction(false)}>
				<Styled.addBookButtonText selected={!isFiction}>Non Ficton</Styled.addBookButtonText>
			</Styled.addBookButton>
		</Styled.addBookButtons> */}
		<Styled.addBookButtons>
			<Styled.addBookButton onPress={()=>setIsPaperback(true)}>
				<Styled.addBookButtonText selected={isPaperback}>Paperback</Styled.addBookButtonText>
			</Styled.addBookButton>
			<Styled.addBookButton onPress={()=>setIsPaperback(false)}>
				<Styled.addBookButtonText selected={!isPaperback}>Hardcover</Styled.addBookButtonText>
			</Styled.addBookButton>
		</Styled.addBookButtons>
		<Styled.input {...genre.props} placeholder="Genre" placeholderTextColor="#636363" />
		</Styled.addBookTop>
		<Styled.addBookBottom>
		<Button text="Add Book" onPress={handleSubmit} />
		</Styled.addBookBottom>
</Styled.addBookModal>
		</RBSheet>
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
				{!props?.isProfile && <TouchableOpacity onPress={()=>{
					if (user.address) refRBSheet.current.open()
					else props.navigation.navigate('AddressForm', {
						callback: ()=>{
							props.navigation.navigate('Subscription')
							refRBSheet.current.open()
						}
					})
				}}>
					<Styled.addBook>Add Book</Styled.addBook>
					</TouchableOpacity>}
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
	addBook: styled.Text`
		background: #1B1B1B;
		padding: 8px 10px;
		border-radius: 8px;
		color: #FFFFFF;
		font-weight: bold;
	`,
	addBookModal: styled.View`
    padding: 35px 20px;
	justify-content: space-between;
	flex: 1;
  `,
  addBookText: styled.Text`
    font-family: 'heebo-700';
    color: #701fad;
    font-size: 17;
	margin-bottom: 7px;
  `,
  addBookTop: styled.View`
  `,
  input: styled.TextInput`
    background-color: #EFEEEE;
    font-size: 17;
    padding: 8px;
    border-radius: 5px;
    margin: 8px 0;
  `,
  isbnHint: styled.Text`
	color: #333;
	font-size: 11;
	margin-left: 2px;
	margin-bottom: 10px;
  `,
  addBookButtons: styled.View`
	flex-direction: row;
	margin: 10px 0;
	justify-content: space-around;
  `,
  addBookButton: styled.TouchableWithoutFeedback`
	
  `,
  addBookButtonText: styled.Text`
	border: 1px solid #222;
	padding: 10px;
	border-radius: 4px;
	width: 165px;
	text-align: center;

	${(props)=>props.selected && `
		background-color: #810CDDcc;
		color: #fff;
	`}
  `,
  addBookBottom: styled.View`
	margin-top: 32px;
  `
  };