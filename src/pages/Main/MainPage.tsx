import type { FC } from "react";
import { useState } from "react";
import { PageBackground, MainPageLayout, WhiteBox } from "../../styles/PageLayout";
import { BottomNavigation } from "../../components/BottomNavigation";
import { MainHeader } from "../../components/main/MainHeader";
import { mockOfferings } from "../../mocks/mockData";
import { OfferingItem } from "../../components/main/OfferingItem";
import styled from "styled-components";
import { OfferingTypeTab } from "../../components/main/OfferingTypeTab";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const MainPage: FC = () => {
  const all = "현재올라온할인";
  const [selectedType, setSelectedType] = useState<string>(all);
  const [searchKeyword, setSearchKeyword] = useState("");

  const types = [all, ...new Set(mockOfferings.map((item) => item.type))];

  const filteredOfferings = mockOfferings
    .filter((item) =>
      selectedType === all ? true : item.type === selectedType
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
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
      <MainPageLayout>
        <OfferingList>
          {filteredOfferings.map((item) => (
            <OfferingItem key={item.id} offering={item} />
            ))}
        </OfferingList>

        <BottomNavigation />
      </MainPageLayout>
    </PageBackground>
  );
};
