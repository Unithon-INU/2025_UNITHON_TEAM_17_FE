import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";

function App() {
    return (
        <div className="App">
          <ThemeProvider theme={Theme}>
            <GlobalStyle/>
            Hello World
          </ThemeProvider>
        </div>
    );
}

export default App;
