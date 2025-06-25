import styled from "styled-components";
import type {FC} from "react";

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
const TabItem = styled.li<{ $isSelected: boolean }>`
    color : ${({$isSelected}) => $isSelected ? "#1970FD" : "#999999"};
    padding: 25px 8px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    margin-left: 28px;
    cursor: pointer;
`
export const OfferingTypeTab: FC<OfferingTypeTabProps> = ({types, selectedType, onSelectType}) => {
    return (
        <OfferingTypeTabStyle>
            {types.map((type) => (
                <TabItem
                    key={type}
                    $isSelected={selectedType === type}
                    onClick={() => onSelectType(type)}>
                    {type}
                </TabItem>
            ))}
        </OfferingTypeTabStyle>
    );
};