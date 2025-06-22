import styled from "styled-components";
import type { FC } from "react";
import { commaizeNumber } from "@toss/utils";
import { Link } from "react-router-dom";

export type OfferingItemProps = {
  offering: {
    id: number;
    title: string;
    salePrice: number;
    originalPrice?: number;
    sellerName: string;
    timeAgo: string;
    location: string;
    type: string;  // "CAFE" | "DIRECT"
    thumbnail: string;
  };
};

const OfferingItemStyle = styled.li`
  font-size: 18px;
  border-radius: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: hidden;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 16px 16px 0 0;
  background-position: center;
  background-size: cover;
`;

const InfoWrap = styled.div`
  padding: 16px 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h4`
  font-size: 1em;
  font-weight: 800;
`;

const Date = styled.div`
  color: #9d9d9d;
  font-size: 0.85em;
  font-weight: 500;
`;

const CostPrice = styled.div`
  color: #999999;
  font-size: 0.85em;
  font-weight: 600;
  text-decoration: line-through;
`;

const SellerName = styled.div`
  font-size: 0.85em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SalePrice = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

export const OfferingItem: FC<OfferingItemProps> = ({ offering }) => {
  return (
    <Link to={`/home/main/${offering.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <OfferingItemStyle>
        <Thumbnail style={{ backgroundImage: `url(${offering.thumbnail})` }} />
        <InfoWrap>
          <InfoRow>
            <Name>{offering.title}</Name>
          </InfoRow>
          <InfoRow>
            <Date>
              {offering.type === "CAFE" ? "가게" : "직거래"} / {offering.timeAgo}
            </Date>
            {offering.originalPrice && (
              <CostPrice>₩ {commaizeNumber(offering.originalPrice)}</CostPrice>
            )}
          </InfoRow>
          <InfoRow>
            <SellerName>{offering.sellerName}</SellerName>
            <SalePrice>₩ {commaizeNumber(offering.salePrice)}</SalePrice>
          </InfoRow>
        </InfoWrap>
      </OfferingItemStyle>
    </Link>
  );
};
