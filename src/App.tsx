import {GlobalStyle} from "./styles/GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {HomePage} from "./pages/HomePage";
import {RoutePath} from "./RoutePath";
import {FC} from "react";
import {PageLayout} from "./styles/PageLayout";
import {BottomNavigation} from "./components/BottomNavigation";

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route path={RoutePath.chat} element={<ChatPage/>}/>
                    <Route path={RoutePath.favorites} element={<FavoritesPage/>}/>
                    <Route path={RoutePath.main} element={<MainPage/>}/>
                    <Route path={RoutePath.warehouse} element={<WarehousePage/>}/>
                    <Route path={RoutePath.my} element={<MyPage/>}/>
                    <Route path={RoutePath.temp} element={<TempPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export const MainPage: FC = () => {
    return (
        <PageLayout>
            메인 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};

export const ChatPage: FC = () => {
    return (
        <PageLayout>
            채팅 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};

export const FavoritesPage: FC = () => {
    return (
        <PageLayout>
            즐겨찾기 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};

export const WarehousePage: FC = () => {
    return (
        <PageLayout>
            창고 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};

export const MyPage: FC = () => {
    return (
        <PageLayout>
            마이페이지
            <BottomNavigation/>
        </PageLayout>
    );
};

export default App;
