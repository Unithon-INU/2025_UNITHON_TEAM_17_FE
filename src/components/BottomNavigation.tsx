import styled from "styled-components";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePath } from "../RoutePath";
import { AiFillHome } from "react-icons/ai";
import { FiMessageSquare, FiHeart, FiGrid, FiUser } from "react-icons/fi";

export type BottomNavigationProps = {}

const BottomNavigationStyle = styled.div`
  width: 100%;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 999;
`;

const IconWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const MainIcon = styled.div<{ $active?: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${({ $active }) => ($active ? "#6FC667" : "#999999")};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -60%);
  color: white;
  font-size: 28px;
`;

const NavItem = styled(Link)<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: ${({ $active }) => ($active ? "#000000" : "#999999")};

  svg {
    font-size: 22px;
    margin-bottom: 5px;
    stroke: ${({ $active }) => ($active ? "#000000" : "#999999")};
  }
`;

export const BottomNavigation: FC<BottomNavigationProps> = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <BottomNavigationStyle>
      <IconWrap>
        <NavItem to={RoutePath.chat} $active={path === RoutePath.chat}>
          <FiMessageSquare />
          채팅
        </NavItem>
        <NavItem to={RoutePath.favorites} $active={path === RoutePath.favorites}>
          <FiHeart />
          즐겨찾기
        </NavItem>
        <Link to={RoutePath.main}>
          <MainIcon $active={path === RoutePath.main}>
            <AiFillHome />
          </MainIcon>
        </Link>
        <NavItem to={RoutePath.warehouse} $active={path === RoutePath.warehouse}>
          <FiGrid />
          창고
        </NavItem>
        <NavItem to={RoutePath.my} $active={path === RoutePath.my}>
          <FiUser />
          마이
        </NavItem>
      </IconWrap>
    </BottomNavigationStyle>
  );
};
