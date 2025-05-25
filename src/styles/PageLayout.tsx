import styled, { css } from 'styled-components';

interface PageLayoutProps {
  isBottomNavigation?: boolean;
}

export const PageBackground = styled.div<PageLayoutProps>`
  width: 100%;
  height: 100%;
  background-color: #f3f4f4;
`;

export const LightGrayLayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f7f8;
  display: flex;
  justify-content: center;
  padding: 2rem 0;

  & > div {
    width: 100%;
    height: 100%;
    min-height: 200vh;
    max-width: 800px;
    padding: 0 2rem;
  }
`;

export const MainPageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  min-height: 200vh;
  max-width: 800px;
  margin: 0rem auto 0;
  background-color: #ffffff;
  padding: 0rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', sans-serif;

  ${(props) =>
    props.isBottomNavigation &&
    css`
      padding-bottom: 9rem; /* 바텀 네비게이션 고려 */
    `}
`;

export const PageLayout = styled.div<PageLayoutProps>`
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0rem auto 0;
  background-color: #ffffff;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;

  ${(props) =>
    props.isBottomNavigation &&
    css`
      padding-bottom: 9rem; /* 바텀 네비게이션 고려 */
    `}
`;