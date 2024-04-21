import { Link, useLocation } from 'react-router-dom';

import EngineeringIcon from '@mui/icons-material/Engineering';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavPageWithChildren } from './types';

const drawerWidth = 240;
export interface NavDrawerProps {
  pages: NavPageWithChildren[];
  handleDrawerClose: () => void;
}
export const NavDrawer = ({ pages, handleDrawerClose }: NavDrawerProps) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      <NavDrawerToolbar {...{ handleDrawerClose }} />
      <NavDrawerLinks pages={pages} />
    </Drawer>
  );
};
export interface NavDrawerMobileProps {
  pages: NavPageWithChildren[];
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}
export const NavDrawerMobile = ({
  pages,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}: NavDrawerMobileProps) => {
  return (
    <div>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <NavDrawerToolbar {...{ handleDrawerClose }} />
        <NavDrawerLinks {...{ pages, mobileOpen, handleDrawerClose }} />
      </Drawer>
    </div>
  );
};

export const NavDrawerToolbar = ({ handleDrawerClose }: { handleDrawerClose: () => void }) => {
  return (
    <Toolbar disableGutters sx={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.09)' }}>
      <Link to="/" onClick={handleDrawerClose}>
        <Stack direction="row" spacing={2} alignItems="center" pl={2} width="100%">
          <Box>
            <EngineeringIcon color="primary" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            LFW
          </Typography>
        </Stack>
      </Link>
    </Toolbar>
  );
};

export const NavDrawerLinks = ({
  pages,
  mobileOpen,
  handleDrawerClose,
}: {
  pages: NavPageWithChildren[];
  mobileOpen?: boolean;
  handleDrawerClose?: () => void;
}) => {
  const location = useLocation();
  const matchPath = (path: string, exact?: boolean): boolean => {
    if (exact) {
      return path === location.pathname;
    }
    return location.pathname.startsWith(path);
  };
  return (
    <>
      {pages.map(({ name, children }) => {
        return (
          <Box key={name}>
            <Typography variant="button" color="gray" sx={{ pl: 2 }}>
              {name}
            </Typography>
            {children?.map(({ icon, name, page, exact }) => (
              <Link
                key={name}
                to={page}
                onClick={() => {
                  mobileOpen && handleDrawerClose && handleDrawerClose();
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    p: 1,
                    pl: 2,
                    '&:hover': { backgroundColor: '#323232' },
                  }}
                >
                  {icon}
                  <Typography
                    variant="body2"
                    fontWeight="bolder"
                    color={matchPath(page, exact) ? 'primary' : 'inherit'}
                  >
                    {name}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Box>
        );
      })}
    </>
  );
};
