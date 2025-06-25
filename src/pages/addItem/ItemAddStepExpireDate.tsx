import {FC, useRef} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import {useWarehouse} from "../../hooks/useWarehouse";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {ExpireDateRes} from "../../type/item";

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
        <div>
            <h2>유통기한 찍기</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>

            <input type="file" accept="image/*" onChange={onChangeExpireDateImage}/>

            {expireDateImage && (
                <div style={{marginTop: "10px"}}>
                    <img
                        src={expireDateImageUrl}
                        alt="미리보기"
                        style={{maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px"}}
                    />
                </div>
            )}
            <Button onClick={() => onShotExpire()}>업로드</Button>
        </div>
    );
}