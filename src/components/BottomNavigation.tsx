import styled from "styled-components";
import {FC} from "react";
import {Link} from "react-router-dom";
import {RoutePath} from "../RoutePath";

export type BottomNavigationProps = {}

const BottomNavigationStyle = styled.div`
  width: 100%;
  padding: 12px;

  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: fixed;
  left: 0;
  bottom: 0px;
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