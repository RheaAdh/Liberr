import HomeStack from './home.stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './auth.stack';
import { useAuth } from '../context/AuthProvider';

export default function Router() {
  const auth = useAuth()

  return (
    <SafeAreaProvider>
      {auth.user ? <HomeStack /> : <AuthStack />}
      {/* <HomeStack /> */}
    </SafeAreaProvider>
  );
}
