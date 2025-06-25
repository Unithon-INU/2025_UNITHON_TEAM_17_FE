export type SlideContent = {
  title: string;
  image: string;
  description: string[];
  showButton?: boolean;
};

export const guideSlides: Record<string, SlideContent[]> = {
  keepbara: [
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "키피바라는 'Keep'과 'Capybara'의 합성어로,",
        "소비자들이 유통기한이 임박한 제품을 놓치지 않도록 도와주는 앱이에요.",
      ],
    },
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "키피바라에서는 물건 관리와 거래를 할 수 있어요.",
        "[거래 기능] - 유통기한 임박 상품을 저렴하게 등록하고 직접 거래",
        "[물건 관리] - 장소별 정리 + 바코드 촬영으로 유통기한 관리",
      ],
    },
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "오늘 당신의 작은 실천이,",
        "내일 지구의 큰 변화를 만듭니다.",
        "키피바라와 함께 유통기한 임박 상품을 똑똑하게 관리하고 절약도 환경 보호도 시작해보세요!",
      ],
    },
  ],
  register: [
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "유통기한 등록은 창고 화면에서 등록할 수 있어요.",
        "[화면 하단바의 창고 버튼 클릭]",
      ],
    },
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "등록하고 싶은 상품이 위치한 장소에 들어가요. 예: 냉장고, 화장실 등",
        "[등록할 장소 클릭]",
      ],
    },
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "상단의 카메라 버튼을 눌러서 상품의 유통기한을 입력할 수 있어요!",
        "[상단 카메라 버튼 클릭]",
      ],
      showButton: true,
    },
  ],
  trade: [
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "상품 거래는 메인에서 할 수 있어요.",
        "[화면 하단바의 홈 버튼 클릭]",
      ],
    },
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "원하는 상품을 누르면 상세 설명이 나와요.",
        "해당 게시글의 오픈 채팅방 링크로 문의하면 돼요!",
        "[원하는 상품 클릭]",
      ],
    },
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/empty_bear.png",
      description: [
        "상단 아이콘을 클릭하여 글을 작성하고,",
        "오픈 채팅방 링크를 붙여넣으면 구매자들이 문의할 수 있어요.",
        "[상단의 작성 아이콘 클릭]",
      ],
      showButton: true,
    },
  ],
};
