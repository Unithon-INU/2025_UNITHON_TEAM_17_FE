import {FC, useRef} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import {useWarehouse} from "../../hooks/useWarehouse";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {ExpireDateRes} from "../../type/item";
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

export const ItemAddStepExpireDate: FC<ItemAddStepProps> = ({onNext}) => {
    const {shotExpire} = useWarehouse();
    const [expireDateImage, onChangeExpireDateImage, expireDateImageUrl] = usePreviewImage(null);

    function convertDateFormat(dateStr) {
        return dateStr.replace(/\./g, '-');
    }

    const onShotExpire = async () => {
        if (!expireDateImage) return;

        const formData = new FormData();
        formData.append("imageFile", expireDateImage);

        try {
            let res = await shotExpire(formData);
            res["expireDate"] = convertDateFormat(res["expireDate"]);
            onNext(res)
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <Container>
            <Title>유통기한 찍기</Title>
            <Message>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</Message>

            <input
                style={{display: "none"}}
                type="file"
                accept="image/*"
                onChange={onChangeExpireDateImage}
                id={"barcodeImageInput"}
            />

            <ImageWrap>
                <label
                    htmlFor={"barcodeImageInput"}>
                    <PreviewImage src={expireDateImageUrl}/>
                </label>
            </ImageWrap>

            <Button onClick={() => onShotExpire()}>업로드</Button>
        </Container>
    );
}