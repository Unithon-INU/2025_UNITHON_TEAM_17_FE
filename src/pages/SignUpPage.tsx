import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {useAuth} from "../hooks/useAuth";
import {Button} from "../components/common/Button";

export const SignUpPage: FC = () => {
    const {signUp} = useAuth();

    return (
        <PageBackground>
            <PageLayout>
                회원가입 페이지
                <Button onClick={() => signUp("111@inu.ac.kr", "qwer1234")}>회원가입</Button>
            </PageLayout>
        </PageBackground>
    );
};
