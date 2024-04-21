import { Email } from 'client';

import { Stack, Typography } from '@mui/material';

import { Chrono } from '@dashotv/components';

export const EmailHeader = ({ email }: { email: Email }) => {
  return (
    <Stack direction="column">
      <Stack direction="row" spacing={2} alignItems="baseline">
        <Typography variant="button" color="secondary" width="125px">
          From
        </Typography>
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Typography variant="body1" color="primary" fontWeight="bolder">
            {email.reply_name || email.from_name}{' '}
          </Typography>
          <Typography variant="body1" color="gray" noWrap>
            &lt;{email.reply_to || email.from_email}&gt;
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="baseline">
        <Typography variant="button" color="secondary" width="125px">
          Received
        </Typography>
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Typography variant="body1" color="action" fontWeight="bolder">
            <Chrono fromNow stamp={email.date} />
          </Typography>
          <Typography variant="body1" color="gray" noWrap>
            {email.date}
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="baseline">
        <Typography variant="button" color="secondary" width="125px">
          Subject
        </Typography>
        <Typography>{email.subject}</Typography>
      </Stack>
    </Stack>
  );
};
