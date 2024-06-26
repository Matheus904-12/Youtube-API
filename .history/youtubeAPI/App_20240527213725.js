// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import WelcomeScreen from './WelcomeScreen';
import YoutubeScreen from './YoutubeScreen';
import VimeoScreen from './VimeoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'YouTube') {
            iconName = 'https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_circle_%282017%29.svg';
          } else if (route.name === 'Vimeo') {
            iconName = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Vimeo_Icon_White_on_Blue.svg';
          }
          return <Image source={{ uri: iconName }} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#c4302b',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="YouTube" component={YoutubeScreen} />
      <Tab.Screen name="Vimeo" component={VimeoScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
