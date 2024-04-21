import { Container, LoadingIndicator, Row } from '@dashotv/components';

import { EmailList } from 'components/email';

import { useQueryEmail } from './query';

const Inbox = () => {
  const { data, isFetching } = useQueryEmail();

  return (
    <Container>
      <Row>Emails</Row>
      {isFetching && <LoadingIndicator />}
      <EmailList emails={data?.result || []} />
    </Container>
  );
};

export default Inbox;
