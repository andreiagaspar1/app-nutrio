import React from "react";

type StepProps = {
  formData: {
    username: string;
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
};

const RegisterStep1: React.FC<StepProps> = ({ formData, onChange, onNext }) => (
  <div>
    <h2>Step 1: Account Info</h2>
    <input
      type="text"
      placeholder="Username"
      value={formData.username}
      onChange={e => onChange("username", e.target.value)}
    />
    <input
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={e => onChange("email", e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={e => onChange("password", e.target.value)}
    />
    <button onClick={onNext}>Next</button>
  </div>
);

export default RegisterStep1;
