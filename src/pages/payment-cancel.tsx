import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PaymentCanceledView } from 'src/sections/payment-cancel/view';  

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`PaymentSuccessfully - ${CONFIG.appName}`}</title>
      </Helmet>

      <PaymentCanceledView/>
    </>
  );
}
