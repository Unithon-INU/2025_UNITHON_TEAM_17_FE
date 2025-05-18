import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiChevronLeft } from "react-icons/bi";

interface NavHeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
  background-color: white;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

const Spacer = styled.div`
  width: 24px;
`;

export const NavHeader: FC<NavHeaderProps> = ({
  title,
  leftIcon = <BiChevronLeft />,
  rightIcon,
  onLeftClick,
  onRightClick,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onLeftClick) {
      onLeftClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderWrapper>
      <Button onClick={handleBack}>
        {leftIcon}
      </Button>

      <Title>{title}</Title>

      <Button onClick={onRightClick}>
        {rightIcon ?? <Spacer />}
      </Button>
    </HeaderWrapper>
  );
};
