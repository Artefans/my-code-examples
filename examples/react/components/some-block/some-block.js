import React from 'react';
import classNames from 'classnames';
import styles from './Awards.module.scss';
import { Breadcrumbs, Button, Service, TextBlock, Title } from '../../ui';
import PictureWrapper from '../../ui/PictureWrapper/PictureWrapper';

const Awards = ({ someData }) => {
  return (
    <>
      <Breadcrumbs />
      <div className={classNames(['wrapper margin margin--little'])}>
        <PictureWrapper
          size={'115px'}
          position={{
            bottom: '-15%',
            right: '5%',
          }}>
          <Service
            image={'/assets/awards/images/peoples.jpg'}
            imageWidth={'680px'}
            imageHeight={'400px'}
            contentPadding={'130px'}
          >
            <Title dashPadding={'40px'} dashVariant={'blue'}>
              Awards
            </Title>
            <TextBlock>
              <b>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, nobis.
              </b>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aperiam dignissimos dolores ea harum
                inventore ipsa, ipsum labore laborum libero nam numquam provident qui totam ut velit vitae! Dolorem,
                similique.
              </p>
            </TextBlock>
          </Service>
        </PictureWrapper>
        <PictureWrapper
          hideInMobile
          size={'115px'}
          position={{
            top: '-17%',
            left: '-5%',
          }}>
          <Service
            reverse
            image={'/assets/awards/images/working.jpg'}
            imageWidth={'590px'}
            imageHeight={'366px'}
            contentPadding={'80px'}
            className={'margin--huge'}
          >
            <div className={styles.content}>
              <Title dashPadding={'40px'} titleVariant={'red'} showDash={false}>
                Lorem ipsum.
              </Title>
              <TextBlock>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam aut culpa delectus eveniet optio
                  pariatur similique, tempora temporibus vitae! Corporis debitis fuga quae quisquam repellat. Adipisci
                  aliquam aliquid architecto atque commodi consectetur dolorum eaque et eum fugit ipsa itaque labore
                  laborum molestias natus necessitatibus nobis nostrum odio odit omnis, optio provident rem saepe sequi
                  similique suscipit ut. Dignissimos, facilis.
                </p>
              </TextBlock>
              <div>
                <Button className={styles.button} arrowRight href={'/some-link'}>
                  Read More
                </Button>
              </div>
            </div>
          </Service>
        </PictureWrapper>
      </div>
    </>
  );
};

export default Awards;
