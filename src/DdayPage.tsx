import {FC, useEffect, useState} from "react";
import {PageBackground, PageLayout} from "./styles/PageLayout";
import {NavHeader} from "./components/NavHeader";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {DdayItem, useWarehouse} from "./hooks/useWarehouse";
import {Item} from "./type/item";
import {RoutePath} from "./RoutePath";

export type DdayPageProps = {}
const DdayPageStyle = styled.div`

`
export const DdayPage: FC<DdayPageProps> = () => {
    const navigate = useNavigate()
    const {getDdayItem} = useWarehouse()
    const [items, setItems] = useState<DdayItem[]>([])


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

                <div
                    style={{
                        padding: "1.5rem",
                        marginBottom: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {items.map((product) => (
                        <div style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "1.2rem",
                            padding: 20,
                        }}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1.2rem"
                            }}>
                                <div
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: "50%",
                                        backgroundColor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {/*<img src={product.imageUrl} alt={product.name}*/}
                                    {/*     style={{width: 60, height: 60}}/>*/}
                                </div>

                                <div>
                                    <div style={{fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.2rem"}}>
                                        {product.name}
                                    </div>
                                    <div style={{color: "#999", fontSize: "1rem", marginBottom: "0.6rem"}}>
                                        {product.expireDate}까지
                                    </div>
                                    <div style={{fontWeight: "500"}}>
                                        <Link to={RoutePath.itemUpdate(product.itemId)}>수정하기 &gt;</Link>
                                    </div>
                                </div>

                            </div>

                            <span
                                style={{
                                    backgroundColor:
                                        product.daysLeft <= 7
                                            ? "#FF6B6B"
                                            : product.daysLeft <= 30
                                                ? "#FFB800"
                                                : "#00C4B3",
                                    color: "white",
                                    padding: "0.8rem 1.4rem",
                                    borderRadius: "2rem",
                                    fontWeight: "bold",
                                    fontSize: "1rem",
                                    whiteSpace: "nowrap",
                                }}
                            >
                    {product.daysLeft}일 남음
                        </span>
                        </div>
                    ))}
                </div>
            </PageLayout>
        </PageBackground>
    );
};