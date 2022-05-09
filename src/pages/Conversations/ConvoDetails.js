import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import {
  useParams
} from 'react-router-dom';
import TabsCustom from '../../components/TabsCustom/TabsCustom';
import EventsLayout from '../../layouts/eventsLayout/EventsLayout';
import EventSpeakersLayout from '../../layouts/eventSpeakersLayout/EventSpeakersLayout';

const ConvoDetails = () => {

  const param = useParams();

  const tabs = [
    {
      label: 'About',
      component: 'About',
    },
    {
      label: 'Events',
      component: <EventsLayout />,
    },
    {
      label: 'Speakers',
      component: <EventSpeakersLayout />,
    },
  ]

  return (
    <>
      <Box className={'pageheading'}>
        <h2>Conversation Details {param.id}</h2>
      </Box>
      <TabsCustom tabsData={tabs} />
    </>
  )
}

export default ConvoDetails
