import {GlobalStyle} from "./styles/GlobalStyle";
import {BrowserRouter, Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {TempPage} from "./pages/TempPage";
import {RoutePath} from "./RoutePath";
import {MainPage} from "./pages/Main/MainPage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {WarehousePage} from "./pages/Warehouse/WarehousePage";
import {MyPage} from "./pages/Mypage/MyPage";
import {SplashPage} from "./pages/SplashPage";
import {Resize} from "./components/Resize";
import {EditLocation} from "./pages/Main/EditLocation";
import {PostWrite} from "./pages/Main/PostWrite";
import {LocationDetailPage} from "./pages/Warehouse/LocationDetailPage";
import {AddLocationPage} from "./pages/Warehouse/AddLocationPage";
import {OfferingItemDetailPage} from "./pages/Main/OfferingItemDetailPage";
import {LoginPage} from "./pages/LoginPage";
import {SignUpPage} from "./pages/SignUpPage";
import { OfferingItemEditPage } from "./pages/Main/OfferingItemEditPage";
import { ChangePasswordPage } from "./pages/Mypage/ChangePasswordPage";
import { ChangeEmailPage } from "./pages/Mypage/ChangeEmailPage";
import {ItemAddPage} from "./pages/addItem/ItemAddPage";
import {GuidePage} from "./pages/Guide/GuidePage";
import {GuideDetailPage} from "./pages/Guide/GuideDetailPage";
import {FC} from "react";
import {useAuth} from "./hooks/useAuth";
import {ItemUpdatePage} from "./pages/ItemUpdatePage";
import { SalesHistoryPage } from "./pages/Mypage/SalesHistoryPage";
import {Toaster} from "react-hot-toast";
import {DdayPage} from "./DdayPage";

const LoginGuard : FC = () => {
    const navigate = useNavigate();
    const {user} = useAuth();

    if(!user) {
        return <Navigate to={RoutePath.login} replace={true} />
    }

    return (
        <Outlet/>
    )
}

const NotLoginGuard : FC = () => {
    const {user} = useAuth();

    if(user) {
        return <Navigate to={RoutePath.main} replace={true} />
    }

    return (
        <Outlet/>
    )
}

function App() {
    return (
        <div className="App" style={{height: "calc(var(--vh) * 100)"}}>
            <GlobalStyle/>
            <Resize/>
            <BrowserRouter>
                <Routes>
                    <Route path={RoutePath.main} element={<MainPage/>}/>
                    <Route path={RoutePath.guide} element={<GuidePage/>}/>
                    <Route path={"/home/guide"} element={<GuidePage />} />
                    <Route path={"/home/guide/:topic"} element={<GuideDetailPage />} />
                    <Route path={RoutePath.temp} element={<TempPage/>}/>

                    <Route element={<NotLoginGuard/>}>
                        <Route index element={<SplashPage/>}/>
                        <Route path={RoutePath.login} element={<LoginPage/>}/>
                        <Route path={RoutePath.signUp} element={<SignUpPage/>}/>
                    </Route>


                    <Route element={<LoginGuard/>}>
                        <Route path={RoutePath.favorites} element={<FavoritesPage/>}/>
                        <Route path={RoutePath.mainPage.postWrite} element={<PostWrite/>}/>
                        <Route path="/home/main/:id" element={<OfferingItemDetailPage/> } />
                        <Route path={RoutePath.warehouse} element={<WarehousePage/>}/>
                        <Route path={"/home/warehouse/:locationName"} element={<LocationDetailPage />} />
                        <Route path={RoutePath.mainPage.editLocation(null)} element={<EditLocation/>}/>
                        <Route path="/home/warehouse/add-location" element={<AddLocationPage />} />
                        <Route path={RoutePath.itemCreate} element={<ItemAddPage />} />
                        <Route path={RoutePath.itemUpdate(null)} element={<ItemUpdatePage />} />
                        <Route path={RoutePath.my} element={<MyPage/>}/>
                        <Route path={RoutePath.mainPage.postWrite} element={<PostWrite/>}/>
                        <Route path={RoutePath.warehouseCreate} element={<AddLocationPage />} />
                        <Route path={RoutePath.guide} element={<GuidePage/>}/>
                        <Route path="/home/guide" element={<GuidePage />} />
                        <Route path="/home/guide/:topic" element={<GuideDetailPage />} />
                        <Route path="/home/main/:id/edit" element={<OfferingItemEditPage />} />
                        <Route path="/edit-email" element={<ChangeEmailPage />} />
                        <Route path="/change-password" element={<ChangePasswordPage />} />
                        <Route path="/sales-history" element={<SalesHistoryPage />} />

                        <Route path={RoutePath.dday} element={<DdayPage/>}/>
                      </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </div>
    );
}

export default App;
