import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Login from "../screens/login";
import Home from "../screens/home";

const screens = {
  // Login: {
  //   screen: Login,
  //   navigationOptions: { headerShown: false },
  // },
  Home: {
    screen: Home,
    navigationOptions: { headerShown: false },
  },
};

const AppStack = createStackNavigator(screens);
export default createAppContainer(AppStack);
