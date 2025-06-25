import {FC} from "react";
import {Button} from "../../components/common/Button";
import {ItemAddStepProps} from "./ItemAddPage";
import styled from "styled-components";
import mascotImage from "../../assets/empty_bear.png";
import {Space} from "../../components/common/Space";

const Container = styled.div`
  min-height: 100%;
  padding: 24px 32px;

  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`

const MascotImageWrap = styled.div`
  flex: 1;
  padding: 60px;
`

const Message = styled.p`
  color: #9d9d9d;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

export const ItemAddStepSuccess: FC<ItemAddStepProps> = ({onNext}) => {
    return (
        <Container>
            <Title>제품 등록 성공</Title>

            <MascotImageWrap>
                <img width={"100%"} src={mascotImage}/>
            </MascotImageWrap>

            <Message>
                10점이 쌓였어요! <br/>
            </Message>

            <Space v={32}/>

            <Button onClick={() => onNext(null)}>원래화면 돌아가기</Button>
        </Container>
    );
}