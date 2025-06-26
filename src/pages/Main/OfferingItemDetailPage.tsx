// OfferingItemDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight, FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";

interface ProductImage {
  storedName: string;
}

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
  images: ProductImage[];
  sellerName: string;
  timeAgo: string;
  favorited: boolean;
}

export const OfferingItemDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offering, setOffering] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`, { withCredentials: true });
        setOffering(response.data);
        setIsLiked(response.data.favorited);
        setNotFound(false);
      } catch (err: any) {
        if (err.response?.status === 404) {
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

  const toggleFavorite = async () => {
    if (!offering) return;
    try {
      const response = await axios.post(`/api/products/${offering.id}/favorite`, null, { withCredentials: true });
      setIsLiked(response.data === true);
    } catch (err: any) {
      if (err.response?.status === 401) alert("로그인이 필요합니다.");
      else alert("즐겨찾기 처리 중 오류가 발생했습니다.");
    }
  };

  const handleOpenChat = () => {
    if (offering?.openChatUrl) {
      const url = offering.openChatUrl.startsWith("http") ? offering.openChatUrl : `https://${offering.openChatUrl}`;
      window.open(url, "_blank");
    } else {
      alert("오픈채팅 URL이 없습니다.");
    }
  };

  const handleEdit = () => navigate(`/home/main/${id}/edit`);
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`/api/products/${id}`, { withCredentials: true });
      alert("삭제가 완료되었습니다.");
      navigate("/home/main");
    } catch (err: any) {
      if (err.response?.status === 401) alert("로그인이 필요합니다.");
      else if (err.response?.status === 403) alert("삭제 권한이 없습니다.");
      else alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleRightClick = () => setShowDropdown((prev) => !prev);

  const discountPercent = offering && offering.originalPrice
    ? Math.round(((offering.originalPrice - offering.salePrice) / offering.originalPrice) * 100)
    : 0;

  const goPrev = () => { if (imageIndex > 0) setImageIndex((prev) => prev - 1); };
  const goNext = () => { if (offering && imageIndex < offering.images.length - 1) setImageIndex((prev) => prev + 1); };

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader
          title=""
          rightIcon={
            <DropdownWrapper>
              <MoreButton onClick={handleRightClick}><FaEllipsisV /></MoreButton>
              {showDropdown && (
                <Dropdown>
                  <DropdownItem onClick={handleEdit}><FaEdit /> 수정</DropdownItem>
                  <DropdownItem onClick={handleDelete}><FaTrash /> 삭제</DropdownItem>
                </Dropdown>
              )}
            </DropdownWrapper>
          }
        />

        <Wrapper>
          {loading ? (
            <CenterText>상품 정보를 불러오는 중입니다...</CenterText>
          ) : notFound ? (
            <CenterText>존재하지 않는 상품입니다.</CenterText>
          ) : offering ? (
            <>
              <ImageWrapper>
                <ArrowButton left disabled={imageIndex === 0} onClick={goPrev}><FaChevronLeft /></ArrowButton>
                <ProductImage src={`https://keepbara.duckdns.org/images/${offering.images[imageIndex]?.storedName}`} alt={offering.title} />
                <ArrowButton disabled={imageIndex === offering.images.length - 1} onClick={goNext}><FaChevronRight /></ArrowButton>
                <Dots>{offering.images.map((_, idx) => <Dot key={idx} active={idx === imageIndex} />)}</Dots>
              </ImageWrapper>

              <SellerInfo>
                <Profile />
                <div><SellerName>{offering.sellerName}</SellerName></div>
              </SellerInfo>

              <Content>
                <Title>{offering.title}</Title>
                <SubInfo>{offering.type === "CAFE" ? "가게" : "직거래"} / {offering.timeAgo}</SubInfo>
                <Description>{offering.description}</Description>
                <SectionTitle>거래 장소 위치</SectionTitle>
                <InfoBox>{offering.location || "거래 위치 정보 없음"}</InfoBox>
                <SectionTitle>오픈 채팅방 링크</SectionTitle>
                <InfoBox>{offering.openChatUrl || "오픈채팅 링크 없음"}</InfoBox>
              </Content>

              <BottomBar>
                <Like onClick={toggleFavorite} style={{ cursor: "pointer" }}>
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
                >문의하기</Button>
              </BottomBar>
            </>
          ) : null}
        </Wrapper>
      </PageLayout>
    </PageBackground>
  );
};

const Wrapper = styled.div`padding-bottom: 100px;`;
const CenterText = styled.p`text-align: center; padding: 50px 0; font-size: 1.1rem; color: #666;`;
const ImageWrapper = styled.div`position: relative;`;
const ProductImage = styled.img`width: 100%; height: 600px; object-fit: cover;`;
const ArrowButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.6);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  z-index: 2;
  &:disabled { cursor: default; opacity: 0.3; }
  svg { font-size: 1.3rem; color: #666; }
`;
const Dots = styled.div`position: absolute; bottom: 15px; width: 100%; display: flex; justify-content: center; gap: 8px;`;
const Dot = styled.div<{ active: boolean }>`width: 10px; height: 10px; border-radius: 50%; background-color: ${({ active }) => (active ? "#6fc667" : "#ccc")};`;
const SellerInfo = styled.div`margin-left: 30px; display: flex; align-items: center; gap: 12px; padding: 16px 0; position: relative;`;
const Profile = styled.div`width: 48px; height: 48px; border-radius: 50%; background: #eee;`;
const SellerName = styled.div`font-weight: bold; margin-bottom: 7px;`;
const DropdownWrapper = styled.div`position: relative;`;
const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
`;
const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  border-radius: 8px;
  overflow: hidden;
  width: 180px;
`;
const DropdownItem = styled.div`
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  &:hover { background: #f5f5f5; }
`;
const Content = styled.div`border-top: 2px solid #EEEFEF; margin: 0 30px; padding: 16px 10px;`;
const Title = styled.h2`font-weight: bold; font-size: 1.2rem; margin: 16px 0 8px;`;
const SubInfo = styled.div`color: #999; font-size: 0.9rem;`;
const Description = styled.p`margin: 16px 0 50px;`;
const SectionTitle = styled.h4`font-size: 1.2rem; font-weight: bold; margin: 24px 0 8px;`;
const InfoBox = styled.div`padding: 1rem; border-radius: 5px; background: #f9f9f9; font-size: 0.95rem; color: #333; margin-bottom: 1rem;`;
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
const Like = styled.div`font-size: 1.5rem; margin-left: 15px;`;
const PriceBox = styled.div`
  flex: 1;
  margin-left: 15px;
  span { font-weight: bold; font-size: 1.1rem; }
  small { margin-top: 5px; display: block; color: #999; font-size: 0.8rem; }
`;
