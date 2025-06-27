// components/OnboardingPopup.tsx
import styled from "styled-components";
import bearImage from "../assets/Onboarding.png";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999; // 높임
`;

const PopupBox = styled.div`
  position: fixed; // absolute → fixed로 변경
  bottom: 300px; // 조금 더 위로 띄움 (필요시 조절)
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px 24px; // 크기 키움
  border-radius: 16px;
  font-weight: 700;
  font-size: 18px; // 글씨 키움
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 10000; // 더 높게
`;

const BearImage = styled.img`
  position: fixed; // absolute → fixed
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px; // 기존보다 큼
  z-index: 9999;
`;

interface Props {
  onClose: () => void;
}

export const OnboardingPopup: React.FC<Props> = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <PopupBox>
        키피바라가 처음이라면<br />
        하단바 제일 왼쪽의 [가이드] 먼저 보기!
      </PopupBox>
      <BearImage src={bearImage} alt="bear" />
    </Overlay>
  );
};
