import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ThemeProvider} from "styled-components";
import {Theme} from "./styles/Theme";
import {AuthProvider} from "./hooks/useAuth";
import axios from "axios";
import {WarehouseProvider} from "./hooks/useWarehouse";

axios.defaults.baseURL = "https://keepbara.duckdns.org"
//todo : 나중에 언젠가 env로 base url 빼기
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={Theme}>
            <AuthProvider>
                <WarehouseProvider>
                    <App/>
                </WarehouseProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>,
)
