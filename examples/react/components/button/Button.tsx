import React from 'react';
import classNames from 'classnames';
import { LinkProps } from 'next/link';
import styles from './Button.module.scss';
import ActiveLink from '../ActiveLink/ActiveLink';
import { ArrowLeft, ArrowRight } from '../../SvgComponents';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variants
  arrowRight?: boolean
  arrowLeft?: boolean
  href?: string
}

enum Variants {
  blue = 'blue',
  red = 'red'
}

export type ButtonType = ButtonProps

const Button: React.FC<ButtonType> = ({
  children,
  href,
  variant = Variants.blue,
  className,
  ...restProps
}) => {
  const buttonClasses = classNames([
    styles['button'],
    styles[`button-${Variants[variant]}`],
    className,
  ]);

  const InnerComponent = () => {
    return (
      <>
        {!!restProps.arrowLeft && (
          <ArrowLeft className={styles.left} />
        )}
        {children}
        {!!restProps.arrowRight && (
          <ArrowRight className={styles.right} />
        )}
      </>
    );
  };

  if (href) {
    return (
      <ActiveLink href={href} {...restProps}>
        <a className={buttonClasses}>
          <InnerComponent />
        </a>
      </ActiveLink>
    );
  }

  return (
    <button className={buttonClasses} {...restProps}>
      <InnerComponent />
    </button>
  );
};

export default Button;
