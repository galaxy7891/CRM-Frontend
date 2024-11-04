'use client';

import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from '@/redux/store';

const AppProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  </Provider>
);

export default AppProvider;
