import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { SelectStylistView2 } from 'src/sections/select-stylist-2/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Select Stylist 2 - ${CONFIG.appName}`}</title>
      </Helmet>

      <SelectStylistView2 />
    </>
  );
}
