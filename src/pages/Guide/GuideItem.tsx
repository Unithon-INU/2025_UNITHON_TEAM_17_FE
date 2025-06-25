import type { FC } from "react";
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdLocalOffer, MdInventory, MdGroups } from "react-icons/md"; // 아이콘 추가

interface GuideItemProps {
  topic: string;
  title: string;
  description: string;
}

export const GuideItem: FC<GuideItemProps> = ({ topic, title, description }) => {
  const navigate = useNavigate();

  // 아이콘 매핑
  const renderIcon = () => {
    switch (topic) {
      case "keepbara":
        return <MdLocalOffer size={30} />;
      case "register":
        return <MdInventory size={30} />;
      case "trade":
        return <MdGroups size={35} />;
      default:
        return <MdLocalOffer size={30} />;
    }
  };

  return (
    <Wrapper onClick={() => navigate(`/home/guide/${topic}`)}>
      <IconCircle>{renderIcon()}</IconCircle>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>
      <FiChevronRight size={20} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  gap: 1rem;
  border-bottom: 2px solid #EEEFEF; 
  margin-bottom: 0.7rem;
`;
const IconCircle = styled.div`
  background-color: #6FC667;
  color: white;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
`;

const Description = styled.div`
  font-size: 0.9rem;
  color: #888;
`;