import type { FC } from "react";
import { PageBackground, PageLayout } from "../styles/PageLayout";
import { Button } from "../components/common/Button";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../RoutePath";

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
  margin-top: 150px;
  margin-bottom: 100px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ButtonInner = styled.div`
  width: 80%;
  max-width: 400px;
`;

export const SplashPage: FC = () => {
  const navigate = useNavigate();

  return (
    <PageBackground>
      <PageLayout>
        <SplashPageStyle>
          <LogoWrap>
            <img src={Logo} alt="logo" />
          </LogoWrap>
          <ButtonWrap>
            <ButtonInner>
              <Button isFullWidth onClick={() => navigate(RoutePath.signUp)}>
                회원가입
              </Button>
            </ButtonInner>
            <ButtonInner>
              <Button isFullWidth
                color="#979797"
                background="#ECECEC"
                onClick={() => navigate(RoutePath.login)}
              >
                로그인
              </Button>
            </ButtonInner>
          </ButtonWrap>
        </SplashPageStyle>
      </PageLayout>
    </PageBackground>
  );
};
