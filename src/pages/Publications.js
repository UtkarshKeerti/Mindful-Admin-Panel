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
        heading: 'Design & Culture',
        body: 'Design & culture description',
        image: ''
      },
      {
        heading: 'Canada Celebrates foDDDDBCFRTG ais dox',
        body: 'Canada Celebrates folklore decription aso c,,a..sdio calks',
        image: ''
      },
      {
        heading: 'Design & Culture',
        body: 'Design & culture description',
        image: ''
      },
      {
        heading: 'Canada Celebrates folklore asnico ais dox',
        body: 'Canada Celebrates folklore decription aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
        image: ''
      },
      {
        heading: 'Design & Culture',
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
