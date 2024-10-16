import { Helmet } from 'react-helmet-async';

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

      <ProductsView />
      <StylistsView />
    </>
  );
}
