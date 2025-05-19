import styled from "styled-components";
import {FC} from "react";

export type OfferingTypeTabProps = {
    types: string[];
    selectedType: string;
    onSelectType: (type: string) => void;
}
const OfferingTypeTabStyle = styled.nav`
    display: flex;
    flex-direction: row;
    gap: 20px;
    overflow-x: auto;
`
const TabItem = styled.li<{ isSelected: boolean }>`
    color : ${({isSelected}) => isSelected ? "#1970FD" : "#999999"};
    padding: 16px 10px;
    font-size: 14px;
    font-weight: 500;
    
    cursor: pointer;
`
export const OfferingTypeTab: FC<OfferingTypeTabProps> = ({types, selectedType, onSelectType}) => {
    return (
        <OfferingTypeTabStyle>
            {types.map((type) => (
                <TabItem
                    key={type}
                    isSelected={selectedType === type}
                    onClick={() => onSelectType(type)}>
                    {type}
                </TabItem>
            ))}
        </OfferingTypeTabStyle>
    );
};