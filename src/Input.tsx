import styled from "styled-components";
import {FC} from "react";

export type InputProps = {
    value: string;
    onChange: (string) => void;
    type? : "text" | "password" | "number" | "email";
    label: string;
    placeholder: string;
    errorMessage?: string | null;
}
const InputStyle = styled.div`
    padding: 6px;
`
const LabelWrap = styled.div`
  font-size: 18px;
  font-weight: 400;
`
const InputContent = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: 400;

  padding: 12px 4px;

  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid #A0A0A0;
`
const ErrorMessage = styled.div`
  color: #D1292C;
  font-size: 12px;
  font-weight: 400;
  
  padding: 4px 0;
`

export const Input: FC<InputProps> = ({value, onChange, type, placeholder, label, errorMessage}) => {
    return (
        <InputStyle>
            <LabelWrap>{label}</LabelWrap>
            <InputContent
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            <ErrorMessage>{errorMessage ? errorMessage : ""}</ErrorMessage>
        </InputStyle>
    );
};