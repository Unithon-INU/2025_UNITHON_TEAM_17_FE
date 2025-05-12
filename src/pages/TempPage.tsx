import {FC} from "react";
import {Link} from "react-router-dom/dist";

export const TempPage: FC = () => {
    return (
        <div>
            TempPage
            <Link to={"/"}>Home Page로 이동</Link>
        </div>
    )
}