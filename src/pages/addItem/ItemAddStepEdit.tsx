import {FC, useState} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import styled from "styled-components";
import {CreateItemReq} from "../../type/item";
import {Space} from "../../components/common/Space";
import {InputRow} from "../../components/InputRow";

type ItemAddStepEditProps = ItemAddStepProps & {
    initialData: CreateItemReq;
    onPrev : () => void;
}

const Container = styled.div`
  height: 100%;
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const PreviewImage = styled.div<{ src: string }>`
  width: 224px;
  height: 224px;
  border-radius: 100%;

  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
`

const InputWrap = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  
  & > * {
    flex: 1;
  }
`


export const ItemAddStepEdit: FC<ItemAddStepEditProps> = ({initialData, onPrev, onNext}) => {
    const [data, setData] = useState(initialData)

    return (
        <Container>
            <Title>
                아래 내용을 확인하고 <br/>
                잘못된 정보를 수정해주세요
            </Title>
            <Space v={58}/>
            <PreviewImage src={data.imageUrl} alt="Preview"/>
            <Space v={58}/>
            <InputWrap>
                <InputRow label={"제품 이름"} value={data.name} onChange={v => setData({...data, name: v})} type={"text"}/>
                <InputRow label={"촬영 날짜"} value={data.registerDate} onChange={v => setData({...data, registerDate: v})} type={"date"} readonly/>
                <InputRow label={"유통 기한"} value={data.expireDate} onChange={v => setData({...data, expireDate: v})} type={"date"}/>
            </InputWrap>
            <Space v={40}/>
            <ButtonWrap>
                <Button
                    background={"#F5F5F5"}
                    color={"#707070"}
                    onClick={() => onPrev()}>재촬영</Button>
                <Button onClick={() => onNext(data)}>만들기</Button>
            </ButtonWrap>
        </Container>
    );
}