import React from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mask?: string
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  onChange = () => null,
  mask,
  className,
  onFocus = () => null,
  onBlur = () => null,
  type = 'text',
  children,
  ...restProps
}) => {
  const [activeLabel, setActiveLabel] = React.useState(false);

  React.useEffect(() => {
    if (!restProps.value) return;
    setActiveLabel(!!restProps.value.toString().length);
  }, [restProps.value]);

  const handleChange = (event) => {
    return !!onChange && onChange(event);
  };

  const handleFocus = (event) => {
    setActiveLabel(true);
    return onFocus(event);
  };

  const handleBlur = (event) => {
    setActiveLabel(!!event.target.value);
    return onBlur(event);
  };

  return (
    <div className={classNames([styles.inputField, { [styles.activeLabel]: activeLabel }])}>
      <InputMask
        className={classNames([
          styles.input,
          className,
        ])}
        mask={mask}
        autoComplete='off'
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        type={type}
        {...restProps}
      />
      {!!label && (
        <div className={styles.inputLabel}>
          <span>
            {label}
          </span>
        </div>
      )}
      {typeof error === 'boolean' ? null : !!error && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {children}
    </div>
  );
};

export default Input;
