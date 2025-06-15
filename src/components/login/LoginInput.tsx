import {FC} from "react";
import styled from "styled-components";
import {InputProps} from "../common/Input";

export type LoginInputProps = InputProps & {}
const LoginInputStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const Label = styled.label`
    font-size: 18px;
    font-weight: 400;
`
const InputField = styled.input`
    background: #FFFFFF;
    padding: 14px 17px;
    border: 1px solid #DEDEDE;
    border-radius: 8px;
    
    outline: none;
`
export const LoginInput: FC<LoginInputProps>
    = ({label, value, type, placeholder, onChange}) => {
    return (
        <LoginInputStyle>
            <Label>{label}</Label>
            <InputField
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
            />
        </LoginInputStyle>
    );
};