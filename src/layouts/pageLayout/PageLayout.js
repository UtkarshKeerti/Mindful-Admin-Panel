import React from 'react';
import {
  Grid,
  Box,
  CircularProgress
} from '@mui/material';
import CardCustom from '../../components/cardCustom/CardCustom';

import styles from './pageLayout.module.css';

const PageLayout = ({ pageData, baseRoute }) => {

  return (
    <>
      {
        pageData ?
          pageData.length === 0 ?
            <p className={styles.noData}>No data found :(</p> :
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              {
                pageData.map((card, i) =>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    sx={{ maxWidth: { xl: "350px" } }}
                    key={i}
                  >
                    <CardCustom
                      heading={card.name}
                      body={card.about && card.about}
                      image={card.image}
                      cardId={card._id}
                      baseRoute={baseRoute}
                    />
                  </Grid>
                )
              }
            </Grid> :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={50} />
          </Box>
      }
    </>
  )
}

export default PageLayout
