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
    type: string; // "CAFE" | "DIRECT"
    thumbnail: string;
  };
};

const OfferingItemStyle = styled.li`
  font-size: 18px;
  border-radius: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  background-color: white;
  overflow: hidden;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 30px 30px 0 0;
  background-position: center;
  background-size: cover;
`;

const InfoWrap = styled.div`
  padding: 16px 25px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const SellerName = styled.div`
  font-size: 0.85em;
  font-weight: 600;
`;

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CostPrice = styled.div`
  color: #999999;
  font-size: 0.85em;
  font-weight: 600;
  text-decoration: line-through;
`;

const SalePrice = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

export const OfferingItem: FC<OfferingItemProps> = ({ offering }) => {
  const fullThumbnailUrl =
    offering.thumbnail && offering.thumbnail.startsWith("http")
      ? offering.thumbnail
      : offering.thumbnail
      ? `https://keepbara.duckdns.org${offering.thumbnail}`
      : "/default-image.png";

  return (
    <Link to={`/home/main/${offering.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <OfferingItemStyle>
        <Thumbnail style={{ backgroundImage: `url(${fullThumbnailUrl})` }} />
        <InfoWrap>
          <InfoRow>
            <Name>{offering.title}</Name>
          </InfoRow>
          <InfoRow>
            <Date>
              {offering.type === "CAFE" ? "카페" : "직거래"} / {offering.timeAgo}
            </Date>
          </InfoRow>
          <InfoRow>
            <SellerName>{offering.sellerName+'님'}</SellerName>
            <PriceWrap>
              {offering.originalPrice && (
                <CostPrice>₩ {commaizeNumber(offering.originalPrice)}</CostPrice>
              )}
              <SalePrice>₩ {commaizeNumber(offering.salePrice)}</SalePrice>
            </PriceWrap>
          </InfoRow>
        </InfoWrap>
      </OfferingItemStyle>
    </Link>
  );
};
