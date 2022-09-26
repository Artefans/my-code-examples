import React from 'react';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import dynamicStyles from './styles';
import { GoogleIcon } from '../../SvgComponents';
import { showErrorNotification } from '../../utils/toast';

export const GoogleSignInButton = () => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  async function onGoogleSignIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      console.log(accessToken);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showErrorNotification('Operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showErrorNotification('Play services not available or outdated');
      }
    }
  }

  return (
    <TouchableOpacity onPress={onGoogleSignIn} style={styles.googleBtn}>
      <GoogleIcon />
      <Text style={styles.text}>Google</Text>
    </TouchableOpacity>
  );
};
