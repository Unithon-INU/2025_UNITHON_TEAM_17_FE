import {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {RoutePath} from "../RoutePath";

export const HomePage: FC = () => {
    return (
        <PageLayout>
            <BottomNavigation/>
        </PageLayout>
    )
}