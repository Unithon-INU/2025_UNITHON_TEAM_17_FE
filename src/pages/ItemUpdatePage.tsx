import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useAsyncError, useParams} from "react-router-dom";
import {Item} from "../type/item";
import {useWarehouse} from "../hooks/useWarehouse";

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

    if(!item) {
        return <div>Loading...</div>;
    }


    return (
        <PageBackground>
            <PageLayout>
                {id}
                <PreviewImage src={item.imageUrl}/>
                {item.name}
            </PageLayout>
        </PageBackground>
    );
};