import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {useWarehouse} from "../../hooks/useWarehouse";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100%;
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const Message = styled.p`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 500;
`

const ImageWrap = styled.div`
  flex: 1;
  padding: 60px;
`

const PreviewImage = styled.div<{ src: string | null }>`
  width: 224px;
  height: 224px;
  border-radius: 100%;

  margin: 0 auto;

  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;

  background-color: ${p => p.src ? "transparent" : "#f0f0f0"};
  cursor: pointer;
`

export const ItemAddStepBarcode: FC<ItemAddStepProps> = ({onNext}) => {
    const {shotBarcode} = useWarehouse()
    const [barcodeImage, onChangeBarcodeImage, barcodeImageUrl] = usePreviewImage(null);

    const onShotBarcode = async () => {
        if (!barcodeImage) return;

        const formData = new FormData();
        formData.append("file", barcodeImage);

        try {
            const res = await shotBarcode(formData);
            onNext(res);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <Container>
            <Title>바코드 찍기</Title>
            <Message>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</Message>

            <input
                style={{display: "none"}}
                type="file"
                accept="image/*"
                onChange={onChangeBarcodeImage}
                id={"barcodeImageInput"}
            />

            <ImageWrap>
                <label
                    for={"barcodeImageInput"}>
                    <PreviewImage src={barcodeImageUrl}/>
                </label>
            </ImageWrap>

            <Button onClick={() => onShotBarcode()}>업로드</Button>
        </Container>
    );
}