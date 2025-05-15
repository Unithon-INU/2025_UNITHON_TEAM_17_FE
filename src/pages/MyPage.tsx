import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const MyPage: FC = () => {
    return (
        <PageBackground>
            <PageLayout>
            마이페이지
            <BottomNavigation/>
            </PageLayout>
        </PageBackground>
    );
};