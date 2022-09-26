import React, { useContext } from 'react';
import { useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { MenuListItem } from '../../components';
import { SettingsIcon } from '../../SvgComponents';
import { LocalizationContext } from '../../localization';

const UserSettings = () => {
  const { t } = useContext(LocalizationContext);

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const menuNavigation = {
    userAvatar: () => {
      navigation.navigate('MainStack', { screen: 'ChangeUserAvatar' });
    },
    userName: () => {
      navigation.navigate('MainStack', { screen: 'ChangeUserName' });
    },
  };

  return (
    <View style={styles.container}>
      <MenuListItem
        onPress={menuNavigation.userName}
        icon={<SettingsIcon color={AppStyles.colorSet[colorScheme].textColor} />}>
        {t('Change name')}
      </MenuListItem>
      <MenuListItem
        onPress={menuNavigation.userAvatar}
        icon={<SettingsIcon color={AppStyles.colorSet[colorScheme].textColor} />}>
        {t('Change avatar')}
      </MenuListItem>
    </View>
  );
};

export default UserSettings;
