import image1 from "../assets/mock/불닭소스1.png";
import image2 from "../assets/mock/크보빵.png";
import image3 from "../assets/mock/강아지사료.png";
import image4 from "../assets/mock/녹차티백.png";
import image5 from "../assets/mock/샴푸.png";
import image6 from "../assets/mock/폼클렌징.png";

export interface Location {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  locationId: string;
  takenAt: string;
  expirationDate: string;
  isNotified: boolean;
  imageUrl?: string;
}

export const mockLocations: Location[] = [
  {
    id: "1",
    name: "냉장고",
    description: "우리집 냉장고 & 냉동실",
    imageUrl: "",
  },
  {
    id: "2",
    name: "화장실",
    description: "우리집 화장실",
    imageUrl: "",
  },
  {
    id: "3",
    name: "거실",
    description: "우리집 거실 & 강아지 사료",
    imageUrl: "",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "불닭소스1",
    locationId: "1",
    takenAt: "2024.04.02",
    expirationDate: "2025.06.01",
    isNotified: true,
    imageUrl: image1,
  },
  {
    id: "2",
    name: "불닭소스2",
    locationId: "1",
    takenAt: "2024.05.02",
    expirationDate: "2025.06.24",
    isNotified: true,
    imageUrl: image1,
  },
  {
    id: "3",
    name: "불닭소스3",
    locationId: "1",
    takenAt: "2024.05.10",
    expirationDate: "2025.07.01",
    isNotified: true,
    imageUrl: image1,
  },
  {
    id: "4",
    name: "크보빵",
    locationId: "1",
    takenAt: "2025.05.03",
    expirationDate: "2025.05.30",
    isNotified: true,
    imageUrl: image2,
  },
  {
    id: "5",
    name: "샴푸",
    locationId: "2",
    takenAt: "2024.10.24",
    expirationDate: "2025.05.20",
    isNotified: true,
    imageUrl: image5,
  },
  {
    id: "6",
    name: "폼클렌징",
    locationId: "2",
    takenAt: "2024.12.24",
    expirationDate: "2025.05.25",
    isNotified: true,
    imageUrl: image6,
  },
  {
    id: "7",
    name: "강아지사료",
    locationId: "3",
    takenAt: "2024.10.24",
    expirationDate: "2025.06.03",
    isNotified: true,
    imageUrl: image3,
  },
  {
    id: "8",
    name: "녹차티백",
    locationId: "3",
    takenAt: "2024.07.24",
    expirationDate: "2025.06.24",
    isNotified: true,
    imageUrl: image4,
  },
];

export interface Offering {
  id: number;
  name: string;           // 제목
  type: string;           // "가게" | "직거래"
  sellerName: string;     // 판매자 이름
  costPrice: number;      // 원가
  salePrice: number;      // 판매금액
  quantity: number;       // 수량
  place: string;          // 거래장소
  description: string;    // 설명
  openChatUrl: string;    // 오픈채팅 URL
  createdAt: string;      // 작성일시
  imageUrls: string[];    // 이미지
}

export const mockOfferings: Offering[] = [
  {
    id: 1,
    name: "먼치킨 도넛",
    type: "가게",
    sellerName: "김바보님",
    costPrice: 5000,
    salePrice: 2500,
    quantity: 2,
    place: "송도 5공학관 앞",
    description: "갓 나온 먼치킨 도넛입니다. 배송불가, 직수령 부탁드립니다!",
    openChatUrl: "https://open.kakao.com/o/abc123",
    createdAt: "1시간 전",
    imageUrls: [image1, image1, image1],
  },
  {
    id: 2,
    name: "맛있는 케이크",
    type: "가게",
    sellerName: "제빵왕님",
    costPrice: 15000,
    salePrice: 5300,
    quantity: 1,
    place: "송도 3캠퍼스 정문",
    description: "유통기한 임박! 맛있는 케이크 저렴하게 드립니다 🎂",
    openChatUrl: "https://open.kakao.com/o/def456",
    createdAt: "2시간 전",
    imageUrls: [image1, image1],
  },
  {
    id: 3,
    name: "블루베리 요거트",
    type: "가게",
    sellerName: "헬씨마켓",
    costPrice: 3500,
    salePrice: 2200,
    quantity: 5,
    place: "송도 2캠퍼스",
    description: "저당 요거트에 블루베리 가득! 당일 생산품입니다.",
    openChatUrl: "https://open.kakao.com/o/ghi789",
    createdAt: "30분 전",
    imageUrls: [image1],
  },
  {
    id: 4,
    name: "무항생제 달걀 10구",
    type: "직거래",
    sellerName: "건강팜",
    costPrice: 4500,
    salePrice: 3000,
    quantity: 2,
    place: "송도 중앙공원 입구",
    description: "무항생제 인증 달걀입니다! 직접 수거한 상품이에요.",
    openChatUrl: "https://open.kakao.com/o/jkl012",
    createdAt: "어제",
    imageUrls: [image1],
  },
  {
    id: 5,
    name: "유기농 사과 3개입",
    type: "직거래",
    sellerName: "과일나라",
    costPrice: 3000,
    salePrice: 1800,
    quantity: 1,
    place: "송도 도서관 앞",
    description: "제주산 유기농 사과, 아삭하고 달콤합니다 🍎",
    openChatUrl: "https://open.kakao.com/o/mno345",
    createdAt: "2일 전",
    imageUrls: [image1],
  }
];