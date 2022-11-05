import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import api from '../utils/api.service'
import Toast from 'react-native-toast-message';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { heightInPercent } from '../utils/utilities'

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
		  {data.map((sub)=> <TouchableWithoutFeedback onPress={()=>refRBSheet.current.open()}><Styled.card >
        <Styled.cardLeft>
          <Styled.cardLeftTextTop>RUPEES</Styled.cardLeftTextTop>
          <Styled.cardLeftTextMiddle>{sub.plans[0].price}</Styled.cardLeftTextMiddle>
          <Styled.cardLeftTextBottom>PER MONTH</Styled.cardLeftTextBottom>
        </Styled.cardLeft>
        <Styled.cardMiddle>

        </Styled.cardMiddle>
        <Styled.cardRight>
        <Styled.cardRightHeading>
          {sub.name}
        </Styled.cardRightHeading>
        </Styled.cardRight>
      </Styled.card>
      </TouchableWithoutFeedback>
      )}
    </Styled.container>
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
  `,
  cardMiddle: styled.View`
    height:100%;
    width: 2px;
    background-color: #42086F;
    align-self: center;
    margin: 0 20px;
    opacity: 0.25;
`,
  cardLeft: styled.View`
    text-align: center
  `,
  cardLeftTextTop: styled.View`
    font-size: 12;
  `,
  cardLeftTextMiddle: styled.View`
    margin: 3px 0;
    font-size: 19;
    letter-spacing: 2px;
  `,
  cardLeftTextBottom: styled.View`
    font-size: 12;
  `,
  cardRight: styled.View`
    
  `,
  cardRightHeading: styled.Text`
    font-family: 'heebo-700';
    color: #701fad;
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