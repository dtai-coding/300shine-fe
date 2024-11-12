import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StylistDetailView } from 'src/sections/stylist-detail/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Stylist Detail - ${CONFIG.appName}`}</title>
      </Helmet>
      
    <StylistDetailView/>
    </>
  );
}
