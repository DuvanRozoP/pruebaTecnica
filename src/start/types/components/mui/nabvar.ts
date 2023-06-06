import { MutableRefObject } from 'react';

type TPagesNabvar = {
  name: string;
  path: string;
};

export interface INavbarProps {
  pages: TPagesNabvar[];
  settings: string[];
  handleSearch?: (value: string) => void;
}

export type INavbarRef = MutableRefObject<string>;
