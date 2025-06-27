import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";

export const ChangeEmailPage: FC = () => {
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!newName.trim()) {
      alert("새 닉네임을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await axios.put("/api/mypage/name", { name: newName.trim() || "이름없음" });
      alert("닉네임이 성공적으로 변경되었습니다!");
      navigate("/home/my");
    } catch (error) {
      alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="개인 정보 수정" />
        <FormContainer>
          <Label>새 닉네임</Label>
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="새 닉네임을 입력하세요."
          />
        </FormContainer>
        <ButtonWrapper>
          <Button onClick={handleSave} isFullWidth isDisable={loading}>
            {loading ? "저장 중..." : "저장하기"}
          </Button>
        </ButtonWrapper>
      </PageLayout>
    </PageBackground>
  );
};

// 스타일은 동일
const FormContainer = styled.div`
  padding: 0 30px;
  margin-left: 20px;
`;

const Label = styled.label`
  display: block;
  margin-top: 50px;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  margin-bottom: 4px;
`;

const ButtonWrapper = styled.div`
  margin-top: 80px;
  padding: 0 40px;
  width: 100%;
`;
