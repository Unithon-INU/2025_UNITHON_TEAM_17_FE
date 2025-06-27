import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { Button } from "../../components/common/Button";

interface Product {
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  quantity: number;
  location: string;
  openChatUrl: string;
  type: "CAFE" | "DIRECT";
}

export const OfferingItemEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Product>({
    title: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    quantity: 1,
    location: "",
    openChatUrl: "",
    type: "DIRECT"
  });
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`, { withCredentials: true });
        setForm(response.data);
      } catch (err: any) {
        if (err.response?.status === 403) {
          alert("수정 권한이 없습니다.");
          setNotAllowed(true);
        } else {
          alert("상품 정보를 불러올 수 없습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "originalPrice" || name === "salePrice" || name === "quantity" ? Number(value) : value
    }));
  };

  const handleTypeChange = (type: "CAFE" | "DIRECT") => {
    setForm((prev) => ({ ...prev, type }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/products/${id}`, form, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      alert("상품이 수정되었습니다.");
      navigate(`/home/main/${id}`);
    } catch (err: any) {
      if (err.response?.status === 403) alert("수정 권한이 없습니다.");
      else alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <PageLayout>불러오는 중...</PageLayout>;
  if (notAllowed) return <PageLayout>접근 권한이 없습니다.</PageLayout>;

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="게시글 수정" />
        <Form>
          <TitleInput
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />

          <FormRow>
            <FieldLabel>판매 종류</FieldLabel>
            <RightAlignBox>
              <ToggleButton selected={form.type === "CAFE"} onClick={() => handleTypeChange("CAFE")}>가게</ToggleButton>
              <ToggleButton selected={form.type === "DIRECT"} onClick={() => handleTypeChange("DIRECT")}>직거래</ToggleButton>
            </RightAlignBox>
          </FormRow>

          <FormRow>
            <FieldLabel>원가</FieldLabel>
            <InputWrapper>
              <Input name="originalPrice" value={form.originalPrice} onChange={handleChange} />
              <Unit>원</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>판매금액</FieldLabel>
            <InputWrapper>
              <Input name="salePrice" value={form.salePrice} onChange={handleChange} />
              <Unit>원</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>수량</FieldLabel>
            <InputWrapper>
              <Input name="quantity" value={form.quantity} onChange={handleChange} />
              <Unit>개</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>거래장소</FieldLabel>
            <InputWrapper>
              <Input name="location" value={form.location} onChange={handleChange} />
            </InputWrapper>
          </FormRow>

          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="제품에 대한 설명을 작성해주세요."
          />

          <SubmitButton onClick={handleSubmit}>수정 완료</SubmitButton>
        </Form>
      </PageLayout>
    </PageBackground>
  );
};

const Form = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #000;
  padding: 1rem 0;
  &:focus {
    outline: none;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const FieldLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  width: 100px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1rem;
  text-align: right;
  width: 150px;
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span`
  font-size: 1rem;
  color: #888;
`;

const Textarea = styled.textarea`
  width: 95%;
  height: 180px;
  padding: 1rem;
  font-size: 1rem;
  border: 1.5px solid #111;
  border-radius: 20px;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 80%;
  padding: 1rem;
  background-color: #6fc667;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
`;

const RightAlignBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ToggleButton = styled.button<{ selected: boolean }>`
  border-radius: 20px;
  padding: 8px 20px;
  background-color: ${({ selected }) => (selected ? "#6FC667" : "#eee")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  font-weight: bold;
  border: none;
`;
