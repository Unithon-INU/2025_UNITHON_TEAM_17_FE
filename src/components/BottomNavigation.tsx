import styled from "styled-components";
import {FC} from "react";

export type BottomNavigationProps = {}

const BottomNavigationStyle = styled.div`
  width: 100%;
  padding: 12px;
`

export const BottomNavigation: FC<BottomNavigationProps> = () => {
    return (
        <BottomNavigationStyle>

        </BottomNavigationStyle>
    );
};