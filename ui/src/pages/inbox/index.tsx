import { Outlet, Route, Routes } from 'react-router-dom';

import { Container } from '@dashotv/components';

import EmailPage from './email.page';
import InboxPage from './inbox.page';

export const EmailIndex = () => {
  return (
    <Container>
      <Routes>
        <Route path="">
          <Route path="" element={<InboxPage />} />
          <Route path=":id" element={<EmailPage />} />
        </Route>
      </Routes>
      <Outlet />
    </Container>
  );
};
export default EmailIndex;
