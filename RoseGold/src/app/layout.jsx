"use client"

import PrimarySearchAppBar from './components/header';
import { UserProvider } from "./context/mycontext";
import { Provider } from 'react-redux';
import store from './store';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Redux Provider makes the Redux store available to any nested components */}
        <Provider store={store}>
          <UserProvider>
            {children}
          </UserProvider>
        </Provider>
      </body>
    </html>
  );
}