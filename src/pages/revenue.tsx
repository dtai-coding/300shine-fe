import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// import { RevenueView } from 'src/sections/revenue/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Revenue - ${CONFIG.appName}`}</title>
      </Helmet>

      {/* <RevenueView /> */}
    </>
  );
}
