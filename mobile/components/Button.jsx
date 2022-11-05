import styled from 'styled-components/native';

export default function Button({text,icon,onPress}) {
    return (
        <Styled.button onPress={onPress}>
            <Styled.text>{text}</Styled.text>
            {icon}
        </Styled.button>
    );
}

const Styled = {
    button: styled.TouchableOpacity`
        background-color: #810CDD;
        padding: 12px;
        border-radius: 5px;
        flex-direction: row;
        justify-content: center;
    `,
    text: styled.Text`
        color: #FFFFFF;
        font-family: 'fira-sans-500';
    `,
};