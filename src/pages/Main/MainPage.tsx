import type { FC } from "react";
import { useState } from "react";
import { PageBackground, MainPageLayout, LightGrayLayer } from "../../styles/PageLayout";
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

  const types = [all, ...new Set(mockOfferings.map((item) => item.type))];
  
  const filteredOfferings = selectedType === all
    ? mockOfferings
    : mockOfferings.filter((item) => item.type === selectedType);

  return (
    <PageBackground>
      <MainHeader />
      <MainPageLayout>
        <OfferingTypeTab
          types={types}
          selectedType={selectedType}
          onSelectType={(type) => setSelectedType(type)}
        />

        <LightGrayLayer>
          <div>
            <OfferingList>
              {filteredOfferings.map((item) => (
                <OfferingItem key={item.id} offering={item} />
              ))}
            </OfferingList>
          </div>
        </LightGrayLayer>

        <BottomNavigation />
      </MainPageLayout>
    </PageBackground>
  );
};
