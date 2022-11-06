import {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import arrowRight from './../assets/icons/rightArrow.png'
import Loading from '../components/Loading';
import api from '../utils/api.service';
import { useAuth } from '../context/AuthProvider';
import BookTile from '../components/BookTile';

export default function PreviousBooks({borrowed, backToProfile}) {
    const [data, setData] = useState(null)
    const auth = useAuth()
    useEffect(() => {
        (async ()=>{
            try {
                // const res = await api.get('/profile/orders', {
                //     'x-auth-token': auth.token
                // })
                // console.log(res);
                // setData(res.data.map((data)=>data.isbn))
            }
            catch(err){
                console.log(err);
            }
        })()
    }, [])

    // if (!data) return <Loading fullScreen/>
    return (
        <Styled.container>
            <Styled.top>
            <Styled.heading>{borrowed ? 'Previously borrowed books' : 'Previously lent books'}</Styled.heading>
            <TouchableWithoutFeedback onPress={backToProfile}>
               <Styled.topLeft>
               <Styled.topBack><img src={arrowRight}></img></Styled.topBack><p>Profile</p>
               </Styled.topLeft>
               </TouchableWithoutFeedback>
            </Styled.top>
            <Styled.list>
                {/* {data && data.map((data)=> <BookTile isLentShelf {...data}/>)} */}
            </Styled.list>
        </Styled.container>
    )
}

const Styled = {
    container: styled(SafeAreaView)`
      flex: 1;
      padding: 30px;
    `,
    heading: styled.Text`
        font-family: 'heebo-500';
        font-size: 20;
    `,
    top: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`,
topBack: styled.View`
    transform: rotate(180deg);
    margin-right: 5px;
`,
list: styled.View`
 
`,
topLeft: styled.View`
flex-direction: row;
align-items: center;
color: #8C8C8C;
`,
  };