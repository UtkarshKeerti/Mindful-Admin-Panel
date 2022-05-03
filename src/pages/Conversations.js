import { useState, useEffect } from 'react';
import PageLayout from '../layouts/pageLayout/PageLayout';

const Conversations = () => {

  const [conversationsCard, setConversationsCard] = useState([])
  useEffect(() => {
    setConversationsCard([
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
        body: 'Canada Celebrates folklore decravsf asjn ca osidj oic aoisd iption aso Celebrates folklore decription aso cio calks Celebrates folklore decription aso c',
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
      <h2 className={'pageheading'}>Conversations</h2>
      <PageLayout pageData={conversationsCard} />
    </>
  )
}

export default Conversations
