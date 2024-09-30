import React, { useEffect, useRef } from "react";
import { stepType } from "../utils/styling";
import { useGlobalState } from "../context/state";

function Steps() {
	const globalState = useGlobalState();
	const [stepsDescription, setStepsDescription] = React.useState<
		{ type: string; text: string }[]
	>([]);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (globalState.steps.length !== 0) {
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
					className="text-sm p-2 bg-[#403d39] my-1 rounded-md">
					Step: {i}
					<span className={`flex justify-between items-center font-bold ${stepType(step.type)}`}>
						{step.text}
					</span>
				</div>
			);
		})
    );

}

export default Steps;
