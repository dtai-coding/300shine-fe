import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectStylistView } from 'src/sections/select-stylist/view'; 

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Select Stylist - ${CONFIG.appName}`}</title>
      </Helmet>

      <SelectStylistView />
    </>
  );
}
