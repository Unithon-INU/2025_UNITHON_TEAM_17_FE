import type {FC} from "react";
import {useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BottomNavigation} from "../components/BottomNavigation";
import {MainHeader} from "../components/main/MainHeader";
import {mockOfferings} from "../mocks/mockData";
import {OfferingItem} from "../components/main/OfferingItem";
import styled from "styled-components";
import {OfferingTypeTab} from "../components/main/OfferingTypeTab";

const OfferingList = styled.ul`
  display: flex;
  flex-direction: column;
  
  gap: 25px;
`


export const MainPage: FC = () => {
    const all = "현재올라온할인"
    const [selectedType, setSelectedType] = useState<string>(all);
    // types에 중복제거 필요
    const types = [all, ...new Set(mockOfferings.map((item => item.type)))]

    return (
        <PageBackground>
            <MainHeader/>
            <PageLayout>
                <OfferingTypeTab types={types} onSelectType={(it) => setSelectedType(it)} selectedType={selectedType}/>
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