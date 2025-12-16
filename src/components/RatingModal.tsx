import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from './ui/textarea';

const emojis = ['😕', '😐', '🙂', '😄', '🤩'];

export default function RatingModal({ isOpen, handleSubmit, handleSkip }) {
	const [ratings, setRatings] = useState({
		content: 0,
		tone: 0,
		character: 0,
		additionalInfo: '',
	});

	const handleRate = (key, value) => {
		setRatings((prev) => ({ ...prev, [key]: value }));
	};

	const onSubmit = () => {
		const payload = {
			...ratings,
			submittedAt: new Date().toISOString(),
		};

		localStorage.setItem('gracei_rating', JSON.stringify(payload));
		handleSubmit(payload);
	};

	const renderRatingRow = (label, key) => (
		<div className="space-y-2">
			<p className="font-medium text-slate-700">{label}</p>
			<div className="flex gap-3">
				{emojis.map((emoji, index) => {
					const value = index + 1;
					const active = ratings[key] >= value;

					return (
						<button
							key={value}
							onClick={() => handleRate(key, value)}
							className={`text-2xl transition-transform hover:scale-110 ${
								active ? 'opacity-100' : 'opacity-40'
							}`}
						>
							{emoji}
						</button>
					);
				})}
			</div>
		</div>
	);

	const isDisabled = Object.values(ratings).includes(0);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex min-h-screen items-center justify-center p-4">
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={handleSkip}
							className="fixed inset-0 bg-black/50 backdrop-blur-sm"
						/>

						{/* Modal */}
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="relative w-full max-w-md bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
						>
							<div className="p-6 space-y-6">
								<div>
									<h2 className="text-xl font-semibold text-slate-800">
										Rate Gracie 🌟
									</h2>
									<p className="text-sm text-slate-600">
										Your feedback helps improve the learning experience.
									</p>
								</div>

								<div className="space-y-5">
									{renderRatingRow('📘 Content', 'content')}
									{renderRatingRow('🎤 Tone', 'tone')}
									{renderRatingRow('🧠 Character', 'character')}
								</div>
								<p className="text-muted-foreground  mb-6">
									How can gracie improve your learning experience?
								</p>
								<Textarea
									value={ratings.additionalInfo}
									onChange={(e) =>
										setRatings((prev) => ({
											...prev,
											additionalInfo: e.target.value,
										}))
									}
									placeholder="Tell us more about your learning needs..."
									className="mb-6 mt-20 w-full"
									rows={8}
								/>
								<div className="flex justify-between items-center pt-4">
									<button
										onClick={handleSkip}
										className="text-sm text-slate-500 hover:text-slate-700"
									>
										Skip for now
									</button>

									<button
										onClick={onSubmit}
										disabled={isDisabled}
										className={`px-5 py-2 rounded-xl text-white font-medium transition
                      ${
												isDisabled
													? 'bg-slate-300 cursor-not-allowed'
													: 'bg-primary hover:bg-primary/90'
											}`}
									>
										Submit Rating
									</button>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			)}
		</AnimatePresence>
	);
}
