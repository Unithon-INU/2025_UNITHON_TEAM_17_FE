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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "originalPrice" || name === "salePrice" || name === "quantity" ? Number(value) : value }));
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
        <NavHeader title="상품 수정" />
        <FormWrapper>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="제목" />
          <TextArea name="description" value={form.description} onChange={handleChange} placeholder="설명" rows={4} />
          <Input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="원가" type="number" />
          <Input name="salePrice" value={form.salePrice} onChange={handleChange} placeholder="판매가" type="number" />
          <Input name="quantity" value={form.quantity} onChange={handleChange} placeholder="수량" type="number" />
          <Input name="location" value={form.location} onChange={handleChange} placeholder="거래 장소" />
          <Input name="openChatUrl" value={form.openChatUrl} onChange={handleChange} placeholder="오픈채팅 URL" />
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="DIRECT">직거래</option>
            <option value="CAFE">가게</option>
          </Select>
          <Button onClick={handleSubmit} style={{ marginTop: "24px" }}>수정 완료</Button>
        </FormWrapper>
      </PageLayout>
    </PageBackground>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 30px 20px 100px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  resize: none;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;
