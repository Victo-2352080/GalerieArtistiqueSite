import React, { useState } from 'react';
import type { IOeuvre } from '../models/iOeuvre.model';

export interface IFavorisOeuvre extends IOeuvre {}

export type GalerieContextType = {
  oeuvreFavoris: IFavorisOeuvre[];
  favorisOuvert: boolean;
  setFavorisOeuvre: React.Dispatch<React.SetStateAction<IFavorisOeuvre[]>>;
  setFavorisOuvert: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavorisVide: IFavorisOeuvre[] = [];

export const FavorisContext = React.createContext<GalerieContextType>({
  oeuvreFavoris: FavorisVide,
  favorisOuvert: false,
  setFavorisOeuvre: () => {},
  setFavorisOuvert: () => {},
});

export default function FavorisProvider(props: any) {
  const [oeuvreFavoris, setFavorisOeuvre] =
    useState<IFavorisOeuvre[]>(FavorisVide);
  const [favorisOuvert, setFavorisOuvert] = useState(false);

  const values = {
    oeuvreFavoris,
    favorisOuvert,
    setFavorisOeuvre,
    setFavorisOuvert,
  };

  return (
    <FavorisContext.Provider value={values}>
      {props.children}
    </FavorisContext.Provider>
  );
}
