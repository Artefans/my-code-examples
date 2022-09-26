import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from '../Modal/Modal';
import styles from './LoginModal.module.scss';
import Input from '../Input/Input';
import PasswordInput from '../PasswordInput/PasswordInput';
import Button from '../Button/Button';
import { ArrRight } from '../../SvgComponents';

const FormSchema = Yup.object().shape({
  phone: Yup.string().required('Required').length(13),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const LoginModal = ({
  active = false,
  setActive = () => null,
  setUser = () => null,
}) => {

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal active={active} setActive={setActive} className={styles.modal}>
      <div className={'title'}>
        Login
      </div>
      <div className={styles.form}>
        <Input
          // error
          value={formik.values.phone}
          onBlur={formik.handleBlur('phone')}
          onChange={(value) => formik.setFieldValue('phone', value)}
          label={'Phone'}
          placeholderMask={'+111'}
          placeholder={'+111 (XXX) XXX XX-XX'}
          mask={'+\\1\\1\\1-999-999-99-99'}
        />
        <PasswordInput
          // error={<span className={styles.error}>Incorrect phone or password</span>}
          onBlur={formik.handleBlur('password')}
          onChange={(value) => formik.setFieldValue('password', value)}
          placeholder={'Password'}
        />
        <div className={styles.forgotPassword}>
          <button className={styles.button}>
            Forgot password?
          </button>
        </div>
        <div className={styles.reCAPTCHA}>
          <div className={styles.text}>
            Please check box below to proceed.
          </div>
          <ReCAPTCHA sitekey="key" onChange={onChangeCaptcha} />
        </div>
        <Button
          className={styles.login}
          onClick={() => {
            setUser(true);
            setActive(false);
          }}
        >
          Login <ArrRight width={24} />
        </Button>
        <div className={styles.signUpContainer}>
            <span>
              Don&#39;t have an account yet?
              <button className={styles.signUp}>
                Sign up
              </button>
            </span>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
