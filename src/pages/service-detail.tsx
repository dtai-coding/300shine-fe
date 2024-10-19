import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ServiceDetailView } from 'src/sections/service-detail/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Service Detail - ${CONFIG.appName}`}</title>
      </Helmet>
      
    <ServiceDetailView/>
    </>
  );
}
