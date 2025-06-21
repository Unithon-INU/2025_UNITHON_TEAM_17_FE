import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import { useFavorites } from "../hooks/useFavorites";
import { mockOfferings } from "../mocks/mockData";
import { OfferingItem } from "../components/main/OfferingItem";
import styled from "styled-components";
import EmptyBearImg from "../assets/empty_bear.png";  // 이미지 경로에 맞게 수정하세요!

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

          {likedOfferings.length === 0 ? (
            <EmptyWrapper>
              <EmptyImage src={EmptyBearImg} alt="empty favorites" />
              <EmptyText>현재 즐겨찾기 누른 상품이 없어요</EmptyText>
            </EmptyWrapper>
          ) : (
            <OfferingList>
              {likedOfferings.map(o => (
                <OfferingItem key={o.id} offering={o} />
              ))}
            </OfferingList>
          )}

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

const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  min-height: 40vh;
`;

const EmptyImage = styled.img`
  width: 300px;   // 크기를 키웠습니다!
  height: auto;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  color: #666;
  text-align: center;
`;
