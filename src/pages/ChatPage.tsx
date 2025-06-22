import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const ChatPage: FC = () => {
    return (
        <PageBackground>
            <PageLayout>
               튜토리얼 페이지
            <BottomNavigation/>
            </PageLayout>
        </PageBackground>
    );
};