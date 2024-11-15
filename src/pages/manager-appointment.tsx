import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AppointmentManagerView } from 'src/sections/manager-appointment/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Appointment - ${CONFIG.appName}`}</title>
      </Helmet>

      <AppointmentManagerView />
    </>
  );
}
