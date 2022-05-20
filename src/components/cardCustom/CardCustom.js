import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import styles from './cardCustom.module.css'

const CardCustom = ({ cardId, heading, body, image, baseRoute }) => {
  const navigate = useNavigate();

  const truncate = (str, char) => {
    return str?.length > char ? str.slice(0, char) + "..." : str
  }

  const handleClick = (id) => {
    if (!baseRoute) return
    navigate(`${baseRoute}/${id}`);
  }

  return (
    <Card
      className={styles.cardWrapper}
      onClick={() => handleClick(cardId)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={"140"}
          image={image ? image : `https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png`}
          alt=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h6"
            className={styles.heading}
          >
            {heading}
          </Typography>
          {
            body &&
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.body}
            >
              {truncate(body, 60)}
            </Typography>
          }
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </CardActionArea>
    </Card>
  )
}

export default CardCustom
