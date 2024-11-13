import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectServiceView2 } from 'src/sections/select-service-2/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
        <Helmet>
          <title> {`Select Service 2 - ${CONFIG.appName}`}</title>
        </Helmet>

        <SelectServiceView2 />
      </>
  );
}
