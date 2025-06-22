import {FC, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BarcodeRes, CreateItemReq, useWarehouse} from "../hooks/useWarehouse";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";
import {Location} from "../type/Warehouse";
import {usePreviewImage} from "../hooks/UsePreviewImage";

export const ItemAddPage: FC = () => {
    const locationId : Location["id"] = 1;
    const {shotBarcode, createItem, shotExpire} = useWarehouse();
    const {user} = useAuth()

    const [barcodeImage, onChangeBarcodeImage, barcodeImageUrl] = usePreviewImage(null);
    const [expireDateImage, onChangeExpireDateImage, expireDateImageUrl] = usePreviewImage(null);
    const [barcode, setBarcode] = useState<BarcodeRes | null>(null);

    const onShotBarcode = async () => {
        if (!barcodeImage) return;

        const formData = new FormData();
        formData.append("file", barcodeImage);

        try {
            const res = await shotBarcode(formData);
            console.log("Barcode scanned:", res);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onShotExpire = async () => {
        if (!expireDateImage) return;

        const formData = new FormData();
        formData.append("imageFile", expireDateImage);

        try {
            const res = await shotExpire(formData);
            console.log("Expire date scanned:", res);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const onCreateItem = async () => {
        try {
            const req : CreateItemReq = {
                memberId : user!!.id,
                locationId: locationId,
                name: barcode!!.productName,
                imageUrl: barcode!!.imageUrl,
                registerDate: "",
                expireDate: "",
                alarmEnabled: false
            };
            const newItem = await createItem(req);
            console.log("Item created:", newItem);
        } catch (error) {
            console.error("Error creating item:", error);
        }
    }

    return (
        <PageBackground>
            <PageLayout>
                <input type="file" accept="image/*" onChange={onChangeBarcodeImage} />
                <input type="file" accept="image/*" onChange={onChangeExpireDateImage} />
                {barcodeImageUrl && (
                    <div style={{ marginTop: "10px" }}>
                        <img
                            src={barcodeImageUrl}
                            alt="미리보기"
                            style={{ maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px" }}
                        />
                    </div>
                )}

                {expireDateImage && (
                    <div style={{ marginTop: "10px" }}>
                        <img
                            src={expireDateImageUrl}
                            alt="미리보기"
                            style={{ maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px" }}
                        />
                    </div>
                )}
                <Button onClick={onShotBarcode}>추가</Button>
                <Button onClick={onShotExpire}>유통기한</Button>
            </PageLayout>
        </PageBackground>
    );
};
