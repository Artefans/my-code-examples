import React from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewAddressThunk,
  findCityThunk,
  findCountryThunk,
  findDistrictsThunk,
  findRegionThunk,
  findStreetThunk,
} from '../../../../redux/thunk/geolocation';
import { formatCities } from '../AddressForm';
import claimPageStyles from '../../.module.scss';
import { showErrorNotification } from '../../../../utils/toast';
import { clearFormikValues, useFormikWithErrorAutoClear } from '../../../../utils/formik';
import { AutocompleteInputField, InputField, ScreenLoader } from '../../../../components';
import addAddressValidation from '../../../../core/validations/addAddressValidation';

const Modal = dynamic(() => import('../../../../components/Modal/Modal'));

function Radio({ checked, onChange }) {
  return (
    <div className={`${claimPageStyles.radioBlock} checkbox-extend`}>
      <input type="checkbox" value="false" checked={checked} onChange={onChange} />
    </div>
  );
}

const AddressModal = ({ isOpen, setIsOpen, values, onSubmit, title, removeFullAddress }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.geolocation.addNewAddressLoading);

  const countryList = useSelector(state => state.geolocation.countryList);
  const countryLoading = useSelector(state => state.geolocation.countryLoading);

  const regionList = useSelector(state => state.geolocation.regionList);
  const regionLoading = useSelector(state => state.geolocation.regionLoading);

  const cityList = useSelector(state => state.geolocation.cityList);
  const cityLoading = useSelector(state => state.geolocation.cityLoading);

  const streetList = useSelector(state => state.geolocation.streetList);
  const streetLoading = useSelector(state => state.geolocation.streetLoading);

  const districtList = useSelector(state => state.geolocation.districtList);
  const districtLoading = useSelector(state => state.geolocation.districtLoading);

  const cityListItems = cityList?.items && formatCities(cityList.items);

  const handleFormikSubmit = (values, { setErrors }) => {
    const errors = addAddressValidation(values);
    if (Object.keys(errors).length) {
      return setErrors(errors);
    }

    const dataToSend = Object.entries(values).reduce((accum, [key, value]) => {
      if (value === 'undefined' || !value) {
        return accum;
      }
      return { ...accum, [key]: value };
    }, {});
    delete dataToSend.helpers;

    dispatch(addNewAddressThunk(dataToSend)).then((data) => {
      if (data.success) {
        onSubmit(data.data);
        setIsOpen(false);
        setTimeout(formik.resetForm, 500);
      } else {
        showErrorNotification('При добавлении адреса возникла ошибка. Попробуйте повторить или обратитесь к администратору');
      }
    });
  };

  const { formik } = useFormikWithErrorAutoClear({
    initialValues: {
      ...values,
      postCode: '',
      helpers: {
        checkedStreet: false,
        checkedHouseNo: false,
        checkedRegion: false,
        postCode: true,
      },
    },
    validateOnBlur: false,
    validateOnChange: true,
    onSubmit: handleFormikSubmit,
  }, null);

  React.useEffect(() => {
    formik.setValues({ ...values, ...formik.values });
    formik.setFieldValue('helpers.checkedHouseNo', !!(values.street && values.streetId));
  }, [isOpen]);

  //Address actual
  //Country
  const handleCountryChange = (event) => {
    dispatch(findCountryThunk(event.target.value));
    formik.onValueChange('countryName')(event.target.value);
  };

  const handleCountrySelect = (event) => {
    formik.onValueChange('countryName')(event.target.dataset.name);
    formik.onValueChange('country')(event.target.dataset.value);
  };

  //Regions
  const regionClearValues = [
    'district', 'districtId',
  ];

  const handleRegionChange = (event) => {
    const value = event.target.value;
    const { country } = formik.values;
    dispatch(findRegionThunk(value, country));
    formik.onValueChange('region')(value);
    if (!value) {
      clearFormikValues([...regionClearValues, 'regionId'], formik, '');
    }
  };

  const handleRegionSelect = (event) => {
    formik.onValueChange('region')(event.target.dataset.name);
    formik.onValueChange('regionId')(event.target.dataset.value);
    clearFormikValues(regionClearValues, formik, '');
  };

  //District
  const handleDistrictChange = (event) => {
    const value = event.target.value;
    const { country, regionId } = formik.values;
    dispatch(findDistrictsThunk(country, regionId));
    formik.setFieldValue('district', value);
  };

  const handleDistrictSelect = (event) => {
    const data = JSON.parse(event.target.dataset.data);
    formik.setFieldValue('district', data.name);
    formik.setFieldValue('districtId', data.id);
  };

  //City
  const handleCityChange = (event) => {
    const value = event.target.value;
    const { country, regionId } = formik.values;
    dispatch(findCityThunk(value, country, regionId));
    formik.onValueChange('cityName')(value);
    if (!value) {
      clearFormikValues(['street', 'streetId', 'city', 'cityId'], formik, '');
    }
  };

  const handleCitySelect = (event) => {
    const data = JSON.parse(event.target.dataset.data);
    if (data?.districtName && data?.districtId) {
      formik.setFieldValue('district', data.districtName);
      formik.setFieldValue('districtId', data.districtId);
    }
    formik.setFieldValue('cityName', data.name);
    formik.setFieldValue('region', data.regionName);
    formik.setFieldValue('regionId', data.regionId);
    formik.setFieldValue('city', data.defaultName);
    formik.setFieldValue('cityId', data.cityId);
    formik.setFieldValue('cityKoatuu', data.cityKOATUU);
    clearFormikValues(['street', 'streetId'], formik, '');
  };

  //Street
  const handleStreetChange = (event) => {
    const value = event.target.value;
    const { country, regionId, cityId } = formik.values;
    dispatch(findStreetThunk(value, country, regionId, cityId));
    formik.onValueChange('street')(value);
    // if (!value) {
    //   clearFormikValues(['postCode', 'houseNo', 'flatNo'], formik, '');
    // }
  };

  const handleStreetSelect = (event) => {
    const { id, name } = JSON.parse(event.target.dataset.data);
    formik.setFieldValue('street', name);
    formik.setFieldValue('streetId', id);
    formik.setFieldValue('helpers.checkedHouseNo', true);
    // clearFormikValues(['postCode', 'houseNo', 'flatNo'], formik, '');
  };

  //Post Code
  const handlePostCodeChange = (event) => {
    formik.onValueChange('postCode')(event.target.value);
  };

  //Flat
  const handleFlatNoChange = (event) => {
    formik.onValueChange('flatNo')(event.target.value);
  };

  // radio buttons
  const clearStreetValues = ['street', 'streetId'];
  const clearRegionValues = ['region', 'city', 'cityId', 'district', 'districtId', 'cityKoatuu', 'cityName', ...clearStreetValues];

  const handleRadioRegionChange = () => {
    const checkedRegion = formik.values.helpers.checkedRegion;
    formik.setFieldValue('helpers.checkedCity', false);
    formik.setFieldValue('helpers.checkedStreet', !checkedRegion);
    formik.setFieldValue('helpers.checkedRegion', !checkedRegion);
    formik.setFieldValue('helpers.checkedHouseNo', !checkedRegion);
    formik.setFieldValue('helpers.postCode', checkedRegion);
    clearFormikValues(clearRegionValues, formik, '');
  };

  const handleRadioStreetChange = () => {
    const checkedStreet = formik.values.helpers.checkedStreet;
    const checkedRegion = formik.values.helpers.checkedRegion;

    formik.setFieldValue('helpers.checkedCity', false);
    formik.setFieldValue('helpers.checkedStreet', !checkedStreet);
    formik.setFieldValue('helpers.checkedHouseNo', !checkedStreet);
    formik.setFieldValue('helpers.postCode', checkedStreet);
    if (checkedRegion) {
      formik.setFieldValue('helpers.checkedRegion', !checkedRegion);
    }
    clearFormikValues(clearStreetValues, formik, '');
  };

  const handleCancel = (event) => {
    event && event.preventDefault();
    setIsOpen();
    setTimeout(formik.resetForm, 500);
  };

  return (
    <>
      {loading && <ScreenLoader />}
      <Modal isOpen={isOpen} setIsOpen={handleCancel}>
        <div>
          <div className={claimPageStyles.formTitle}>{title}</div>
          {!removeFullAddress && !!formik.values.full && (
            <div style={{ marginTop: 20 }}>
              <span className={claimPageStyles.textTitle}>Адрес регистрации (из документа)</span>
              <span className={claimPageStyles.text}>
                {formik.values.full}
              </span>
            </div>
          )}
          <div className={`form-extend form-grid`} style={{ paddingTop: 20 }}>
            <AutocompleteInputField
              loading={countryLoading}
              error={formik.errors.countryName}
              value={formik.values.countryName}
              onSelect={handleCountrySelect}
              onFocus={handleCountryChange}
              label={'Страна'}
              data={countryList?.items}
              onBlur={formik.handleBlur('formik.values.countryName')}
            />
            {formik.values.helpers.checkedRegion && (
              <>
                <AutocompleteInputField
                  style={`${!formik.values.helpers.checkedRegion && 'form-extend disabled'}`}
                  loading={regionLoading}
                  error={formik.errors.region}
                  value={formik.values.region}
                  onChange={handleRegionChange}
                  onFocus={handleRegionChange}
                  onSelect={handleRegionSelect}
                  label={'Область'}
                  data={regionList?.items}
                  onBlur={formik.handleBlur('formik.values.region')}
                />
                <AutocompleteInputField
                  disabled={!formik.values.regionId}
                  loading={districtLoading}
                  error={formik.errors.district}
                  value={formik.values.district}
                  onFocus={handleDistrictChange}
                  onSelect={handleDistrictSelect}
                  label={'Район'}
                  data={districtList?.items}
                  onBlur={formik.handleBlur('formik.values.district')}
                />
              </>
            )}
            <div className={'flex-row field'}>
              <Radio checked={formik.values.helpers.checkedRegion} onChange={handleRadioRegionChange} />
              {formik.values.helpers.checkedRegion ? (
                <InputField
                  error={formik.errors?.city}
                  style={`${claimPageStyles.radioInput}`}
                  label={'Город'}
                  onBlur={formik.handleBlur('city')}
                  onChange={formik.onValueChange('city')}
                  value={formik.values.city}
                />
              ) : (
                <AutocompleteInputField
                  style={claimPageStyles.radioInput}
                  loading={cityLoading}
                  error={formik.errors?.city}
                  value={formik.values.cityName}
                  onChange={handleCityChange}
                  onFocus={handleCityChange}
                  onSelect={handleCitySelect}
                  label={'Город (район, область)'}
                  data={cityListItems}
                  onBlur={formik.handleBlur('city')}
                />
              )}
            </div>
            <div className={'flex-row field'}>
              <Radio checked={formik.values.helpers.checkedStreet} onChange={handleRadioStreetChange} />
              {formik.values.helpers.checkedStreet ? (
                <InputField
                  disabled={!(formik.values.cityId || formik.values.regionId)}
                  error={formik.errors?.street}
                  style={claimPageStyles.radioInput}
                  label={'Улица'}
                  onBlur={formik.handleBlur('street')}
                  onChange={formik.onValueChange('street')}
                  value={formik.values.street}
                />
              ) : (
                <AutocompleteInputField
                  disabled={!(formik.values.cityId || formik.values.regionId)}
                  style={claimPageStyles.radioInput}
                  loading={streetLoading}
                  error={formik.errors?.street}
                  value={formik.values.street}
                  onChange={handleStreetChange}
                  onFocus={handleStreetChange}
                  onSelect={handleStreetSelect}
                  label={'Улица'}
                  data={streetList?.items}
                  onBlur={formik.handleBlur('street')}
                />
              )}
            </div>
            <InputField
              error={formik.errors.houseNo}
              style={claimPageStyles.radioInput}
              label={'Номер дома'}
              onBlur={formik.handleBlur('houseNo')}
              onChange={formik.onValueChange('houseNo')}
              value={formik.values.houseNo}
            />
            <InputField
              style={'half-width'}
              activeIfData
              pattern="[0-9]*"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              error={formik.errors.postCode}
              value={formik.values.postCode}
              onChange={handlePostCodeChange}
              label={'Почтовый индекс'}
              onBlur={formik.handleBlur('postCode')}
            />
            <InputField
              style={'half-width'}
              error={formik.errors.flatNo}
              value={formik.values.flatNo}
              onChange={handleFlatNoChange}
              label={'Номер квартиры'}
              onBlur={formik.handleBlur('flatNo')}
            />
          </div>
          <div className={claimPageStyles.buttonWrapper}>
            <button onClick={handleCancel} className={claimPageStyles.buttonCancel}>Отменить</button>
            <button onClick={formik.handleSubmit} className="button-extend confirm">Добавить</button>
          </div>
        </div>
      </Modal>
    </>
  );
};


export default React.memo(AddressModal);
