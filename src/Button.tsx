import styled from "styled-components";

export type ButtonProps = {
    onClick: () => void;
    background?: string;
    children: React.ReactNode;
}

const ButtonStyle = styled.button<ButtonProps>`
  color: white;
  background: ${p => p.background ? p.background : 'red'};
  font-size: 20px;
  padding: 16px;

  border-radius: 10px;
  outline: none;
  border: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
`

export const Button: React.FC<ButtonProps> =({onClick, children, ...rest}) => {
    return (
        <ButtonStyle onClick={onClick} {...rest}>{children}</ButtonStyle>
    )
}