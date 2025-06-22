import {FC, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useWarehouse} from "../hooks/useWarehouse";
import {Button} from "../components/common/Button";

export const ItemAddPage: FC = () => {
    const {shotBarcode} = useWarehouse();

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    const onFileUpload = async () => {
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
                <Button onClick={onFileUpload}>추가</Button>
            </PageLayout>
        </PageBackground>
    );
};
