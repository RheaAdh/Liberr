import HomeStack from './home.stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStack from './auth.stack';

export default function Router() {
  return (
    <SafeAreaProvider>
      {/* <AuthStack /> */}
      <HomeStack />
    </SafeAreaProvider>
  );
}
