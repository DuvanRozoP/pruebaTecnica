import { ReactNode } from 'react';

export interface IMainNavbar {
  children: ReactNode;
  callBack?: (value: string) => void;
}
