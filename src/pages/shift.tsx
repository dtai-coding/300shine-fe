import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ShiftView } from 'src/sections/shift/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Shift - ${CONFIG.appName}`}</title>
      </Helmet>

      <ShiftView />
    </>
  );
}
