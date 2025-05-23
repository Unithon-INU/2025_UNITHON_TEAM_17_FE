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
}

export const mockOfferings: Offering[] = [
    {
        id: 1,
        name: "유기농 사과",
        type: "직거래",
        sellerName: "과일나라",
        costPrice: 1000,
        salePrice: 1500,
        createdAt: "2025-05-01T10:15:00",
        imageUrls: [image1,image1,image1],
        quantity : '3',
        place : '',
    },
    {
        id: 2,
        name: "도시락 김",
        type: "마트",
        sellerName: "바다마트",
        costPrice: 500,
        salePrice: 1000,
        createdAt: "2025-05-02T09:00:00",
        imageUrls: [image1,image1],
        quantity : '3',
        place : '인천대학교입구',
    },
    {
        id: 3,
        name: "무항생제 계란",
        type: "직거래",
        sellerName: "건강팜",
        costPrice: 2500,
        salePrice: 3200,
        createdAt: "2025-05-03T14:45:00",
        imageUrls: [image1],
        quantity : '3',
        place : '',
    },
    {
        id: 4,
        name: "수제 요거트",
        type: "카페",
        sellerName: "헬씨푸드",
        costPrice: 1200,
        salePrice: 1800,
        createdAt: "2025-05-04T08:30:00",
        imageUrls: [image1],
        quantity : '3',
        place : '',
    },
    {
        id:5,
        name: "비건 샐러드",
        type: "음식점",
        sellerName: "그린마켓",
        costPrice: 3000,
        salePrice: 4200,
        createdAt: "2025-05-05T12:00:00",
        imageUrls: [image1],
        quantity : '3',
        place : '',
    },
];
