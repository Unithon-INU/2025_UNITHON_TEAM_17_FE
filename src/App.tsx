import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";
import {Button} from "./Button";
import {useState} from "react";
import {Input} from "./Input";


function App() {
    const [name, setName] = useState("");

    return (
        <div className="App">
            <ThemeProvider theme={Theme}>
                <GlobalStyle/>
                Hello World
                <Button onClick={() => alert("asdas")} isDisable isFullWidth>로그인</Button>
                <Input
                    value={name}
                    onChange={setName}
                    label={"이름"}
                    placeholder={"dasd"}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
