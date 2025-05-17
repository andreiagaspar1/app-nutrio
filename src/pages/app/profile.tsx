import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { auth } from '../../lib/firebase';
import { toast } from 'sonner';
import { User } from 'firebase/auth';
import { useUserData } from '../../contexts/authContexts/registrationContext';
import { Camera } from '@phosphor-icons/react';

interface UserData {
	name: string;
	email: string;
	gender: string;
	age: number;
	height: number;
	weight: number;
	activity: string;
	goal: string;
	proteins: number;
	carbs: number;
	fats: number;
	calories: number;
	password?: string;
}

export function Profile() {
	const defaultProfileImage = '/images/default-profile.png';

	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [password, setPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [age, setAge] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [activityLevel, setActivityLevel] = useState('');
	const [goal, setGoal] = useState('');
	const [profileImage, setProfileImage] = useState(defaultProfileImage);
	const [isLoading, setIsLoading] = useState(false);
	const { updateUserData, userData: contextUserData } = useUserData();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async currentUser => {
			if (currentUser) {
				setUser(currentUser);
				try {
					const docRef = doc(db, 'users', currentUser.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						const data = docSnap.data() as UserData;
						setUserData(data);
						setName(data.name || '');
						setEmail(data.email || '');
						setGender(data.gender || '');
						setAge(data.age?.toString() || '');
						setHeight(data.height?.toString() || '');
						setWeight(data.weight?.toString() || '');
						setActivityLevel(data.activity || '');
						setGoal(data.goal || '');
					}
				} catch (err) {
					console.error('Error fetching user data:', err);
				}
			} else {
				setUser(null);
				setUserData(null);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (user && userData && gender) {
			const updatedData = {
				...userData,
				name,
				email,
				gender,
				age: parseInt(age) || 0,
				height: parseInt(height) || 0,
				weight: parseInt(weight) || 0,
				activity: activityLevel,
				goal,
				password: password || userData?.password || '',
			};
			updateUserData(updatedData);
		}
	}, [name, email, age, height, weight, activityLevel, goal, user, gender, password]);

	const handleSaveChanges = async () => {
		if (!user) {
			toast.error('You must be logged in to update your profile');
			return;
		}

		setIsLoading(true);
		try {
			const updatedData: UserData = {
				...(userData || {}),
				name,
				email,
				gender,
				age: parseInt(age) || 0,
				height: parseInt(height) || 0,
				weight: parseInt(weight) || 0,
				activity: activityLevel,
				goal,
			};

			setUserData(updatedData);

			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, updatedData as Partial<UserData>);

			if (email !== user.email && user.email) {
				await updateEmail(user, email);
			}

			if (password) {
				if (!currentPassword) throw new Error('Current password is required to change password');

				const credential = EmailAuthProvider.credential(user.email || email, currentPassword);
				await reauthenticateWithCredential(user, credential);
				await updatePassword(user, password);
			}

			toast.success('Profile updated successfully!');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			toast.error(`Error updating profile: ${errorMessage}`);
			console.error('Error updating profile:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === 'string') {
					setProfileImage(reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleLogout = () => {
		auth.signOut();
	};

	if (!user) {
		return <div className='max-w-2xl mx-auto p-6 text-center'>Please log in to view your profile</div>;
	}

	return (
		<section>
			<h1 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>Edit Profile</h1>

			{/* Profile Image Upload */}
			<div className='flex items-center mb-8'>
				<div className='relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 mr-4'>
					{profileImage ? (
						<img src={profileImage} alt='Profile' className='w-full h-full object-cover' />
					) : (
						<div className='w-full h-full flex items-center justify-center text-gray-500'>
							<svg className='w-12 h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
							</svg>
						</div>
					)}
				</div>
				<div>
					<input type='file' id='profileImage' accept='image/*' onChange={handleImageUpload} className='hidden' />
					<label htmlFor='profileImage' className='px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors'>
						Change Photo
					</label>
				</div>
			</div>

			{/* Basic Info Section */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'>Basic Info</h2>
				<div className='space-y-4'>
					<div>
						<label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Name
						</label>
						<input
							id='name'
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						/>
					</div>
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Email
						</label>
						<input
							id='email'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						/>
					</div>
					<div className='space-y-2'>
						<div>
							<label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								New Password
							</label>
							<input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								placeholder='Leave blank to keep current'
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
							/>
						</div>
						{password && (
							<div>
								<label htmlFor='currentPassword' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
									Current Password
								</label>
								<input
									id='currentPassword'
									type='password'
									value={currentPassword}
									onChange={e => setCurrentPassword(e.target.value)}
									className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
									required
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Physical Metrics Section */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'>Physical Metrics</h2>
				<div className='grid grid-cols-2 gap-4 mb-4'>
					<div>
						<label htmlFor='age' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Age
						</label>
						<input
							id='age'
							type='number'
							value={age}
							onChange={e => setAge(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						/>
					</div>
					<div>
						<label htmlFor='height' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Height (cm)
						</label>
						<input
							id='height'
							type='number'
							value={height}
							onChange={e => setHeight(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						/>
					</div>
				</div>
				<div className='mb-4'>
					<label htmlFor='weight' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Weight (kg)
					</label>
					<input
						id='weight'
						type='number'
						value={weight}
						onChange={e => setWeight(e.target.value)}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
					/>
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<label htmlFor='activityLevel' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Activity Level
						</label>
						<select
							id='activityLevel'
							value={activityLevel}
							onChange={e => setActivityLevel(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						>
							<option value=''>Select activity level</option>
							<option value='sedentary'>Sedentary (little or no exercise)</option>
							<option value='moderate'>Moderate (3-5x week)</option>
							<option value='very-active'>Very Active (6-7x week)</option>
						</select>
					</div>
					<div>
						<label htmlFor='goal' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Goal
						</label>
						<select
							id='goal'
							value={goal}
							onChange={e => setGoal(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
						>
							<option value=''>Select goal</option>
							<option value='lose'>Lose Weight</option>
							<option value='maintain'>Maintain Weight</option>
							<option value='build'>Gain Weight</option>
						</select>
					</div>
				</div>
			</div>

			{/* Macros Section */}
			<div className='mb-8'>
				<h2 className='text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300'>Your Macros</h2>
				<div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-lg'>
					<div className='grid grid-cols-3 gap-4 mb-4'>
						<div className='text-center'>
							<p className='text-lg font-bold text-gray-800 dark:text-white'>{contextUserData?.proteins || 0}g</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Protein</p>
						</div>
						<div className='text-center'>
							<p className='text-lg font-bold text-gray-800 dark:text-white'>{contextUserData?.carbs || 0}g</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Carbs</p>
						</div>
						<div className='text-center'>
							<p className='text-lg font-bold text-gray-800 dark:text-white'>{contextUserData?.fats || 0}g</p>
							<p className='text-sm text-gray-600 dark:text-gray-400'>Fats</p>
						</div>
					</div>
					<div className='text-center'>
						<p className='text-lg font-bold text-gray-800 dark:text-white'>{contextUserData?.calories || 0} kcal</p>
						<p className='text-sm text-gray-600 dark:text-gray-400'>Daily Calories</p>
					</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className='flex justify-between'>
				<button onClick={handleSaveChanges} disabled={isLoading} className={`px-6 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}>
					{isLoading ? (
						<span className='flex items-center justify-center'>
							<svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
								<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z'></path>
							</svg>
							Saving...
						</span>
					) : (
						'Save Changes'
					)}
				</button>

				<button onClick={handleLogout} className='px-6 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors'>
					Logout
				</button>
			</div>
		</section>
	);
}
