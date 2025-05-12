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
  
  position: fixed;
  left: 0;
  bottom: 0px;
`

const ItonWrap = styled.div`
  width: 100%;
  max-width: 500px;
  
  margin: 0 auto;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  position: relative;
`

const MainIcon = styled.div`
  width: 76px;
  height: 76px;
  background-color: #999;
  border-radius: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  position: absolute;
  left: 50%;
  transform: translate(-50%, -70%);
`

export const BottomNavigation: FC<BottomNavigationProps> = () => {
    return (

        <BottomNavigationStyle>
            <ItonWrap>
                <Link to={RoutePath.chat}>채팅</Link>
                <Link to={RoutePath.favorites}>즐겨찾기</Link>
                <Link to={RoutePath.main}>
                    <MainIcon>d</MainIcon>
                </Link>
                <Link to={RoutePath.warehouse}>창고</Link>
                <Link to={RoutePath.my}>마이</Link>
            </ItonWrap>
        </BottomNavigationStyle>
    );
};