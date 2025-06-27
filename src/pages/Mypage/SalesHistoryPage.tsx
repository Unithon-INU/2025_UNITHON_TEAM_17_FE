import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavHeader } from "../../components/NavHeader";

interface SoldProduct {
  id: number;
  title: string;
  thumbnail: string;
  salePrice: number;
  sellerName: string;
  timeAgo: string;
  location: string;
  favorited: boolean;
}

export const SalesHistoryPage: FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<SoldProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/products/sell-list", { withCredentials: true })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("판매 내역 조회 실패:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
  <PageBackground>
    <PageLayout>
      <PaddedLayout>
        <NavHeader title="판매 내역" />
        {loading ? (
          <p>불러오는 중...</p>
        ) : products.length === 0 ? (
          <EmptyMessage>판매한 상품이 없습니다.</EmptyMessage>
        ) : (
          <Grid>
            {products.map((item) => {
              const fullThumbnailUrl =
                item.thumbnail?.startsWith("http")
                  ? item.thumbnail
                  : item.thumbnail
                  ? `https://keepbara.duckdns.org${item.thumbnail}`
                  : "/default-image.png";

              return (
                <ItemCard key={item.id} onClick={() => navigate(`/home/main/${item.id}`)}>
                  <Image src={fullThumbnailUrl} alt={item.title} />
                  <TextContainer>
                    <ProductTitle>{item.title}</ProductTitle>
                    <InfoRow>
                      <Date>{item.timeAgo}</Date>
                      <Price>{item.salePrice.toLocaleString()}원</Price>
                    </InfoRow>
                  </TextContainer>
                </ItemCard>
              );
            })}
          </Grid>
        )}
      </PaddedLayout>
    </PageLayout>
  </PageBackground>
);
};

const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 12px;
`;

const ItemCard = styled.div`
  margin-top : 30px;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 2.5px solid #F0F0F0;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const TextContainer = styled.div`
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

const Date = styled.span`
  margin-top : 10px;
  color: #aaa;
`;

const Price = styled.span`
  font-weight: 600;
  color: black;
`;

const EmptyMessage = styled.div`
  margin-top: 80px;
  text-align: center;
  font-size: 16px;
  color: #888;
`;