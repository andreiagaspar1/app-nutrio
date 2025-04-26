import React, { useState } from 'react';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Gender } from './Step2Gender';

export const Register = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const handleNextStep = (): void => {
		setCurrentStep(currentStep + 1);
    };
    
    const handlePreviousStep = (): void => {
        setCurrentStep(currentStep - 1);
    };

	return (
		<div>
			{currentStep === 1 && <Step1BasicInfo onNext={handleNextStep} />}
			{currentStep === 2 && <Step2Gender onNext={handleNextStep} onPrevious={handlePreviousStep} />}
		</div>
	);
};
