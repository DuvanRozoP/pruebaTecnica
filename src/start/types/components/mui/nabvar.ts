import { MutableRefObject } from 'react';

type TPagesNabvar = {
  name: string;
  path: string;
};

export interface INavbarProps {
  pages: TPagesNabvar[];
  settings: string[];
}

export type INavbarRef = MutableRefObject<string>;
