import type {FC} from "react";
import { PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {NavHeader} from "../components/NavHeader";
import {BiCamera, BiDotsHorizontalRounded} from "react-icons/bi";

export const WarehousePage: FC = () => {
    return (
        <PageBackground>
            <PageLayout>
                <NavHeader
                    title="D-14"
                    rightIcon={<> <BiCamera style={{fontSize:"1.5em"}}/> <BiDotsHorizontalRounded style={{fontSize:"1.5em"}}/> </>}
                    onRightIconClick={() => {
                        alert("Hello world")
                    }}
                />
                <h1>창고 페이지</h1>
                <BottomNavigation />
            </PageLayout>
        </PageBackground>
    );
};