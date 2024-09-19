import React, {createContext, useReducer, useContext, Dispatch} from "react";
import { IntialStateType, StateProviderProps } from "../types/state";
import { StateAction } from "../types/actions";

const initalState: IntialStateType = {
    initalGrid: [],
    initalGridCopy: [],
    currentGrid: [],
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
const GlobalDispatchContext = createContext<Dispatch<any>>(() => {})

const reducer = (state: IntialStateType, action: StateAction): IntialStateType => {
    switch (action.type) {
        case 'SET_INITIAL_GRID':
            return { ...state, initalGrid: action.payload };
        case 'SET_INITIAL_GRID_COPY':
            return { ...state, initalGridCopy: action.payload };
        case 'SET_CURRENT_GRID':
            return { ...state, currentGrid: action.payload };
        case 'SET_GRID_SIZE':
            return { ...state, gridSize: action.payload };
        case 'SET_PAUSE':
            return { ...state, pause: action.payload };
        case 'SET_CURR_ANIMATION_INDX':
            return { ...state, currAnimationIndx: action.payload };
        case 'SET_STEPS':
            return { ...state, steps: action.payload };
        case 'SET_ANIMATION_SPEED':
            return { ...state, animationSpeed: action.payload };
        case 'SET_CURR_CELL':
            return { ...state, currCell: action.payload };
        case 'SET_ANIMATION_DONE':
            return { ...state, animationDone: action.payload };
        case 'SET_ANIMATE':
            return { ...state, animate: action.payload };
        case 'ADD_STEP':
            return { ...state, steps: [...state.steps, action.payload] };
        default:
            return state;
    }
};

export const GlobalStateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    )
}


export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalDispatch = () => useContext(GlobalDispatchContext)