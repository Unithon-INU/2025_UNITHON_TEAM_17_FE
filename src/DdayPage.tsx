import {FC, useEffect, useState} from "react";
import {PageBackground, PageLayout} from "./styles/PageLayout";
import {NavHeader} from "./components/NavHeader";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useWarehouse} from "./hooks/useWarehouse";
import {Item} from "./type/item";

export type DdayPageProps = {}
const DdayPageStyle = styled.div`

`
export const DdayPage: FC<DdayPageProps> = () => {
    const navigate = useNavigate()
    const {getDdayItem} = useWarehouse()
    const [items, setItems] = useState<Item[]>([])


    useEffect(() => {
        getDdayItem().then(setItems)
    }, [])


    return (
        <PageBackground>
            <PageLayout>
                <NavHeader
                    title="D - 14"
                    onLeftClick={() => {
                        navigate(-1, {replace: true})
                    }}
                />

                {items.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>유통기한: {item.expireDate}</p>
                    </div>
                ))}
            </PageLayout>
        </PageBackground>
    );
};