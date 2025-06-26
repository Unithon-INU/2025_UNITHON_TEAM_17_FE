import type {FC, FormEvent} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {InputRow} from "../../components/InputRow";
import {useEffect, useState} from "react";
import {Location} from "../../type/Warehouse";
import {useWarehouse} from "../../hooks/useWarehouse";
import {NavHeader} from "../../components/NavHeader";
import {Button} from "../../components/common/Button";
import {RoutePath} from "../../RoutePath";
import styled from "styled-components";

const Form = styled.form`
  padding: 16px;
  
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const EditLocation: FC = () => {
    // const navigate = useNavigate();
    // const {id} = useParams()
    // const {getLocation, updateLocation} = useWarehouse()
    // const [location, setLocation] = useState<Location | null>(null);

    // const onLoadLocation = async () => {
    //     const foundLocation = await getLocation(Number(id));
    //     setLocation(foundLocation);
    // }

    // const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     try {
    //         const updatedLocations = await updateLocation(location!!.id, location!!);
    //         navigate(RoutePath.warehouseDetail(id), {replace: true})
    //     } catch (e) {
    //         console.error("장소 수정 중 오류 발생:", e)
    //     }
    // }

    // useEffect(() => {
    //     onLoadLocation()
    // }, [])

    // if (!location) {
    //     return "장소를 불러오는 중입니다..."
    // }

    return (
        <PageBackground>
            <PageLayout>
                장소수정
                {/* <NavHeader title={"장소 수정"} backButton={true}/>

                <Form onSubmit={(e) => onSubmit(e)}>
                    <InputRow
                        value={location.name}
                        onChange={v => setLocation({...location!!, name: v})}
                        label={"장소 이름"}
                    />

                    <Button onClick={() => onSubmit(e)}>수정</Button>
                </Form> */}

            </PageLayout>
        </PageBackground>
    );
};