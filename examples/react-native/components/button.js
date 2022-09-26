import React from 'react';
import { Text, Pressable, View, useColorScheme } from 'react-native';
import dynamicStyles from './styles';

const AppBtn = ({ disabled, onPress, children, style = {}, secondary }) => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const activeStyle = secondary ? styles.btnSecondary : styles.btn;
  const disabledStyle = secondary ? styles.btnDisabledSecondary : styles.btnSecondary;

  return (
    <Pressable style={{ ...style.container, ...style }} disabled={disabled} onPress={onPress}>
      <View style={[activeStyle, disabled && disabledStyle, style.button]}>
        <Text style={[styles.text, style.text, secondary && styles.textSecondary]}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default AppBtn;
