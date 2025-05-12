import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {NavHeader} from "../components/NavHeader";

export const MainPage: FC = () => {
    return (
        <PageLayout>
            <NavHeader
                title="D-14"
                rightIcon={<span>임시 아이콘</span>}
                onRightIconClick={() => {alert("Hello world")}}
            />
            메인 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};