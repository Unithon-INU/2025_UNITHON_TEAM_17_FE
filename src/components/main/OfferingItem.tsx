import styled from "styled-components";
import {Offering} from "../../mocks/mockData";
import {FC} from "react";
import {commaizeNumber} from "@toss/utils";

export type OfferingItemProps = {
    offering: Offering
}
const OfferingItemStyle = styled.li`
  font-size: 18px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);

  .thumbnail {
    width: 100%;
    height: 100px;

    border-radius: 16px 16px 0 0;

    background-position: center;
    background-size: cover;
  }
`
const InfoWrap = styled.div`
  padding: 16px 15px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`
const Name = styled.h4`
  font-size: 1em;
  font-weight: 800;
`
const Date = styled.div`
  color: #9D9D9D;
  font-size: 0.85em;
  font-weight: 500;
`
const CostPrice = styled.div`
  color: #999999;
  font-size: 0.85em;
  font-weight: 600;
  text-decoration: line-through;
`
const SellerName = styled.div`
  font-size: 0.85em;
  font-weight: 600;
`
const SalePrice = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`
export const OfferingItem: FC<OfferingItemProps> = ({offering}) => {
    return (
        <OfferingItemStyle>
            <div className={"thumbnail"} style={{backgroundImage: `url(${offering.imageUrl})`}}></div>
            <InfoWrap>
                <InfoRow>
                    <Name>{offering.name}</Name>
                </InfoRow>
                <InfoRow>
                    <Date>{offering.type} / {offering.createdAt}</Date>
                    <CostPrice>₩ {commaizeNumber(offering.costPrice)}</CostPrice>
                </InfoRow>
                <InfoRow>
                    <SellerName>{offering.sellerName}</SellerName>
                    <SalePrice>₩ {commaizeNumber(offering.salePrice)}</SalePrice>
                </InfoRow>
            </InfoWrap>
        </OfferingItemStyle>
    );
};