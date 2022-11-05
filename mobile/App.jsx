import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Router from "./navigation";
import Toast from "react-native-toast-message";
import { toastConfig } from './utils/utilities'
// import ExampleProvider from './context/Example';
import { useFonts } from 'expo-font';
import { Heebo_400Regular, Heebo_500Medium, Heebo_700Bold } from '@expo-google-fonts/heebo'
import { FiraSans_400Regular, FiraSans_500Medium, FiraSans_700Bold } from '@expo-google-fonts/fira-sans'
import * as SplashScreen from 'expo-splash-screen';
import AuthProvider from './context/AuthProvider'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'fira-sans': FiraSans_400Regular,
    'fira-sans-500': FiraSans_500Medium,
    'fira-sans-700': FiraSans_700Bold,
    'heebo': Heebo_400Regular,
    'heebo-500': Heebo_500Medium,
    'heebo-700': Heebo_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded])

  if (!fontsLoaded) return null
  
  return (
    <NavigationContainer>
      <AuthProvider>
        <Router/>
      </AuthProvider>
      <Toast autoHide visibilityTime={2000} position='bottom' config={toastConfig} />
    </NavigationContainer>
  );
}