import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectServiceView } from 'src/sections/select-service/view'; 

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Select Salon - ${CONFIG.appName}`}</title>
      </Helmet>

      <SelectServiceView />
    </>
  );
}
