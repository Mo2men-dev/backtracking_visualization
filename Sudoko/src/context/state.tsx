import React, {createContext, ReactNode, useContext} from "react";

type IntialStateType = {
    initalGrid: number[][],
    initalGridCopy: number[][],
    animate: boolean,
    currCell: { r: number, c: number },
    steps: { cell: { r: number, c: number }, grid: number[][] }[],
    currAnimationIndx: number,
    animationSpeed: number,
    pause: boolean,
    problem: string,
}

interface StateProviderProps {
    children: ReactNode;
}

const initalState: IntialStateType = {
    initalGrid: [],
    initalGridCopy: [],
    animate: false,
    currCell: { r: 0, c: 0 },
    steps: [],
    currAnimationIndx: 0,
    animationSpeed: 250,
    pause: true,
    problem: "Sudoko",
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