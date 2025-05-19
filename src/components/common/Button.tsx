import styled, {css} from "styled-components";
import type {FC, ReactNode} from "react";
import {darken, lighten} from "polished";

export type ButtonProps = {
    onClick: () => void;
    color?: string;
    background?: string;
    isFullWidth?: boolean;
    isDisable?: boolean;
    children: ReactNode;
}

const ButtonColorStyle = css<ButtonProps>`
  ${({background, color, isDisable, theme}) => {
    let textColor = color ? color : theme.color.White;
    let bgColor = background ? background : theme.color.Primary;

    if (isDisable) {
        bgColor = theme.color.Gray3
    }

    return css`
      color: ${textColor};
      background: ${bgColor};
      &:hover {
        background: ${lighten(0.05, bgColor)};
      }

      &:active {
        background: ${darken(0.05, bgColor)};
      }
    `
}}
`

const ButtonStyle = styled.button<ButtonProps>`
  ${ButtonColorStyle};
  width: ${p => p.isFullWidth && '100%'};

  font-size: 20px;
  padding: 16px;

  border-radius: 10px;
  outline: none;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  
  pointer-events: ${p => p.isDisable && 'none'};
`

export const Button: FC<ButtonProps> = ({onClick, isDisable, children, ...rest}) => {
    return (
        <ButtonStyle onClick={() => {
            if (!isDisable) onClick()
        }} isDisable={!!isDisable} {...rest}>{children}</ButtonStyle>
    )
}