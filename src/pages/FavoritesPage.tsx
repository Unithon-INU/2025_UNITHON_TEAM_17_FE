import type {FC} from "react";
import {PageBackground,PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import { useFavorites } from "../hooks/useFavorites";
import { mockOfferings } from "../mocks/mockData";
import { OfferingItem } from "../components/main/OfferingItem";

import styled from "styled-components";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FavoritesPage: FC = () => {
  const { favorites } = useFavorites();
  const likedOfferings = mockOfferings.filter(o => favorites.includes(o.id));

  return (
    <PageBackground>
      <PageLayout>
          <PaddedLayout>
            <HeaderWrapper>
            <Title>즐겨찾기</Title>
          </HeaderWrapper>
          <OfferingList>
            {likedOfferings.map(o => (
              <OfferingItem key={o.id} offering={o} />
            ))}
          </OfferingList>
          <BottomNavigation />
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};

const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
`;