import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const FavoritesPage: FC = () => {
    return (
        <PageLayout>
            즐겨찾기 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};