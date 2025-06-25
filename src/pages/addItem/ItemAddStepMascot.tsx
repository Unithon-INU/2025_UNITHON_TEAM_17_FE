import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import styled from "styled-components";
import {Space} from "../../components/common/Space";
import mascotImage from "../../assets/empty_bear.png";

const Container = styled.div`
  flex : 1;
  height: 100%;
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const Message = styled.p`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 500;
`
const MascotImageWrap = styled.div`
  flex: 1;
  padding: 60px;
`

export const ItemAddStepMascot: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <Container>
            <Title>아이템 추가</Title>
            <Space v={15}/>
            <Message>
                등록할 제품을 준비해주세요 <br/>
                촬영은 바코드 → 유통기한 순서로 진행돼요 <br/>
                안내를 천천히 따라와 주세요.
            </Message>
            <Space v={20}/>
            <MascotImageWrap>
                <img width={"100%"} src={mascotImage}/>
            </MascotImageWrap>
            <Space v={20}/>
            <Button onClick={() => onNext(null)}>바코드 촬영하기</Button>
        </Container>
    );
}