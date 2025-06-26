import type { FC } from "react";
import { useState } from "react";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";
import styled from "styled-components";

export const ChangeEmailPage: FC = () => {
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [email3, setEmail3] = useState("");

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="개인 정보 수정" />
        <FormContainer>
          <Label>이메일</Label>
          <Input
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            placeholder="이메일 주소를 입력하세요."
          />
          <Label>이메일</Label>
          <Input
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
            placeholder="이메일 주소를 입력하세요."
          />
          <Label>이메일</Label>
          <Input
            value={email3}
            onChange={(e) => setEmail3(e.target.value)}
            placeholder="이메일 주소를 입력하세요."
          />
        </FormContainer>
        <ButtonWrapper>
          <Button isFullWidth>저장하기</Button>
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
  margin-top: 16px;
  margin-bottom: 4px;
  margin-top: 50px;
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
