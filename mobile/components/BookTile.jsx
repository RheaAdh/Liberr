import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from './Badge';
import BookMetaData from './BookMetaData';
import getLiberr from './../assets/getLiberr.png';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function BookTile({
	isBooksPage=false, 
	isBorrowedShelf=false, 
	isLentShelf=false, 
	name, 
	authors, 
	imageLink, 
	genre,
	copies,
	placeOrder
}) {

	return (
		<Styled.bookTile>
		<Styled.container>
			<Styled.bookImage source={imageLink}/>
			<Styled.bookInfo>
				<Styled.genre>
					{!isBorrowedShelf && isBooksPage && <Badge text={genre} backgroundColor={"#404040"}/>}
					{!isBorrowedShelf && copies.length === 1 && <Badge text={'Unique Copy'} backgroundColor={"#810CDD"}/>}
					{isBorrowedShelf && <Badge text={'Borrowed'} backgroundColor={"#810CDD"}/>}
				</Styled.genre>
				<Styled.name>{name}</Styled.name>
				<Styled.author>{authors[0]}</Styled.author>
				<Styled.meta>
					<Styled.data>
						<BookMetaData dataKey={"PUBL"} value={copies[0].publisher}/>
						<BookMetaData dataKey={"BIND"} value={copies[0].isPaperBack ? "Paperback Edition" : "Hardcover Edition"}/>
						<BookMetaData dataKey={"ISBN"} value={copies[0]._id}/>
					</Styled.data>
					{
						isBooksPage && !isBorrowedShelf && !isLentShelf &&
						<TouchableWithoutFeedback onPress={placeOrder}>
						<Styled.get>
							<div style={{ 
								display: 'flex', 
								flexDirection: 'column', 
								alignItems: 'center', 
								border: '1px solid #DBDBDB', 
								padding: '5px',
								borderRadius: 5
								}}
							>
								<Styled.getBook source={getLiberr}></Styled.getBook>
								<p style={{margin: 0, fontSize: "0.7rem", marginTop: '1px', color: '#810CDD'}}>GET</p>
							</div>
						</Styled.get>
						</TouchableWithoutFeedback>
					}
				</Styled.meta>
			</Styled.bookInfo>
		</Styled.container>
		{
			!isBooksPage && isBorrowedShelf && !isLentShelf && 
			<Styled.buttons>
				<Styled.markAsRead>Mark As Read</Styled.markAsRead>
				<Styled.reportLost>Report Lost</Styled.reportLost>
			</Styled.buttons>
		}
		</Styled.bookTile>
	)
}

const Styled = {
	container: styled(SafeAreaView)`
		flexDirection: row;
		margin: 10px 0;
  	`,
	bookTile: styled.View`
		flex-direction: column;
		margin-top: 7px;
	`,
	bookImage: styled.Image`
		width: 100px;
		height: 150px;
	`,
	bookInfo: styled.View`
		flex: 1;
		padding: 5px
	`,
	genre: styled.View`
		display: flex;
		flexDirection: row;
		gap: 3px;
		padding: 0
	`,
	name: styled.Text`
		marginTop: 2px;
		fontSize: 1.2rem;
		fontWeight: bold;
	`,
	author: styled.Text`
		color: #810CDD;
		fontSize: 1rem
	`,
	meta: styled.View`
		flexDirection: row;
	`,
	data: styled.View`
		flexDirection: column;
		width: 70%;
	`,
	get: styled.TouchableOpacity`
		flex-direction: column;
		align-items: end;
		justify-content: end;
		width: 30%;
		padding: 10px
	`,
	getBook: styled.Image`
		height: 32px;
		width: 45px;
	`,
	buttons: styled.View`
		flex-direction: row;
		justify-content: center;
		gap: 5px;
		color: white;
		margin-top: 5px;
	`,
	markAsRead: styled.TouchableOpacity`
		background: #232323;
		width: 50%;
		padding: 10px 5px;
		text-align: center;
		border-radius: 5px;
		font-size: 0.9rem;
	`,
	reportLost: styled.TouchableOpacity`
		background: #646464;
		width: 50%;
		padding: 10px 5px;
		text-align: center;
		border-radius: 5px;
		font-size: 0.9rem;
	`

} 