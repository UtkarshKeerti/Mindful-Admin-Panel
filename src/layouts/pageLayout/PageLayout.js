import React from 'react';
import Grid from '@mui/material/Grid';
import CardCustom from '../../components/cardCustom/CardCustom';

// import styles from './pageLayout.module.css';

const PageLayout = ({ pageData, baseRoute }) => {

  return (
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
              heading={card.heading}
              body={card.body && card.body}
              image={card.image}
              cardId={card.id}
              baseRoute={baseRoute}
            />
          </Grid>
        )
      }
    </Grid >
  )
}

export default PageLayout
