import { Link } from 'react-router-dom';

import { Email } from 'client';

import { Row } from '@dashotv/components';

import { EmailHeader } from './header';

export const EmailList = ({ emails }: { emails: Email[] }) => {
  return (
    <>
      {emails.map((email: Email) => (
        <Row key={email.id}>
          <Link to={`/emails/${email.id}`}>
            <EmailHeader email={email} />
          </Link>
        </Row>
      ))}
    </>
  );
};
