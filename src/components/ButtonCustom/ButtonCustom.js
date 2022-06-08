import React from 'react';
import {
  useNavigate
} from 'react-router-dom'
import {
  CircularProgress
} from '@mui/material'
import styles from './buttonCustom.module.css';

const ButtonCustom = ({ primary, secondary, onClick, btnText, btnType, customStyles, route, loading }) => {

  const navigate = useNavigate();

  return (
    <button
      className={styles.buttonClass + ` ${primary ? styles.primaryBtn : secondary ? styles.secondaryBtn : " "}`}
      onClick={route ? () => navigate(route) : onClick}
      style={customStyles}
      type={btnType}
    >
      {
        loading ?
          <CircularProgress
            color="background"
            size={25}
          />
          : btnText
      }
    </button>
  )
}

export default ButtonCustom
