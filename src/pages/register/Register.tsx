import React, { useState } from 'react';
import { Step1BasicInfo } from './Step1BasicInfo';

export const Register = () => {
	const [currentStep, setCurrentStep] = useState(1); 

	const handleNextStep = () => {
		setCurrentStep(currentStep + 1); 
	};

	return (
		<div>
			{currentStep === 1 && <Step1BasicInfo onNext={handleNextStep} />}
		</div>
	);
};