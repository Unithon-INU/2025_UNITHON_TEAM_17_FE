import styled from "styled-components";
import type {FC} from "react";

export type InputProps = {
    value: string;
    onChange: (string) => void;
    label: string;
    placeholder: string;
    type: "text" | "email" | "password";
    error?: string | null;
}
const InputStyle = styled.div`

`
const LabelWrap = styled.div`
  font-size: 18px;
  font-weight: 400;
`
const InputContent = styled.input<{isError : boolean}>`
  width: 100%;
  font-size: 20px;
  font-weight: 400;

  padding: 12px;
  margin-top: 15px;

  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid ${p => p.isError ? '#D1292C' : '#A0A0A0'};
`

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    
    padding: 6px;
`

export const Input: FC<InputProps> = ({value, onChange, placeholder, label, error}) => {
    return (
        <InputStyle>
            <LabelWrap>{label}</LabelWrap>
            <InputContent
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                isError={!!error}
            />
            <ErrorMessage>{error ? error : ""}</ErrorMessage>
        </InputStyle>
    );
};