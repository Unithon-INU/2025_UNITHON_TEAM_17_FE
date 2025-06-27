import type {FC, FormEvent} from "react";
import {PageBackground, PageLayout} from "../../styles/PageLayout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {InputRow} from "../../components/InputRow";
import {useEffect, useState} from "react";
import {EditLocationReq, Location} from "../../type/Warehouse";
import {useWarehouse} from "../../hooks/useWarehouse";
import {NavHeader} from "../../components/NavHeader";
import {Button} from "../../components/common/Button";
import {RoutePath} from "../../RoutePath";
import styled from "styled-components";
import {usePreviewImage} from "../../hooks/UsePreviewImage";

const Form = styled.form`
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageCircle = styled.label`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.8rem;
  overflow: hidden;
  cursor: pointer;
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

export const EditLocation: FC = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const {getLocation, updateLocation} = useWarehouse()

    const [location, setLocation] = useState<Location | null>(null);
    const {file: image, onFileChange, previewUrl} = usePreviewImage(null)

    const onLoadLocation = async () => {
        const foundLocation = await getLocation(Number(id));
        setLocation(foundLocation);
    }

    const onSubmit = async () => {
        try {
            const req: EditLocationReq = {...(location as EditLocationReq), image: image!!};
            const updatedLocations = await updateLocation(location!!.id, req);
            navigate(RoutePath.warehouseDetail(id), {replace: true})
        } catch (e) {
            console.error("장소 수정 중 오류 발생:", e)
        }
    }

    useEffect(() => {
        onLoadLocation()
    }, [])

    if (!location) {
        return "장소를 불러오는 중입니다..."
    }

    return (
        <PageBackground>
            <PageLayout>
                <NavHeader
                    title={"장소 수정"}
                    backButton={true}
                    rightIcon={
                        <div onClick={() => onSubmit()}>수정</div>
                    }
                />

                <Form>
                    <input type="file" id="zz" hidden onChange={onFileChange}/>
                    <Label htmlFor={"zz"}>
                        <PreviewImage
                            src={previewUrl ? previewUrl : `https://keepbara.duckdns.org${location.imagePath}`}
                        />
                        <span>사진 수정</span>
                    </Label>
                    <InputRow
                        value={location.name}
                        onChange={v => setLocation({...location!!, name: v})}
                        label={"장소 이름"}
                    />
                    <Description
                        onChange={e => setLocation({...location!!, description: e.target.value})}
                    >
                        {location.description}
                    </Description>
                </Form>

            </PageLayout>
        </PageBackground>
    );
};