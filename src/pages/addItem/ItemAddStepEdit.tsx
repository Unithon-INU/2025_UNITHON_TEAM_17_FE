import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";

export const ItemAddStepEdit: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <div>
            <h2>수정</h2>
            <p>아이템을 추가하려면 바코드와 유통기한 사진을 찍어주세요.</p>
            <Button onClick={() => onNext(null)}>만들기</Button>
        </div>
    );
}