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
  padding: 54px 72px;
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom : 30px;
  align-self: flex-start;
`

const PreviewImage = styled.div<{ src: string }>`
  width: 224px;
  height: 224px;
  border-radius: 100%;

  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  margin-bottom : 30px;
`

const InputWrap = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  width: 100%;
  max-width: 500px; 

  & > button {
    flex: 1;
  }
`;


export const ItemAddStepEdit: FC<ItemAddStepEditProps> = ({initialData, onPrev, onNext}) => {
    const [data, setData] = useState(initialData)

    return (
        <Container>
            <Title>
                아래 내용을 확인하고 <br/>
                잘못된 정보를 수정해주세요
            </Title>
            <Space v={58}/>
            <PreviewImage src={data.imageUrl}/>
            <Space v={58}/>
            <InputWrap>
                <InputRow label={"제품 이름"} value={data.name} onChange={v => setData({...data, name: v})} type={"text"}/>
                <InputRow label={"촬영 날짜"} value={data.registerDate} onChange={v => setData({...data, registerDate: v})} type={"date"} readOnly/>
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