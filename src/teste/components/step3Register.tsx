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
  onBack: () => void;
  onSubmit: () => void;
};

const RegisterStep3: React.FC<StepProps> = ({
  formData,
  onChange,
  onBack,
  onSubmit,
}) => {
  return (
    <div>
      <h2>Step 3: Select Activity Level</h2>
      <select
        value={formData.activityLevel}
        onChange={e => onChange("activityLevel", e.target.value)}
      >
        <input type="radio" name="" id="" />
        <option value="">Select...</option>
        <option value="sedentary">Sedentary</option>
        <option value="moderate">Moderate</option>
        <option value="very_active">Very Active</option>
      </select>
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default RegisterStep3;
