import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";
import {Button} from "./Button";

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
                <GlobalStyle/>
                Hello World
                <Button onClick={() => alert("asdas")} isFullWidth>로그인</Button>
            </ThemeProvider>
        </div>
    );
}

export default App;
