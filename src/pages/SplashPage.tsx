import {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {Button} from "../components/common/Button";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import {Space} from "../components/common/Space";
import {Link, useNavigate} from "react-router-dom";
import {RoutePath} from "../RoutePath";

const SplashPageStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const LogoWrap = styled.div`
    flex: 1;
    
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SplashPage: FC = () => {
    const navigate = useNavigate();
    return (
        <PageBackground>
            <PageLayout>
                <SplashPageStyle>
                    <LogoWrap>
                        <img src={Logo} alt={"ad"}/>
                    </LogoWrap>
                    <div>
                        <Button isFullWidth onClick={() => {
                            navigate(RoutePath.signUp)
                        }}>
                            회원가입</Button>
                        <Space v={12}/>
                        <Button
                            isFullWidth
                            color={"#979797"}
                            background={"#ECECEC"}
                            onClick={() => {
                                navigate(RoutePath.login)
                            }}>
                            로그인</Button>
                    </div>
                </SplashPageStyle>
            </PageLayout>
        </PageBackground>
    );
};

