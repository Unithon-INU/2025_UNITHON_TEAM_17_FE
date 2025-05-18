import type {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {MainHeader} from "../components/main/MainHeader";
import {mockOfferings} from "../mocks/mockData";
import {OfferingItem} from "../components/main/OfferingItem";
import styled from "styled-components";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  
  gap: 25px;
`

export const MainPage: FC = () => {
    return (
        <PageBackground>
            <MainHeader/>
            <PageLayout>
                <OfferingList>
                    {mockOfferings.map((item) => (
                        <OfferingItem key={item.id} offering={item}/>
                    ))}
                </OfferingList>

                <BottomNavigation/>
            </PageLayout>
        </PageBackground>
    );
};