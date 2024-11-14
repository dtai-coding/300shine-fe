import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AppointmentHistoryView } from 'src/sections/appointment-history/view';  

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Appointment - ${CONFIG.appName}`}</title>
      </Helmet>

      <AppointmentHistoryView />
    </>
  );
}