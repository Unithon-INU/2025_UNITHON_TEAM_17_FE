import styled from "styled-components";
import {FC} from "react";
import {Link} from "react-router-dom";
import {RoutePath} from "../RoutePath";

export type BottomNavigationProps = {}

const BottomNavigationStyle = styled.div`
  width: 100%;
  padding: 12px;
`

export const BottomNavigation: FC<BottomNavigationProps> = () => {
    return (
        <BottomNavigationStyle>
            <Link to={RoutePath.chat}>채팅</Link>
            <Link to={RoutePath.favorites}>즐겨찾기</Link>
            <Link to={RoutePath.main}>홈</Link>
            <Link to={RoutePath.warehouse}>창고</Link>
            <Link to={RoutePath.my}>마이</Link>
        </BottomNavigationStyle>
    );
};