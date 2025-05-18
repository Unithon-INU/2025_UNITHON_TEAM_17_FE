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
