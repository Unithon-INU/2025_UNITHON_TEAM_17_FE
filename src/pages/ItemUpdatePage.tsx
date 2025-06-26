import styled from "styled-components";
import {FC} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useParams} from "react-router-dom";

export type ItemUpdatePageProps = {

}

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

export const ItemUpdatePage: FC<ItemUpdatePageProps> = () => {
    const {id} = useParams()

    return (
        <PageBackground>
            <PageLayout>

            </PageLayout>
        </PageBackground>
    );
};