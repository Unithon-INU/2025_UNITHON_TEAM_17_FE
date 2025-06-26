import styled from "styled-components";
import type {FC} from "react";

export type InputProps = {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder: string;
    type: "text" | "email" | "password" | "number" | "date" | "tel" | "search" | "url" | "time" | "datetime-local" | "month" | "week" | "color" | "file";
    error?: string | null;
}
const InputStyle = styled.div`

`
const LabelWrap = styled.div`
  margin-top: 60px;
  font-size: 25px;
  font-weight: 400;
`
const InputContent = styled.input<{isError : boolean}>`
  width: 100%;
  font-size: 20px;
  font-weight: 400;

  margin-top: 30px;
  margin-bottom: 60px;
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

export const Input: FC<InputProps> = ({value, onChange, placeholder, label, error, type}) => {
    return (
        <InputStyle>
            <LabelWrap>{label}</LabelWrap>
            <InputContent
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                isError={!!error}
                type={type}
            />
            <ErrorMessage>{error ? error : ""}</ErrorMessage>
        </InputStyle>
    );
};