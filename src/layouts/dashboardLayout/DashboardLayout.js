import { useState } from 'react';
import {
  NavLink,
  Outlet
} from 'react-router-dom';
import {
  AppBar,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Divider,
  IconButton,
  Avatar
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import MHLogo from '../../CCMH-logo.png';

// import styles from './dashboardLayout.module.css';

const drawerWidth = 240;
const appBarHeight = 64

const DashboardLayout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    {
      navitem: 'Conversations',
      route: '/dashboard'
    },
    {
      navitem: 'Members',
      route: '/dashboard/members'
    },
    {
      navitem: 'Speakers',
      route: '/dashboard/speakers'
    },
    {
      navitem: 'Publicaitons',
      route: '/dashboard/publications'
    },
    {
      navitem: 'User Messages',
      route: '/dashboard/messages'
    }
  ]

  const drawer = (
    <>
      {/* Replace with Logo */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', padding: '1.5rem' }}>
        <Avatar
          alt="Site icon"
          src={MHLogo}
          sx={{ width: '100px', height: '100px' }}
        />
      </Toolbar>
      {/* ----- */}

      <Divider />
      <List>
        {
          navItems.map((item, index) => (
            <NavLink to={item.route} key={index}>
              <ListItemButton sx={{ paddingY: '1rem' }}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                {item.navitem}
              </ListItemButton>
            </NavLink>
          ))
        }
      </List>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: 'background.main' }}>

      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          maxHeight: `${appBarHeight}px`,
        }}
        color="primary"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: '2000px',
          minHeight: `calc(100vh - ${appBarHeight}px)`,
          // ml: { lg: `${drawerWidth}px` },
          mt: `${appBarHeight}px`,
          p: { xs: '2rem 1.5rem', lg: '2rem' },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

export default DashboardLayout
