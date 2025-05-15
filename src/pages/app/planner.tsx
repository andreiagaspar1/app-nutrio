import { useState, useEffect } from 'react';
import { Plus, Trash } from '@phosphor-icons/react';
import { WeeklyCalendar } from '../../components/Calendar';
import { PlannerAddModal } from '../../components/PlannerAddModal';
import { useRecipeContext, Recipe } from '../../contexts/appContexts/recipesContext';
import { db } from '../../lib/firebase';
import { auth } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { MealTypeSelectModal } from '../../components/MealTypeModal';

interface PlannedMeal {
	id?: string;
	recipeId: number;
	date: string;
	mealType: string;
}

export function Planner() {
	const { allRecipes } = useRecipeContext();
	const [userId, setUserId] = useState<string | null>(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [selectedMealType, setSelectedMealType] = useState('');
	const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);
	const [dailyMeals, setDailyMeals] = useState<{ mealType: string; recipes: Recipe[] }[]>([]);
	const [totalCalories, setTotalCalories] = useState(0);
	const [isMealTypeModalOpen, setIsMealTypeModalOpen] = useState(false);
	const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setUserId(user.uid);
			}
		});
		return () => unsubscribe();
    }, []);
    
    useEffect(() => {
			if (!userId) return;

			const fetchUserData = async () => {
				try {
					const userDocRef = doc(db, 'users', userId);
					const userSnap = await getDoc(userDocRef);

					if (userSnap.exists()) {
						const userData = userSnap.data();
						console.log('User data fetched:', userData);
						if (userData.calories) {
							setDailyCalorieGoal(userData.calories);
						} else {
							console.warn('User calories field not found');
						}
					} else {
						console.warn('User document not found');
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			};

			fetchUserData();
		}, [userId]);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number | null>(null);

	useEffect(() => {
		const loadMeals = async () => {
			if (!userId) return;
			const q = query(collection(db, 'users', userId, 'plannedMeals'), where('date', '==', formatDate(selectedDate)));
			const snapshot = await getDocs(q);
			const meals: PlannedMeal[] = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data(),
			})) as PlannedMeal[];
			setPlannedMeals(meals);
		};
		loadMeals();
	}, [userId, selectedDate]);

	useEffect(() => {
		const selectedDateStr = formatDate(selectedDate);
		const mealsForDate = plannedMeals.filter(meal => meal.date === selectedDateStr);

		const groupedMeals = ['Breakfast', 'Snacks', 'Lunch', 'Dinner'].map(mealType => {
			const recipes = mealsForDate
				.filter(meal => meal.mealType === mealType)
				.map(meal => allRecipes.find(recipe => recipe.id === meal.recipeId))
				.filter((recipe): recipe is Recipe => recipe !== undefined);

			return { mealType, recipes };
		});

		setDailyMeals(groupedMeals);

		const calories = groupedMeals.reduce((total, meal) => {
			const mealCalories = meal.recipes.reduce((sum, recipe) => sum + (recipe?.kcal || 0), 0);
			return total + mealCalories;
		}, 0);

		setTotalCalories(calories);
	}, [plannedMeals, selectedDate, allRecipes]);

	const handleAddRecipe = (mealType: string) => {
		setSelectedMealType(mealType);
		setIsAddModalOpen(true);
	};

	const handleRecipeClick = (recipeId: number) => {
		if (selectedMealType) {
			addRecipeToPlanner(recipeId, selectedMealType);
			setIsAddModalOpen(false);
		} else {
			setSelectedRecipeId(recipeId);
			setIsMealTypeModalOpen(true);
		}
	};

	const addRecipeWithMealType = (mealType: string) => {
		if (selectedRecipeId !== null) {
			addRecipeToPlanner(selectedRecipeId, mealType);
			setSelectedRecipeId(null);
			setIsMealTypeModalOpen(false);
			setIsAddModalOpen(false);
		}
	};

	const addRecipeToPlanner = async (recipeId: number, mealType: string) => {
		if (!userId) return;

		const newMeal = {
			recipeId,
			date: formatDate(selectedDate),
			mealType: mealType || 'Planner',
		};

		const docRef = await addDoc(collection(db, 'users', userId, 'plannedMeals'), newMeal);
		setPlannedMeals(prev => [...prev, { ...newMeal, id: docRef.id }]);
	};

	const removeRecipe = async (recipeId: number, mealType: string) => {
		if (!userId) return;

		const selectedDateStr = formatDate(selectedDate);
		const mealToDelete = plannedMeals.find(meal => meal.recipeId === recipeId && meal.mealType === mealType && meal.date === selectedDateStr);

		if (mealToDelete?.id) {
			await deleteDoc(doc(db, 'users', userId, 'plannedMeals', mealToDelete.id));
			setPlannedMeals(prev => prev.filter(meal => meal.id !== mealToDelete.id));
		}
	};

	const navigateWeek = (days: number) => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + days);
		setSelectedDate(newDate);

		if (newDate.getMonth() !== currentDate.getMonth()) {
			setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
		}
	};

	const handleDateClick = (date: Date) => {
		setSelectedDate(date);
	};

	const isToday = (date: Date) => {
		const today = new Date();
		return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    };
    
    console.log('dailyCalorieGoal:', dailyCalorieGoal);
		console.log('totalCalories:', totalCalories);

	return (
		<div className='max-w-3xl mx-auto py-6 px-4'>
			<h1 className='text-base md:text-xl font-semibold mb-6'>Meal Planner</h1>

			<WeeklyCalendar currentDate={currentDate} selectedDate={selectedDate} onDateClick={handleDateClick} onWeekChange={navigateWeek} />

			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-sm md:text-lg font-medium text-neutral-800'>
					{selectedDate.toLocaleDateString('en-US', {
						weekday: 'long',
						day: 'numeric',
						month: 'short',
					})}
					{isToday(selectedDate) && <span className='ml-2 text-xs text-green-500'>Today</span>}
				</h2>

				<button onClick={() => handleAddRecipe('')} className='flex items-center gap-2 bg-green-400 hover:bg-green-500 text-white px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer'>
					<Plus size={18} />
					<span>Add Recipe</span>
				</button>
			</div>

			<div className='bg-white rounded-xl p-6 shadow-[0_0_6px_0_rgba(0,0,0,0.1)]'>
				{dailyMeals.map(({ mealType, recipes }) => (
					<div key={mealType} className='mb-6 last:mb-0'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-sm font-semibold'>{mealType}</h3>
							<button onClick={() => handleAddRecipe(mealType)} className='text-green-400 hover:text-green-500 text-xs flex items-center gap-1 cursor-pointer'>
								<Plus size={14} />
								<span>Add</span>
							</button>
						</div>

						<div className='bg-neutral-50 rounded-lg p-4 min-h-20'>
							{recipes.length > 0 ? (
								<ul className='space-y-3'>
									{recipes.map(recipe => (
										<li key={recipe.id} className='flex justify-between items-center w-full gap-3'>
											<div className='flex-shrink-0 h-25 w-25'>
												<img src={recipe.image?.thumbnail || '/placeholder-image.jpg'} alt={recipe.name} className='w-full h-full rounded-md object-cover' />
											</div>
											<div className='flex-1 min-w-0'>
												<p className='text-sm font-medium truncate mb-1'>{recipe.name}</p>
												<p className='text-xs text-neutral-500'>{recipe.kcal} kcal</p>
											</div>
											<button onClick={() => removeRecipe(recipe.id, mealType)} className='text-red-400 hover:text-red-500 cursor-pointer flex-shrink-0'>
												<Trash size={16} />
											</button>
										</li>
									))}
								</ul>
							) : (
								<p className='text-xs text-neutral-400 italic'>No meals added yet</p>
							)}
						</div>

						<hr className='my-4 border-neutral-100' />
					</div>
				))}
			</div>

			<div className='mt-6 pt-4 border-t border-neutral-200 flex justify-end'>
				<div className='text-sm font-medium text-black'>
					Total calories:{' '}
					<span className={`font-bold ${dailyCalorieGoal !== null && totalCalories > dailyCalorieGoal ? 'text-red-500' : 'text-green-500'}`}>
						{totalCalories}
						{dailyCalorieGoal ? ` / ${dailyCalorieGoal}` : ''}
					</span>
				</div>
			</div>

			<PlannerAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} mealType={selectedMealType} onAddRecipe={handleRecipeClick} />

			<MealTypeSelectModal isOpen={isMealTypeModalOpen} onClose={() => setIsMealTypeModalOpen(false)} onSelectMealType={addRecipeWithMealType} />
		</div>
	);
}
