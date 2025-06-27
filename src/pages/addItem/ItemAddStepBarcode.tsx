import { FC, useEffect, useRef } from "react";
import toast, {Toaster} from "react-hot-toast";
import styled from "styled-components";
import { ItemAddStepProps } from "./ItemAddPage";
import { usePreviewImage } from "../../hooks/UsePreviewImage";
import { useWarehouse } from "../../hooks/useWarehouse";
import { isMobile } from "react-device-detect";
import { Button } from "../../components/common/Button";
import { BsCameraFill } from "react-icons/bs";

// 커스텀 prop 타입
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
  background-image: url(${p => p.$src});
  background-position: center;
  background-size: cover;
  background-color: ${p => (p.$src ? "transparent" : "#f0f0f0")};
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

export const ItemAddStepBarcode: FC<ItemAddStepProps> = ({ onNext }) => {
  const { shotBarcode } = useWarehouse();

  const {
    file: barcodeImage,
    onFileChange: onChangeBarcodeImage,
    previewUrl: barcodeImageUrl,
  } = usePreviewImage(null);

  const onShotBarcode = async () => {
    if (!(barcodeImage instanceof File)) {
      alert("이미지가 유효하지 않습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", barcodeImage);

    try {
      const res = await shotBarcode(formData);
      onNext(res);
    } catch (error) {
      toast.error("유통기한 인식에 실패했어요. 다시 시도해주세요.");
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      alert("PC 환경에서는 카메라 대신 사진을 업로드해주세요.");
    }
  }, []);

  return (
    <Container>
      <Title>바코드 인식</Title>
      <Message>제품의 바코드를 촬영하거나 업로드해주세요</Message>

      <CameraBox>
        <CaptureButton htmlFor="barcodeImageInput">
          <PreviewImage $src={barcodeImageUrl}>
            {!barcodeImageUrl && <BsCameraFill size={48} color="#ccc" />}
          </PreviewImage>
        </CaptureButton>
      </CameraBox>

      <HiddenInput
        id="barcodeImageInput"
        type="file"
        accept="image/*"
        capture={isMobile ? "environment" : undefined}
        onChange={onChangeBarcodeImage}
      />

      {barcodeImage && (
        <Button onClick={onShotBarcode} style={{ marginTop: "16px" }}>
          업로드
        </Button>
      )}
    </Container>
  );
};
