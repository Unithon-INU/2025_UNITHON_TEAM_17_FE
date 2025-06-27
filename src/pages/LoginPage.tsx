import type { FC } from "react";
import {Link, useNavigate} from "react-router-dom";
import { PageBackground, PageLayout } from "../styles/PageLayout";
import { NavHeader } from "../components/common/NavHeader";
import styled from "styled-components";
import {LoginInput} from "../components/login/LoginInput";
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";
import GoogleIcon from "./../assets/google.webp";
import KakaoIcon from "./../assets/kakao.png";
import { Space } from "../components/common/Space";
import axios from "axios";
import {RoutePath} from "../RoutePath";

const PaddedLayout = styled(PageLayout)`
  padding: 2rem;
`;

const Title = styled.h1`
    margin-top: 50px;
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 60px;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
`;

const SubLoginMessage = styled.div`
    color: #a0a0a0;
    font-size: 15px;
    text-align: center;
`;

const OauthLoginIconWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 12px;
`;

const OauthLoginIcon = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 100%;
    cursor: pointer;
`;

export const LoginPage: FC = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await login({email, password});
            navigate(RoutePath.main);
        } catch (error) {
            toast.error("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const onLoginOauth = (provider: "google" | "kakao") => {
        const redirectUrl = encodeURIComponent(`${window.location.origin}${RoutePath.main}`);
        window.location.href = `https://keepbara.duckdns.org/oauth2/authorization/${provider}?redirectUrl=${redirectUrl}`;
    };

    return (
        <PageBackground>
            <PageLayout>
                <NavHeader />
                <PaddedLayout>
                    <Title>이메일과 비밀번호를<br />입력하세요</Title>

                    <LoginForm onSubmit={onLogin}>
                        <LoginInput
                            value={email}
                            onChange={(value) => setEmail(value)}
                            label="이메일"
                            placeholder="이메일 주소 입력"
                            type="email"
                        />
                        <LoginInput
                            value={password}
                            onChange={(value) => setPassword(value)}
                            label="비밀번호"
                            placeholder="8자리 이상 입력"
                            type="password"
                        />
                        <Button type="submit">로그인</Button>
                        <Button
                            type="button"
                            background={"#ECECEC"}
                            color={"#979797"}
                            onClick={() => navigate(RoutePath.signUp)}
                        >회원가입</Button>

                        <Space style={{ height: 65 }} />
                        <SubLoginMessage>다른 로그인 방식 선택</SubLoginMessage>
                        <OauthLoginIconWrap>
                            <OauthLoginIcon src={GoogleIcon} onClick={() => onLoginOauth("google")} />
                            <OauthLoginIcon src={KakaoIcon} onClick={() => onLoginOauth("kakao")} />
                        </OauthLoginIconWrap>
                    </LoginForm>
                </PaddedLayout>
            </PageLayout>
        </PageBackground>
    );
};
