// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Image } from 'react-native';
import YoutubeScreen from './YoutubeScreen';
import VimeoScreen from './VimeoScreen';
import WelcomeScreen from './WelcomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="YouTube" 
        component={YoutubeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_circle_%282017%29.svg' }}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Vimeo" 
        component={VimeoScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Vimeo_Icon_White_on_Blue.svg' }}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
