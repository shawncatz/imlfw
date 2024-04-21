import { Email } from 'client';

import { Stack } from '@mui/material';

import { EmailBody } from './body';
import { EmailHeader } from './header';

export const EmailView = ({ email }: { email: Email }) => {
  return (
    <Stack direction="column" spacing={2}>
      <EmailHeader email={email} />
      <EmailBody email={email} />
    </Stack>
  );
};
