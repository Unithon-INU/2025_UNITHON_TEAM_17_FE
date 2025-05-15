import styled from "styled-components";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { RoutePath } from "../RoutePath";

import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

export type BottomNavigationProps = {}

const BottomNavigationStyle = styled.div`
  width: 100%;
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
  z-index: 999;
`;

const IconWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
`;

const MainIcon = styled.div`
  width: 90px;
  height: 90px;
  background-color: #6FC667;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  transform: translate(-50%, -60%);
  color: white;
  font-size: 32px;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
`;

const NavIcon = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

export const BottomNavigation: FC<BottomNavigationProps> = () => {
  return (
    <BottomNavigationStyle>
      <IconWrap>
        <NavLink to={RoutePath.chat}>
          <NavIcon><BiMessageRoundedDetail /></NavIcon>
          채팅
        </NavLink>

        <NavLink to={RoutePath.favorites}>
          <NavIcon><AiOutlineHeart /></NavIcon>
          즐겨찾기
        </NavLink>

        <Link to={RoutePath.main}>
          <MainIcon>
            <AiFillHome />
          </MainIcon>
        </Link>

        <NavLink to={RoutePath.warehouse}>
          <NavIcon><HiOutlineViewGrid /></NavIcon>
          창고
        </NavLink>

        <NavLink to={RoutePath.my}>
          <NavIcon><CgProfile /></NavIcon>
          마이
        </NavLink>
      </IconWrap>
    </BottomNavigationStyle>
  );
};
