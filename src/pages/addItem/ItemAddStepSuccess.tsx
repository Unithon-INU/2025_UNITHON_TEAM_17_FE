import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";

export const ItemAddStepSuccess: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>완료</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>원래화면 돌아가기</Button>
        </div>
    );
}