import type {FC} from "react";
import { PageBackground, PageLayout} from "../../styles/PageLayout";
import {BottomNavigation} from "../../components/BottomNavigation";
import {AddLocationButton} from "./AddLocationButton"
import {LocationItem} from "./LocationItem"
import { mockLocations, mockProducts } from "../../mocks/mockData";
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

        {mockLocations.map((location) => {
        const count = mockProducts.filter(p => p.location === location.name).length;
        // productCount : mock프로덕트의 장소와 baseLocation이 같을 때 +1 함

          return (
            <LocationItem
              key={location.name}
              name={location.name}
              description={location.description}
              productCount={count}  
              imageUrl={location.imageUrl}
            />
          );
        })}
        <AddLocationButton />

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