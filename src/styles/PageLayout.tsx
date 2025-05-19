import styled, { css } from 'styled-components';

interface PageLayoutProps {
  isBottomNavigation?: boolean;
}

export const PageBackground = styled.div<PageLayoutProps>`
  width: 100%;
  height: 100%;
  background-color: #f3f4f4;
`;

export const PageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  max-width: 800px;
  margin: -1rem auto 0;
  background-color: #ffffff;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', sans-serif;

  ${(props) =>
      props.isBottomNavigation &&
      css`
      padding-bottom: 5rem; /* 바텀 네비게이션 고려 */
    `}
`;
