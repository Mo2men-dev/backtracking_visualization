import { ReactNode } from "react";

export type IntialStateType = {
    initalGrid: number[][],
    initalGridCopy: number[][],
    currentGrid: number[][],
    gridSize: number,
    animate: boolean,
    currCell: { r: number, c: number },
    steps: { cell: { r: number, c: number }, grid: number[][] }[],
    currAnimationIndx: number,
    sudokuDifficulty: number,
    animationSpeed: number,
    animationDone: boolean,
    pause: boolean,
    problem: string,
}

export interface StateProviderProps {
    children: ReactNode;
}