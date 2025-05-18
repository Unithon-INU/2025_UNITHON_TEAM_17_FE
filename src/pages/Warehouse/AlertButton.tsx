import { IoNotificationsOutline } from "react-icons/io5";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  color: black;
  cursor: pointer;
`;

export const AlertButton = () => {
  return (
    <Button>
      <IoNotificationsOutline />
    </Button>
  );
};

