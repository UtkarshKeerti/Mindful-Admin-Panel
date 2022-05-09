import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs
} from '@mui/material';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )
      }
    </div>
  )
}

const TabsCustom = ({ tabsData }) => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary' }}>
        <Tabs value={value} onChange={handleChange} >
          {
            tabsData && tabsData.map((tab, i) =>
              <Tab label={tab.label} key={i} />
            )
          }
        </Tabs>
      </Box>
      {
        tabsData && tabsData.map((tab, i) =>
          <TabPanel value={value} index={i} key={i}>
            {tab.component}
          </TabPanel>
        )
      }
    </Box>
  )
}

export default TabsCustom
