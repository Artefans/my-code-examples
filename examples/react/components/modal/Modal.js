import classNames from 'classnames';
import styles from './Modal.module.scss';
import { CloseMobile } from '../../SvgComponents';

const Modal = ({
  active = false,
  setActive = () => null,
  children,
  className,
}) => {
  return (
    <div
      className={classNames([
        styles.wrap,
        { [styles.open]: active },
        className,
      ])}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.close} onClick={() => setActive(false)}>
            <CloseMobile />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
