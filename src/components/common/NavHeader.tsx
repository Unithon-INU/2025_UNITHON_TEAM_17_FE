import {useNavigate} from "react-router-dom";
import {BsChevronLeft} from "react-icons/bs";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 20px 8px;
  background-color: #ffffff;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.12);
`;

const BackButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  display: flex;
  align-items: center;
`;

export const NavHeader = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <BsChevronLeft/>
            </BackButton>
        </Container>
    );
};