import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {FC} from "react";

const RoutePath = {
    temp: "/temp"
}

const HomePage: FC = () => {
    return (
        <div>
            HomePage
            <Link to={RoutePath.temp}>Temp Page로 이동</Link>
        </div>
    )
}

const TempPage: FC = () => {
    return (
        <div>
            TempPage
            <Link to={"/"}>Home Page로 이동</Link>
        </div>
    )
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
