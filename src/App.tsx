import {GlobalStyle} from "./styles/GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {HomePage} from "./pages/HomePage";
import {RoutePath} from "./RoutePath";

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route index path={"/home/*"} element={<HomePage/>}/>
                    <Route path={RoutePath.temp} element={<TempPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
