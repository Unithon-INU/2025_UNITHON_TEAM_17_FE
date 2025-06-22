import {FC, use, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BarcodeRes, CreateItemReq, useWarehouse} from "../hooks/useWarehouse";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";
import {Location} from "../type/Warehouse";

export const ItemAddPage: FC = () => {
    const locationId : Location["id"] = 1;
    const {shotBarcode, createItem} = useWarehouse();
    const {user} = useAuth()

    //todo: 언젠가 시간이 남는다면 hook으로 빼기
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [barcode, setBarcode] = useState<BarcodeRes | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const onShotBarcode = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await shotBarcode(formData);
            console.log("Barcode scanned:", response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

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
                <input type="file" accept="image/*" onChange={onFileChange} />
                {previewUrl && (
                    <div style={{ marginTop: "10px" }}>
                        <img
                            src={previewUrl}
                            alt="미리보기"
                            style={{ maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px" }}
                        />
                    </div>
                )}
                <Button onClick={onShotBarcode}>추가</Button>
            </PageLayout>
        </PageBackground>
    );
};
