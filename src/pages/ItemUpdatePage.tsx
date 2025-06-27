import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useAsyncError, useParams} from "react-router-dom";
import {Item} from "../type/item";
import {useWarehouse} from "../hooks/useWarehouse";
import {InputRow} from "../components/InputRow";
import {usePreviewImage} from "../hooks/UsePreviewImage";

export type ItemUpdatePageProps = {}

const PreviewImage = styled.div<{ src: string }>`
  width: 138px;
  height: 138px;
  border-radius: 100%;
  
  margin: 0 auto;

  background-image: url(${p => p.src});
  background-position: center;
  background-size: cover;
  
  cursor: pointer;
`

const InputWrap = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const ItemUpdatePage: FC<ItemUpdatePageProps> = () => {
    const {id} = useParams()
    const {getItem} = useWarehouse();
    const [item, setItem] = useState<Item | null>(null)

    const onLoadItem = async () => {
        if (!id) return;

        try {
            const itemData = await getItem(Number(id));
            setItem(itemData);
        } catch (error) {
            console.error("Failed to load item:", error);
        }
    }

    useEffect(() => {
        onLoadItem()
    }, [])

    if (!item) {
        return <div>Loading...</div>;
    }


    return (
        <PageBackground>
            <PageLayout>
                <InputWrap>
                    <PreviewImage
                        src={item.imageUrl}/>
                    <InputRow
                        label={"제품 이름"}
                        value={item.name}
                        onChange={v => setItem({...item!, name: v})}
                        type={"text"}/>

                    <InputRow
                        label={"촬영 날짜"}
                        value={item.registerDate}
                        onChange={v => setItem({...item!, registerDate: v})}
                        type={"date"}
                        readOnly
                    />

                    <InputRow
                        label={"유통 기한"}
                        value={item.expireDate}
                        onChange={v => setItem({...item!, expireDate: v})}
                        type={"date"}
                    />
                </InputWrap>
            </PageLayout>
        </PageBackground>
    );
};