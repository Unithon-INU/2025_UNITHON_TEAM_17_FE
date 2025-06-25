import type { FC } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { PageBackground, PageLayout } from "../styles/PageLayout";
import { BottomNavigation } from "../components/BottomNavigation";
import { OfferingItem } from "../components/main/OfferingItem";
import styled from "styled-components";
import EmptyBearImg from "../assets/empty_bear.png";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FavoritesPage: FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/products/favorites", { withCredentials: true });
      setFavorites(response.data);  // 서버 응답에 맞게 data 가공 필요할 수도
    } catch (err) {
      console.error("즐겨찾기 목록 불러오기 실패:", err);
      alert("즐겨찾기 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <PageBackground>
      <PageLayout>
        <PaddedLayout>
          <HeaderWrapper>
            <Title>즐겨찾기</Title>
          </HeaderWrapper>

          {loading ? (
            <EmptyText>즐겨찾기 목록을 불러오는 중입니다...</EmptyText>
          ) : favorites.length === 0 ? (
            <EmptyWrapper>
              <EmptyImage src={EmptyBearImg} alt="empty favorites" />
              <EmptyText>현재 즐겨찾기 누른 상품이 없어요</EmptyText>
            </EmptyWrapper>
          ) : (
            <OfferingList>
              {favorites.map((o) => (
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
  width: 300px; 
  height: auto;
  margin-top: 2.5rem;
  margin-bottom: 1.5rem;
`;

const EmptyText = styled.p`
  font-size: 1.3rem;
  color: #666;
  text-align: center;
`;
