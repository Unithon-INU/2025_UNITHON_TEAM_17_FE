import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import { MainHeader } from "../components/main/MainHeader";

export const MainPage: FC = () => {
    return (
        <PageBackground>
            <MainHeader />
                <PageLayout>
                    메인 페이지
                    <BottomNavigation/>
                </PageLayout>
        </PageBackground>
    );
};