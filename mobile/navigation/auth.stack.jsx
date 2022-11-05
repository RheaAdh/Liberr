import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import AddressForm from "../pages/AddressForm";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Landing"
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="AddressForm" component={AddressForm} />
    </Stack.Navigator>
  );
}
