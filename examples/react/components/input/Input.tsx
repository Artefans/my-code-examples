import React from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import styles from './Input.module.scss';
import Tooltip from '../Tooltip/Tooltip';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  mask?: string;
  fieldType?: string;
  title?: string;
  inputRef?: any;
  IconRight?: React.FC<any> | string;
  tooltip?: string;
  onClickRightIcon?: any;
  placeholderMask?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  mask,
  title,
  IconRight,
  onChange,
  inputRef,
  className,
  tooltip,
  onClickRightIcon,
  placeholderMask,
  onFocus = () => null,
  onBlur = () => null,
  ...restProps
}) => {
  const [visibleMask, setVisibleMask] = React.useState(!!placeholderMask);
  const handleChange = (event) => {
    const { value } = event.target;
    if (mask) {
      const unmask = value.replace(/[^\d]/g, '');
      return !!onChange && onChange(unmask);
    }
    return !!onChange && onChange(value);
  };

  const handleFocus = (event) => {
    if (placeholderMask) setVisibleMask(false);
    return onFocus(event);
  };

  const handleBlur = (event) => {
    if (placeholderMask) setVisibleMask(true);
    return onBlur(event);
  };

  return (
    <div className={`input-field ${styles.inputField}`}>
      {!!title && <span className={styles.title}>{title}</span>}
      {!!label && <span className={`label ${styles.inputLabel}`}>{label}</span>}
      <InputMask
        inputRef={inputRef}
        className={classNames([
          'input',
          styles.inputFieldItem,
          { [styles.rightIcon]: !!IconRight || !!tooltip },
          { [styles.errorInput]: !!error },
          className,
        ])}
        mask={mask}
        autoComplete='off'
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
      {!!placeholderMask && visibleMask && (
        <div className={styles.placeholderMask}>{placeholderMask}</div>
      )}

      {!!tooltip && (
        <div
          className={classNames([
            styles.icon,
            styles.right,
            styles.tooltip,
            { [styles.iconWithTitle]: !!title },
          ])}
        >
          <Tooltip>{tooltip}</Tooltip>
        </div>
      )}
      {!!IconRight && (
        <div
          className={classNames([
            styles.icon,
            styles.right,
            { [styles.iconWithTitle]: !!title },
          ])}
          onClick={onClickRightIcon}
        >
          {typeof IconRight === 'string' ? (
            <img
              src={IconRight}
              className={'inputRightIcon'}
            />
          ) : (
            <IconRight />
          )}
        </div>
      )}
      {typeof error === 'boolean'
        ? null
        : !!error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
