import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {NavHeader} from "../components/common/NavHeader";
import styled from "styled-components";
import {LoginInput} from "../components/login/LoginInput";
import {useState} from "react";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";

const Title = styled.h1`
    font-size: 22px;
    font-weight: 600;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
`


export const LoginPage: FC = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (error) {
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
    }

    return (
        <PageBackground>
            <NavHeader/>
            <PageLayout>
                <Title>이메일과 비밀번호를<br/>입력하세요</Title>

                <LoginForm onSubmit={onLogin}>
                    <LoginInput
                        value={email}
                        onChange={setEmail}
                        label={"이메일"}
                        placeholder={"이메일 주소 입력"}
                        type={"email"}
                    />

                    <LoginInput
                        value={password}
                        onChange={setPassword}
                        label={"비밀번호"}
                        placeholder={"8자리 이상 입력"}
                        type={"password"}
                    />

                    <Button>로그인</Button>
                </LoginForm>
            </PageLayout>
        </PageBackground>
    );
};


