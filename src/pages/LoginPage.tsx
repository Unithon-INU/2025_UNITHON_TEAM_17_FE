import type {FC, FormEvent} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {NavHeader} from "../components/common/NavHeader";
import styled from "styled-components";
import {LoginInput} from "../components/login/LoginInput";
import {useState} from "react";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";
import GoogleIcon from "./../assets/google.webp";
import KakaoIcon from "./../assets/kakao.png";
import {Space} from "../components/common/Space";
import axios from "axios";

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

const SubLoginMessage = styled.div`
    color: #a0a0a0;
    font-size: 15px;
    text-align: center;
`

const OauthLoginIconWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap : 12px;
`

const OauthLoginIcon = styled.img`
    width : 32px;
    height : 32px;
    border-radius: 100%;
    
    cursor: pointer;
`

export const LoginPage: FC = () => {
    const {login, loginByOAuth} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onLogin = async (e : FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (error) {
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
    }

    const onLoginOauth = async (providera: "google" | "kakao") => {
        window.location.href = `${axios.defaults.baseURL}/oauth2/authorization/${provider}`;
    }

    return (
        <PageBackground>
            <NavHeader/>
            <PageLayout>
                <Title>이메일과 비밀번호를<br/>입력하세요</Title>

                <LoginForm onSubmit={onLogin}>
                    <LoginInput
                        value={email}
                        onChange={s => setEmail(s)}
                        label={"이메일"}
                        placeholder={"이메일 주소 입력"}
                        type={"email"}
                    />

                    <LoginInput
                        value={password}
                        onChange={s => setPassword(s)}
                        label={"비밀번호"}
                        placeholder={"8자리 이상 입력"}
                        type={"password"}
                    />

                    <Button>로그인</Button>

                    <Space v={65}/>
                    <SubLoginMessage>다른 로그인 방식 선택</SubLoginMessage>
                    <OauthLoginIconWrap>
                        <OauthLoginIcon src={GoogleIcon} onClick={() => onLoginOauth("google")}/>
                        <OauthLoginIcon src={KakaoIcon} onClick={() => onLoginOauth("kakao")}/>
                    </OauthLoginIconWrap>
                </LoginForm>
            </PageLayout>
        </PageBackground>
    );
};


