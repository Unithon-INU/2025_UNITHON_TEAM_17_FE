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
    name: string;          // 상품 이름
    type: string;          // 상품 종류
    sellerName: string;    // 판매자 이름
    costPrice: number;     // 원가
    salePrice: number;     // 판매가
    createdAt: string;       // 작성 일시
    imageUrls: string[];      // 썸네일
    quantity : string;
    place : string;
    description: string;
    hasBadge: boolean;
    badgeText?: string;

}

export const mockOfferings: Offering[] = [
  {
    id: 1,
    name: "먼치킨",
    type: "카페",
    sellerName: "김바보님",
    costPrice: 5000,
    salePrice: 2500,
    createdAt: "1시간 전",
    imageUrls: [image1, image1, image1],
    quantity: "2",
    place: "",
    description: "먼치킨 팝니다! 갓 나온 도넛이에요 🍩",
    hasBadge: true,
    badgeText: "던킨도너츠 인천대점 인증",
  },
  {
    id: 2,
    name: "케이크",
    type: "카페",
    sellerName: "제빵왕님",
    costPrice: 15000,
    salePrice: 5300,
    createdAt: "2시간 전",
    imageUrls: [image1, image1],
    quantity: "1",
    place: "",
    description: "맛있는 케이크 판매합니다 🎂 유통기한 임박!",
    hasBadge: true,
    badgeText: "맛있는 케이크 인천대점 인증",
  },
  {
    id: 3,
    name: "블루베리 요거트",
    type: "카페",
    sellerName: "헬씨마켓",
    costPrice: 3500,
    salePrice: 2200,
    createdAt: "30분 전",
    imageUrls: [image1],
    quantity: "5",
    place: "",
    description: "저당 요거트에 블루베리 가득! 당일 생산품입니다.",
    hasBadge: false,
  },
  {
    id: 4,
    name: "무항생제 달걀 10구",
    type: "직거래",
    sellerName: "건강팜",
    costPrice: 4500,
    salePrice: 3000,
    createdAt: "어제",
    imageUrls: [image1],
    quantity: "2",
    place: "",
    description: "무항생제 인증 달걀입니다! 직접 수거한 상품이에요.",
    hasBadge: true,
    badgeText: "친환경 농가 인증",
  },
  {
    id: 5,
    name: "유기농 사과 3개입",
    type: "직거래",
    sellerName: "과일나라",
    costPrice: 3000,
    salePrice: 1800,
    createdAt: "2일 전",
    imageUrls: [image1],
    quantity: "1",
    place: "",
    description: "제주산 유기농 사과, 아삭하고 달콤합니다 🍎",
    hasBadge: false,
  }
];
