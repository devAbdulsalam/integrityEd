export interface Character {
	id: string;
	name: string;
	role: string;
	emoji: string;
	description: string;
	personality: string;
	color: string;
	bgGradient: string;
}

export const characters: Character[] = [
	{
		id: 'professor',
		name: 'Professor Integrity',
		role: 'Teacher',
		emoji: '🧓',
		description:
			'A wise and kind professor who explains corruption topics in a clear, structured way.',
		personality: 'Knowledgeable, patient, and thorough in explanations',
		color: 'text-blue-400',
		bgGradient: 'from-blue-500/20 to-blue-600/10',
	},
	{
		id: 'amina',
		name: 'Amina the Youth Advocate',
		role: 'Peer Guide',
		emoji: '👩',
		description:
			'A relatable youth who motivates and encourages learners, explains real-world scenarios.',
		personality: 'Energetic, relatable, and encouraging',
		color: 'text-pink-400',
		bgGradient: 'from-pink-500/20 to-pink-600/10',
	},
	{
		id: 'kofi',
		name: 'Quiz Master Kofi',
		role: 'Quiz/Assessment Intro',
		emoji: '🧑‍💻',
		description:
			'Introduces quizzes, explains rules, gives feedback after quizzes.',
		personality: 'Fun, challenging, and fair',
		color: 'text-orange-400',
		bgGradient: 'from-orange-500/20 to-orange-600/10',
	},
	{
		id: 'justice',
		name: 'Agent Justice',
		role: 'FAQ & Instructions',
		emoji: '👮',
		description:
			'Handles FAQs, instructions, reporting mechanisms, and encourages whistleblowing responsibly.',
		personality: 'Authoritative, trustworthy, and protective',
		color: 'text-green-400',
		bgGradient: 'from-green-500/20 to-green-600/10',
	},
	{
		id: 'zara',
		name: 'Curious Learner Zara',
		role: 'Question Asker',
		emoji: '👧',
		description:
			'Asks common student questions and gets answers (good for conversational skits).',
		personality: 'Curious, inquisitive, and represents the learner',
		color: 'text-purple-400',
		bgGradient: 'from-purple-500/20 to-purple-600/10',
	},
];

export const getCharacterById = (id: string): Character | undefined => {
	return characters.find((c) => c.id === id);
};

// Character dialogue scripts for modules
export interface CharacterDialogue {
	characterId: string;
	text: string;
	animation?: 'wave' | 'think' | 'explain' | 'celebrate' | 'question';
}

export interface ModuleIntro {
	moduleId: string;
	title: string;
	dialogues: CharacterDialogue[];
}

// Character educational content
export interface CharacterLesson {
	id: string;
	title: string;
	duration: string;
	dialogues: CharacterDialogue[];
}

export interface CharacterContent {
	characterId: string;
	lessons: CharacterLesson[];
}

