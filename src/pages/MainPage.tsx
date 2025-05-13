import {FC} from "react";
import {PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {NavHeader} from "../components/NavHeader";
import {BiCamera, BiDotsHorizontalRounded} from "react-icons/bi";

export const MainPage: FC = () => {
    return (
        <PageLayout>
            <NavHeader
                title="D-14"
                rightIcon={<> <BiCamera style={{fontSize:"1.5em"}}/> <BiDotsHorizontalRounded style={{fontSize:"1.5em"}}/> </>}
                onRightIconClick={() => {
                    alert("Hello world")
                }}
            />
            메인 페이지
            <BottomNavigation/>
        </PageLayout>
    );
};