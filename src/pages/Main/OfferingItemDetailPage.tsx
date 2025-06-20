import { useParams} from "react-router-dom";
import styled from "styled-components";
import { mockOfferings } from "../../mocks/mockData";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";
import { useFavorites } from "../../hooks/useFavorites";

export const OfferingItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { favorites, toggleFavorite } = useFavorites();

  const offering = mockOfferings.find(o => o.id === Number(id));

  if (!offering) return <p>존재하지 않는 상품입니다.</p>;

  const isLiked = favorites.includes(offering.id);

  const handleOpenChat = () => {
    if (offering.openChatUrl) {
      window.open(offering.openChatUrl, '_blank');
    } else {
      alert("오픈채팅 URL이 없습니다.");
    }
  };

  const discountPercent = Math.round(
    ((offering.costPrice - offering.salePrice) / offering.costPrice) * 100
  );

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader 
          title=""
        />
        <Wrapper>
          <ImageWrapper>
            <ProductImage src={offering.imageUrls[0]} alt={offering.name} />
          </ImageWrapper>

          <SellerInfo>
            <Profile />
            <div>
              <SellerName>
                {offering.sellerName}
              </SellerName>
            </div>
          </SellerInfo>

          <Content>
            <Title>{offering.name}</Title>
            <SubInfo>{offering.type} / {offering.createdAt}</SubInfo>
            <Description>{offering.description}</Description>

            <SectionTitle>거래 장소 위치</SectionTitle>
            <InfoBox>{offering.place ? offering.place : "거래 위치 정보 없음"}</InfoBox>

            <SectionTitle>오픈 채팅방 링크</SectionTitle>
            <InfoBox>{offering.openChatUrl ? offering.openChatUrl : "오픈채팅 링크 없음"}</InfoBox>
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
              style={{ width: '120px', padding: '14px 20px', fontWeight: 'bold', fontSize: '18px' }}
            >
              문의하기
            </Button>
          </BottomBar>
        </Wrapper>
      </PageLayout>
    </PageBackground>
  );
};

// 스타일 컴포넌트

const Wrapper = styled.div`
  padding-bottom: 100px;
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
  margin-left : 30px;
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

const Badge = styled.span`
  color: green;
  margin-left: 6px;
`;

const SellerNote = styled.div`
  color: #aaa;
  font-size: 0.8rem;
`;

const Content = styled.div`
  border-top: 2px solid #EEEFEF;
  margin-left : 30px;
  margin-right : 30px;
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
