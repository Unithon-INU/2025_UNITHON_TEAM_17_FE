import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
// import { useRecoilValue } from 'recoil';
// import { favoritesState } from '../../store/favorites';
import styled from 'styled-components';
import { OfferingItem } from '../components/main/OfferingItem';


export const FavoritesPage: FC = () => {
    return (
        <div>
            즐겨찾기
        </div>
    )

};

const Wrapper = styled.div`
  padding: 2rem;
`;

const EmptyMessage = styled.p`
  color: #999;
  margin-top: 2rem;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 1rem;
`;