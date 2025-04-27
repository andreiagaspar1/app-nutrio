import React, { useState } from 'react';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Gender } from './Step2Gender';
import { Step3Metrics } from './Step3Metrics';
import { Step4Goal } from './Step4Goal';

export function Register() {
	const [currentStep, setCurrentStep] = useState(1);

	function handleNextStep(): void {
		setCurrentStep(currentStep + 1);
	}

	function handlePreviousStep(): void {
		setCurrentStep(currentStep - 1);
	}

	return (
		<div>
			{currentStep === 1 && <Step1BasicInfo onNext={handleNextStep} />}
			{currentStep === 2 && <Step2Gender onNext={handleNextStep} onPrevious={handlePreviousStep} />}
            {currentStep === 3 && <Step3Metrics onNext={handleNextStep} onPrevious={handlePreviousStep} />}
            {currentStep === 4 && <Step4Goal onNext={handleNextStep} onPrevious={handlePreviousStep} />}
		</div>
	);
}