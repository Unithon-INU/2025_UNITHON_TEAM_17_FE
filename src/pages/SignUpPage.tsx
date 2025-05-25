import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/common/Button";
import styled from "styled-components";
import {Input, InputProps} from "../components/common/Input";

export const SignUpPage: FC = () => {
    const {signUp, login, loginByOAuth} = useAuth();

    return (
        <PageBackground>
            <PageLayout>
                <Input
                    value={""}
                    onChange={() => {}}
                    label={"이메일"}
                    placeholder={"이메일 주소를 입력하세요."}
                    type={"email"}
                />
            </PageLayout>
        </PageBackground>
    );
};
