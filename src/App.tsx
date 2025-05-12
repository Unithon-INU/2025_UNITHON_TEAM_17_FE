import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FC} from "react";
import {RoutePath} from "./RoutePath";

const TempPage: FC = () => {
    return (
        <div>TempPage</div>
    )
}


function App() {
    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
                <GlobalStyle/>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<h1>1212</h1>}/>
                        <Route path={RoutePath.temp} element={<TempPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
}

export default App;
