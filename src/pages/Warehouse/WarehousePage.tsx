import type {FC} from "react";
import { PageBackground, PageLayout} from "../../styles/PageLayout";
import {BottomNavigation} from "../../components/BottomNavigation";
import {AddLocationButton} from "./AddLocationButton"
import {LocationItem} from "./LocationItem"
import { mockLocations, mockProducts } from "../../mocks/mockData";
import { ExpiringProduct } from "./ExpiringProduct";
import styled from "styled-components";

export const WarehousePage: FC = () => {
  return (
    <PageBackground>
      <PageLayout isBottomNavigation>
        <PaddedLayout>
          <HeaderWrapper>
            <Title>내 창고</Title>
          </HeaderWrapper>

          <ExpiringProduct/>

          {mockLocations.map((location) => {
          const count = mockProducts.filter(p => p.locationId === location.id).length;

            return (
              <LocationItem
                id={location.id}
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
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};


const PaddedLayout = styled(PageLayout)`
  padding: 2rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 10px;
`;