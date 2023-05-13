/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './screens/welcome';
import Login from './screens/login';
import Register from './screens/register';
import Home from './component/home';
import TaskDetail from './screens/taskDetails';

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="welcome"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="welcome" component={Welcome} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="register" component={Register} />
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="taskDetail" component={TaskDetail} />
  </Stack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
