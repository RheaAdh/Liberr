import styled from 'styled-components/native';

export default function Badge ({text, backgroundColor, color="#E0E0E0"}) {
	return (
		<Styled.genreText style={{backgroundColor: backgroundColor, color: color }}>
			{text}
		</Styled.genreText>
	)
}

const Styled = {
	genreText: styled.Text`
		margin: 0;
		padding: 4px 7px;
		border-radius: 7px;
	`
}