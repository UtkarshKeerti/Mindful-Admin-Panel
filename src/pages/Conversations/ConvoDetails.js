import { useEffect, useState } from 'react';
import {
  Box,
  Skeleton
} from '@mui/material';
import {
  useParams
} from 'react-router-dom';
import TabsCustom from '../../components/TabsCustom/TabsCustom';
import EventsLayout from '../../layouts/eventsLayout/EventsLayout';
import EventSpeakersLayout from '../../layouts/eventSpeakersLayout/EventSpeakersLayout';
// Service
import { getConversations } from '../../services/ConversationService';

const ConvoDetails = () => {

  const param = useParams();
  const [convoDetails, setConvoDetails] = useState();
  const [eventsRow, setEventsRow] = useState();
  const [speakersRow, setSpeakersRow] = useState();


  useEffect(() => {
    getConversations(param.id)
      .then((res) => {
        if (res) {
          setConvoDetails(res)

          let tempEventArray = [];
          res.events.forEach((item) => {
            const rowData = {
              id: item._id,
              name: item.name,
              description: item.description,
              dateTime: `${item.date} || ${item.time}`
            }
            tempEventArray.push(rowData);
          });
          setEventsRow(tempEventArray)

          let tempSpeakerArray = [];
          res.speakers.forEach((item) => {
            const rowData = {
              id: item._id,
              name: item.name,
              description: item.about
            }
            tempSpeakerArray.push(rowData)
          });
          setSpeakersRow(tempSpeakerArray)
        }
      })
  }, [param.id])

  const tabs = [
    {
      label: 'Events',
      component: <EventsLayout eventsRow={eventsRow} />,
    },
    {
      label: 'Speakers',
      component: <EventSpeakersLayout speakersRow={speakersRow} />,
    },
    {
      label: 'About',
      component: 'About',
    },
  ]

  return (
    <>
      <Box className={'pageheading'}>
        {
          convoDetails ?
            <h2>{convoDetails.name}</h2>
            : <Skeleton animation="wave" variant="text" width={'40%'} height={55} />
        }
      </Box>
      <TabsCustom tabsData={tabs} />
    </>
  )
}

export default ConvoDetails
