import type {FC, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {BiChevronLeft} from "react-icons/bi";

interface NavHeaderProps {
    title: string;
    rightIcon?: ReactNode;
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavHeader: FC<NavHeaderProps> = ({title, rightIcon}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <HeaderWrapper>
            <BackButton onClick={handleBack}>
                <BiChevronLeft />
                {/*todo: 아이콘 변경*/}
            </BackButton>

            <Title>{title}</Title>

            <RightArea>
                {rightIcon}
            </RightArea>
        </HeaderWrapper>
    );
};
