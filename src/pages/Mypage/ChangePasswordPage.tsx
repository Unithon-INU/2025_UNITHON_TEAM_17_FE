import type { FC } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";
import styled from "styled-components";
import axios from "axios";

export const ChangePasswordPage: FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.put(
        "/api/mypage/password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

      const { message: resMessage, error } = res.data;
      setMessage(resMessage || error || "비밀번호 변경 처리 완료");

      if (!error) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        // ✅ 성공 시 라우터 이동
        navigate("/home/my");
      }
    } catch (err: any) {
      setMessage("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="비밀번호 변경" />
        <FormContainer>
          <Label>기존 비밀번호</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="기존 비밀번호 입력하세요."
          />
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력하세요."
          />
          <Label>새 비밀번호 확인</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요."
          />
          {message && <Message>{message}</Message>}
        </FormContainer>

        <ButtonWrapper>
          <Button isFullWidth onClick={handleChangePassword}>
            변경
          </Button>
        </ButtonWrapper>
      </PageLayout>
    </PageBackground>
  );
};

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

const Message = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #e74c3c;
`;
