import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "styled-components";
import {Theme} from "./styles/Theme";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./hooks/useAuth";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={Theme}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>,
)
