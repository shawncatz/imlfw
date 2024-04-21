import { useParams } from 'react-router-dom';

import { Container, LoadingIndicator } from '@dashotv/components';

import { EmailView } from 'components/email';

import { useQueryEmailShow } from './query';

const EmailViewPage = () => {
  const { id } = useParams();
  if (!id) throw new Error('No id provided');

  const { data, isFetching } = useQueryEmailShow(id);

  return (
    <Container>
      {isFetching && <LoadingIndicator />}
      {data?.result ? <EmailView email={data?.result} /> : null}
    </Container>
  );
};

export default EmailViewPage;
