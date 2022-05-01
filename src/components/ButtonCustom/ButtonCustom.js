import React from 'react';
import {
  useNavigate
} from 'react-router-dom'
import styles from './buttonCustom.module.css';

const ButtonCustom = ({ primary, secondary, onClick, btnText, btnType, customStyles, route }) => {

  const navigate = useNavigate();

  return (
    <button
      className={styles.buttonClass + ` ${primary ? styles.primaryBtn : secondary ? styles.secondaryBtn : " "}`}
      onClick={route ? () => navigate(route) : onClick}
      style={customStyles}
      type={btnType}
    >
      {btnText}
    </button>
  )
}

export default ButtonCustom
