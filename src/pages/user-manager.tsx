import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserMangerView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserMangerView />
    </>
  );
}
