import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.Suspense fallback={'Loading'}>
      <Auth0Provider
        domain="dev-ufz05wjq.us.auth0.com"
        clientId="Gz6z69kOwWWblxBQConSQhjIL01Kotnl"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </React.Suspense>
);
