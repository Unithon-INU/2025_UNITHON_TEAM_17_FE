import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const MainPage: FC = () => {
    return (
        <PageLayout>
            메인 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};