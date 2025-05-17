import { useParams } from "react-router-dom";
import { mockLocations, mockProducts } from "../../mocks/mockData";
import { differenceInDays, format } from "date-fns";

export const LocationDetailPage = () => {
  const { locationName } = useParams();
  const location = mockLocations.find(loc => loc.name === locationName);

  if (!location) return <div>존재하지 않는 장소입니다.</div>;

  const today = new Date();

  // 남은 일수 계산된 데이터 정렬
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
    <div key={product.name} style={{
      border: "1px solid #eee",
      borderRadius: "12px",
      padding: "1rem",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img src={product.imageUrl || "https://via.placeholder.com/60"} alt={product.name} style={{ width: 60, height: 60 }} />
        <div>
          <strong>{product.name}</strong>
          <p style={{ color: "#777", fontSize: "0.9rem" }}>{product.takenAt} ~ {product.expirationDate}</p>
          <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>수정하기 &gt;</p>
        </div>
      </div>
      <span style={{
        backgroundColor:
          product.daysLeft <= 7 ? "#FF6B6B" :
            product.daysLeft <= 30 ? "#FFB800" :
              "#00C4B3",
        color: "white",
        padding: "0.5rem 1rem",
        borderRadius: "2rem",
        fontWeight: "bold"
      }}>
        {product.daysLeft}일 남음
      </span>
    </div>
  );

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{location.name}</h2>
      <p style={{ color: "#777" }}>{location.description}</p>

      {productsWithin7Days.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>유통기한 7일 이내 제품</h3>
          {productsWithin7Days.map(renderProduct)}
        </>
      )}

      {productsWithin30Days.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>유통기한 30일 이내 제품</h3>
          {productsWithin30Days.map(renderProduct)}
        </>
      )}

      {productsAfter30Days.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>아직 한참 남은 제품</h3>
          {productsAfter30Days.map(renderProduct)}
        </>
      )}
    </div>
  );
};
