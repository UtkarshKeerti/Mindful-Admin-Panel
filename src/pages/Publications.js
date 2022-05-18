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
        heading: 'Publication 001',
        body: 'Design & culture description',
        image: ''
      },
      {
        heading: 'PUBLICATION 00123',
        body: 'Canada Celebrates folklore decription aso c,,a..sdio calks',
        image: ''
      },
      {
        heading: 'Publication',
        body: 'Publication some rnascnuasd description',
        image: ''
      },
      {
        heading: 'folklore publication asnico ais dox',
        body: 'Canada Celebrates folklore decription aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
        image: ''
      },
      {
        heading: 'Publication Design & Culture',
        body: 'Design & culture description',
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
