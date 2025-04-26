import React, { useState } from 'react';

export const Step1BasicInfo = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div>
			<h2>Ceate Profile</h2>
			<p>Let´s start with your basic info.</p>

			<form>
				<label>
					Name
					<input type='text' name='name' placeholder='Enter your name' value={formData.name} onChange={handleChange} />
				</label>
				<label>
					Email
					<input type='email' name='email' placeholder='Enter your email adress' value={formData.email} onChange={handleChange} />
				</label>
                <label>
                    Password
					<input type='password' name='password' placeholder='Enter Password' value={formData.password} onChange={handleChange} />
				</label>
			</form>
		</div>
	);
};