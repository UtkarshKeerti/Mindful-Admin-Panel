import { useState, useEffect } from 'react';
import {
  Grid,
  Avatar,
  Box,
  TextField
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom';
import ButtonCustom from '../../components/ButtonCustom/ButtonCustom';

import logo from '../../CCMH-logo.png'
import styles from './loginLayout.module.css'

const LoginLayout = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: 'admin@mindfulhabitats.com',
    password: ''
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginData.email && loginData.password) {
      navigate('/dashboard')
      console.log('LOGIN: ', loginData)
    } else {
      setLoginError('This is required!')
    }
  }

  return (
    <Grid
      container
      className={styles.pageWrapper}
    >
      <Grid
        item
        xs={0}
        md={7}
        className={styles.itemImgContainer}
      >
        <img src="https://visitsolihull.co.uk/wp-content/uploads/2022/03/tree_sappling.jpg" alt="" />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        className={styles.itemContainer}
      >
        <Avatar
          src={logo}
          sx={{ width: '150px', height: "150px" }}
        />
        <Box sx={{ p: '0 2rem', width: '100%' }} className={styles.formContainer}>
          <h2 className={styles.heading}>Admin Login</h2>
          <Box
            sx={{ maxWidth: '300px', margin: 'auto' }}
            component="form"
          >
            <TextField
              required
              fullWidth
              variant="outlined"
              label={'Email id'}
              name={'email'}
              className={styles.textField}
              value={loginData.email}
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              fullWidth
              variant="outlined"
              label={'Password'}
              name={'password'}
              type='password'
              value={loginData.password}
              onChange={handleChange}
              error={loginError ? true : false}
              helperText={loginError}
            />
            <ButtonCustom
              primary
              type="submit"
              btnText={'Login'}
              onClick={handleSubmit}
              customStyles={{ margin: '1.5rem auto' }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginLayout;
