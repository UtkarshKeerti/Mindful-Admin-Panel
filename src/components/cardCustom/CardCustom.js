import React from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Typography
} from '@mui/material';
import placeholderImage from '../../assets/images/placeholder.png'

import styles from './cardCustom.module.css'

const CardCustom = ({ cardId, heading, body, image, baseRoute, setOpenDialog, setCardId }) => {
  const navigate = useNavigate();

  const truncate = (str, char) => {
    return str?.length > char ? str.slice(0, char) + "..." : str
  }

  const handleClick = (id) => {
    if (!baseRoute) return
    navigate(`${baseRoute}/${id}`);
  }

  const handleDeleteClick = (id) => {
    setCardId(id);
    setOpenDialog(true)
  }

  return (
    <>
      <Card className={styles.cardWrapper}>
        <CardActionArea onClick={() => handleClick(cardId)}>
          <CardMedia
            component="img"
            height={"140"}
            image={image ? image : placeholderImage}
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
            <Typography
              variant="body2"
              color="text.secondary"
              className={styles.body}
            >
              {
                body && truncate(body, 60)
              }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="error" onClick={() => handleDeleteClick(cardId)}>Delete</Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </>
  )
}

export default CardCustom
