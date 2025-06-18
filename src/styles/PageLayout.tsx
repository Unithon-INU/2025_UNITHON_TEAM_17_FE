import styled, { css } from 'styled-components';

interface PageLayoutProps {
  isBottomNavigation?: boolean;
}

export const PageBackground = styled.div<PageLayoutProps>`
  width: 100%;
  min-height: 100vh;
  background-color: #f3f4f4;
`;

export const WhiteBox = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
`;

export const MainPageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f6f7f8;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', sans-serif;

  ${(props) =>
    props.isBottomNavigation &&
    css`
      padding-bottom: 10rem;
    `}
`;

export const PageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  min-height: 100vh;
  max-width: 800px;
  margin: 0rem auto 0;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(4, 3, 3, 0.05);
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;

  ${(props) =>
    props.isBottomNavigation &&
    css`
      padding-bottom: 4rem; /* 바텀 네비게이션 고려 */
    `}
`;