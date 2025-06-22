import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";

export const ItemAddStepMascot: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>아이템 추가</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>바코드 촬영하기</Button>
        </div>
    );
}