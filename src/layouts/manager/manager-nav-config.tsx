import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/manager',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/manager/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/manager/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/manager/blog',
    icon: icon('ic-blog'),
  },
];
