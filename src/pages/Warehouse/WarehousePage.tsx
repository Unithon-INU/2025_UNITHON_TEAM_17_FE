import type {FC} from "react";
import {useEffect, useState} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {BottomNavigation} from "../../components/BottomNavigation";
import {AddLocationButton} from "./AddLocationButton"
import {LocationItem} from "./LocationItem"
import {ExpiringProduct} from "./ExpiringProduct";
import styled from "styled-components";
import {useWarehouse} from "../../hooks/useWarehouse";
import {Location} from "../../type/Warehouse";

export const WarehousePage: FC = () => {
    const {getLocations} = useWarehouse();
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        getLocations().then(setLocations)
    }, [])

    return (
        <PageBackground>
            <PageLayout $isBottomNavigation>
                <PaddedLayout>
                    <HeaderWrapper>
                        <Title>내 창고</Title>
                    </HeaderWrapper>

                    <ExpiringProduct/>

                    {locations.map((location) => {
                        console.log(location)
                        const count = locations.length;

                        return (
                            <LocationItem
                                id={location.id}
                                key={location.name}
                                name={location.name}
                                description={location.description}
                                productCount={count}
                                imageUrl={"https://keepbara.duckdns.org" + location.imagePath}
                            />
                        );
                    })}
                    <AddLocationButton/>
                    <BottomNavigation/>
                </PaddedLayout>
            </PageLayout>
        </PageBackground>
    );
};


const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
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