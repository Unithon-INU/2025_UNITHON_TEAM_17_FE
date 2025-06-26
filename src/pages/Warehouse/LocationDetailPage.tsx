import {Link, useNavigate, useParams} from "react-router-dom";
import {differenceInDays} from "date-fns";
import {NavHeader} from "../../components/NavHeader";
import {BiCamera, BiDotsHorizontalRounded} from "react-icons/bi";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import styled from "styled-components";
import {useWarehouse} from "../../hooks/useWarehouse";
import {RoutePath} from "../../RoutePath";
import {Location} from "../../type/Warehouse";
import {useEffect, useState} from "react";
import {Item} from "../../type/item";

const PaddedLayout = styled(PageLayout)`
  padding: 2rem;
`;

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
  const  navigate = useNavigate();
  const { locationName : locationId } = useParams();
  const {getLocations, getItems} = useWarehouse();
  const [location, setLocation] = useState<Location>(null);
  const [items, setItems] = useState<Item[]>([]);

  const onLoadLocation = async () => {
      try {
          const locations = await getLocations();
          const foundLocation = locations.find(loc => loc.id == locationId);
          if(!foundLocation) {
              throw new Error("존재하지 않는 장소입니다.");
          }

          const allItems = await getItems();
          const foundItems = allItems.filter(item => item.locationId === foundLocation.id);

          setItems(foundItems)
          setLocation(foundLocation)
      }
      catch (e) {
          navigate(RoutePath.warehouse)
      }
  }

  useEffect(() => {
      onLoadLocation()
  }, [])



  if (!location) {
      return <div>존재하지 않는 장소입니다.</div>;
  }

  const today = new Date();

  const filteredProducts = items
    .map(product => {
      const daysLeft = differenceInDays(new Date(product.expireDate), today);
      return { ...product, daysLeft };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const productsWithin7Days = filteredProducts.filter(p => p.daysLeft <= 7);
  const productsWithin30Days = filteredProducts.filter(p => p.daysLeft > 7 && p.daysLeft <= 30);
  const productsAfter30Days = filteredProducts.filter(p => p.daysLeft > 30);
  const ProductSection = ({
    title,
    products,
  }: {
    title: string;
    products: any[];
  }) => (
    <>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: "2rem", marginBottom: "1rem" }}>{title}</h3>
      {products.length > 0
        ? products.map(renderProduct)
        : <EmptyBox> ⚠️ 해당 유통기한 임박 제품이 없습니다.</EmptyBox>}
    </>
  );

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
          padding: "0.8rem 1.4rem",
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
        <PaddedLayout>
        <NavHeader
          title={location.name}
          rightIcon={
            <>
                <Link to={RoutePath.itemCreate} state={{location}}>
                    <BiCamera style={{ fontSize: '1.5em', marginRight: '1rem' }} />
                </Link>
              <BiDotsHorizontalRounded style={{ fontSize: '1.5em' }} />
            </>
          }
        />
        <ProductSection
          title="유통기한 7일 이내 제품"
          products={productsWithin7Days}
        />
        <ProductSection
          title="유통기한 30일 이내 제품"
          products={productsWithin30Days}
        />
        <ProductSection
          title="아직 한참 남은 제품"
          products={productsAfter30Days}
        />
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};
