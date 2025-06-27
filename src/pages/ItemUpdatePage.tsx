import styled from "styled-components";
import {FC, useEffect, useState} from "react";
import {PageBackground, PageLayout} from "../styles/PageLayout";
import {useAsyncError, useNavigate, useParams} from "react-router-dom";
import {Item, UpdateItemReq} from "../type/item";
import {useWarehouse} from "../hooks/useWarehouse";
import {InputRow} from "../components/InputRow";
import {usePreviewImage} from "../hooks/UsePreviewImage";
import {NavHeader} from "../components/NavHeader";
import {Update} from "vite";
import {Button} from "../components/common/Button";

export type ItemUpdatePageProps = {}

const Form = styled.form`
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  padding: 41px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 138px;
  height: 138px;
  object-fit: cover;
  border-radius: 100%;
  margin: 0 auto;
`;

const Description = styled.textarea`
  min-height: 200px;

  font-size: 16px;
  font-weight: 500;
  padding: 20px;
  resize: none;

  border: 1px solid #000;
  border-radius: 15px;
`

const InputWrap = styled.div`
  flex: 1;
  
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const ItemUpdatePage: FC<ItemUpdatePageProps> = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const {getItem, updateItem, deleteItem} = useWarehouse();
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

    const onSubmit = async () => {
        try{
            if (!item) return;

            await updateItem(item.id, item as UpdateItemReq);
            navigate(-1, {replace: true});
        }
        catch (e) {
            console.error("Failed to update item:", e)
        }
    }

    const onDelete = async () => {
        try {
            if (!item) return;

            await deleteItem(item.id);
            navigate(-1, {replace: true});
        } catch (error) {
            console.error("Failed to delete item:", error);
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
                <NavHeader
                    title={"제품 수정"}
                    rightIcon={
                        <div onClick={() => onSubmit()}>완료</div>
                    }
                />
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
                    <Button background={"#FF5D5D"} onClick={() => onDelete()}>삭제</Button>
                </InputWrap>
            </PageLayout>
        </PageBackground>
    );
};