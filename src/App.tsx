import {GlobalStyle} from "./styles/GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {RoutePath} from "./RoutePath";
import {MainPage} from "./pages/MainPage";
import {ChatPage} from "./pages/ChatPage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {WarehousePage} from "./pages/Warehouse/WarehousePage";
import {MyPage} from "./pages/MyPage";
import {EditLocation} from "./pages/EditLocation";
import { PostWrite } from "./pages/PostWrite";
import { Cart } from "./pages/Cart";
import { LocationDetailPage } from "./pages/Warehouse/LocationDetailPage";
import {SplashPage} from "./pages/SplashPage";

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage/>}/>
                    <Route path={RoutePath.splash} element={<SplashPage/>}/>
                    <Route path={RoutePath.chat} element={<ChatPage/>}/>
                    <Route path={RoutePath.favorites} element={<FavoritesPage/>}/>
                    <Route path={RoutePath.main} element={<MainPage/>}/>
                    <Route path={RoutePath.warehouse} element={<WarehousePage/>}/>
                    <Route path={"/home/warehouse/:locationName"} element={<LocationDetailPage />} />
                    <Route path={RoutePath.my} element={<MyPage/>}/>
                    <Route path={RoutePath.temp} element={<TempPage/>}/>
                    <Route path={RoutePath.editLocation} element={<EditLocation/>}/>
                    <Route path={RoutePath.postWrite} element={<PostWrite/>}/>
                    <Route path={RoutePath.cart} element={<Cart/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
