import styled from "styled-components";
import {FC} from "react";
import {FiEdit} from "react-icons/fi";

export type NotificationMenuProps = {
    isOpen: boolean;
    onEditDate: () => void;
};
/* 기존 PopupMenu 와 동일한 레이아웃 */
const MenuWrapper = styled.ul`
  min-width: 200px;
  border-radius: 11px;

  display: inline-flex;
  flex-direction: column;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.31);
  position: absolute;
  right: 50px;
  top: 90px;
  z-index: 100;
`;
const MenuItem = styled.li`
  color: #333;
  padding: 14px;
  background-color: #f5f5f5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 11px; /* 하나뿐이므로 상·하 모두 라운딩 */
  cursor: pointer;
`;
export const NotificationMenu: FC<NotificationMenuProps> = ({isOpen, onEditDate}) => {
    if (!isOpen) return null;

    return (
        <MenuWrapper>
            <MenuItem onClick={onEditDate}>
                <span>알림 날짜 수정</span>
                <FiEdit/>
            </MenuItem>
        </MenuWrapper>
    );
};