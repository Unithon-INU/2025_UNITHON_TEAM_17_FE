import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const SignUpPage: FC = () => {
    return (
        <PageBackground>
            <PageLayout>
                회원가입 페이지
            </PageLayout>
        </PageBackground>
    );
};
