import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/stylist',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/stylist/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/stylist/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/stylist/blog',
    icon: icon('ic-blog'),
  },
];
