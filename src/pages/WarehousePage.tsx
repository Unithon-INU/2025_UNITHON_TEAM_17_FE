import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const WarehousePage: FC = () => {
    return (
        <PageLayout>
            창고 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};