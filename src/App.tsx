import {GlobalStyle} from "./GlobalStyle";
import {ThemeProvider} from "styled-components";
import {Theme} from "./Theme";
import {Button} from "./Button";

import styled from "styled-components";
import {FC, useState} from "react";

export type InputProps = {
    value: string;
    onChange: (string) => void;
    label: string;
    placeholder: string;
}

const InputStyle = styled.div`

`

const LabelWrap = styled.div`
  font-size: 18px;
  font-weight: 400;
`

const InputContent = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: 400;

  padding: 12px;
  margin-top: 15px;

  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid #A0A0A0;
`

export const Input: FC<InputProps> = ({value, onChange, placeholder, label}) => {
    return (
        <InputStyle>
            <LabelWrap>{label}</LabelWrap>
            <InputContent
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </InputStyle>
    );
};


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
