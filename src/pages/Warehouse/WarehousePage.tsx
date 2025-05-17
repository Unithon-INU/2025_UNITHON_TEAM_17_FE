import type {FC} from "react";
import { PageBackground, PageLayout} from "../../styles/PageLayout";
import {BottomNavigation} from "../../components/BottomNavigation";
import {AddLocation} from "./AddLocation"
import {LocationItem} from "./LocationItem"
import { mockLocations } from "../../mocks/mockData";
import { ExpiringProduct } from "./ExpiringProduct";
import { AlertButton } from "./AlertButton";
import styled from "styled-components";

export const WarehousePage: FC = () => {
  return (
    <PageBackground>
      <PageLayout isBottomNavigation>
        <HeaderWrapper>
          <Title>내 창고</Title>
          <AlertButton />
        </HeaderWrapper>

        <ExpiringProduct/>

        {mockLocations
        .map((location) => (
        <LocationItem
          key={location.name}
          name={location.name}
          description={location.description}
          productCount={location.productCount}
          imageUrl={location.imageUrl}
        />
        ))}

        <AddLocation />

        <BottomNavigation />
      </PageLayout>
    </PageBackground>
  );
};


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;