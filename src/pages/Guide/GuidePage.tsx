import type { FC } from "react";
import styled from "styled-components";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { BottomNavigation } from "../../components/BottomNavigation";
import { GuideItem } from "./GuideItem";

export const GuidePage: FC = () => {
  return (
    <PageBackground>
      <PageLayout $isBottomNavigation>
        <PaddedLayout>
          <Header>사용 가이드</Header>

          <GuideItem
            topic="keepbara"
            title="키피바라(keepbara)"
            description="키피바라는 무슨 앱인가요?"
          />
          <GuideItem
            topic="register"
            title="유통기한 등록"
            description="유통기한 등록은 어디서 할 수 있나요?"
          />
          <GuideItem
            topic="trade"
            title="상품 거래"
            description="어떻게 상품 거래를 하나요?"
          />
        </PaddedLayout>
        <BottomNavigation />
      </PageLayout>
    </PageBackground>
  );
};

const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

