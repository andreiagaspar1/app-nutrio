import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, setDoc, doc } from '../../../lib/firebase';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Gender } from './Step2Gender';
import { Step3Metrics } from './Step3Metrics';
import { Step4Goal } from './Step4Goal';
import { Step5Summary } from './Step5Summary';
import { useNavigate } from 'react-router';
import { useUserData } from '../../../contexts/authContexts/registrationContext';

export function Register() {
	const [currentStep, setCurrentStep] = useState(1);
	const navigate = useNavigate();

	const { userData } = useUserData();

	function handleNextStep() {
		setCurrentStep(prev => prev + 1);
	}

	function handlePreviousStep() {
		setCurrentStep(prev => prev - 1);
	}

	const handleFinalSubmit = async () => {
		const { name, email, password, gender, activity, age, height, weight, goal, calories, proteins, carbs, fats } = userData;

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			await setDoc(doc(db, 'users', user.uid), {
				name,
				email,
				gender,
				activity,
				age,
				height,
				weight,
				goal,
				calories,
				proteins,
				carbs,
				fats,
			});

			navigate('/app/home-page');
		} catch (error) {
			console.error('Error registering the user: ', error);
			alert('Error registering the user. Please try again.');
		}
	};

	return (
		<div>
			{currentStep === 1 && <Step1BasicInfo onNext={handleNextStep} />}
			{currentStep === 2 && <Step2Gender onNext={handleNextStep} onPrevious={handlePreviousStep} />}
			{currentStep === 3 && <Step3Metrics onNext={handleNextStep} onPrevious={handlePreviousStep} />}
			{currentStep === 4 && <Step4Goal onNext={handleNextStep} onPrevious={handlePreviousStep} />}
			{currentStep === 5 && <Step5Summary onPrevious={handlePreviousStep} onSubmit={handleFinalSubmit} />}
		</div>
	);
}
