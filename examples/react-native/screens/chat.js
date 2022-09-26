import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme, View, VirtualizedList } from 'react-native';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { ChatContactListItem } from '../../ui';
import { TNActivityIndicator } from '../../Core/truly-native';
import NothingToShow from '../../components/NothingToShow/NothingToShow';
import { LocalizationContext } from '../../Core/localization/IMLocalization';

const ChatScreen = () => {
  const navigation = useNavigation();
  const { t } = React.useContext(LocalizationContext);
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const connectingLoading = useSelector((state) => state.chat.connectingLoading);
  const user = useSelector((state) => state.auth.user);
  const opponents = useSelector((state) => state.chat.opponents);
  const opponentsLoading = useSelector((state) => state.chat.opponentsLoading);

  function onContactPress(contact) {
    return navigation.navigate('MainStack', { screen: 'ChatRoomScreen', params: { opponent: contact } });
  }

  const renderContact = ({ item }) => {
    return <ChatContactListItem item={item} onPress={() => onContactPress(item)} />;
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={styles.container}>
      {opponentsLoading && <TNActivityIndicator opacity />}
      {(user && connectingLoading) && (
        <TNActivityIndicator style={{ backgroundColor: AppStyles.colorSet[colorScheme].whiteWithLightOpacity }} />
      )}
      {(!user || !opponents.length) ? (
        <NothingToShow title={t('You have no messages yet')} icon={AppStyles.iconSet.noMessages} />
      ) : (
        <VirtualizedList
          getItem={(data, index) => data[index]}
          getItemCount={(data) => data?.length}
          keyExtractor={keyExtractor}
          initialNumToRender={20}
          maxToRenderPerBatch={50}
          data={opponents}
          renderItem={renderContact}
        />
      )}
    </View>
  );
};

export default ChatScreen;
