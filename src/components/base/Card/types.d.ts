import { ReactNode } from 'react';
export interface ICard {
    children?: ReactNode,
    hero?: () => ReactNode,
    title?: string,
}