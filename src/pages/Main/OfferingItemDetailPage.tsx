import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";
import { useFavorites } from "../../hooks/useFavorites";

// ✅ 서버 응답 타입
interface Product {
  id: number;
  title: string;
  originalPrice: number;
  salePrice: number;
  description: string;
  quantity: number;
  location: string;
  type: "CAFE" | "DIRECT";
  openChatUrl: string;
  imageUrls: string[];
  sellerName: string;
  timeAgo: string;
}

export const OfferingItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite } = useFavorites();
  const [offering, setOffering] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`, { withCredentials: true });
        setOffering(response.data);
        setNotFound(false);
      } catch (err: any) {
        console.error("상세 정보 불러오기 실패:", err);
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          alert("상품 정보를 불러오지 못했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const isLiked = offering ? favorites.includes(offering.id) : false;

  const handleOpenChat = () => {
    if (offering?.openChatUrl) {
      window.open(offering.openChatUrl, "_blank");
    } else {
      alert("오픈채팅 URL이 없습니다.");
    }
  };

  const discountPercent =
    offering && offering.originalPrice
      ? Math.round(((offering.originalPrice - offering.salePrice) / offering.originalPrice) * 100)
      : 0;

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="" />
        <Wrapper>
          {loading ? (
            <CenterText>상품 정보를 불러오는 중입니다...</CenterText>
          ) : notFound ? (
            <CenterText>존재하지 않는 상품입니다.</CenterText>
          ) : offering ? (
            <>
              <ImageWrapper>
                <ProductImage
                  src={
                    offering.imageUrls[0]
                      ? (offering.imageUrls[0].startsWith("http")
                          ? offering.imageUrls[0]
                          : `https://keepbara.duckdns.org${offering.imageUrls[0]}`)
                      : "/default-image.png"
                  }
                  alt={offering.title}
                />
              </ImageWrapper>

              <SellerInfo>
                <Profile />
                <div>
                  <SellerName>{offering.sellerName}</SellerName>
                </div>
              </SellerInfo>

              <Content>
                <Title>{offering.title}</Title>
                <SubInfo>
                  {offering.type === "CAFE" ? "가게" : "직거래"} / {offering.timeAgo}
                </SubInfo>
                <Description>{offering.description}</Description>

                <SectionTitle>거래 장소 위치</SectionTitle>
                <InfoBox>{offering.location || "거래 위치 정보 없음"}</InfoBox>

                <SectionTitle>오픈 채팅방 링크</SectionTitle>
                <InfoBox>{offering.openChatUrl || "오픈채팅 링크 없음"}</InfoBox>
              </Content>

              <BottomBar>
                <Like onClick={() => toggleFavorite(offering.id)} style={{ cursor: "pointer" }}>
                  {isLiked ? <FaHeart color="red" size="1.5em" /> : <FaRegHeart size="1.5em" />}
                </Like>
                <PriceBox>
                  <span>{offering.salePrice.toLocaleString()}원</span>
                  <small>원가보다 {discountPercent}% 정도 싸요!</small>
                </PriceBox>
                <Button
                  onClick={handleOpenChat}
                  background="#6fc667"
                  style={{ width: "120px", padding: "14px 20px", fontWeight: "bold", fontSize: "18px" }}
                >
                  문의하기
                </Button>
              </BottomBar>
            </>
          ) : null}
        </Wrapper>
      </PageLayout>
    </PageBackground>
  );
};

// ✅ 스타일 컴포넌트
const Wrapper = styled.div`
  padding-bottom: 100px;
`;

const CenterText = styled.p`
  text-align: center;
  padding: 50px 0;
  font-size: 1.1rem;
  color: #666;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
`;

const SellerInfo = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eee;
`;

const SellerName = styled.div`
  font-weight: bold;
  margin-bottom: 7px;
`;

const Content = styled.div`
  border-top: 2px solid #EEEFEF;
  margin-left: 30px;
  margin-right: 30px;
  padding: 16px 10px;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 16px 0 8px;
`;

const SubInfo = styled.div`
  color: #999;
  font-size: 0.9rem;
`;

const Description = styled.p`
  margin: 16px 0;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 24px 0 8px;
  margin-bottom: 10px;
`;

const InfoBox = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background: #f9f9f9;
  font-size: 0.95rem;
  color: #333;
  margin-bottom: 1rem;
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 800px;
  background: white;
  border-top: 1px solid #ddd;
  display: flex;
  padding: 1rem;
  gap: 12px;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
`;

const Like = styled.div`
  font-size: 1.5rem;
  margin-left: 15px;
`;

const PriceBox = styled.div`
  flex: 1;
  margin-left: 15px;
  span {
    font-weight: bold;
    font-size: 1.1rem;
  }
  small {
    margin-top: 5px;
    display: block;
    color: #999;
    font-size: 0.8rem;
  }
`;
