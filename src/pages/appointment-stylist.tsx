import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AppointmentStylistView } from 'src/sections/appoinment-stylist/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Appointment - ${CONFIG.appName}`}</title>
      </Helmet>

      <AppointmentStylistView />
    </>
  );
}
