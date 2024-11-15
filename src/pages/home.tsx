import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { ProductsView } from 'src/sections/product/view';
import { StylistsView } from 'src/sections/stylist/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
      </Helmet>
      <Box
        component="img"
        src="https://gatsbyindia.com/img/men-lifestyle/best-haircuts-men-top-mens-hairstyles-today/Mandom_2024%20Pillar_Thumb-FINAL.jpeg"
        alt="Full Width Image"
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover', // Ensures image covers its container
        }}
      />

      <ProductsView />
      <StylistsView />
    </>
  );
}
