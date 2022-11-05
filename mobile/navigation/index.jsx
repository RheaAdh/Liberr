import HomeStack from './home.stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Router() {
  return (
    <SafeAreaProvider>
      <HomeStack />
    </SafeAreaProvider>
  );
}
