export interface Location {
    name: string;
    description: string;
    productCount: number;
    imageUrl?: string;
  }
  
  export interface Product {
    name: string;
    location: string;
    takenAt: string;
    expirationDate: string;
    isNotified: boolean;
    imageUrl?: string;
  }
  
  export const mockLocations: Location[] = [
    {
      name: "냉장고",
      description: "우리집 냉장고 & 냉동실",
      productCount: 4,
      imageUrl: '',
    },
    {
      name: "화장실",
      description: "우리집 화장실",
      productCount: 2,
      imageUrl: '',
    },
    {
      name: "거실",
      description: "우리집 거실 & 강아지 사료",
      productCount: 1,
      imageUrl: '',
    }
  ];
  
  export const mockProducts: Product[] = [
    {
      name: "불닭소스1",
      location: "냉장고",
      takenAt: "2024.04.02",
      expirationDate: "2025.06.01",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "불닭소스2",
      location: "냉장고",
      takenAt: "2024.05.02",
      expirationDate: "2025.06.24",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "불닭소스3",
      location: "냉장고",
      takenAt: "2024.05.10",
      expirationDate: "2025.07.01",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "크보빵",
      location: "냉장고",
      takenAt: "2025.05.03",
      expirationDate: "2025.05.30",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "샴푸",
      location: "화장실",
      takenAt: "2024.10.24",
      expirationDate: "2025.05.20",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "폼클렌징",
      location: "화장실",
      takenAt: "2024.12.24",
      expirationDate: "2025.05.25",
      isNotified: true,
      imageUrl: '',
    },
    {
      name: "강아지사료",
      location: "거실",
      takenAt: "2024.10.24",
      expirationDate: "2025.06.03",
      isNotified: true,
      imageUrl: '',
    }
  ];