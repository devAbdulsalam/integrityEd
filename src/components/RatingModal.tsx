import { useState } from 'react';

const ratingEmojis = ['😕', '😐', '🙂', '😄', '🤩'];

export default function RatingModal({ isOpen, onClose }) {
	const [ratings, setRatings] = useState({
		content: 0,
		tone: 0,
		character: 0,
	});

	if (!isOpen) return null;

	const handleRate = (type, value) => {
		setRatings((prev) => ({ ...prev, [type]: value }));
	};

	const handleSubmit = () => {
		localStorage.setItem(
			'gracei_rating',
			JSON.stringify({
				...ratings,
				submittedAt: new Date().toISOString(),
			})
		);

		onClose(); // close modal after save
	};

	const renderRating = (label, key) => (
		<div style={{ marginBottom: '1rem' }}>
			<strong>{label}</strong>
			<div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
				{ratingEmojis.map((emoji, index) => {
					const value = index + 1;
					return (
						<button
							key={value}
							onClick={() => handleRate(key, value)}
							style={{
								fontSize: '1.5rem',
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								opacity: ratings[key] >= value ? 1 : 0.4,
							}}
						>
							{emoji}
						</button>
					);
				})}
			</div>
		</div>
	);

	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<h3>Rate Gracei 🌟</h3>

				{renderRating('📘 Content', 'content')}
				{renderRating('🎤 Tone', 'tone')}
				{renderRating('🧠 Character', 'character')}

				<div
					style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
				>
					<button onClick={onClose}>Cancel</button>
					<button
						onClick={handleSubmit}
						disabled={Object.values(ratings).includes(0)}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

/* Basic styles */
const overlayStyle = {
	position: 'fixed',
	inset: 0,
	background: 'rgba(0,0,0,0.4)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
};

const modalStyle = {
	background: '#fff',
	padding: '20px',
	borderRadius: '10px',
	width: '320px',
};
