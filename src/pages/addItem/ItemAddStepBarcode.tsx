import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {useWarehouse} from "../../hooks/useWarehouse";

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
        <div>
            <h2>바코드 찍기</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>

            <input type="file" accept="image/*" onChange={onChangeBarcodeImage}/>

            {barcodeImageUrl && (
                <div style={{marginTop: "10px"}}>
                    <img
                        src={barcodeImageUrl}
                        alt="미리보기"
                        style={{maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px"}}
                    />
                </div>
            )}

            <Button onClick={() => onShotBarcode()}>업로드</Button>
        </div>
    );
}