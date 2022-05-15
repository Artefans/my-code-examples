import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';
import { HomePhoneInput } from '../../components';
import { DropDownArrow } from '../../SvgComponents';

export const moreMeetRef = React.createRef();

const HomeIntro = () => {
  const user = useSelector((store) => store.auth.user);
  const { t } = useTranslation();

  const handleScrollToFeatures = () => {
    moreMeetRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={'intro'}>
      <div className={'intro__background-img flex flex__column'}>
        <div className={'intro__container flex flex__column'}>
          <div className={'default-text-block'}>
            <h2 className={'title text-kit bold'}>{t('Accurate data that makes money!')}</h2>
            <p className={'subtitle text-kit'}>
              {t('Amazon intro text')}
            </p>
          </div>
          {!user && <HomePhoneInput />}
        </div>
        <div className={'intro__bottom-button-container flex flex__center'}>
          <button onClick={handleScrollToFeatures} className={'intro__bottom-button'}>
            <span>{t('More meat')}</span>
            <DropDownArrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;
