import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";

export const FavoritesPage: FC = () => {
    return (
        <PageBackground>
            <PageLayout>
            즐겨찾기
            <BottomNavigation/>
            </PageLayout>
        </PageBackground>
    );
};