import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Button.module.scss';

enum Variants {
  pill = 'pill',
  secondary = 'secondary',
  outline = 'outline',
  text = 'text',
  white = 'white',
  gray = 'gray',
  border = 'border',
  black = 'black',
  blocked = 'blocked',
}

enum ComponentVariants {
  button = 'button',
  a = 'a',
  router = 'router',
}

enum Size {
  normal = 'normal',
  small = 'small',
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  to?: string;
  href?: string;
  Component?: string | React.JSXElementConstructor<any>;
  loading?: boolean;
  variant?: Variants;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({
  Component = ComponentVariants.button,
  loading,
  variant,
  children,
  size,
  className,
  onClick = () => null,
  ...restProps
}) => {
  const classes = classNames([
    styles.button,
    {
      [styles.loading]: loading,
      [styles.pill]: variant === Variants.pill,
      [styles.secondary]: variant === Variants.secondary,
      [styles.outline]: variant === Variants.outline,
      [styles.small]: size === Size.small,
      [styles.normal]: size === Size.normal,
      [styles.textVariant]: variant === Variants.text,
      [styles.white]: variant === Variants.white,
      [styles.gray]: variant === Variants.gray,
      [styles.border]: variant === Variants.border,
      [styles.black]: variant === Variants.black,
      [styles.blocked]: variant === Variants.blocked,
    },
    className,
  ]);

  if (Component === ComponentVariants.router && restProps.href) {
    return (
      <Link href={restProps.href}>
        <a className={classes} onClick={onClick}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <Component className={classes} onClick={onClick} {...restProps}>
      {children}
    </Component>
  );
};

export default Button;
