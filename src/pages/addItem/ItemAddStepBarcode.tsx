import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";

export const ItemAddStepBarcode: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>바코드 찍기</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>업로드</Button>
        </div>
    );
}