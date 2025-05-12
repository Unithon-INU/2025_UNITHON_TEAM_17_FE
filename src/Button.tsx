import styled, {css} from "styled-components";
import {FC, ReactNode} from "react";
import {darken, lighten} from "polished";

export type ButtonProps = {
    onClick: () => void;
    background?: string;
    isFullWidth?: boolean;
    children: ReactNode;
}

const ButtonColorStyle = css<ButtonProps>`
  ${({background, theme}) => {
    const bgColor = background ? background : theme.color.Primary;

    return css`
      background: ${bgColor};
      &:hover {
        background: ${lighten(0.1, bgColor)};
      }

      &:active {
        background: ${darken(0.1, bgColor)};
      }
    `
  }}
`

const ButtonStyle = styled.button<ButtonProps>`
  ${ButtonColorStyle};
  width: ${p => p.isFullWidth && '100%'};

  color: white;
  font-size: 20px;
  padding: 16px;

  border-radius: 10px;
  outline: none;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`

export const Button: FC<ButtonProps> = ({onClick, children, ...rest}) => {
    return (
        <ButtonStyle onClick={onClick} {...rest}>{children}</ButtonStyle>
    )
}