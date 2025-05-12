import {FC, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

interface NavHeaderProps {
    title: string;
    rightIcon?: ReactNode;
    onRightIconClick?: () => void;
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
  cursor: pointer;
`;

export const NavHeader: FC<NavHeaderProps> = ({title, rightIcon, onRightIconClick}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <HeaderWrapper>
            <BackButton onClick={handleBack}>
                ←
                {/*todo: 아이콘 추가*/}
            </BackButton>

            <Title>{title}</Title>

            <RightArea
                onClick={() => onRightIconClick && onRightIconClick()}
            >
                {rightIcon}
            </RightArea>
        </HeaderWrapper>
    );
};
