import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const ChatPage: FC = () => {
    return (
        <PageLayout>
            채팅 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};