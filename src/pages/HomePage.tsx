import {FC} from "react";
import {RoutePath} from "../App";
import {Link} from "react-router-dom";

export const HomePage: FC = () => {
    return (
        <div>
            HomePage
            <Link to={RoutePath.temp}>Temp Page로 이동</Link>
        </div>
    )
}
