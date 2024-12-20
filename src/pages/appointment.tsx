import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AppointmentView } from 'src/sections/appointment/view';  

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Appointment - ${CONFIG.appName}`}</title>
      </Helmet>

      <AppointmentView />
    </>
  );
}
