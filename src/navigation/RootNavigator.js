import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons'; // ← add

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size, color }) => {
          const name =
            route.name === 'Home'
              ? (focused ? 'home' : 'home-outline')
              : (focused ? 'person' : 'person-outline');
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
