import type { FC } from "react";
import styled from "styled-components";

interface LocationItemProps {
  name: string;
  description?: string;
  productCount?: number;
  imageUrl?: string;
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid #eee;
`;

const ImageBox = styled.div<{ imageUrl?: string }>`
  width: 6rem;
  height: 6rem;
  border-radius: 16px;
  background-color: #ccc;
  background-image: ${({ imageUrl }) => imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
`;

const Description = styled.div`
  margin-top: 0.3rem;
  color: #999;
  font-size: 0.95rem;
`;

const ProductCount = styled.div`
  margin-top: 0.8rem;
  font-weight: 500;
`;

export const LocationItem: FC<LocationItemProps> = ({
  name,
  description = `우리집 ${name}`,
  productCount = 0,
  imageUrl,
}) => {
  return (
    <Container>
      <ImageBox imageUrl={imageUrl} />
      <Info>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <ProductCount>등록된 제품 &gt; {productCount}개</ProductCount>
      </Info>
    </Container>
  );
};
