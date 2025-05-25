import type { FC } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { FiCamera } from "react-icons/fi";

export const PostWrite: FC = () => {
  const [costPrice, setCostPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedType, setSelectedType] = useState("가게");

  const toggleOptions = ["가게", "직거래"];

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageFiles.length > 5) {
        alert("사진은 최대 5장까지 선택할 수 있습니다.");
        return;
    }
    setImageFiles(prev => [...prev, ...files]);
    };
    const removeImage = (index: number) => {
  setImageFiles(prev => prev.filter((_, i) => i !== index));
   };

  return (
    <PageBackground>
      <PageLayout>
        <NavHeader title="제품 판매"  onRightClick={() => alert("작성 완료")} />

        <Form>
          <TitleInput placeholder="제목을 입력하세요" />

          <FormRow>
            <FieldLabel>판매 종류</FieldLabel>
            <RightAlignBox>
              {toggleOptions.map((option) => (
                <ToggleButton
                  key={option}
                  selected={selectedType === option}
                  onClick={() => setSelectedType(option)}
                >
                  {option}
                </ToggleButton>
              ))}
            </RightAlignBox>
          </FormRow>

          <FormRow>
            <FieldLabel>원가</FieldLabel>
            <InputWrapper>
              <Input value={costPrice} onChange={e => setCostPrice(e.target.value)} />
              <Unit>원</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>판매금액</FieldLabel>
            <InputWrapper>
              <Input value={salePrice} onChange={e => setSalePrice(e.target.value)} />
              <Unit>원</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>수량</FieldLabel>
            <InputWrapper>
              <Input value={quantity} onChange={e => setQuantity(e.target.value)} />
              <Unit>개</Unit>
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>거래장소</FieldLabel>
            <InputWrapper>
              <Placeholder>장소를 선택하세요</Placeholder>
              <Arrow>▶</Arrow>
            </InputWrapper>
          </FormRow>

          <Small>* 필수 입력 항목이 아닙니다</Small>

          <Textarea placeholder="제품에 대한 설명을 작성해주세요." />

        <ImageUploadBox>
        <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageSelect}
        />
        <FiCamera size={24} onClick={() => fileInputRef.current?.click()} />
        <ImageCount>{imageFiles.length}/5</ImageCount>
            <PreviewWrapper>
                {imageFiles.map((file, idx) => (
                <Preview key={idx}>
                    <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} />
                    <RemoveButton onClick={() => removeImage(idx)}>✕</RemoveButton>
                </Preview>
                ))}
            </PreviewWrapper>
        </ImageUploadBox>

          <SubmitButton>작성 완료</SubmitButton>
        </Form>
      </PageLayout>
    </PageBackground>
  );
};

const Form = styled.div`
  padding: 1rem;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #000;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  &:focus {
    outline: none;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const FieldLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  width: 80px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  font-size: 1rem;
  text-align: right;
  width: 100px;
  &:focus {
    outline: none;
  }
`;

const Unit = styled.span`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #888;
`;

const Placeholder = styled.span`
  color: #aaa;
  font-size: 1rem;
`;

const Arrow = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const Small = styled.p`
  font-size: 0.8rem;
  color: #aaa;
  margin: 0.5rem 0 1.5rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 1rem;
  font-size: 1rem;
  border: 1.5px solid #111;
  border-radius: 20px;
  resize: none;
`;

const ImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin: 1.5rem 0;
`;

const ImageCount = styled.span`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #6fc667;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
`;

// 토글 오른쪽 정렬용 컨테이너
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

const PreviewWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const Preview = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 0.8rem;
  padding: 0 5px;
  cursor: pointer;
`;
