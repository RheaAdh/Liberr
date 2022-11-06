import styled from 'styled-components/native';
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from '../components/Loading';
import TabBar from '../components/TabBar';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Books from './Books';
import Tracking from './Tracking';
import Subscription from './Subscription';
import Profile from './Profile';
import Shelf from './Shelf';
import WithGradientPage from './WithGradientPage';

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Styled.container>
      {/* <Loading /> */}
      <Tab.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Books"} tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name="Tracking" component={Tracking} />
        <Tab.Screen name="Subscription" component={Subscription} />
        <Tab.Screen name="Books" component={Books} />
        <Tab.Screen name="Shelf" component={Shelf} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </Styled.container>
  );
}

const Styled = {
  container: styled(SafeAreaView)`
    flex: 1;
  `,
  heading: styled.Text``,
};