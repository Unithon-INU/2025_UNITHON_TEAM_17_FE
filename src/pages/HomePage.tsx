import {FC} from "react";
import {Link, Route, Routes} from "react-router-dom";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {RoutePath} from "../RoutePath";

export const HomePage: FC = () => {
    return (
        <PageLayout>
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
        <div>
            메인 페이지
        </div>
    );
};

export const ChatPage: FC = () => {
    return (
        <div>
            채팅 페이지
        </div>
    );
};

export const FavoritesPage: FC = () => {
    return (
        <div>
            즐겨찾기 페이지
        </div>
    );
};

export const WarehousePage: FC = () => {
    return (
        <div>
            창고 페이지
        </div>
    );
};

export const MyPage: FC = () => {
    return (
        <div>
            마이페이지
        </div>
    );
};