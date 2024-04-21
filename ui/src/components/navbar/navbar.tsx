import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, IconButton, Theme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MUIContainer from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { NavDrawer, NavDrawerMobile } from './drawer';
import './navbar.scss';
import { NavPageWithChildren } from './types';

const drawerWidth = 240;
const pages: NavPageWithChildren[] = [
  {
    icon: <HomeIcon fontSize="small" />,
    name: 'Home',
    page: '/',
    exact: true,
    children: [
      {
        icon: <HomeIcon fontSize="small" />,
        name: 'Home',
        page: '/',
        exact: true,
      },
      {
        icon: <InboxIcon fontSize="small" />,
        name: 'Inbox',
        page: '/emails',
      },
    ],
  },
];

export const NavBar = () => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    // if (!isClosing) {
    setMobileOpen(!mobileOpen);
    // }
  };

  return (
    <>
      <AppBar position="static">
        <MUIContainer sx={{ overflow: 'hidden' }} maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', ml: { xs: '0', md: '250px' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box flexGrow={1}></Box>
            {matches && (
              <Box sx={{ height: '54px', display: { xs: 'none', md: 'flex' } }}>{/* persistent links */}</Box>
            )}
          </Toolbar>
        </MUIContainer>
      </AppBar>
      <MUIContainer sx={{ display: { xs: 'flex', md: 'none' } }} maxWidth="xl">
        <Grid container>
          <Grid item xs={12}>
            {/* only mobile */}
          </Grid>
        </Grid>
      </MUIContainer>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {matches && <NavDrawer {...{ pages, handleDrawerClose }} />}
        {!matches && (
          <NavDrawerMobile
            {...{
              pages,
              mobileOpen,
              isClosing,
              handleDrawerClose,
              handleDrawerTransitionEnd,
            }}
          />
        )}
      </Box>
    </>
  );
};
