import styled from "styled-components";
import {FC} from "react";
import {FiEdit, FiTrash2} from "react-icons/fi";

export type PopupMenuProps = {
    isOpen: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

const PopupMenuStyle = styled.ul`
  min-width: 200px;
  border-radius: 11px;

  display: inline-flex;
  flex-direction: column;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.31);
  position: absolute;
  right: 50px;
  top: 90px;
  z-index: 100;

  & > *:first-child {
    border-radius: 11px 11px 0 0;
  }

  & > *:last-child {
    border-radius: 0 0 11px 11px;
  }
`
const MenuItem = styled.li<{ color?: string }>`
  color: ${props => props.color || "#333"};
  padding: 14px;
  background-color: #f5f5f5;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`
export const PopupMenu: FC<PopupMenuProps> = ({isOpen, onEdit, onDelete}) => {
    return (
        isOpen && (
            <PopupMenuStyle>
                <MenuItem onClick={() => onEdit()}>
                    <span>장소 수정</span>
                    <FiEdit/>
                </MenuItem>
                <MenuItem color={"#FF5D5D"} onClick={() => onDelete()}>
                    <span>장소 삭제</span>
                    <FiTrash2/>
                </MenuItem>
            </PopupMenuStyle>
        )
    );
};