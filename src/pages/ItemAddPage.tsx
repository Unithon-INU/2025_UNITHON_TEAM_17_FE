import {FC, useRef, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {BarcodeRes, CreateItemReq, ExpireDateRes, useWarehouse} from "../hooks/useWarehouse";
import {Button} from "../components/common/Button";
import {useAuth} from "../hooks/useAuth";
import {Location} from "../type/Warehouse";
import {usePreviewImage} from "../hooks/UsePreviewImage";
import {useLocation} from "react-router-dom";

type ItemAddStep = "mascot" | "barcode" | "expireDate" | "edit" | "success";

type ItemAddStepProps = {
    onNext: (data: any | null) => void;
}

const ItemAddStepMascot: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>아이템 추가</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>바코드 촬영하기</Button>
        </div>
    );
}

const ItemAddStepBarcode: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>바코드 찍기</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>업로드</Button>
        </div>
    );
}

const ItemAddStepExpiredata: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>유통기한 찍기</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>업로드</Button>
        </div>
    );
}

const ItemAddStepEdit: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>수정</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>만들기</Button>
        </div>
    );
}

const ItemAddStepComplate: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>완료</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>원래화면 돌아가기</Button>
        </div>
    );
}

export const ItemAddPage: FC = () => {
    const locationFunction = useLocation();
    const {location} = locationFunction.state || {};
    const {shotBarcode, createItem, shotExpire} = useWarehouse();
    const {user} = useAuth()

    const [step, setStep] = useState<ItemAddStep>("mascot");
    const [barcodeImage, onChangeBarcodeImage, barcodeImageUrl] = usePreviewImage(null);
    const [expireDateImage, onChangeExpireDateImage, expireDateImageUrl] = usePreviewImage(null);
    const barcode = useRef<BarcodeRes | null>(null);
    const expireDate = useRef<ExpireDateRes | null>(null);

    const onShotBarcode = async () => {
        if (!barcodeImage) return;

        const formData = new FormData();
        formData.append("file", barcodeImage);

        try {
            const res = await shotBarcode(formData);
            barcode.current = res
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
            expireDate.current = res
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const onCreateItem = async () => {
        try {
            const req: CreateItemReq = {
                memberId: user!!.id,
                locationId: location!!.id,
                name: barcode.current!!.productName,
                imageUrl: barcode.current!!.imageUrl,
                registerDate: expireDate.current!!.capturedDate,
                expireDate: expireDate.current!!.expireDate,
                alarmEnabled: false
            };
            const newItem = await createItem(req);
            console.log("Item created:", newItem);
        } catch (error) {
            console.error("Error creating item:", error);
        }
    }

    let stepTemplate
    if (step === "mascot") {
        stepTemplate = (
            <ItemAddStepMascot
                onNext={() => setStep("barcode")}
            />
        )
    } else if (step === "barcode") {
        stepTemplate = (
            <ItemAddStepBarcode
                onNext={() => setStep("expireDate")}
            />
        )
    } else if (step === "expireDate") {
        stepTemplate = (
            <ItemAddStepExpiredata
                onNext={() => setStep("edit")}
            />
        )
    } else if (step === "edit") {
        stepTemplate = (
            <ItemAddStepEdit
                onNext={onCreateItem}
            />
        )
    } else if (step === "success") {
        stepTemplate = (
            <ItemAddStepComplate
                onNext={() => setStep("mascot")}
            />
        )
    }

    return (
        <PageBackground>
            <PageLayout>
                {stepTemplate}

                {/*<input type="file" accept="image/*" onChange={onChangeBarcodeImage}/>*/}
                {/*<input type="file" accept="image/*" onChange={onChangeExpireDateImage}/>*/}
                {/*{barcodeImageUrl && (*/}
                {/*    <div style={{marginTop: "10px"}}>*/}
                {/*        <img*/}
                {/*            src={barcodeImageUrl}*/}
                {/*            alt="미리보기"*/}
                {/*            style={{maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px"}}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{expireDateImage && (*/}
                {/*    <div style={{marginTop: "10px"}}>*/}
                {/*        <img*/}
                {/*            src={expireDateImageUrl}*/}
                {/*            alt="미리보기"*/}
                {/*            style={{maxWidth: "200px", border: "1px solid #ccc", borderRadius: "8px"}}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*<Button onClick={onShotBarcode}>추가</Button>*/}
                {/*<Button onClick={onShotExpire}>유통기한</Button>*/}
                {/*<Button onClick={onCreateItem}>저장</Button>*/}
            </PageLayout>
        </PageBackground>
    );
};
