import type { FC, ReactNode } from "react";
import { useState } from "react";
import { PageBackground, PageLayout } from "../styles/PageLayout";
import { Input } from "../components/common/Input";
import { NavHeader } from "../components/common/NavHeader";
import { SignUpStep as SignUpStepComponent } from "../components/signup/SignUpStep";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import axios from "axios";
import styled from "styled-components";
import {useAuth} from "../hooks/useAuth";

type SignUpStep = "email" | "password" | "passwordCheck" | "name";

function useSignUpInput(initialValue: string): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
] {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  return [value, setValue, error, setError];
}

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const {signUp} = useAuth();

  const [step, setStep] = useState<SignUpStep>("email");
  const [email, setEmail, emailError, setEmailError] = useSignUpInput("");
  const [password, setPassword, passwordError, setPasswordError] = useSignUpInput("");
  const [passwordCheck, setPasswordCheck, passwordCheckError, setPasswordCheckError] = useSignUpInput("");
  const [name, setName, nameError, setNameError] = useSignUpInput("");

  const onEmailNext = () => {
    if (!email.includes("@")) {
      setEmailError("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    setEmailError(null);
    setStep("password");
  };

  const onPasswordCheckNext = () => {
    if (password !== passwordCheck) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setPasswordCheckError(null);
    setStep("name");
  };

  const onSignUp = async () => {
    try {
      const response = await axios.post(
        "/api/auth/signup",
        { email, password, name },
        { withCredentials: true }
      );

      navigate(RoutePath.login); // 성공 시 로그인 화면으로 이동
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.error;

      if (errorMessage === "이미 가입된 이메일입니다.") {
        setStep("email"); // 다시 이메일 입력 단계로 이동
        setEmailError(errorMessage); // 에러 메시지 표시
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  let stepTemplate: ReactNode;
  if (step === "email") {
    stepTemplate = (
      <SignUpStepComponent onNext={onEmailNext}>
        <Input
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (emailError) setEmailError(null);
          }}
          label={"이메일"}
          placeholder={"이메일 주소를 입력하세요."}
          type={"email"}
          error={emailError}
        />
      </SignUpStepComponent>
    );
  } else if (step === "password") {
    stepTemplate = (
      <SignUpStepComponent onNext={() => setStep("passwordCheck")}>
        <Input
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (passwordError) setPasswordError(null);
          }}
          label={"비밀번호"}
          placeholder={"비밀번호를 입력하세요."}
          type={"password"}
          error={passwordError}
        />
      </SignUpStepComponent>
    );
  } else if (step === "passwordCheck") {
    stepTemplate = (
      <SignUpStepComponent onNext={onPasswordCheckNext}>
        <Input
          value={passwordCheck}
          onChange={(value) => {
            setPasswordCheck(value);
            if (passwordCheckError) setPasswordCheckError(null);
          }}
          label={"비밀번호 확인"}
          placeholder={"비밀번호를 다시 입력하세요."}
          type={"password"}
          error={passwordCheckError}
        />
      </SignUpStepComponent>
    );
  } else if (step === "name") {
    stepTemplate = (
      <SignUpStepComponent onNext={onSignUp} buttonText={"회원가입"}>
        <Input
          value={name}
          onChange={(value) => {
            setName(value);
            if (nameError) setNameError(null);
          }}
          label={"이름"}
          placeholder={"이름을 입력하세요."}
          type={"text"}
          error={nameError}
        />
      </SignUpStepComponent>
    );
  }

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader />
        <FormWrapper>
          <FormInner>{stepTemplate}</FormInner>
        </FormWrapper>
      </PageLayout>
    </PageBackground>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 40px;
  box-sizing: border-box;
`;

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
`;
