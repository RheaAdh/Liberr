import { useState } from 'react'
import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../components/Logo';
import useInputState from '../hooks/useInputState'
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../utils/utilities';
import api from '../utils/api.service';
import Loading from '../components/Loading';
 

export default function Register({navigation}) {
  const name = useInputState()
  const email = useInputState()
  const password = useInputState()
  const confirmPassword = useInputState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name.value || !email.value || !password.value || !confirmPassword.value){
        Toast.show({
            type: 'error',
            text1: 'All fields are required',
        });
        return;
    }
    if (!validateEmail(email.value)) {
        Toast.show({
            type: 'error',
            text1: 'Email is invalid',
        });
    }

    if (password.value !== confirmPassword.value) {
        Toast.show({
            type: 'error',
            text1: 'Passwords do not match',
        });
    }

    try {
        setLoading(true);
        await api.post('/auth/register', {
            name: name.value,
            email: email.value,
            password: password.value
        })
        setLoading(false);
        navigation.navigate('AddressForm', {
            fromRegister:true
        })
    }
    catch(err){
        console.log(err);
        setLoading(false);
        Toast.show({
            type: 'error',
            text1: err.response.data.error,
        });
    }
  }

  if (loading) return <Loading/>

  return (
    <Styled.container>
      <Logo/>
      <Styled.form>
        <Styled.heading>Join the community!</Styled.heading>
        <Styled.input {...name.props} placeholder="Full Name" placeholderTextColor="#636363" />
        <Styled.input {...email.props} placeholder="Email" placeholderTextColor="#636363" />
        <Styled.input {...password.props} placeholder="Password" placeholderTextColor="#636363" />
        <Styled.input {...confirmPassword.props} placeholder="Confirm Password" placeholderTextColor="#636363" />
      </Styled.form>
      <Button text='Continue' onPress={handleSubmit}/>
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
  form: styled.View`
    margin-bottom:70px;
  `,
  input: styled.TextInput`
    background-color: #EFEEEE;
    font-size: 17;
    padding: 8px;
    border-radius: 4px;
    margin: 8px 0;
  `,
};