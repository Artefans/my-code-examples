import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './Service.module.scss';

interface ServiceProps extends React.BaseHTMLAttributes<any> {
  imageWidth?: ImageWidth
  imageHeight?: ImageHeight
  reverse?: boolean
  image: string
  contentPadding?: ContentPadding
}

enum ImageWidth {
  'width-650' = '650px',
  'width-590' = '590px',
  'width-680' = '680px',
  'width-630' = '630px',
  'width-620' = '620px',
  'width-640' = '640px',
}

enum ContentPadding {
  'padding-70' = '70px',
  'padding-80' = '80px',
  'padding-120' = '120px',
  'padding-130' = '130px',
}

enum ImageHeight {
  'height-366' = '366px',
  'height-340' = '340px',
  'height-380' = '380px',
  'height-400' = '400px',
  'height-440' = '440px',
  'height-470' = '470px',
  'height-500' = '500px',
  'height-520' = '520px',
}

const Service: React.FC<ServiceProps> = ({
  imageHeight = ImageHeight['height-400'],
  imageWidth = ImageWidth['width-680'],
  children,
  reverse,
  image,
  className,
  contentPadding = ContentPadding['padding-70'],
}) => {

  const serviceStyles = {
    '--image-width': imageWidth,
    '--image-height': imageHeight,
    '--content-margin': contentPadding,
  } as React.CSSProperties;

  return (
    <div style={serviceStyles} className={classNames([styles.wrapper, { [styles.reverse]: reverse }, className])}>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.picture}>
        <Image
          className={styles.image}
          src={image}
          layout={'fill'}
        />
      </div>
    </div>
  );
};

export default Service;
