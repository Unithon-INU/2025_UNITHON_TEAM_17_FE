import type {FC, ReactNode} from "react";
import {useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useAuth} from "../hooks/useAuth";
import {Input} from "../components/common/Input";
import {NavHeader} from "../components/common/NavHeader";
import {SignUpStep} from "../components/signup/SignUpStep";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../RoutePath";

type SignUpStep = "email" | "password" | "passwordCheck" | "name";

function useSignUpInput(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null)

    const handleChange = (v: string) => setValue(v);

    return [value, handleChange, error, setError] as const;
}

export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const {signUp, login, loginByOAuth} = useAuth();
    const [step, setStep] = useState<SignUpStep>("email");
    const [email, setEmail, emailError, setEmailError] = useSignUpInput("");
    const [password, setPassword, passwordError, setPasswordError] = useSignUpInput("");
    const [passwordCheck, setPasswordCheck, passwordCheckError, setPasswordCheckError] = useSignUpInput("");
    const [name, setName, nameError, setNameError] = useSignUpInput("");

    const onPasswordCheckNext = () => {
        if(password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            return;
        }
        setStep("name");
    }

    const onSignUp = async () => {
        try{
            const res = await signUp(email, password, name);
            navigate(RoutePath.main)
        }
        catch (error) {
            alert("회원가입에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
            return;
        }
    }

    let stepTemplate : ReactNode
    if(step == "email") {
        stepTemplate = (
            <SignUpStep onNext={() => setStep("password")}>
                <Input
                    value={email}
                    onChange={setEmail}
                    label={"이메일"}
                    placeholder={"이메일 주소를 입력하세요."}
                    type={"email"}
                    error={emailError}
                />
            </SignUpStep>
        );
    }
    else if(step == "password") {
        stepTemplate = (
            <SignUpStep onNext={() => setStep("passwordCheck")}>
                <Input
                    value={password}
                    onChange={setPassword}
                    label={"비밀번호"}
                    placeholder={"비밀번호를 입력하세요."}
                    type={"password"}
                    error={passwordError}
                />
            </SignUpStep>
        );
    }
    else if(step == "passwordCheck") {
        stepTemplate = (
            <SignUpStep onNext={() => onPasswordCheckNext()}>
                <Input
                    value={passwordCheck}
                    onChange={setPasswordCheck}
                    label={"비밀번호 확인"}
                    placeholder={"비밀번호를 다시 입력하세요."}
                    type={"password"}
                    error={passwordCheckError}
                />
            </SignUpStep>
        );
    }
    else if(step == "name") {
        stepTemplate = (
            <SignUpStep
                onNext={() => onSignUp()}
                buttonText={"회원가입"}
            >
                <Input
                    value={name}
                    onChange={setName}
                    label={"이름"}
                    placeholder={"이름을 입력하세요."}
                    type={"text"}
                    error={nameError}
                />
            </SignUpStep>
        );
    }

    return (
        <PageBackground>
            <NavHeader/>
            <PageLayout>
                {stepTemplate}
            </PageLayout>
        </PageBackground>
    );
};
