import styled from "styled-components";
import {FC} from "react";
import {InputProps} from "./common/Input";

export type InputRowProps = {
    label: string;
    value: string;
    onChange: (c: string) => void;
    type : InputProps["type"];
}

const InputRowStyle = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`

const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
`

const Input = styled.input`
  flex: 1;
  font-size: 18px;

  padding: 15px 11px;
  border : 1.5px solid #DEDEDE;
  border-radius: 8px;
  
  &:focus {
    outline: none;
  }
`

export const InputRow: FC<InputRowProps> = ({label, value, onChange, ...rest}) => {
    return (
        <InputRowStyle>
            <Label>{label}</Label>
            <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...rest}
            />
        </InputRowStyle>
    );
};