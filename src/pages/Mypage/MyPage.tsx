import { FC, useEffect, useState } from "react";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import styled from "styled-components";
import { BottomNavigation } from "../../components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

export const MyPage: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/auth/session-check", {
          withCredentials: true,
        });

        // ✅ loginStatus 기준으로 체크
        if (response.data?.loginStatus && response.data?.name) {
          setName(response.data.name);
        }
      } catch (error) {
        console.error("세션 정보를 불러오는 데 실패했습니다", error);
      }
    };

    fetchSession();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (!confirmLogout) return;

    try {
      await axios.post("/api/auth/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageBackground>
      <PageLayout $isBottomNavigation>
        <PaddedLayout>
          <Header>
            <UserName>{name ? `${name}님` : ""}</UserName>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </Header>

          <ScoreBox>
            <Label>내 환경점수</Label>
            <Score>100점</Score>
            <ScoreComment>지구를 잘 지키고 있어요</ScoreComment>
          </ScoreBox>

          <SectionTitle>계정</SectionTitle>
          <MenuItem onClick={() => navigate("/edit-email")}>
            개인 정보 수정 <Arrow>〉</Arrow>
          </MenuItem>
          <MenuItem onClick={() => navigate("/change-password")}>
            비밀번호 변경 <Arrow>〉</Arrow>
          </MenuItem>

          <SectionTitle>판매</SectionTitle>
          <MenuItem>
            판매 내역 <Arrow>〉</Arrow>
          </MenuItem>

          <BottomNavigation />
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};

// 스타일 컴포넌트는 동일
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
  cursor: pointer;
`;

const Arrow = styled.span`
  font-size: 1.2rem;
  color: #999;
`;
