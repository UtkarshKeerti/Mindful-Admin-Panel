import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageLayout from '../layouts/pageLayout/PageLayout';

const Publications = () => {

  const [publicationsData, setPublicationsData] = useState([])
  useEffect(() => {
    setPublicationsData([
      {
        name: 'Publication 001',
        about: 'Design & culture description',
        image: ''
      },
      {
        name: 'PUBLICATION 00123',
        about: 'Canada Celebrates folklore decription aso c,,a..sdio calks',
        image: ''
      },
      {
        name: 'Publication',
        about: 'Publication some rnascnuasd description',
        image: ''
      },
      {
        name: 'folklore publication asnico ais dox',
        about: 'Canada Celebrates folklore decription aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
        image: ''
      },
      {
        name: 'Publication Design & Culture',
        about: 'Design & culture description',
        image: ''
      },

    ])
  }, [])

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Publications</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add
        </Button>
      </Box>
      <PageLayout pageData={publicationsData} />
    </>
  )
}

export default Publications
