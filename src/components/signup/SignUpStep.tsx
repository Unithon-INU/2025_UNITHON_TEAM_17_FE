import {FC, ReactNode} from "react";
import styled from "styled-components";
import {Button} from "../common/Button";

export type SignUpStepProps = {
    children: ReactNode;
    buttonText?: string;
    onNext: () => void;
}
const SignUpStepStyle = styled.div`
    height : calc(100% - 80px);
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const SignUpStep: FC<SignUpStepProps>
    = ({children, onNext, buttonText="다음"}) => {
    return (
        <SignUpStepStyle>
            <div>
                {children}
            </div>
            <Button onClick={() => onNext()}>{buttonText}</Button>
        </SignUpStepStyle>
    );
};