import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Badge from './Badge';
import BookMetaData from './BookMetaData';
import getLiberr from './../assets/getLiberr.png';

export default function BookTile({
	isBooksPage, 
	isBorrowedShelf, 
	isLentShelf, 
	bookName, 
	author, 
	image, 
	isbn, 
	publication, 
	isPaperBack 
}) {
	return (
		<Styled.container>
			<Styled.bookImage source="https://edit.org/images/cat/book-covers-big-2019101610.jpg"/>
			<Styled.bookInfo>
				<Styled.genre>
					<Badge text={"gg"} backgroundColor={"#404040"}/>
				</Styled.genre>
				<Styled.name>To Kill A Mockingbird</Styled.name>
				<Styled.author>Harper Lee</Styled.author>
				<Styled.meta>
					<Styled.data>
						<BookMetaData dataKey={"PUBL"} value={"Penguin Publishers"}/>
						<BookMetaData dataKey={"BIND"} value={"Paper Back"}/>
						<BookMetaData dataKey={"ISBN"} value={"12937 971412 927"}/>
					</Styled.data>
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
				</Styled.meta>
			</Styled.bookInfo>
		</Styled.container>
	)
}

const Styled = {
	container: styled(SafeAreaView)`
    	flex: 1;
		flexDirection: row;
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
		color: #810CDD
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
	`

}