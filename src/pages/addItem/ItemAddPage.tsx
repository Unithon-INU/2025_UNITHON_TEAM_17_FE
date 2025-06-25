import {FC, useRef, useState} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {useWarehouse} from "../../hooks/useWarehouse";
import {useAuth} from "../../hooks/useAuth";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {useLocation} from "react-router-dom";
import {ItemAddStepMascot} from "./ItemAddStepMascot";
import {ItemAddStepBarcode} from "./ItemAddStepBarcode";
import {ItemAddStepExpireDate} from "./ItemAddStepExpireDate";
import {ItemAddStepEdit} from "./ItemAddStepEdit";
import {ItemAddStepSuccess} from "./ItemAddStepSuccess";
import curriedDarken from "polished/lib/color/darken";
import {BarcodeRes, CreateItemReq, ExpireDateRes} from "../../type/item";

type ItemAddStep = "mascot" | "barcode" | "expireDate" | "edit" | "success";

export type ItemAddStepProps = {
    onNext: (data: any | null) => void;
}

export const ItemAddPage: FC = () => {
    const locationFunction = useLocation();
    const {location} = locationFunction.state || {};
    const {shotBarcode, createItem, shotExpire} = useWarehouse();
    const {user} = useAuth()

    const [step, setStep] = useState<ItemAddStep>("mascot");
    const createItemReq = useRef({
        memberId: user!!.id,
        locationId: location!!.id
    } as CreateItemReq);

    const onCreateItem = async (req: CreateItemReq) => {
        try {
            await createItem(req);
            setStep("success");
        } catch (error) {
            console.error("Error creating item:", error);
        }
    }

    let stepTemplate
    if (step === "mascot") {
        stepTemplate = (
            <ItemAddStepMascot
                onNext={(data) => {
                    setStep("barcode")
                }}
            />
        )
    } else if (step === "barcode") {
        stepTemplate = (
            <ItemAddStepBarcode
                onNext={(data) => {
                    createItemReq.current = {
                        ...createItemReq.current,
                        name: data.productName,
                        imageUrl: data.imageUrl,
                    }
                    setStep("expireDate")
                }}
            />
        )
    } else if (step === "expireDate") {
        stepTemplate = (
            <ItemAddStepExpireDate
                onNext={(data) => {
                    createItemReq.current = {
                        ...createItemReq.current,
                        expireDate: data.expireDate,
                        registerDate: data.capturedDate,
                        alarmEnabled: true
                    }
                    setStep("edit")
                }}
            />
        )
    } else if (step === "edit") {
        stepTemplate = (
            <ItemAddStepEdit
                onNext={(data) => {
                    const req = {...createItemReq.current, ...data};
                    onCreateItem(req)
                }}
            />
        )
    } else if (step === "success") {
        stepTemplate = (
            <ItemAddStepSuccess
                onNext={() => setStep("mascot")}
            />
        )
    }

    return (
        <PageBackground>
            <PageLayout>
                {location!!.locationId}
                {stepTemplate}
            </PageLayout>
        </PageBackground>
    );
};
