import { Email } from 'client';

import { Paper } from '@mui/material';

export const EmailBody = ({ email }: { email: Email }) => {
  if (email.body_html !== undefined) {
    return (
      <Paper elevation={1} sx={{ p: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: email.body_html }} />
      </Paper>
    );
  }

  return (
    <div>
      <pre>{email.body}</pre>
    </div>
  );
};
