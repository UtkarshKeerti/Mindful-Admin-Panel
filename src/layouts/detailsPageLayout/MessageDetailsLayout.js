import { useState, useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import {
  Grid,
  Box,
  Skeleton,
  CircularProgress,
  Button,
  TextField,
} from '@mui/material';
// Service
import { getMesssages } from '../../services/MessageService';
// style
import styles from './detailsPageLayout.module.css';

const MessageDetailsLayout = () => {
  const param = useParams();

  return (
    <div>

    </div>
  )
}

export default MessageDetailsLayout
