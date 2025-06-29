import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../RoutePath";

const Container = styled.div`
  background-color: #6FC667;
  border-radius: 20px;
  padding: 1.8rem 2rem;
  margin: 1.5rem 0;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.p`
  font-size: 1rem;
  margin: 0.8rem 0;
`;

const Dday = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;

export const ExpiringProduct = () => {
    const navigate = useNavigate()
  return (
    <Container onClick={() => navigate(RoutePath.dday)}>
      <Label>⭐️ 유통기한 14일 이내인 제품들 ⭐️</Label>
      <Dday>D - 14</Dday>
    </Container>
  );
};

