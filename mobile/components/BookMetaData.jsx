import styled from 'styled-components/native';

export default function BookMetaData ({dataKey, value}) {
	return (
		<Styled.keyValue>
			<Styled.dataKey>
				{dataKey}
			</Styled.dataKey> 
			<Styled.value>
				{value}
			</Styled.value>
		</Styled.keyValue>
	)
}

const Styled = {
	keyValue: styled.View`
		flexDirection: row;
		align-items: center;
		marginTop: 2px;
	`,
	dataKey: styled.Text`
		background: #C7C7C7;
		color: #636363;
		font-weight: bold;
		border-radius: 3px;
		font-size: 12px;
		padding: 1px 4px;
		margin-right: 2px;
	`,
	value: styled.Text`
		color: #636363;
		font-size: 0.9rem;
	`
}