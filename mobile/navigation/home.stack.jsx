import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import AddressForm from "../pages/AddressForm";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen  name="Home" component={Home} />
      <Stack.Screen  name="AddressForm" component={AddressForm} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
