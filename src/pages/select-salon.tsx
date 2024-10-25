import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectSalonView } from 'src/sections/select-salon/view'; 

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Select Salon - ${CONFIG.appName}`}</title>
      </Helmet>

      <SelectSalonView />
    </>
  );
}
