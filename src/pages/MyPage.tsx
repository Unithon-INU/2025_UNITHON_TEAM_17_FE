import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {useAuth} from "../hooks/useAuth";

export const MyPage: FC = () => {
    const {user} = useAuth();

    return (
        <PageBackground>
            <PageLayout>
            마이페이지
                <h1>{user ? user.name : '없음'}</h1>
            <BottomNavigation/>
            </PageLayout>
        </PageBackground>
    );
};