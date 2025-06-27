export type SlideContent = {
  title: string;
  image: string;
  description1: string[];
  description2: string[];
  showButton?: boolean;
};

export const guideSlides: Record<string, SlideContent[]> = {
  keepbara: [
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/guide/keepbara1.png",
      description1: [
        "키피바라는 'Keep'과 'Capybara'의 합성어로",
        "소비자들이 유통기한이 임박한 제품을 놓치지 않도록 도와주는 앱이에요.",
      ],
      description2: [],
    },
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/guide/keepbara2.png",
      description1: [
        "키피바라에서는 물건 관리와 상품 거래를 할 수 있어요.",
      ],
      description2: [
        "[거래 기능] : 유통기한 임박 상품을 저렴하게 등록하고 직접 거래할 수 있어요.",
        "[물건 관리] : 장소별 정리 + 바코드 촬영으로 유통기한 관리할 수 있어요.",
      ],
    },
    {
      title: "키피바라는 무슨 앱인가요?",
      image: "/src/assets/guide/keepbara3.png",
      description1: [
        "키피바라와 함께 유통기한 임박 상품을 똑똑하게 관리하고",
        "지구 자원 절약도, 환경 보호도 시작해보세요!",
      ],
      description2: [],
    },
  ],
  register: [
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/guide/register1.png",
      description1: [
        "유통기한 등록은 창고 화면에서 등록할 수 있어요.",
      ],
      description2: [
        "[화면 하단바의 창고 버튼 클릭]",
      ],
    },
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/guide/register2.png",
      description1: [
        "등록하고 싶은 상품이 위치한 장소에 들어가요. 등록할 상품이 음식이면 냉장고, 샴푸면 화장실을 눌러요 !",
      ],
      description2: [
        "[등록할 장소 클릭]",
      ],
    },
    {
      title: "유통기한 등록은 어디서 할 수 있나요?",
      image: "/src/assets/guide/register3.png",
      description1: [
        "상단의 카메라 버튼을 눌러서 상품의 유통기한을 입력할 수 있어요!",
      ],
      description2: [
        "[상단 카메라 버튼 클릭]",
      ],
      showButton: true,
    },
  ],
  trade: [
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/guide/trade1.png",
      description1: [
        "상품 거래는 메인에서 할 수 있어요.",
      ],
      description2: [
        "[화면 하단바의 홈 버튼 클릭]",
      ],
    },
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/guide/trade2.png",
      description1: [
        "원하는 상품을 누르면 상세 설명이 나와요.",
        "해당 게시글의 오픈 채팅방 링크로 문의하면 돼요!",
      ],
      description2: [
        "[원하는 상품 클릭]",
      ],
    },
    {
      title: "어떻게 상품을 거래하나요?",
      image: "/src/assets/guide/trade3.png",
      description1: [
        "상단 아이콘을 클릭하여 글을 작성하고,",
        "오픈 채팅방 링크를 붙여넣으면 구매자들이 문의할 수 있어요.",
      ],
      description2: [
         "[상단의 작성 아이콘 클릭]",
      ],
      showButton: true,
    },
  ],
};
