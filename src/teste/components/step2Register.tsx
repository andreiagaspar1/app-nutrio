import React from "react";

// Defining the type for the props
type StepProps = {
  formData: {
    username: string;
    email: string;
    password: string;
    gender: string;
    activityLevel: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

const RegisterStep2: React.FC<StepProps> = ({
  formData,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <div>
      <h2>Step 2: Select Gender</h2>
      <select
        value={formData.gender}
        onChange={e => onChange("gender", e.target.value)}
      >
        <option value="">Select...</option>
        <input type="radio" value="female">Female</input>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default RegisterStep2;
