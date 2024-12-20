import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';

import { useAuthStore } from 'src/stores/auth/auth.store';

import { Iconify } from 'src/components/iconify';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';

// ----------------------------------------------------------------------

export type HomeLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function HomeLayout({ sx, children, header }: HomeLayoutProps) {
  const theme = useTheme();

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';
  const navigate = useNavigate();

  const HandleAppointmentClick = () => {
    const logined = auth.accessToken;

    if (logined) {
      navigate('/appointment-history');
    }
    else{
      navigate('/sign-in');
    }
   
  };
  const { auth } = useAuthStore();

  const role = auth.user?.roleName; // Use optional chaining to avoid error if auth.user is undefined
  const menuItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    },
    {
      label: 'Profile',
      href: '#',
      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
    },
  ];

  // Conditionally render role-based menu items
  if (role === 'Admin') {
    menuItems.push({
      label: 'Admin Page',
      href: '/dashboard/user',
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    });
  } else if (role === 'Manager') {
    menuItems.push({
      label: 'Manager Page',
      href: '/manager',
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    });
  } else if (role === 'Stylist') {
    menuItems.push({
      label: 'Stylist Page',
      href: '/stylist/appointment',
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    });
  }
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            leftArea: (
              <>
                <Link href="/" underline="none" color="inherit">
                  <Typography variant="h3" color="#1877f2">
                    300Shine
                  </Typography>
                </Link>
                {/* <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                /> */}
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                {/* <Searchbar />
                <LanguagePopover data={_langs} />
                <NotificationsPopover data={_notifications} /> */}
                <Iconify
                  onClick={HandleAppointmentClick}
                  marginRight="10px"
                  width={25}
                  icon="solar:reorder-bold-duotone"
                  color="gray"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'lightgray',
                      borderRadius: '10px',
                    },
                    marginRight: '10px',
                  }}
                />
                <AccountPopover data={menuItems} />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      // sidebarSection={
      //   <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      // }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={
        <Box
          component="footer"
          sx={{
            backgroundColor: '#1877f2',
            color: '#fff',
            py: 3,
            px: 2,
            textAlign: 'center',
            mt: 'auto',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            © {new Date().getFullYear()} 300SHINE
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
            <Link href="#" underline="none" color="inherit">
              About Us
            </Link>
            <Link href="#" underline="none" color="inherit">
              Services
            </Link>
            <Link href="#" underline="none" color="inherit">
              Contact
            </Link>
            <Link href="#" underline="none" color="inherit">
              Privacy Policy
            </Link>
          </Box>
        </Box>
      }
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '100px',
        '--layout-dashboard-content-pt': theme.spacing(0),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(20),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            // pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
