import {FC, useRef, useState} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {useWarehouse} from "../../hooks/useWarehouse";
import {useAuth} from "../../hooks/useAuth";
import {usePreviewImage} from "../../hooks/UsePreviewImage";
import {Route, useLocation, useNavigate} from "react-router-dom";
import {ItemAddStepMascot} from "./ItemAddStepMascot";
import {ItemAddStepBarcode} from "./ItemAddStepBarcode";
import {ItemAddStepExpireDate} from "./ItemAddStepExpireDate";
import {ItemAddStepEdit} from "./ItemAddStepEdit";
import {ItemAddStepSuccess} from "./ItemAddStepSuccess";
import curriedDarken from "polished/lib/color/darken";
import {BarcodeRes, CreateItemReq, ExpireDateRes} from "../../type/item";
import {NavHeader} from "../../components/NavHeader";
import styled from "styled-components";
import toast, {Toaster} from "react-hot-toast";
import {RoutePath} from "../../RoutePath";

type ItemAddStep = "mascot" | "barcode" | "expireDate" | "edit" | "success";

export type ItemAddStepProps = {
    onNext: (data: any | null) => void;
}

export const ItemAddPage: FC = () => {
    const navigate = useNavigate()
    const locationFunction = useLocation();
    const {location} = locationFunction.state || {};
    const {shotBarcode, createItem, shotExpire} = useWarehouse();
    const {user} = useAuth()

    const [step, setStep] = useState<ItemAddStep>("mascot");
    const createItemReq = useRef({
        memberId: user!!.id,
        locationId: location!!.id,
    } as CreateItemReq);

    const onCreateItem = async (req: CreateItemReq) => {
        try {
            await createItem(req);
            setStep("success");
        } catch (error) {
            console.error("Error creating item:", error);
            toast.error("아이템 생성에 실패했어요. 다시 시도해주세요.");
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
                initialData={createItemReq.current}
                onNext={(data) => {
                    const req = {...createItemReq.current, ...data};
                    onCreateItem(req)
                }}
                onPrev={() => {
                    setStep("barcode");
                }}
            />
        )
    } else if (step === "success") {
        stepTemplate = (
            <ItemAddStepSuccess
                onNext={() => {
                    navigate(RoutePath.main);
                }}
            />
        )
    }

    return (
        <PageBackground>
            <PageLayout>
                <NavHeader title=""
                    onLeftClick={() => {
                        navigate(-1)
                    }}
                />
                {stepTemplate}
            </PageLayout>
        </PageBackground>
    );
};
