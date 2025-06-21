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
  const [place, setPlace] = useState("");
  const [chatUrl, setChatUrl] = useState("");
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
        <NavHeader title="제품 판매" onRightClick={() => alert("작성 완료")} />
        <PaddedLayout>
          <Form>
          <TitleInput placeholder="제목을 입력하세요" />

          <FormRow>
            <FieldLabel>판매 종류</FieldLabel>
            <RightAlignBox>
              {toggleOptions.map(option => (
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
            <FieldLabel>오픈채팅 URL</FieldLabel>
            <InputWrapper>
              <Input value={chatUrl} onChange={e => setChatUrl(e.target.value)} placeholder="URL을 입력하세요" />
            </InputWrapper>
          </FormRow>

          <FormRow>
            <FieldLabel>거래장소</FieldLabel>
            <InputWrapper>
              <Input value={place} onChange={e => setPlace(e.target.value)} placeholder="장소를 입력하세요" />
            </InputWrapper>
          </FormRow>

          <Small>* 서울시 00동 까지만 작성해주세요</Small>

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
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};

const PaddedLayout = styled(PageLayout)`
  padding: 0.5rem;
`;

const Form = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;  // FormRow 간격!
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

const Small = styled.p`
  font-size: 0.8rem;
  color: #aaa;
  margin: 0.2rem 0 1rem;
  margin-left: 0.5rem;
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

const ImageUploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const ImageCount = styled.span`
  margin-top: 0.5rem;
  font-size: 0.9rem;
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
