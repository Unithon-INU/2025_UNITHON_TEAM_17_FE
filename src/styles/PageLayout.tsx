import styled, { css } from 'styled-components';

interface PageLayoutProps {
  isBottomNavigation?: boolean;
}

export const PageBackground = styled.div<PageLayoutProps>`
  width: 100%;
  background-color: #f3f4f4;
`;

export const PageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  max-width: 800px;
  min-height: calc(var(--vh) * 100);
  margin: -1rem auto 0;
  background-color: #ffffff;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;

  ${(props) =>
      props.isBottomNavigation &&
      css`
      padding-bottom: 5rem; /* 바텀 네비게이션 고려 */
    `}
`;
