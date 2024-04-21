import { Email } from 'client';

import { Paper } from '@mui/material';

export const EmailBody = ({ email }: { email: Email }) => {
  if (email.body_html && email.body_html !== '') {
    return (
      <Paper elevation={1} sx={{ p: 2 }}>
        <div dangerouslySetInnerHTML={{ __html: email.body_html }} />
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        '& .email-plain': {
          fontSize: '0.75rem',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        },
      }}
    >
      <pre className="email-plain">{email.body}</pre>
    </Paper>
  );
};
