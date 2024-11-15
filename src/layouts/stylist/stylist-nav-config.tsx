import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  // {
  //   title: 'Dashboard',
  //   path: '/stylist',
  //   icon: icon('ic-analytics'),
  // },
  // {
  //   title: 'User',
  //   path: '/stylist/user',
  //   icon: icon('ic-user'),
  // },
  {
    title: 'Appointment',
    path: '/stylist/appointment',
    icon: icon('ic-cart'),
  },

  {
    title: 'Shift',
    path: '/stylist/shift',
    icon: icon('ic-blog'),
  },
];
