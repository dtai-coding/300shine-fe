import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PaymentSuccessfullyView } from 'src/sections/payment-successfully/view';  

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`PaymentSuccessfully - ${CONFIG.appName}`}</title>
      </Helmet>

      <PaymentSuccessfullyView/>
    </>
  );
}
