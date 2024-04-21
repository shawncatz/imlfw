import { Box, Stack, Typography } from '@mui/material';

import { LoadingIndicator, Row } from '@dashotv/components';

import { useQueryEmail } from './query';

const Inbox = () => {
  const { data, isFetching } = useQueryEmail();

  return (
    <Box>
      {isFetching && <LoadingIndicator />}
      {data?.result?.map(email => (
        <Row key={email.id}>
          <Stack direction="column">
            <Stack direction="row" spacing={2} alignItems="baseline">
              <Typography variant="body1" color="primary" fontWeight="bolder">
                {email.reply_name || email.from_name}{' '}
              </Typography>
              <Typography variant="caption" color="gray" noWrap>
                {email.reply_to || email.from_email}
              </Typography>
            </Stack>
            <Typography variant="caption" color="gray" noWrap>
              {email.date}
            </Typography>
            <Typography>{email.subject}</Typography>
          </Stack>
        </Row>
      ))}
    </Box>
  );
};

export default Inbox;
