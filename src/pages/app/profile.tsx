import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, updateEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { auth } from '../../lib/firebase';
import { toast } from 'sonner';
import { User } from 'firebase/auth';
import { useUserData } from '../../contexts/authContexts/registrationContext';
import { Camera, SignOut } from '@phosphor-icons/react';
import ProfileImg from '../../assets/default-profile-image.jpg';
import { LogOutModal } from '../../components/LogOutModal';
import { useNavigate } from 'react-router-dom';


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
	password: string;
	profileImage?: string;
}

export function Profile() {
	const defaultProfileImage = ProfileImg;
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [age, setAge] = useState('');
	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [activityLevel, setActivityLevel] = useState('');
	const [goal, setGoal] = useState('');
	const [profileImage, setProfileImage] = useState(defaultProfileImage);
	const [isLoading, setIsLoading] = useState(false);
	const { updateUserData, userData: contextUserData } = useUserData();
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const navigate = useNavigate();

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

						if (data.profileImage) {
							setProfileImage(data.profileImage);
						}

						// Atualiza o contexto com os dados do Firebase
						updateUserData({
							...data,
							proteins: data.proteins || 0,
							carbs: data.carbs || 0,
							fats: data.fats || 0,
							calories: data.calories || 0,
						});
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
				proteins: contextUserData?.proteins || 0,
				carbs: contextUserData?.carbs || 0,
				fats: contextUserData?.fats || 0,
				calories: contextUserData?.calories || 0,
				password: userData?.password || '',
			};
			updateUserData(updatedData);
		}
	}, [name, email, age, height, weight, activityLevel, goal, user, gender]);

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
				proteins: contextUserData?.proteins || 0,
				carbs: contextUserData?.carbs || 0,
				fats: contextUserData?.fats || 0,
				calories: contextUserData?.calories || 0,
				password: userData?.password || '',
				profileImage,
			};

			setUserData(updatedData);

			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, { ...updatedData });

			if (email !== user.email && user.email) {
				await updateEmail(user, email);
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
		auth
			.signOut()
			.then(() => {
				navigate('/auth/login');
				setShowLogoutModal(false);
			})
			.catch(error => {
				console.error('Logout error:', error);
				toast.error('Failed to logout');
			});
	};

	if (!user) {
		return <div className='max-w-2xl mx-auto p-6 text-center'>Please log in to view your profile</div>;
	}

	return (
		<section>
			<h1 className='text-base md:text-xl font-semibold mb-6'>Edit Profile</h1>

			<div className='flex flex-col items-center mb-8'>
				<div className='relative w-28 h-28 mb-4'>
					<div className='w-full h-full rounded-full border-2 border-green-400 flex items-center justify-center p-1.5'>
						<div className='w-full h-full rounded-full overflow-hidden bg-neutral-200'>
							<img
								src={profileImage}
								alt='Profile'
								className='w-full h-full object-cover'
								onError={e => {
									(e.target as HTMLImageElement).src = defaultProfileImage;
								}}
							/>
						</div>
					</div>
					<button
						onClick={() => fileInputRef.current?.click()}
						className='absolute bottom-0 right-0 bg-green-300 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-green-400 transition'
					>
						<Camera size={16} className='text-white' />
					</button>
				</div>

				<input type='file' ref={fileInputRef} accept='image/*' onChange={handleImageUpload} className='hidden' />
			</div>

			<div className='mb-8'>
				<h2 className='text-base md:text-lg text-green-400 font-semibold mb-4'>Basic Info</h2>
				<hr className='border-neutral-300 border-1 mb-5' />

				<div className='mb-4'>
					<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Name</label>
					<input
						value={name}
						onChange={e => setName(e.target.value)}
						className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
					/>
				</div>

				<div className='mb-4'>
					<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Email</label>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
					/>
				</div>
			</div>

			<div className='mb-8'>
				<h2 className='text-base md:text-lg font-semibold mb-4 text-green-400'>Physical Metrics</h2>
				<hr className='border-neutral-300 border-1 mb-5' />

				<div className='grid grid-cols-2 gap-4 mb-4'>
					<div>
						<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Age</label>
						<input
							type='number'
							value={age}
							onChange={e => setAge(e.target.value)}
							className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
						/>
					</div>

					<div>
						<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Height (cm)</label>
						<input
							type='number'
							value={height}
							onChange={e => setHeight(e.target.value)}
							className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
						/>
					</div>
				</div>

				<div className='mb-4'>
					<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Weight (kg)</label>
					<input
						type='number'
						value={weight}
						onChange={e => setWeight(e.target.value)}
						className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
					/>
				</div>

				<div>
					<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Activity Level</label>
					<select
						value={activityLevel}
						onChange={e => setActivityLevel(e.target.value)}
						className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
					>
						<option value=''>Select activity level</option>
						<option value='sedentary'>Sedentary - little to no exercise</option>
						<option value='moderate'>Moderate - moderate exercise or sports 3-5 days/week</option>
						<option value='active'>Very Active - hard exercise or sports 6-7 days/week</option>
					</select>
				</div>
			</div>

			<div className='mb-8'>
				<h2 className='text-base md:text-lg font-semibold text-green-400 mb-4'>Goal</h2>
				<hr className='border-neutral-300 border-1 mb-5' />
				<div>
					<label className='block font-medium text-neutral-700 text-sm md:text-base mb-1'>Select Goal</label>
					<select value={goal} onChange={e => setGoal(e.target.value)} className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'>
						<option value=''>Select goal</option>
						<option value='lose'>Lose Weight</option>
						<option value='maintain'>Maintenance</option>
						<option value='gain'>Build Muscle</option>
					</select>
				</div>

				<h2 className='text-base md:text-lg font-semibold mt-10 text-green-400 mb-4'>Your Macros</h2>
				<hr className='border-neutral-300 border-1 mb-5' />
				<div className='grid grid-cols-3 gap-4 mb-4'>
					<div>
						<div className='text-neutral-700 font-medium text-sm md:text-base mb-1'>Protein</div>
						<input
							value={contextUserData?.proteins || 0}
							onChange={e => updateUserData({ ...contextUserData, proteins: parseInt(e.target.value) || 0 })}
							className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
						/>
					</div>
					<div>
						<div className='text-neutral-700 font-medium text-sm md:text-base mb-1'>Carbs</div>
						<input
							value={contextUserData?.carbs || 0}
							onChange={e => updateUserData({ ...contextUserData, carbs: parseInt(e.target.value) || 0 })}
							className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
						/>
					</div>
					<div>
						<div className='text-neutral-700 font-medium text-sm md:text-base mb-1'>Fats</div>
						<input
							value={contextUserData?.fats || 0}
							onChange={e => updateUserData({ ...contextUserData, fats: parseInt(e.target.value) || 0 })}
							className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
						/>
					</div>
				</div>

				<div>
					<div className='text-neutral-700 font-medium text-sm md:text-base mb-1'>Daily Calories</div>
					<input
						value={contextUserData?.calories || 0}
						onChange={e => updateUserData({ ...contextUserData, calories: parseInt(e.target.value) || 0 })}
						className='text-sm md:text-base w-full px-3 py-2 bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400'
					/>
				</div>
			</div>

			<button
				onClick={handleSaveChanges}
				disabled={isLoading}
				className={`w-full text-sm md:text-base py-3 mb-7 mt-6 rounded-md cursor-pointer text-white font-medium transition-colors ${isLoading ? 'bg-green-300' : 'bg-green-400 hover:bg-green-500'}`}
			>
				{isLoading ? 'Saving...' : 'Save Changes'}
			</button>

			<button
				onClick={() => setShowLogoutModal(true)}
				className='w-full text-sm md:text-base flex items-center justify-center gap-2 py-3 mb-8 text-red-600 font-medium cursor-pointer transition-colors'
				style={{ textDecoration: 'underline' }}
			>
				<SignOut weight='bold' size={20} />
				Logout
			</button>

			<LogOutModal show={showLogoutModal} onCancel={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
		</section>
	);

}
