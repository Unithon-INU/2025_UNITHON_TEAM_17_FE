import type { FC } from "react";
import { PageBackground, PageLayout } from "../styles/PageLayout";
import styled from "styled-components";
import { BottomNavigation } from "../components/BottomNavigation";

export const MyPage: FC = () => {
  return (
    <PageBackground>
      <PageLayout $isBottomNavigation>
        <PaddedLayout>
        <Header>
          <UserName>김키피님</UserName>
          <LogoutButton>로그아웃</LogoutButton>
        </Header>

        <ScoreBox>
          <Label>내 환경점수</Label>
          <Score>100점</Score>
          <ScoreComment>지구를 잘 지키고 있어요</ScoreComment>
        </ScoreBox>

        <SectionTitle>계정</SectionTitle>
        <MenuItem>개인 정보 수정</MenuItem>
        <MenuItem>비밀번호 변경</MenuItem>

        <SectionTitle>판매</SectionTitle>
        <MenuItem>
          구매 내역 <Arrow>〉</Arrow>
        </MenuItem>
        <MenuItem>
          판매 내역 <Arrow>〉</Arrow>
        </MenuItem>

        <BottomNavigation />
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};

const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

const LogoutButton = styled.button`
  padding: 4px 12px;
  background: #eee;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
`;

const ScoreBox = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const Label = styled.div`
  color: #aaa;
  font-size: 0.9rem;
`;

const Score = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const ScoreComment = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const SectionTitle = styled.div`
  color: #999;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const MenuItem = styled.div`
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled.span`
  font-size: 1.2rem;
  color: #999;
`;
