import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  // {
  //   title: 'Dashboard',
  //   path: '/manager',
  //   icon: icon('ic-analytics'),
  // },
  {
    title: 'User',
    path: '/manager/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Appointments',
    path: '/manager/appointment',
    icon: icon('ic-cart'),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
  {
    title: 'Services',
    path: '/manager/service',
    icon: icon('ic-blog'),
  },
  {
    title: 'Shifts',
    path: '/manager/shift',
    icon: icon('ic-blog'),
  },
  {
    title: 'Revenue',
    path: '/manager/revenue',
    icon: icon('ic-blog'),
  },
  {
    title: 'Commission',
    path: '/manager/commission',
    icon: icon('ic-blog'),
  },
];
