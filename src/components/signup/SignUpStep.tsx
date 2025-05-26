import {FC, ReactNode} from "react";
import styled from "styled-components";
import {Button} from "../common/Button";

export type SignUpStepProps = {
    children: ReactNode;
    onNext: () => void;
}
const SignUpStepStyle = styled.div`
    min-height: calc((var(--vh) * 100) - 100px);
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const SignUpStep: FC<SignUpStepProps>
    = ({children, onNext}) => {
    return (
        <SignUpStepStyle>
            <div>
                {children}
            </div>
            <Button onClick={() => onNext()}>다음</Button>
        </SignUpStepStyle>
    );
};