export const characterContent: CharacterContent[] = [
	{
		characterId: 'professor',
		lessons: [
			{
				id: 'pi-1',
				title: 'What is Corruption?',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'professor',
						text: 'Welcome. Today we begin our journey into understanding corruption. At its core, corruption is the abuse of entrusted power for private gain.',
						animation: 'wave',
					},
					{
						characterId: 'professor',
						text: 'Corruption can take many forms: bribery, embezzlement, fraud, extortion, and nepotism. Each undermines the trust society places in its institutions.',
						animation: 'explain',
					},
					{
						characterId: 'professor',
						text: "Let me give you an example. When a government official accepts money to approve a contract for an unqualified company, that's bribery - a direct exchange of value for favors.",
						animation: 'think',
					},
				],
			},
			{
				id: 'pi-2',
				title: 'Types of Corruption',
				duration: '4 min',
				dialogues: [
					{
						characterId: 'professor',
						text: 'There are two main categories of corruption: grand corruption and petty corruption. Understanding the difference is crucial.',
						animation: 'explain',
					},
					{
						characterId: 'professor',
						text: 'Grand corruption occurs at the highest levels of government and involves significant sums of money. It can destabilize entire economies and political systems.',
						animation: 'think',
					},
					{
						characterId: 'professor',
						text: "Petty corruption, on the other hand, involves smaller amounts but affects everyday citizens directly - like paying bribes for basic services you're entitled to.",
						animation: 'explain',
					},
				],
			},
			{
				id: 'pi-3',
				title: 'Historical Context of Corruption',
				duration: '5 min',
				dialogues: [
					{
						characterId: 'professor',
						text: 'Corruption is not a modern phenomenon. It has existed throughout human history, from ancient empires to modern democracies.',
						animation: 'wave',
					},
					{
						characterId: 'professor',
						text: 'In ancient Rome, officials would sell government positions. In medieval Europe, church offices were often bought and sold. These practices shaped societies for centuries.',
						animation: 'think',
					},
					{
						characterId: 'professor',
						text: 'Understanding this history helps us recognize patterns and develop more effective anti-corruption strategies for today.',
						animation: 'celebrate',
					},
				],
			},
		],
	},
	{
		characterId: 'amina',
		lessons: [
			{
				id: 'am-1',
				title: 'Corruption in Our Daily Lives',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'amina',
						text: "Hey there! I'm Amina, and I want to talk about something that affects all of us - corruption in our everyday lives.",
						animation: 'wave',
					},
					{
						characterId: 'amina',
						text: "Have you ever seen someone skip the queue because they 'know someone'? Or watched a student get special treatment because of their family connections? That's corruption too!",
						animation: 'explain',
					},
					{
						characterId: 'amina',
						text: 'It might seem small, but these everyday acts build a culture where bigger corruption becomes acceptable. We can change this - starting with ourselves!',
						animation: 'celebrate',
					},
				],
			},
			{
				id: 'am-2',
				title: 'Youth Power Against Corruption',
				duration: '4 min',
				dialogues: [
					{
						characterId: 'amina',
						text: "You know what's amazing? Young people like us have incredible power to fight corruption. We're the future leaders, and we can start making changes now!",
						animation: 'celebrate',
					},
					{
						characterId: 'amina',
						text: 'Join student integrity clubs, speak up when you see something wrong, and most importantly - refuse to participate in corrupt practices, even small ones.',
						animation: 'explain',
					},
					{
						characterId: 'amina',
						text: "Remember, every time you choose honesty over shortcuts, you're building a better society. That's real youth power!",
						animation: 'wave',
					},
				],
			},
			{
				id: 'am-3',
				title: 'Real Stories of Change',
				duration: '5 min',
				dialogues: [
					{
						characterId: 'amina',
						text: "Let me tell you about young activists who made a difference. In Kenya, students created an app to report corruption anonymously. It's now used nationwide!",
						animation: 'celebrate',
					},
					{
						characterId: 'amina',
						text: 'In Brazil, youth-led movements helped expose major corruption scandals. In India, young journalists are uncovering local corruption through citizen journalism.',
						animation: 'explain',
					},
					{
						characterId: 'amina',
						text: "These stories prove that age doesn't limit your impact. You have the tools - social media, technology, and passion. Use them!",
						animation: 'wave',
					},
				],
			},
		],
	},
	{
		characterId: 'kofi',
		lessons: [
			{
				id: 'qm-1',
				title: 'Testing Your Knowledge',
				duration: '2 min',
				dialogues: [
					{
						characterId: 'kofi',
						text: "Welcome to the challenge zone! I'm Quiz Master Kofi, and I'm here to test what you've learned. But don't worry - I'm here to help you succeed!",
						animation: 'wave',
					},
					{
						characterId: 'kofi',
						text: "Quizzes aren't just about grades. They're about reinforcing what you've learned and identifying areas where you need more practice.",
						animation: 'explain',
					},
					{
						characterId: 'kofi',
						text: "Take your time, think carefully, and remember - every wrong answer is a learning opportunity. Let's see what you've got!",
						animation: 'celebrate',
					},
				],
			},
			{
				id: 'qm-2',
				title: 'Quiz Strategies',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'kofi',
						text: "Here's a secret from your Quiz Master: good quiz-taking is a skill you can learn! Let me share some strategies.",
						animation: 'wave',
					},
					{
						characterId: 'kofi',
						text: "First, read each question carefully - twice if needed. Look for keywords that change meaning, like 'always', 'never', or 'except'.",
						animation: 'think',
					},
					{
						characterId: 'kofi',
						text: "If you're unsure, eliminate obviously wrong answers first. And trust your first instinct - it's usually right!",
						animation: 'celebrate',
					},
				],
			},
			{
				id: 'qm-3',
				title: 'Learning from Mistakes',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'kofi',
						text: "Got some answers wrong? That's perfectly okay! The best learners aren't those who never fail - they're those who learn from every mistake.",
						animation: 'wave',
					},
					{
						characterId: 'kofi',
						text: "When you get an answer wrong, don't just move on. Go back to the material, understand why the correct answer is right, and connect it to what you already know.",
						animation: 'explain',
					},
					{
						characterId: 'kofi',
						text: "Keep a 'mistake journal' - write down questions you got wrong and review them regularly. You'll be amazed at your progress!",
						animation: 'celebrate',
					},
				],
			},
		],
	},
	{
		characterId: 'justice',
		lessons: [
			{
				id: 'aj-1',
				title: 'How to Report Corruption',
				duration: '4 min',
				dialogues: [
					{
						characterId: 'justice',
						text: "Attention, citizen! I'm Agent Justice, and I'm here to guide you through the proper channels for reporting corruption. Your voice matters!",
						animation: 'wave',
					},
					{
						characterId: 'justice',
						text: 'First, document everything - dates, names, what you witnessed. Keep copies in a safe place. Evidence is crucial for any investigation.',
						animation: 'explain',
					},
					{
						characterId: 'justice',
						text: 'Know your reporting options: anti-corruption hotlines, ombudsman offices, and civil society organizations. Many offer anonymous reporting to protect your identity.',
						animation: 'think',
					},
				],
			},
			{
				id: 'aj-2',
				title: 'Whistleblower Protection',
				duration: '4 min',
				dialogues: [
					{
						characterId: 'justice',
						text: 'Whistleblowers are heroes who risk much to expose wrongdoing. Understanding your protections is essential before coming forward.',
						animation: 'wave',
					},
					{
						characterId: 'justice',
						text: 'Many countries have whistleblower protection laws. These may include protection from retaliation, confidentiality guarantees, and even financial rewards in some cases.',
						animation: 'explain',
					},
					{
						characterId: 'justice',
						text: "If you're considering reporting, consult with a lawyer or civil society organization first. Know your rights and protect yourself while doing the right thing.",
						animation: 'think',
					},
				],
			},
			{
				id: 'aj-3',
				title: 'Your Rights as a Citizen',
				duration: '5 min',
				dialogues: [
					{
						characterId: 'justice',
						text: "Every citizen has rights when it comes to government services. You should never have to pay bribes for services you're entitled to!",
						animation: 'explain',
					},
					{
						characterId: 'justice',
						text: "Know what fees are official and which are not. Request receipts for all payments. If someone asks for unofficial payments, that's corruption.",
						animation: 'think',
					},
					{
						characterId: 'justice',
						text: 'Remember: public servants work for you. Transparency and accountability are not privileges - they are your fundamental rights as a citizen.',
						animation: 'celebrate',
					},
				],
			},
		],
	},
	{
		characterId: 'zara',
		lessons: [
			{
				id: 'cz-1',
				title: 'Why Should I Care About Corruption?',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'zara',
						text: "Hi! I'm Zara, and I have a question that many of us wonder about: Why should I, a student, even care about corruption?",
						animation: 'question',
					},
					{
						characterId: 'zara',
						text: 'Well, I found out that corruption directly affects us! It means fewer textbooks in schools, broken roads, and hospitals without medicine.',
						animation: 'think',
					},
					{
						characterId: 'zara',
						text: "When I learned that corruption costs developing countries over $1 trillion each year, I realized this isn't just an adult problem - it's OUR future!",
						animation: 'celebrate',
					},
				],
			},
			{
				id: 'cz-2',
				title: 'Common Questions About Corruption',
				duration: '4 min',
				dialogues: [
					{
						characterId: 'zara',
						text: 'I asked my teachers and mentors many questions about corruption. Let me share what I learned!',
						animation: 'wave',
					},
					{
						characterId: 'zara',
						text: "Question: 'Isn't corruption just how things work?' Answer: No! Many countries have successfully reduced corruption. It's not inevitable - it's a choice societies make.",
						animation: 'question',
					},
					{
						characterId: 'zara',
						text: "Question: 'What if everyone else is doing it?' Answer: That's exactly how corruption spreads! Being the person who says 'no' can inspire others to do the same.",
						animation: 'think',
					},
				],
			},
			{
				id: 'cz-3',
				title: 'My Journey of Learning',
				duration: '3 min',
				dialogues: [
					{
						characterId: 'zara',
						text: "When I started learning about anti-corruption, I was overwhelmed. There's so much to understand! But I discovered that learning in small steps makes it manageable.",
						animation: 'wave',
					},
					{
						characterId: 'zara',
						text: 'I keep a journal of new terms I learn. I discuss topics with friends. We even created a study group to explore these issues together!',
						animation: 'celebrate',
					},
					{
						characterId: 'zara',
						text: "Remember, asking questions is the first step to understanding. Never be afraid to ask 'why' - that's how we all learn and grow!",
						animation: 'question',
					},
				],
			},
		],
	},
];

