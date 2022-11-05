import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import api from '../utils/api.service'
import Toast from 'react-native-toast-message';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { heightInPercent } from '../utils/utilities'
import WithGradientPage from './WithGradientPage';
const tick = require('../assets/icons/check.png')

export default function Subscription() {
  const refRBSheet = useRef();

  const [data, setData] = useState([
    {
    "_id": "63664f6aa43e2992344510a3",
    "name": "Casual Reader",
    "maxBorrowCount": 2,
    "plans": [
    {
    "numberOfMonths": 1,
    "price": 299,
    "_id": "63664f6aa43e2992344510a4"
    },
    {
    "numberOfMonths": 3,
    "price": 799,
    "_id": "63664f6aa43e2992344510a5"
    },
    {
    "numberOfMonths": 6,
    "price": 1499,
    "_id": "63664f6aa43e2992344510a6"
    }
    ],
    "createdAt": "2022-11-05T11:56:26.765Z",
    "updatedAt": "2022-11-05T11:56:26.765Z",
    "__v": 0
    },
    {
    "_id": "63664fa0a43e2992344510a8",
    "name": "Avid Reader",
    "maxBorrowCount": 3,
    "plans": [
    {
    "numberOfMonths": 1,
    "price": 449,
    "_id": "63664fa0a43e2992344510a9"
    },
    {
    "numberOfMonths": 3,
    "price": 1249,
    "_id": "63664fa0a43e2992344510aa"
    },
    {
    "numberOfMonths": 6,
    "price": 2399,
    "_id": "63664fa0a43e2992344510ab"
    }
    ],
    "createdAt": "2022-11-05T11:57:20.591Z",
    "updatedAt": "2022-11-05T11:57:20.591Z",
    "__v": 0
    },
    {
    "_id": "63664fe3a43e2992344510ad",
    "name": "Book Worm",
    "maxBorrowCount": 5,
    "plans": [
    {
    "numberOfMonths": 1,
    "price": 579,
    "_id": "63664fe3a43e2992344510ae"
    },
    {
    "numberOfMonths": 3,
    "price": 1639,
    "_id": "63664fe3a43e2992344510af"
    },
    {
    "numberOfMonths": 6,
    "price": 3179,
    "_id": "63664fe3a43e2992344510b0"
    }
    ],
    "createdAt": "2022-11-05T11:58:27.487Z",
    "updatedAt": "2022-11-05T11:58:27.487Z",
    "__v": 0
    }
    ])
  
  useEffect(() => {
    (async ()=>{
      try {
        // const data = await api.get('/subscription')
        // console.log(data);
        // setData(data)
      }
      catch(err){
        Toast.show({
          type: 'error',
          text1: 'Something went wrong'
        })
      }
    })()
  }, [])


  if (!data) return <Loading/>


  return (
    <WithGradientPage>
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
<Styled.subscription>
  <Styled.subscriptionText>SUBSCRIPTION DETAILS</Styled.subscriptionText>
</Styled.subscription>
        </RBSheet>
		  {data.map((sub,i)=> <TouchableWithoutFeedback onPress={()=>refRBSheet.current.open()}><Styled.card middle={i===1}>
        <Styled.cardLeft middle>
          <Styled.cardLeftTextTop>RUPEES</Styled.cardLeftTextTop>
          <Styled.cardLeftTextMiddle>{sub.plans[0].price}</Styled.cardLeftTextMiddle>
          <Styled.cardLeftTextBottom>PER MONTH</Styled.cardLeftTextBottom>
        </Styled.cardLeft>
        <Styled.cardMiddle></Styled.cardMiddle>
        <Styled.cardRight>
        <Styled.cardRightHeading>
          {sub.name}
        </Styled.cardRightHeading>
        <Styled.cardRightBenifit>
          <Styled.tick source={tick} />
        <Styled.cardRightBenifitText>
          {"Access to all books"}
        </Styled.cardRightBenifitText>
        </Styled.cardRightBenifit>
        <Styled.cardRightBenifit>
        <Styled.cardRightBenifitText>
        <Styled.tick source={tick} />
          {sub.maxBorrowCount} books per month
        </Styled.cardRightBenifitText>
        </Styled.cardRightBenifit>
        </Styled.cardRight>
      </Styled.card>
      </TouchableWithoutFeedback>
      )}
    </Styled.container>
    </WithGradientPage>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
    justify-content: center;
  `,
  card: styled.View`
    background-color: #DBD9D9;
    margin: 20px 30px;
    padding: 15px;
    height: 100px;
    border-radius: 5px;
    flex-direction: row;
    align-items: center;

    ${(props)=> props.middle && `
    background-color: #810CDD;
    margin: 20px;
    height: 120px;
    `}
  `,
  cardMiddle: styled.View`
    height:100%;
    width: 2px;
    background-color: #42086F;
    align-self: center;
    margin: -1px 20px;
    opacity: 0.25;
`,
  cardLeft: styled.View`
    text-align: center;
    font-family: 'heebo-500';
    color: #636363;
  `,
  cardLeftTextTop: styled.View`
    font-size: 11;
  `,
  cardLeftTextMiddle: styled.View`
    margin: 3px 0;
    font-size: 19;
    letter-spacing: 2px;
  `,
  cardLeftTextBottom: styled.View`
    font-size: 11;
  `,
  cardRight: styled.View`
    
  `,
  cardRightBenifit: styled.View`
      color: #222;
      font-size: 14;
      flex-direction: row;
      align-items: center;
      /* margin: 5px 0; */
    `,
    tick: styled.Image`
      width: 10px;
      height: 10px;
      margin-right: 4px;
    `,
    cardRightBenifitText: styled.Text`
      color: #222;
      font-size: 14;
    `,
  cardRightHeading: styled.Text`
    font-family: 'heebo-700';
    color: #701fad;
    font-size: 15;
    margin-bottom: 5px;
  `,
  subscription: styled.View`
    padding: 35px 20px;
  `,
  subscriptionText: styled.Text`
    font-family: 'heebo-700';
    color: #701fad;
    font-size: 17;
  `,
};
