import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SalonView } from 'src/sections/salon/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Salons - ${CONFIG.appName}`}</title>
      </Helmet>

      <SalonView />
    </>
  );
}
