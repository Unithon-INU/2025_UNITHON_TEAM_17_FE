import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/common/Button";
import styled from "styled-components";
import {Input, InputProps} from "../components/common/Input";
import {useState} from "react";
import {sign} from "crypto";

export const SignUpPage: FC = () => {
    const {signUp, login, loginByOAuth} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [name, setName] = useState<string>("");

    const onSignUp = async () => {
        const res = await signUp(email, password, name);
        console.log(res)
    }


    return (
        <PageBackground>
            <PageLayout>
                <Input
                    value={email}
                    onChange={setEmail}
                    label={"이메일"}
                    placeholder={"이메일 주소를 입력하세요."}
                    type={"email"}
                />

                <Input
                    value={password}
                    onChange={setPassword}
                    label={"비밀번호"}
                    placeholder={"비밀번호를 입력하세요."}
                    type={"password"}
                />

                <Input
                    value={passwordCheck}
                    onChange={setPasswordCheck}
                    label={"비밀번호 확인"}
                    placeholder={"비밀번호를 다시 입력하세요."}
                    type={"password"}
                />

                <Input
                    value={name}
                    onChange={setName}
                    label={"이름"}
                    placeholder={"이름을 입력하세요."}
                    type={"text"}
                />

                <Button onClick={() => onSignUp()}>회원가입</Button>
            </PageLayout>
        </PageBackground>
    );
};