export const moduleIntros: ModuleIntro[] = [
	{
		moduleId: '1',
		title: 'Understanding Corruption',
		dialogues: [
			{
				characterId: 'professor',
				text: "Welcome, learner! I'm Professor Integrity, and today we'll explore the fundamentals of corruption. Understanding what corruption is marks the first step in fighting it.",
				animation: 'wave',
			},
			{
				characterId: 'zara',
				text: 'Professor, why is corruption such a big deal? I hear about it all the time but never really understood its impact.',
				animation: 'question',
			},
			{
				characterId: 'professor',
				text: 'Excellent question, Zara! Corruption affects everyone - it takes resources from schools, hospitals, and infrastructure. Let me explain the different types...',
				animation: 'explain',
			},
		],
	},
	{
		moduleId: '2',
		title: 'Causes of Corruption',
		dialogues: [
			{
				characterId: 'amina',
				text: "Hey there! I'm Amina, and I've seen how corruption affects our communities firsthand. Today, we'll explore WHY corruption happens.",
				animation: 'wave',
			},
			{
				characterId: 'zara',
				text: 'Amina, do you think corruption can ever be completely stopped?',
				animation: 'question',
			},
			{
				characterId: 'amina',
				text: "That's a powerful question! By understanding the root causes, we become part of the solution. Let's dive in together!",
				animation: 'celebrate',
			},
		],
	},
	{
		moduleId: '3',
		title: 'Consequences of Corruption',
		dialogues: [
			{
				characterId: 'justice',
				text: "Attention, citizens! I'm Agent Justice, and my mission is to help you understand the serious consequences of corruption.",
				animation: 'explain',
			},
			{
				characterId: 'zara',
				text: 'Agent Justice, what happens to people who commit corruption?',
				animation: 'question',
			},
			{
				characterId: 'justice',
				text: 'Great question! There are legal, social, and economic consequences. Let me walk you through each one...',
				animation: 'think',
			},
		],
	},
];

export const quizIntros: CharacterDialogue[] = [
	{
		characterId: 'kofi',
		text: "Welcome to the quiz arena! I'm Quiz Master Kofi, and I'll be testing your knowledge today. Are you ready to prove what you've learned?",
		animation: 'wave',
	},
	{
		characterId: 'kofi',
		text: "Remember: Read each question carefully, take your time, and don't be afraid to think critically. Good luck!",
		animation: 'celebrate',
	},
];
