import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1.2rem 1rem;
  border-radius: 20px;
  border: 2px solid #eee;
  font-size: 1.5rem;
  font-weight: bold;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
`;

const PlusIcon = styled(FiPlusCircle)`
  color: #6fc667;
  font-size: 2rem;
`;

export const AddLocationButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/home/warehouse/add-location")}>
      <PlusIcon />
      장소 추가하기
    </Button>
  );
};