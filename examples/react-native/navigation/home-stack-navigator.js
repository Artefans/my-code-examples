import React from 'react';
import { useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import dynamicStyles from './styles';
import { Home, Post } from '../screens';
import { LeftHeaderText, HeaderLeftBack } from '../components';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  const colorSchema = useColorScheme();
  const styles = dynamicStyles(colorSchema);
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerStyle: styles.headerStyle,
          headerTitle: '',
          headerLeft: () => <LeftHeaderText>ASK NURE</LeftHeaderText>,
        }}
      />
      <Stack.Screen
        name="PostScreen"
        component={Post}
        options={{
          headerTitle: '',
          headerStyle: styles.headerStyle,
          headerLeft: () => <HeaderLeftBack />,
        }}
      />
    </Stack.Navigator>
  );
}
