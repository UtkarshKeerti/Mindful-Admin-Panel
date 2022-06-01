import { useState, useEffect } from 'react';
import {
  NavLink,
  Outlet,
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
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
// Service
import { getSpeakers } from '../../services/SpeakerService';

import MHLogo from '../../CCMH-logo.png';

import styles from './dashboardLayout.module.css';

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
      route: '/dashboard/convo',
      icon: <EventIcon />
    },
    {
      navitem: 'Members',
      route: '/dashboard/members',
      icon: <GroupsIcon />
    },
    {
      navitem: 'Speakers',
      route: '/dashboard/speakers',
      icon: <InterpreterModeIcon />
    },
    {
      navitem: 'Publicaitons',
      route: '/dashboard/publications',
      icon: <ArticleIcon />
    },
    {
      navitem: 'User Messages',
      route: '/dashboard/messages',
      icon: <MailIcon />
    }
  ]

  const drawer = (
    <>
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
            <NavLink
              to={item.route}
              key={index}
              className={({ isActive }) => isActive ? styles.activeNav : ''}
            >
              <ListItemButton sx={{ paddingY: '1rem' }}>
                <ListItemIcon>
                  {item.icon}
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

  useEffect(() => {
    // !sessionStorage.getItem('speakers') &&
    getSpeakers()
      .then((res) => {
        if (!res) return console.log('Undefined response for getSpeakers!')
      })
  }, []);

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
