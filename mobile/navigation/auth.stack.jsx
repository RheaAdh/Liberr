import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../pages/Landing";
import Register from "../pages/Register";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Register"
    >
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
