import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

interface FavoriteContextProps {
  favorites: number[];  // 좋아요 누른 offering id 목록
  toggleFavorite: (id: number) => void;  // id 클릭 시 추가/제거
}

// context 생성
const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

// custom hook
export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorites must be used within a FavoriteProvider");
  return context;
};

// provider 컴포넌트
export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
