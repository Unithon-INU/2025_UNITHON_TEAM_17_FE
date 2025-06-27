import { FC, useEffect, useRef } from "react";
import { Button } from "../../components/common/Button";
import { ItemAddStepProps } from "./ItemAddPage";
import { useWarehouse } from "../../hooks/useWarehouse";
import { usePreviewImage } from "../../hooks/UsePreviewImage";
import { ExpireDateRes } from "../../type/item";
import styled from "styled-components";
import toast from "react-hot-toast";

// 커스텀 prop을 위한 타입 정의
interface PreviewImageProps {
  $src: string | null;
}

const Container = styled.div`
  min-height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const Message = styled.p`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 500;
`;

const ImageWrap = styled.div`
  flex: 1;
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$src",
})<PreviewImageProps>`
  width: 224px;
  height: 224px;
  border-radius: 100%;
  background-image: url(${(p) => p.$src});
  background-position: center;
  background-size: cover;
  background-color: ${(p) => (p.$src ? "transparent" : "#f0f0f0")};
  cursor: pointer;
`;

const CaptureFrame = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 100px;
  border: 3px solid white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const ItemAddStepExpireDate: FC<ItemAddStepProps> = ({ onNext }) => {
  const { shotExpire } = useWarehouse();
  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ usePreviewImage 훅 구조 변경 반영
  const {
    file: expireImage,
    onFileChange,
    previewUrl: expireImageUrl,
  } = usePreviewImage(null);

  useEffect(() => {
    if (expireImage) {
      onShotExpire();
    }
  }, [expireImage]);

  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.click();
    } else if (!isMobile) {
      toast("PC에서는 이미지 업로드만 가능합니다.");
    }
  }, []);

  const handleClickInput = () => {
    inputRef.current?.click();
  };

  const convertDateFormat = (dateStr: string) => {
    return dateStr.replace(/\./g, "-");
  };

  const onShotExpire = async () => {
    if (!expireImage) return;

    const formData = new FormData();
    formData.append("imageFile", expireImage);

    try {
      const res: ExpireDateRes = await shotExpire(formData);
      res.expireDate = convertDateFormat(res.expireDate);
      onNext(res);
    } catch (error) {
      console.error("OCR 실패", error);
      toast.error("유통기한 인식에 실패했어요. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>유통기한 찍기</Title>
      <Message>제품의 유통기한을 촬영해주세요.</Message>

      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        capture={isMobile ? "environment" : undefined}
        onChange={onFileChange}
        id="expireImageInput"
      />

      <ImageWrap>
        <label htmlFor="expireImageInput" onClick={handleClickInput}>
          <PreviewImage $src={expireImageUrl} />
        </label>
        <CaptureFrame />
      </ImageWrap>

      {!isMobile && <Button onClick={handleClickInput}>업로드</Button>}
    </Container>
  );
};
