import {FC} from "react";
import {RoutePath} from "../App";
import {Link} from "react-router-dom";
import {PageLayout} from "../styles/PageLayout";

export const HomePage: FC = () => {
    return (
        <PageLayout>
            HomePage
            <Link to={RoutePath.temp}>Temp Page로 이동</Link>
        </PageLayout>
    )
}
