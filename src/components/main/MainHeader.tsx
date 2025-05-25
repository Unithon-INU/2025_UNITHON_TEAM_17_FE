import type { FC } from "react";
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { FaRegListAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  background-color: #6FC667;
  padding: 1rem;
  padding-bottom: 1.5rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  margin-bottom: -1.5rem; 
  z-index: 10;         
  position: relative;
`;

const InnerContainer = styled.div`
  padding: 0 1.5rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Location = styled(Link)`
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-decoration: none;
`;

const Icons = styled.div`
  display: flex;
  gap: 1rem;
  color: white;
  font-size: 1.2rem;
`;

const IconLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  margin-top: 1rem;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
`;

const Input = styled.input`
  border: none;
  flex: 1;
  outline: none;
  font-size: 0.95rem;
`;

interface MainHeaderProps {
  searchKeyword: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainHeader: FC<MainHeaderProps> = ({ searchKeyword, onSearchChange }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <InnerContainer>
          <TopRow>
            <Location to="/home/main/edit-location">송도타임스페이스 ⌄</Location>
            <Icons>
              <IconLink to="/home/main/post-write">
                <FaRegListAlt />
              </IconLink>
              <IconLink to="/home/main/cart">
                <FaShoppingCart />
              </IconLink>
            </Icons>
          </TopRow>

          <SearchBar>
            <FiSearch />
            <Input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={onSearchChange}
            />
          </SearchBar>
        </InnerContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};
