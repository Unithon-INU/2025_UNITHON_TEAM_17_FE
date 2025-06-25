import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'styled-components';
import { Theme } from './styles/Theme';
import { AuthProvider } from './hooks/useAuth';
import { FavoriteProvider } from './hooks/useFavorites.tsx';
import axios from 'axios';

axios.defaults.baseURL = 'https://keepbara.duckdns.org';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <ThemeProvider theme={Theme}>
    <AuthProvider>
      <FavoriteProvider>
          <App />
      </FavoriteProvider>
    </AuthProvider>
  </ThemeProvider>
</StrictMode>
);
