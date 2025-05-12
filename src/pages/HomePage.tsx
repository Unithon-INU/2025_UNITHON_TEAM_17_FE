import {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {RoutePath} from "../RoutePath";

export const HomePage: FC = () => {
    return (
        <PageLayout>
            HomePage
            <Routes>
                <Route path={"chat"} element={<ChatPage/>}/>
                <Route path={"favorites"} element={<FavoritesPage/>}/>
                <Route path={"main"} element={<MainPage/>}/>
                <Route path={"warehouse"} element={<WarehousePage/>}/>
                <Route path={"my"} element={<MyPage/>}/>
            </Routes>
            <BottomNavigation/>
        </PageLayout>
    )
}

export const MainPage: FC = () => {
    return (
        <PageLayout>
            메인 페이지
        </PageLayout>
    );
};

export const ChatPage: FC = () => {
    return (
        <PageLayout>
            채팅 페이지
        </PageLayout>
    );
};

export const FavoritesPage: FC = () => {
    return (
        <PageLayout>
            즐겨찾기 페이지
        </PageLayout>
    );
};

export const WarehousePage: FC = () => {
    return (
        <PageLayout>
            창고 페이지
        </PageLayout>
    );
};

export const MyPage: FC = () => {
    return (
        <PageLayout>
            마이페이지
        </PageLayout>
    );
};