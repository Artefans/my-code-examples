import React from 'react';
import { useSelector } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { Pressable, Text, useColorScheme, View } from 'react-native';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { navigate } from '../../utils/navigation';
import BoxIcon from '../../SvgIconComponents/BoxIcon';
import ShopIcon from '../../SvgIconComponents/ShopIcon';
import { staticLinks } from '../../dummyData/redirects';
import SafelyIcon from '../../SvgIconComponents/SafelyIcon';
import TenderIcon from '../../SvgIconComponents/TenderIcon';
import CalculatorIcon from '../../SvgIconComponents/CalculatorIcon';
import { LocalizationContext } from '../../Core/localization/IMLocalization';

export const modalRef = React.createRef(null);

const AddModal = () => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { t } = React.useContext(LocalizationContext);
  const user = useSelector((state) => state.auth.user);

  const redirects = {
    addTender: () => {
      modalRef.current.close();
      navigate('MainStack', { screen: 'TenderCreationScreen' });
    },
    safely: () => {
      modalRef.current.close();
      navigate('MainStack', {
        screen: 'AppWebView',
        params: { content: staticLinks.save },
      });
    },
    createShop: () => {
      modalRef.current.close();
      navigate('MainStack', { screen: 'CompanyCreateScreen' });
    },
    addGoods: () => {
      modalRef.current.close();
      navigate('MainStack', { screen: 'AddGoodsScreen', params: { service: false } });
    },
    calculateDelivery: () => {
      modalRef.current.close();
      navigate('MainStack', {
        screen: 'AppWebView',
        params: { content: `${staticLinks.delivery}` },
      });
    },
    showRoom: () => {
      modalRef.current.close();
      navigate('MainStack', {
        screen: 'AppWebView',
        params: { content: `${staticLinks.showRoom}` },
      });
    },
  };

  return (
    <Modalize ref={modalRef} adjustToContentHeight={true}>
      <View style={styles.container}>
        <Pressable onPress={redirects.addTender} style={styles.itemContainer}>
          <Text style={styles.text}>{t('Create tender')}</Text>
          <View style={styles.iconContainer}>
            <TenderIcon size={28} color={AppStyles.colorSet[colorScheme].mainTextColor} />
          </View>
        </Pressable>
        <Pressable onPress={redirects.safely} style={styles.itemContainer}>
          <Text style={styles.text}>{t('Make a deal safely')}</Text>
          <View style={styles.iconContainer}>
            <SafelyIcon size={24} color={AppStyles.colorSet[colorScheme].mainTextColor} />
          </View>
        </Pressable>
        <Pressable onPress={redirects.createShop} style={styles.itemContainer}>
          <Text style={styles.text}>{t('Create store')}</Text>
          <View style={styles.iconContainer}>
            <ShopIcon size={22} color={AppStyles.colorSet[colorScheme].mainTextColor} />
          </View>
        </Pressable>
        {!!user && (
          <Pressable onPress={redirects.addGoods} style={styles.itemContainer}>
            <Text style={styles.text}>{t('Add product')}</Text>
            <View style={styles.iconContainer}>
              <BoxIcon size={24} color={AppStyles.colorSet[colorScheme].mainTextColor} />
            </View>
          </Pressable>
        )}
        <Pressable onPress={redirects.calculateDelivery} style={styles.itemContainer}>
          <Text style={styles.text}>{t('Calculate delivery')}</Text>
          <View style={styles.iconContainer}>
            <CalculatorIcon size={24} />
          </View>
        </Pressable>
      </View>
    </Modalize>
  );
};

export default AddModal;
