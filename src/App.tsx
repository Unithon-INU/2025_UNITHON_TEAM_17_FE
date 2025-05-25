import {GlobalStyle} from "./styles/GlobalStyle";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {RoutePath} from "./RoutePath";
import {MainPage} from "./pages/Main/MainPage";
import {ChatPage} from "./pages/ChatPage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {WarehousePage} from "./pages/Warehouse/WarehousePage";
import {MyPage} from "./pages/MyPage";
import {EditLocation} from "./pages/Main/EditLocation";
import { PostWrite } from "./pages/Main/PostWrite";
import { Cart } from "./pages/Main/Cart";
import { LocationDetailPage } from "./pages/Warehouse/LocationDetailPage";
import { AddLocationPage } from "./pages/Warehouse/AddLocationPage";
import { OfferingItemDetailPage } from "./pages/Main/OfferingItemDetailPage";

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage/>}/>
                    <Route path={RoutePath.chat} element={<ChatPage/>}/>
                    <Route path={RoutePath.favorites} element={<FavoritesPage/>}/>
                    <Route path={RoutePath.main} element={<MainPage/>}/>
                    <Route path={RoutePath.mainPage.postWrite} element={<PostWrite/>}/>
                    <Route path={RoutePath.mainPage.cart} element={<Cart/>}/>
                    <Route path="/home/main/:id" element={<OfferingItemDetailPage/> } />
                    <Route path={RoutePath.warehouse} element={<WarehousePage/>}/>
                    <Route path={"/home/warehouse/:locationName"} element={<LocationDetailPage />} />
                    <Route path={RoutePath.mainPage.editLocation} element={<EditLocation/>}/>
                    <Route path="/home/warehouse/add-location" element={<AddLocationPage />} />
                    <Route path={RoutePath.my} element={<MyPage/>}/>
                    <Route path={RoutePath.temp} element={<TempPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
