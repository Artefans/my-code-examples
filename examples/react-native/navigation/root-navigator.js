import React from 'react';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import MainStackNavigator from './MainStackNavigator';

const Stack = createStackNavigator();

export function RootNavigator() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator initialRouteName={'TabNavigator'}>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
