import React from 'react';
import { Pressable, useColorScheme, View, SafeAreaView } from 'react-native';
import dynamicStyles from './styles';

function TabBar({ state, descriptors, navigation }) {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  function renderTab(route, index) {
    const { options } = descriptors[route.key];
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <Pressable
        key={index}
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={options?.tabPress ? options?.tabPress : onPress}
        onLongPress={onLongPress}
        style={styles.itemContainer}>
        <View style={styles.iconWrapper}>
          {options.tabBarIcon({ active: isFocused })}
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.tabBarContainer}>
      <View style={styles.tabBarWrapper}>{state.routes.map(renderTab)}</View>
    </SafeAreaView>
  );
}

export default TabBar;
