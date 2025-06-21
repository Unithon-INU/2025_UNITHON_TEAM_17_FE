import styled from "styled-components";

type SpaceProps = {
    h?: number,
    v?: number,
    isInlineBlock?: boolean
}
export const Space = styled.div<SpaceProps>`
  width: ${p => p.h}px;
  height: ${p => p.v}px;
  display: ${p => p.isInlineBlock && "inline-block"};
`