import type { FC } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { guideSlides } from "../../data/guideData"; // guideSlides 불러오기
import { PageBackground, PageLayout } from "../../styles/PageLayout";
import { NavHeader } from "../../components/NavHeader";
import { useSwipeable } from "react-swipeable";

export const GuideDetailPage: FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const [pageIndex, setPageIndex] = useState(0);

  const slides = guideSlides[topic ?? ""];
  if (!slides) return <div>존재하지 않는 가이드입니다.</div>;

  const isLast = pageIndex === slides.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isLast) setPageIndex((p) => p + 1);
    },
    onSwipedRight: () => {
      if (pageIndex > 0) setPageIndex((p) => p - 1);
    },
    trackMouse: true,
  });

  const handleGo = () => {
    if (topic === "register") navigate("/home/warehouse");
    else if (topic === "trade") navigate("/home/main");
  };

  return (
    <PageBackground>
      <PageLayout>
        <PaddedLayout {...handlers}>
          <NavHeader title=""   onLeftClick ={() => navigate("/home/guide")} />

          <Title>{slides[pageIndex].title}</Title>
          <Image src={slides[pageIndex].image} alt="guide" />

          <Description1>
            {slides[pageIndex].description1.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Description1>

          <Description2>
            {slides[pageIndex].description2.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Description2>

          <Dots>
            {slides.map((_, i) => (
              <Dot key={i} active={i === pageIndex} />
            ))}
          </Dots>

          {slides[pageIndex].showButton && (
            <GoButton onClick={handleGo}>바로 이동하기</GoButton>
          )}
        </PaddedLayout>
      </PageLayout>
    </PageBackground>
  );
};

const PaddedLayout = styled(PageLayout)`
  padding: 2.5rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 3.5rem;
  margin-bottom: 3rem;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  background: #ddd;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const Description1 = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 50px;
`;

const Description2 = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 50px;
  font-weight: 550;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 5.5rem 0;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#5bc466" : "#ccc")};
`;

const GoButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #5bc466;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
`;
