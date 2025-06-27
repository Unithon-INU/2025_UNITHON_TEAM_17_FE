import styled, { css } from "styled-components";
import { FC } from "react";
import { InputProps } from "./common/Input";

export type InputRowProps = {
  label: string;
  value: string;
  onChange: (c: string) => void;
  type: InputProps["type"];
  readOnly?: boolean;
};

const InputRowStyle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const Input = styled.input<{ readOnly?: boolean }>`
  flex: 1;
  font-size: 18px;
  padding: 15px 11px;
  border: 1.5px solid #dedede;
  border-radius: 8px;

  ${(props) =>
    props.readOnly &&
    css`
      background-color: #f0f0f0;
      border: none;
      color: #707070;
      cursor: not-allowed;
    `}

  &:focus {
    outline: none;
  }
`;

export const InputRow: FC<InputRowProps> = ({
  label,
  value,
  onChange,
  readOnly,
  ...rest
}) => {
  return (
    <InputRowStyle>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        {...rest}
      />
    </InputRowStyle>
  );
};
