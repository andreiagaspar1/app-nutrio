import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, setDoc, doc } from "../../lib/firebase";
import RegisterStep1 from "../components/step1Register";
import RegisterStep2 from "../components/step2Register";
import RegisterStep3 from "../components/step3Register";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    activityLevel: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    const { email, password, username, gender, activityLevel } = formData;

    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user; // This is the authenticated user

      // Step 2: Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        gender,
        activityLevel,
      });

      // You can store more fields as needed, just make sure to match the Firestore structure

      alert("User registered successfully!");
      // You may want to redirect to another page or login the user here
    } catch (error) {
      console.error("Error registering user: ", error);
      alert("Error registering user. Please try again.");
    }
  };

  return (
    <div>
      {step === 1 && (
        <RegisterStep1
          formData={formData}
          onChange={handleChange}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <RegisterStep2
          formData={formData}
          onChange={handleChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {step === 3 && (
        <RegisterStep3
          formData={formData}
          onChange={handleChange}
          onBack={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Register;
