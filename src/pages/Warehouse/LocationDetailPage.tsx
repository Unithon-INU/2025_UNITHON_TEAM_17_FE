import { useParams } from "react-router-dom";
import { mockLocations, mockProducts } from "../../mocks/mockData";
import { differenceInDays } from "date-fns";
import { NavHeader } from "../../components/NavHeader";
import { BiCamera, BiDotsHorizontalRounded } from "react-icons/bi";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import styled from "styled-components";

const EmptyBox = styled.div`
  border: 2px solid #eee;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  color: #999;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 0.95rem;
  height : 100px;
`;

export const LocationDetailPage = () => {
  const { locationName } = useParams();
  const location = mockLocations.find(loc => loc.name === locationName);

  if (!location) return <div>존재하지 않는 장소입니다.</div>;

  const today = new Date();

  const filteredProducts = mockProducts
    .filter(p => p.location === locationName)
    .map(product => {
      const daysLeft = differenceInDays(new Date(product.expirationDate), today);
      return { ...product, daysLeft };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const productsWithin7Days = filteredProducts.filter(p => p.daysLeft <= 7);
  const productsWithin30Days = filteredProducts.filter(p => p.daysLeft > 7 && p.daysLeft <= 30);
  const productsAfter30Days = filteredProducts.filter(p => p.daysLeft > 30);

  const renderProduct = (product: any) => (
    <div
      key={product.name}
      style={{
        border: "2px solid #eee",
        borderRadius: "20px",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={product.imageUrl || "https://via.placeholder.com/60"} alt={product.name} style={{ width: 60, height: 60 }} />
        </div>
  
        <div>
          <div style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.2rem" }}>
            {product.name}
          </div>
          <div style={{ color: "#999", fontSize: "1rem", marginBottom: "0.6rem" }}>
            {product.takenAt} ~ {product.expirationDate}
          </div>
          <div style={{ fontWeight: "500" }}>수정하기 &gt;</div>
        </div>
      </div>
  
      <span
        style={{
          backgroundColor:
            product.daysLeft <= 7
              ? "#FF6B6B"
              : product.daysLeft <= 30
              ? "#FFB800"
              : "#00C4B3",
          color: "white",
          padding: "0.7rem 1.4rem",
          borderRadius: "2rem",
          fontWeight: "bold",
          fontSize: "1rem",
          whiteSpace: "nowrap",
        }}
      >
        {product.daysLeft}일 남음
      </span>
    </div>
  );

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader
          title={location.name}
          rightIcon={
            <>
              <BiCamera style={{ fontSize: '1.5em', marginRight: '1rem' }} />
              <BiDotsHorizontalRounded style={{ fontSize: '1.5em' }} />
            </>
          }
        />

        {/* 유통기한 7일 이내 */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: "2rem", marginBottom: "1rem" }}>유통기한 7일 이내 제품</h3>
        {productsWithin7Days.length > 0
          ? productsWithin7Days.map(renderProduct)
          : <EmptyBox> ⚠️ 해당 유통기한 임박 제품이 없습니다.</EmptyBox>}

        {/* 유통기한 30일 이내 */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: "2rem", marginBottom: "1rem" }}>유통기한 30일 이내 제품</h3>
        {productsWithin30Days.length > 0
          ? productsWithin30Days.map(renderProduct)
          : <EmptyBox> ⚠️ 해당 유통기한 임박 제품이 없습니다.</EmptyBox>}

        {/* 아직 한참 남은 제품 */}
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: "2rem", marginBottom: "1rem" }}>아직 한참 남은 제품</h3>
        {productsAfter30Days.length > 0
          ? productsAfter30Days.map(renderProduct)
          : <EmptyBox> ⚠️ 해당 유통기한 임박 제품이 없습니다.</EmptyBox>}
      </PageLayout>
    </PageBackground>
  );
};
