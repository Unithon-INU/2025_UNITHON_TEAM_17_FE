import { FC, useEffect, useRef } from "react";
import toast, {Toaster} from "react-hot-toast";
import styled from "styled-components";
import { ItemAddStepProps } from "./ItemAddPage";
import { usePreviewImage } from "../../hooks/UsePreviewImage";
import { useWarehouse } from "../../hooks/useWarehouse";
import { Button } from "../../components/common/Button";
import { BsCameraFill } from "react-icons/bs";
import { ExpireDateRes } from "../../type/item";
import { isMobile } from "react-device-detect";

interface PreviewImageProps {
  $src: string | null;
}

const Container = styled.div`
  height: 100%;
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

const CameraBox = styled.div`
  flex: 1;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$src",
})<PreviewImageProps>`
  width: 224px;
  height: 224px;
  border-radius: 16px;
  background-image: url(${(p) => p.$src});
  background-position: center;
  background-size: cover;
  background-color: ${(p) => (p.$src ? "transparent" : "#f0f0f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CaptureButton = styled.label`
  display: inline-block;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px 0;
`

export const ItemAddStepExpireDate: FC<ItemAddStepProps> = ({ onNext }) => {
  const { shotExpire, isLoading } = useWarehouse();
  const {
    file: expireImage,
    onFileChange,
    previewUrl: expireImageUrl,
  } = usePreviewImage(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const convertDateFormat = (dateStr: string) => {
    return dateStr.replace(/\./g, "-");
  };

  const onShotExpire = async () => {
    if (!expireImage) return;

    const formData = new FormData();
    formData.append("image", expireImage);

    try {
      const res: ExpireDateRes = await shotExpire(formData);
      res.expireDate = convertDateFormat(res.expireDate);
      onNext(res);
    } catch (error) {
      console.error("OCR 실패", error);
      toast.error("유통기한 인식에 실패했어요. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (!isMobile) {
      toast("PC 환경에서는 카메라 대신 사진을 업로드해주세요.");
    }
  }, []);

  return (
    <Container>
      <Title>유통기한 찍기</Title>
      <Message>제품의 유통기한을 촬영해주세요.</Message>

      <CameraBox>
        <CaptureButton htmlFor="expireImageInput">
          <PreviewImage $src={expireImageUrl}>
            {!expireImageUrl && <BsCameraFill size={48} color="#ccc" />}
          </PreviewImage>
        </CaptureButton>
      </CameraBox>

      <HiddenInput
        ref={inputRef}
        id="expireImageInput"
        type="file"
        accept="image/*"
        // capture={isMobile ? "environment" : undefined}
        onChange={onFileChange}
      />

      {expireImage && (
        <Button onClick={onShotExpire} style={{ marginTop: "16px" }}>
          업로드
        </Button>
      )}

      {isLoading && (
          <LoadingMessage>로딩중입니다.</LoadingMessage>
      )}
    </Container>
  );
};
