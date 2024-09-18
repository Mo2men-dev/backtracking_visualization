import React, {createContext, ReactNode, useContext} from "react";

export type IntialStateType = {
    initalGrid: number[][],
    initalGridCopy: number[][],
    gridSize: number,
    animate: boolean,
    currCell: { r: number, c: number },
    steps: { cell: { r: number, c: number }, grid: number[][] }[],
    currAnimationIndx: number,
    animationSpeed: number,
    animationDone: boolean,
    pause: boolean,
    problem: string,
}

interface StateProviderProps {
    children: ReactNode;
}

const initalState: IntialStateType = {
    initalGrid: [],
    initalGridCopy: [],
    gridSize: 9,
    animate: false,
    currCell: { r: 0, c: 0 },
    steps: [],
    currAnimationIndx: 0,
    animationSpeed: 250,
    animationDone: false,
    pause: true,
    problem: "sudoko",
}

const GlobalStateContext = createContext(initalState)
export const useGlobalState = () => useContext(GlobalStateContext)

export const GlobalStateProvider: React.FC<StateProviderProps> = ({ children }) => {
    return (
        <GlobalStateContext.Provider value={initalState}>
            {children}
        </GlobalStateContext.Provider>
    )
}