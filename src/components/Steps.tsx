import React, { useEffect, useRef } from "react";
import { stepType } from "../utils/styling";
import { useGlobalDispatch, useGlobalState } from "../context/state";

function Steps() {
	const globalState = useGlobalState();
    const dispatch = useGlobalDispatch()

	const [stepsDescription, setStepsDescription] = React.useState<{ type: string; text: string }[]>([]);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (globalState.steps.length !== 0 && globalState.currAnimationIndx !== 0) {
			bottomRef.current?.scrollIntoView({ behavior: "instant" });
			setStepsDescription([
				...stepsDescription,
				globalState.steps[globalState.currAnimationIndx].description,
			]);
		}

		if (globalState.currAnimationIndx === 0) {  
			setStepsDescription([]);
		}

	}, [globalState.currAnimationIndx]);

    return (
        stepsDescription.length === 0 ? <span className="text-xs w-full h-full flex justify-center items-center">None</span> : stepsDescription.map((step, i) => {
			return (
				<div
					key={i}
					ref={bottomRef}
                    onClick={() => {
                        if (i === globalState.currAnimationIndx) return;
                        if (!globalState.pause) globalState.pause = true;
                        globalState.currAnimationIndx = i;
                        dispatch({ type: 'SET_CURRENT_GRID', payload: globalState.steps[i].grid });
                        dispatch({ type: 'SET_CURR_CELL', payload: globalState.steps[i].cell });
                        setStepsDescription(stepsDescription.slice(0, i + 1));
                    }}
					className="text-sm p-2 bg-[#403d39] my-1 rounded-md cursor-pointer">
					Step: {i + 1}
					<span className={`flex justify-between items-center font-bold select-none ${stepType(step.type)}`}>
						{step.text}
					</span>
				</div>
			);
		})
    );

}

export default Steps;