import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { NavBar } from 'components/navbar';

import './App.css';

const HomePage = lazy(() => import('pages/home/home.page'));
const HomePageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
};
const InboxPage = lazy(() => import('pages/inbox'));
const InboxPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InboxPage />
    </Suspense>
  );
};

const fallbackRender = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Alert severity="error" onClose={() => resetErrorBoundary()}>
          <AlertTitle>Failure</AlertTitle>
          <div role="alert">{error.message}</div>
        </Alert>
      </Box>
    </>
  );
};

export const App = () => {
  return (
    <>
      <Helmet titleTemplate="%s - IMLFW" defaultTitle="IMLFW">
        <meta name="description" content="IMLFW - I'M Looking For Work" />
      </Helmet>

      <ErrorBoundary fallbackRender={fallbackRender}>
        <NavBar />
        <Box sx={{ ml: { xs: 0, md: '240px' }, p: 1 }}>
          <Routes>
            <Route path="/*" element={<HomePageWrapper />} />
            <Route path="/emails/*" element={<InboxPageWrapper />} />
          </Routes>
        </Box>
      </ErrorBoundary>
    </>
  );
};

export default App;
