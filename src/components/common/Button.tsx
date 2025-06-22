import styled, { css, type CSSProperties } from "styled-components";
import type { FC, ReactNode } from "react";
import { darken, lighten } from "polished";

export type ButtonProps = {
  onClick?: () => void;
  color?: string;
  background?: string;
  isFullWidth?: boolean;
  isDisable?: boolean;
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  style?: CSSProperties;
};

const ButtonColorStyle = css<{
  $color?: string;
  $background?: string;
  $isDisable?: boolean;
}>`
  ${({ $background, $color, $isDisable, theme }) => {
    let textColor = $color ? $color : theme.color.White;
    let bgColor = $background ? $background : theme.color.Primary;

    if ($isDisable) {
      bgColor = theme.color.Gray3;
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
    `;
  }}
`;

const ButtonStyle = styled.button<{
  $color?: string;
  $background?: string;
  $isDisable?: boolean;
  $isFullWidth?: boolean;
}>`
  ${ButtonColorStyle};
  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "auto")};

  font-size: 20px;
  padding: 16px;

  border-radius: 10px;
  outline: none;
  border: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  pointer-events: ${({ $isDisable }) => ($isDisable ? "none" : "auto")};
`;

export const Button: FC<ButtonProps> = ({
  onClick,
  isDisable,
  isFullWidth,
  color,
  type,
  background,
  children,
  ...rest
}) => {
  return (
    <ButtonStyle
      type={type}
      onClick={() => {
        if (!isDisable && onClick) onClick();
      }}
      $isDisable={!!isDisable}
      $isFullWidth={!!isFullWidth}
      $color={color}
      $background={background}
      {...rest}
    >
      {children}
    </ButtonStyle>
  );
};
