import { useState } from 'react'
import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../components/Logo';
import Button from '../components/Button';
import useInputState from '../hooks/useInputState';
import Toast from 'react-native-toast-message';
import api from '../utils/api.service';
import { useAuth } from '../context/AuthProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loading from '../components/Loading';

export default function AddressForm({navigation, route}) {

    const houseNumber = useInputState()
    const streetName = useInputState()
    const city = useInputState()
    const state = useInputState()
    const pin = useInputState()
    const auth = useAuth()
    const [loading, setLoading] = useState(false)


    const handleSubmit = async ()=>{
        if (!houseNumber.value || !pin.value || !city.value || !state.value) {
            Toast.show({
                type:'error',
                text1: 'Required fields are missing'
            })
        }

        const address = `${houseNumber.value} ${streetName.value} ${city.value} ${state.value} ${pin.value}`

        await api.post('/profile/editAddress', {
          address
        }, {'x-auth-token': auth.token})

        auth.updateUser({
          address
        })
  
        navigation.navigate('Home')
        route.params && route.params.callback()
      }

    if (loading) return <Loading/>

  return (
    <Styled.container>
      <Logo/>
      <Styled.form>
        <Styled.heading>{(route.params && route.params.fromRegister) ? 'Almost there!': 'Fill your address'}</Styled.heading>
        <Styled.input {...houseNumber.props}  placeholder="House Number*" placeholderTextColor="#636363" />
        <Styled.input {...streetName.props}  placeholder="Street" placeholderTextColor="#636363" />
        <Styled.input {...city.props} placeholder="City*" placeholderTextColor="#636363" />
        <Styled.input {...state.props} placeholder="State*" placeholderTextColor="#636363" />
        <Styled.input {...pin.props} placeholder="PIN Code*" placeholderTextColor="#636363" />
      </Styled.form>
      <Styled.bottom>
         {(route.params && route.params.fromRegister) ? <TouchableWithoutFeedback onPress={login}>
            <Styled.skip>Skip for now</Styled.skip>
          </TouchableWithoutFeedback>: <TouchableWithoutFeedback onPress={()=>navigation.navigate('Home')}>
            <Styled.skip>Go back</Styled.skip>
          </TouchableWithoutFeedback>}
        <Button text={'Continue'} onPress={handleSubmit}/>
      </Styled.bottom>
    </Styled.container>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
    padding: 30px;
    justify-content: space-between;
  `,
  heading: styled.Text`
    font-family: 'heebo-500';
    color: #444;
    font-size: 19;
    margin-bottom: 20px;
  `,
  form: styled.View``,
  input: styled.TextInput`
    background-color: #EFEEEE;
    font-size: 17;
    padding: 8px;
    border-radius: 4px;
    margin: 8px 0;
    /* flex: 2; */
  `,
  bottom: styled.View`
    gap: 10px;
  `,
  skip: styled.Text`
        text-decoration: underline;
        color: #636363;
        text-align: center;
   `
};