import type { FC } from "react";
import { useState, useEffect } from "react";
import { PageBackground, MainPageLayout, WhiteBox } from "../../styles/PageLayout";
import { BottomNavigation } from "../../components/BottomNavigation";
import { MainHeader } from "../../components/main/MainHeader";
import { OfferingItem } from "../../components/main/OfferingItem";
import styled from "styled-components";
import { OfferingTypeTab } from "../../components/main/OfferingTypeTab";
import axios from "axios";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const CenterText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem 0;
`;

interface Product {
  id: number;
  title: string;
  salePrice: number;
  sellerName: string;
  timeAgo: string;
  location: string;
  type: string;
  thumbnail: string;
}

export const MainPage: FC = () => {
  const all = "현재올라온할인";
  const [selectedType, setSelectedType] = useState<string>(all);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async (type?: string) => {
    try {
      setLoading(true);
      const url = type && type !== all ? `/api/products?type=${type === "가게" ? "CAFE" : "DIRECT"}` : "/api/products";
      const response = await axios.get(url, { withCredentials: true });
      setProducts(response.data);
    } catch (err) {
      console.error("상품 목록 불러오기 실패:", err);
      alert("상품 목록 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedType);
  }, [selectedType]);

  const types = [all, "가게", "직거래"];

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <PageBackground>
      <MainHeader
        searchKeyword={searchKeyword}
        onSearchChange={(e) => setSearchKeyword(e.target.value)}
      />
      <WhiteBox>
        <OfferingTypeTab
          types={types}
          selectedType={selectedType}
          onSelectType={(type) => setSelectedType(type)}
        />
      </WhiteBox>
      <MainPageLayout $isBottomNavigation>
        <OfferingList>
          {loading ? (
            <CenterText>상품을 불러오는 중입니다...</CenterText>
          ) : filteredProducts.length === 0 ? (
            <CenterText>조회된 상품이 없습니다.</CenterText>
          ) : (
            filteredProducts.map((item) => (
              <OfferingItem key={item.id} offering={item} />
            ))
          )}
        </OfferingList>
        <BottomNavigation />
      </MainPageLayout>
    </PageBackground>
  );
};
