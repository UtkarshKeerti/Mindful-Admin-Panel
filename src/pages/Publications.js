import { useEffect, useState } from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useNavigate
} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import PageLayout from '../layouts/pageLayout/PageLayout';
import DialogCustom from '../components/dialogCustom/DialogCustom';
// Services
import { getPublication, deletePublication } from '../services/PublicationService'

const Publications = () => {

  const navigate = useNavigate();

  const [publicationsData, setPublicationsData] = useState();
  const [selectedPub, setSelectedPub] = useState('')
  const [open, setOpen] = useState(false);

  // Function to handle get publication API call
  const getPublicationApiCall = () => {
    setPublicationsData();
    getPublication()
      .then(res => {
        if (!res) return console.log("Undefined response for Publications")
        setPublicationsData(res)
      })
  }

  useEffect(() => {
    getPublicationApiCall()
  }, [])

  const handleDelete = () => {
    deletePublication(selectedPub)
      .then(res => {
        if (!res) return console.log("Undefined response while deleting a publication")
        setOpen(false);
        getPublicationApiCall()
        alert(res.message);
      })
  }

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Publications</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/dashboard/publication')}
        >
          Add
        </Button>
      </Box>
      <PageLayout
        pageData={publicationsData}
        baseRoute={'/dashboard/publication'}
        setSelectedCard={setSelectedPub}
        setOpen={setOpen}
      />

      <DialogCustom
        title={"Are you sure?"}
        btnText={"Delete anyway"}
        description={"This action will delete the selected publication forever. Do you still want to continue?"}
        onAgreeClick={handleDelete}
        setOpen={setOpen}
        open={open}
      />
    </>
  )
}

export default Publications
