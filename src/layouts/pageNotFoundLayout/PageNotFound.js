import React from 'react';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

import Image404 from '../../assets/images/illustration_404.svg';
import styles from './pageNotFound.module.css'


const PageNotFound = () => {
  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageHeading}>Sorry, page not found!</h2>
      <p className={styles.pageDescription}>Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.</p>
      <div className={styles.imageContainer}>
        <img src={Image404} alt="page not found" />
      </div>
      <ButtonCustom
        btnText={"Go Home"}
        primary
        customStyles={{ margin: '3rem auto' }}
        route={'/dashboard'}
      />
    </div>
  )
}

export default PageNotFound
