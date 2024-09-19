export type StateAction =
    | SetInitialGridAction
    | SetInitialGridCopyAction
    | SetCurrentGridAction
    | SetGridSizeAction
    | SetPauseAction
    | SetCurrAnimationIndxAction
    | SetStepsAction
    | SetAnimationSpeedAction
    | SetCurrCellAction
    | SetAnimationDoneAction
    | SetAnimateAction
    | AddStepAction;

interface SetInitialGridAction {
    type: 'SET_INITIAL_GRID';
    payload: number[][];
}

interface SetInitialGridCopyAction {
    type: 'SET_INITIAL_GRID_COPY';
    payload: number[][];
}

interface SetCurrentGridAction {
    type: 'SET_CURRENT_GRID';
    payload: number[][];
}

interface SetGridSizeAction {
    type: 'SET_GRID_SIZE';
    payload: number;
}

interface SetPauseAction {
    type: 'SET_PAUSE';
    payload: boolean;
}

interface SetCurrAnimationIndxAction {
    type: 'SET_CURR_ANIMATION_INDX';
    payload: number;
}

interface SetStepsAction {
    type: 'SET_STEPS';
    payload: { cell: { r: number, c: number }, grid: number[][] }[];
}

interface SetAnimationSpeedAction {
    type: 'SET_ANIMATION_SPEED';
    payload: number;
}

interface SetCurrCellAction {
    type: 'SET_CURR_CELL';
    payload: { r: number, c: number };
}

interface SetAnimationDoneAction {
    type: 'SET_ANIMATION_DONE';
    payload: boolean;
}

interface SetAnimateAction {
    type: 'SET_ANIMATE';
    payload: boolean;
}

interface AddStepAction {
    type: 'ADD_STEP';
    payload: { cell: { r: number, c: number }, grid: number[][] };
}