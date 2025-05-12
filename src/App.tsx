import {GlobalStyle} from "./styles/GlobalStyle";
import {Route, Routes} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {HomePage} from "./pages/HomePage";

export const RoutePath = {
    temp: "/temp"
}

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path={RoutePath.temp} element={<TempPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
