import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ServiceMangerView } from 'src/sections/manager-service/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Service - ${CONFIG.appName}`}</title>
      </Helmet>

      <ServiceMangerView />
    </>
  );
}
